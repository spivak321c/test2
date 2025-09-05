// Controllers for merchant vetting, approval, suspension
import { Request, Response } from 'express';
import * as merchantService from '../services/merchant_service';

// Get all merchant applications
export const getApplications = async (req: Request, res: Response) => {
  // Fetch all applications for admin review
  const applications = await merchantService.getAllApplications();
  res.json(applications);
};

// Get pending applications
export const getPendingApplications = async (req: Request, res: Response) => {
  // Fetch pending applications
  const applications = await merchantService.getPendingApplications();
  res.json(applications);
};

// Approve application
export const approveApplication = async (req: Request, res: Response) => {
  // Approve application, create account, send temp password, log action
  const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
  res.json({ application, merchant });
};

// Reject application
export const rejectApplication = async (req: Request, res: Response) => {
  // Reject application with reason, send email, log action
  const application = await merchantService.rejectApplication(req.params.id, req.body.reason, req.user.id);
  res.json(application);
};

// Request more info
export const requestMoreInfo = async (req: Request, res: Response) => {
  // Set status to more_info, send email, log action
  const application = await merchantService.requestMoreInfo(req.params.id, req.body.message, req.user.id);
  res.json(application);
};

// Get all merchants (admin list view)
export const getMerchants = async (req: Request, res: Response) => {
  // List all merchants
  const merchants = await merchantService.getAllMerchants();
  res.json(merchants);
};

// Suspend merchant
export const suspendMerchant = async (req: Request, res: Response) => {
  // Suspend merchant, log action
  const merchant = await merchantService.suspendMerchant(req.params.id, req.body.reason, req.user.id);
  res.json(merchant);
};

// Update commission tier
export const updateCommissionTier = async (req: Request, res: Response) => {
  // Update merchant's commission tier, log action
  const merchant = await merchantService.updateCommissionTier(req.params.id, req.body.tier, req.user.id);
  res.json(merchant);
};
