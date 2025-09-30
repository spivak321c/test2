// Controllers for payout run management

import { Request, Response } from "express";
import * as payoutService from "../services/payout_service";
import { processPayout } from "../services/payout_service";

export const processPayoutController = async (req, res) => {
  const { payoutId } = req.params;
  const adminId = req.user.id; // From auth middleware
  try {
    const payout = await processPayout(payoutId, adminId);
    res.json(payout);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
/*
// Get all payouts
export const getPayouts = async (req: Request, res: Response) => {
  // Fetch payout history
  const payouts = await payoutService.getAllPayouts();
  res.json(payouts);
};

// Get payouts for a merchant
export const getMerchantPayouts = async (req: Request, res: Response) => {
  // Fetch payouts for specific merchant
  const payouts = await payoutService.getMerchantPayouts(req.params.merchantId);
  res.json(payouts);
};

// Trigger manual payout run
export const triggerPayout = async (req: Request, res: Response) => {
  // Manually run payout aggregation and transfers, log financial action
  const results = await payoutService.runPayout(req.user.id);
  res.json(results);
};
*/
