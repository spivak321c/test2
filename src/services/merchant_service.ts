// Merchant logic
import * as repo from '../repositories/merchant_repository';
import { stripe } from '../utils/external';
import { mockEmailService } from '../utils/email';
import { v4 as uuid } from 'uuid';

// Get all applications
export const getAllApplications = async () => repo.getAllApplications();

// Get pending applications
export const getPendingApplications = async () => repo.getPendingApplications();

// Approve application
export const approveApplication = async (id: string, adminId: string) => {
  const application = (await repo.getApplicationById(id))[0];
  if (application.status !== 'pending') throw new Error('Already processed');

  // Create Stripe connected account for split settlements
  const stripeAccount = await stripe.accounts.create({
    type: 'express',
    email: application.workEmail,
    business_type: 'individual',
    // Add more details from application
  });

  // Create user account
  const tempPassword = uuid().slice(0, 8);
  const user = await repo.createUser({
    username: application.workEmail,
    email: application.workEmail,
    password: tempPassword, // Hash in production
    role: 'merchant',
  });

  // Create merchant
  const merchant = await repo.createMerchant({
    userId: user[0].id,
    applicationId: id,
    storeName: application.storeName,
    stripeAccountId: stripeAccount.id,
  });

  // Update application
  const updatedApp = await repo.updateApplication(id, { status: 'approved', reviewedAt: new Date(), reviewedBy: adminId });

  // Log action
  await repo.createAdminLog({ adminId, action: 'APPROVE_APPLICATION', targetType: 'application', targetId: id });

  // Send email with temp password
  mockEmailService.sendApprovalEmail(application.workEmail, application.storeName, tempPassword);

  return { application: updatedApp, merchant: merchant[0] };
};

// Reject application
export const rejectApplication = async (id: string, reason: string, adminId: string) => {
  const updatedApp = await repo.updateApplication(id, { status: 'rejected', rejectionReason: reason, reviewedAt: new Date(), reviewedBy: adminId });
  await repo.createAdminLog({ adminId, action: 'REJECT_APPLICATION', targetType: 'application', targetId: id });
  mockEmailService.sendRejectionEmail(updatedApp[0].workEmail, reason);
  return updatedApp;
};

// Request more info
export const requestMoreInfo = async (id: string, message: string, adminId: string) => {
  const updatedApp = await repo.updateApplication(id, { status: 'more_info', reviewedAt: new Date(), reviewedBy: adminId });
  await repo.createAdminLog({ adminId, action: 'REQUEST_MORE_INFO', targetType: 'application', targetId: id });
  mockEmailService.requestMoreInfoEmail(updatedApp[0].workEmail, message);
  return updatedApp;
};

// Get all merchants
export const getAllMerchants = async () => repo.getAllMerchants();

// Suspend merchant
export const suspendMerchant = async (id: string, reason: string, adminId: string) => {
  const updated = await repo.updateMerchant(id, { status: 'suspended' });
  await repo.createAdminLog({ adminId, action: 'SUSPEND_MERCHANT', targetType: 'merchant', targetId: id, details: { reason } });
  return updated;
};

// Update commission tier
export const updateCommissionTier = async (id: string, tier: string, adminId: string) => {
  const rate = tier === 'premium' ? '3.00' : '5.00'; // Example rates
  const updated = await repo.updateMerchant(id, { commissionTier: tier, commissionRate: rate });
  await repo.createAdminLog({ adminId, action: 'UPDATE_COMMISSION', targetType: 'merchant', targetId: id, details: { tier } });
  return updated;
};

// Create application (merchant submits)
export const createApplication = async (data: any) => {
  const application = await repo.createApplication({ ...data, id: uuid(), submittedAt: new Date() });
  // Notify admins
  mockEmailService.notifyAdminNewApplication(application.storeName, application.personalEmail);
  return application;
};
