// Payout logic
/*
import * as repo from '../repositories/payout_repository';
import * as merchantRepo from '../repositories/merchant_repository';
import * as orderRepo from '../repositories/order_repository';
import { stripe } from '../utils/external';
import { createAdminLog } from '../repositories/merchant_repository';

// Get all payouts
export const getAllPayouts = async () => repo.getAllPayouts();

// Get merchant payouts
export const getMerchantPayouts = async (merchantId: string) => repo.getPayoutsByMerchant(merchantId);

// Run payout (aggregate and transfer)
export const runPayout = async (adminId?: string) => {
  // Get all merchants
  const merchants = await merchantRepo.getAllMerchants();

  const results = [];
  try()
  for (const merchant of merchants) {
    // Aggregate unsettled orders (delivered, not paid out)
    const orders = await orderRepo.getUnsettledOrders(merchant.id); // Assume method added
    const amount = orders.reduce((sum, o) => sum + (o.totalAmount - o.commissionAmount), 0);

    if (amount > 0) {
      // Create Stripe transfer for split settlement
      const transfer = await stripe.transfers.create({
        amount: amount * 100, // cents
        currency: 'usd',
        destination: merchant.stripeAccountId,
      });

      // Create payout record
      const payout = await repo.createPayout({
        merchantId: merchant.id,
        amount,
        transferId: transfer.id,
        status: 'completed',
      });

      // Update orders as settled
      await orderRepo.markOrdersSettled(orders.map(o => o.id)); // Assume method

      results.push(payout);
    }
  }

  if (adminId) await createAdminLog({ adminId, action: 'RUN_PAYOUT', targetType: 'payout', targetId: 'batch', details: { count: results.length } });

  return results;
};
*/

import { drizzle } from "drizzle-orm/neon-serverless";
import { eq, and, lt, sum } from "drizzle-orm";
import { db } from "../config/database.js";
import { payouts } from "../models/payout.js";
import { orderMerchantSplits } from "../models/order_merchant_split.js";
import { merchants } from "../models/merchant.js";
import { config } from "../config/index.js";
const { Paystack } = require("@paystack/paystack-sdk");

const paystack = new Paystack(config.paystack.secretKey);

// Process pending payout
export const processPayout = async (payoutId: string, adminId: string) => {
  return await db.transaction(async (tx) => {
    const [payout] = await tx
      .select()
      .from(payouts)
      .where(eq(payouts.id, payoutId));
    if (!payout || payout.status !== "pending")
      throw new Error("Invalid payout");

    // Verify eligible amount from splits (cross-check)
    const eligibleAmount = await tx
      .select({ total: sum(orderMerchantSplits.amountDue) })
      .from(orderMerchantSplits)
      .where(
        and(
          eq(orderMerchantSplits.merchantId, payout.merchantId),
          eq(orderMerchantSplits.status, "payout_requested"),
          lt(orderMerchantSplits.holdUntil, new Date())
        )
      );
    if (Number(eligibleAmount[0].total) !== Number(payout.amount))
      throw new Error("Amount mismatch");

    const [merchant] = await tx
      .select()
      .from(merchants)
      .where(eq(merchants.id, payout.merchantId));
    if (!merchant.recipientCode) throw new Error("No recipient set");

    // Initiate transfer
    const transfer = await paystack.transfer.create({
      source: "balance",
      amount: Number(payout.amount) * 100, // Kobo
      recipient: merchant.recipientCode,
      reference: `payout_${payout.id}`,
      reason: "Merchant Payout",
    });

    // Update payout
    await tx
      .update(payouts)
      .set({
        status: "processing",
        paystackTransferId: transfer.data.transfer_code, // Not ID, code for verification
      })
      .where(eq(payouts.id, payoutId));

    // Log (use your admin_logs)
    // await createAdminLog({ adminId, action: 'PROCESS_PAYOUT', targetType: 'payout', targetId: payoutId });

    return payout;
  });
};

// Handle webhook (separate function for route)
export const handleTransferWebhook = async (event: any) => {
  if (event.event === "transfer.success") {
    const ref = event.data.reference;
    const [payout] = await db
      .select()
      .from(payouts)
      .where(eq(payouts.paystackTransferId, event.data.transfer_code));
    if (payout) {
      await db
        .update(payouts)
        .set({ status: "completed" })
        .where(eq(payouts.id, payout.id));
      await db
        .update(orderMerchantSplits)
        .set({ status: "paid" })
        .where(
          and(
            eq(orderMerchantSplits.merchantId, payout.merchantId),
            eq(orderMerchantSplits.status, "payout_requested")
          )
        );
    }
  } else if (event.event === "transfer.failed") {
    // Update to 'failed', notify admin
  }
};
