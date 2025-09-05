// Email/SMS notifications (mock)
export const mockEmailService = {
  // Notify admin of new application
  notifyAdminNewApplication: (storeName: string, applicantEmail: string) => {
    console.log(`Email to admin: New application from ${storeName} (${applicantEmail})`);
  },
  // Send approval email with temp password
  sendApprovalEmail: (email: string, storeName: string, tempPassword: string) => {
    console.log(`Email to ${email}: Your ${storeName} application approved. Temp password: ${tempPassword}`);
  },
  // Send rejection email
  sendRejectionEmail: (email: string, reason: string) => {
    console.log(`Email to ${email}: Application rejected. Reason: ${reason}`);
  },
  // Request more info
  requestMoreInfoEmail: (email: string, message: string) => {
    console.log(`Email to ${email}: More info needed: ${message}`);
  },
  // Notify merchant of new dispute
  notifyMerchantNewDispute: (merchantId: string, orderId: string) => {
    console.log(`Email to merchant ${merchantId}: New dispute on order ${orderId}`);
  },
  // Notify customer of refund approval
  notifyCustomerRefundApproved: (customerId: string, orderId: string) => {
    console.log(`Email to customer ${customerId}: Refund approved for order ${orderId}`);
  },
};
