// Controllers for dispute center and refund approvals
import { Request, Response } from 'express';
import * as disputeService from '../services/dispute_service';

// Get all disputes (admin view)
export const getDisputes = async (req: Request, res: Response) => {
  // Fetch all disputes
  const disputes = await disputeService.getAllDisputes();
  res.json(disputes);
};

// Get single dispute
export const getDispute = async (req: Request, res: Response) => {
  // Fetch dispute by ID
  const dispute = await disputeService.getDispute(req.params.id);
  if (!dispute) return res.status(404).json({ message: 'Dispute not found' });
  res.json(dispute);
};

// Escalate dispute (admin)
export const escalateDispute = async (req: Request, res: Response) => {
  // Escalate unresolved dispute
  const dispute = await disputeService.escalateDispute(req.params.id, req.user.id);
  res.json(dispute);
};

// Approve refund (admin)
export const approveRefund = async (req: Request, res: Response) => {
  // Approve refund, process via payment provider, restock inventory, log action
  const { dispute, order } = await disputeService.approveRefund(req.params.id, req.user.id);
  res.json({ message: 'Refund approved', dispute, order });
};

// Customer requests return (shared endpoint, auth required)
export const createReturnRequest = async (req: Request, res: Response) => {
  // Customer creates a dispute for return
  const dispute = await disputeService.createDispute({ ...req.body, customerId: req.user.id });
  res.status(201).json(dispute);
};

// Merchant reviews request
export const reviewReturnRequest = async (req: Request, res: Response) => {
  // Merchant updates dispute status (accept/reject)
  const dispute = await disputeService.reviewDispute(req.params.id, req.body, req.user.id);
  res.json(dispute);
};
