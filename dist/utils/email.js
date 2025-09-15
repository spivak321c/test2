// Email/SMS notifications (mock)
/*
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
*/
// Email notifications using Nodemailer
/*
import nodemailer from 'nodemailer';

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send approval email with temporary password
export const sendApprovalEmail = async (email: string, storeName: string, tempPassword: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@yourapp.com',
    to: email,
    subject: `Your ${storeName} Merchant Application Approved`,
    text: `Dear ${storeName},\n\nYour merchant application has been approved!\n\nLogin Details:\nEmail: ${email}\nTemporary Password: ${tempPassword}\n\nPlease log in and change your password immediately.\n\nBest regards,\nYour App Team`,
    html: `
      <h2>Merchant Application Approved</h2>
      <p>Dear ${storeName},</p>
      <p>Your merchant application has been approved!</p>
      <p><strong>Login Details:</strong></p>
      <ul>
        <li>Email: ${email}</li>
        <li>Temporary Password: ${tempPassword}</li>
      </ul>
      <p>Please <a href="https://yourapp.com/merchant/login">log in</a> and change your password immediately.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send rejection email
export const sendRejectionEmail = async (email: string, reason: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@yourapp.com',
    to: email,
    subject: 'Merchant Application Rejected',
    text: `Dear Applicant,\n\nYour merchant application has been rejected.\n\nReason: ${reason}\n\nPlease address the issues and reapply if needed.\n\nBest regards,\nYour App Team`,
    html: `
      <h2>Merchant Application Rejected</h2>
      <p>Dear Applicant,</p>
      <p>Your merchant application has been rejected.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please address the issues and reapply if needed.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};


// Commented out unrelated email functions
export const notifyAdminNewApplication = (storeName: string, applicantEmail: string) => {
  // ...
};
// ...
*/
import nodemailer from "nodemailer";
// Validate environment variables
const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
for (const env of requiredEnv) {
    if (!process.env[env]) {
        throw new Error(`Missing environment variable: ${env}`);
    }
}
// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
// Send approval email with temporary password
export const sendApprovalEmail = async (email, storeName, tempPassword) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Your ${storeName} Merchant Application Approved`,
        text: `Dear ${storeName},\n\nYour merchant application has been approved!\n\nLogin Details:\nEmail: ${email}\nTemporary Password: ${tempPassword}\n\nPlease log in and change your password immediately.\n\nBest regards,\nYour App Team`,
        html: `
      <h2>Merchant Application Approved</h2>
      <p>Dear ${storeName},</p>
      <p>Your merchant application has been approved!</p>
      <p><strong>Login Details:</strong></p>
      <ul>
        <li>Email: ${email}</li>
        <li>Temporary Password: ${tempPassword}</li>
      </ul>
      <p>Please <a href="https://yourapp.com/merchant/login">log in</a> and change your password immediately.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
    };
    await transporter.sendMail(mailOptions);
};
// Send rejection email
export const sendRejectionEmail = async (email, reason) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Merchant Application Rejected",
        text: `Dear Applicant,\n\nYour merchant application has been rejected.\n\nReason: ${reason}\n\nPlease address the issues and reapply if needed.\n\nBest regards,\nYour App Team`,
        html: `
      <h2>Merchant Application Rejected</h2>
      <p>Dear Applicant,</p>
      <p>Your merchant application has been rejected.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please address the issues and reapply if needed.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
    };
    await transporter.sendMail(mailOptions);
};
// Send more info request email
export const requestMoreInfoEmail = async (email, message) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "More Information Needed for Your Merchant Application",
        text: `Dear Applicant,\n\nWe need more information to process your merchant application.\n\nDetails: ${message}\n\nPlease respond with the requested information.\n\nBest regards,\nYour App Team`,
        html: `
      <h2>More Information Needed</h2>
      <p>Dear Applicant,</p>
      <p>We need more information to process your merchant application.</p>
      <p><strong>Details:</strong> ${message}</p>
      <p>Please respond with the requested information.</p>
      <p>Best regards,<br>Your App Team</p>
    `,
    };
    await transporter.sendMail(mailOptions);
};
//# sourceMappingURL=email.js.map