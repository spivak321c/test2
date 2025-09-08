// Payout logic
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
