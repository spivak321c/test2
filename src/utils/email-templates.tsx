// Professional HTML email templates

export const emailStyles = `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .email-header {
      background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px;
    }
    .email-body h2 {
      color: #4F46E5;
      font-size: 20px;
      margin-top: 0;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #4F46E5;
      padding: 15px;
      margin: 20px 0;
    }
    .info-box strong {
      color: #4F46E5;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #4F46E5;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #4338CA;
    }
    .alert-success {
      background-color: #d4edda;
      border-left: 4px solid #28a745;
      padding: 15px;
      margin: 20px 0;
      color: #155724;
    }
    .alert-warning {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      color: #856404;
    }
    .alert-danger {
      background-color: #f8d7da;
      border-left: 4px solid #dc3545;
      padding: 15px;
      margin: 20px 0;
      color: #721c24;
    }
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #6c757d;
    }
    .divider {
      height: 1px;
      background-color: #e9ecef;
      margin: 20px 0;
    }
  </style>
`;

export const applicationApprovedTemplate = (
  storeName: string,
  email: string,
  tempPassword: string,
  loginUrl: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>🎉 Application Approved!</h1>
    </div>
    <div class="email-body">
      <h2>Congratulations, ${storeName}!</h2>
      <p>We're excited to inform you that your merchant application has been approved. You can now start selling on our platform!</p>
      
      <div class="alert-success">
        <strong>Your account is now active!</strong>
      </div>

      <div class="info-box">
        <p><strong>Login Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> <code style="background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${tempPassword}</code></p>
      </div>

      <p><strong>Important:</strong> For security reasons, please change your password immediately after your first login.</p>

      <a href="${loginUrl}" class="button">Login to Your Account</a>

      <div class="divider"></div>

      <h3>Next Steps:</h3>
      <ol>
        <li>Log in to your merchant dashboard</li>
        <li>Complete your profile information</li>
        <li>Set up your bank account for payouts</li>
        <li>Start adding your products</li>
      </ol>

      <p>If you have any questions, our support team is here to help!</p>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const applicationRejectedTemplate = (
  storeName: string,
  reason: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Application Status Update</h1>
    </div>
    <div class="email-body">
      <h2>Dear ${storeName},</h2>
      <p>Thank you for your interest in joining our merchant platform.</p>
      
      <div class="alert-danger">
        <strong>Application Status:</strong> Not Approved
      </div>

      <div class="info-box">
        <p><strong>Reason:</strong></p>
        <p>${reason}</p>
      </div>

      <p>We encourage you to address the issues mentioned above and reapply when ready. Our team is committed to supporting quality merchants on our platform.</p>

      <div class="divider"></div>

      <h3>Need Help?</h3>
      <p>If you have questions about this decision or need clarification, please contact our support team.</p>
      
      <a href="mailto:support@yourplatform.com" class="button">Contact Support</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const moreInfoRequestTemplate = (storeName: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Additional Information Required</h1>
    </div>
    <div class="email-body">
      <h2>Dear ${storeName},</h2>
      <p>We're reviewing your merchant application and need some additional information to proceed.</p>
      
      <div class="alert-warning">
        <strong>Action Required:</strong> Please provide the requested information
      </div>

      <div class="info-box">
        <p><strong>Details:</strong></p>
        <p>${message}</p>
      </div>

      <p>Please respond to this request at your earliest convenience. Once we receive the information, we'll continue processing your application.</p>

      <a href="mailto:applications@yourplatform.com" class="button">Reply with Information</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const payoutInitiatedTemplate = (
  storeName: string,
  amount: number,
  reference: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>💰 Payout Initiated</h1>
    </div>
    <div class="email-body">
      <h2>Hello ${storeName},</h2>
      <p>Great news! A payout has been initiated to your registered bank account.</p>
      
      <div class="alert-success">
        <strong>Payout Status:</strong> Processing
      </div>

      <div class="info-box">
        <p><strong>Amount:</strong> NGN ${amount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Expected Arrival:</strong> 1-2 business days</p>
      </div>

      <p>The funds will be transferred to your registered bank account. You'll receive another email once the transfer is completed.</p>

      <div class="divider"></div>

      <h3>Track Your Payouts</h3>
      <p>You can view all your payout history in your merchant dashboard.</p>
      
      <a href="https://yourplatform.com/merchant/payouts" class="button">View Payout History</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const payoutCompletedTemplate = (
  storeName: string,
  amount: number,
  reference: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>✅ Payout Completed</h1>
    </div>
    <div class="email-body">
      <h2>Hello ${storeName},</h2>
      <p>Your payout has been successfully completed!</p>
      
      <div class="alert-success">
        <strong>Payout Status:</strong> Completed
      </div>

      <div class="info-box">
        <p><strong>Amount:</strong> NGN ${amount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Completed:</strong> ${new Date().toLocaleDateString(
          "en-NG",
          { year: "numeric", month: "long", day: "numeric" }
        )}</p>
      </div>

      <p>The funds should now be available in your registered bank account. Please allow a few minutes for your bank to process the credit.</p>

      <div class="divider"></div>

      <p>Thank you for being a valued merchant on our platform!</p>
      
      <a href="https://yourplatform.com/merchant/payouts" class="button">View Payout Details</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const payoutFailedTemplate = (
  storeName: string,
  amount: number,
  reason: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>⚠️ Payout Failed</h1>
    </div>
    <div class="email-body">
      <h2>Hello ${storeName},</h2>
      <p>We encountered an issue while processing your payout.</p>
      
      <div class="alert-danger">
        <strong>Payout Status:</strong> Failed
      </div>

      <div class="info-box">
        <p><strong>Amount:</strong> NGN ${amount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      </div>

      <h3>What happens next?</h3>
      <p>Don't worry - your funds are safe. Please take the following steps:</p>
      <ol>
        <li>Verify your bank account details in your merchant dashboard</li>
        <li>Ensure your account is active and can receive transfers</li>
        <li>Contact our support team if you need assistance</li>
      </ol>

      <p>We'll automatically retry the payout once the issue is resolved.</p>

      <a href="mailto:support@yourplatform.com" class="button">Contact Support</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const merchantSuspendedTemplate = (
  storeName: string,
  reason: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Account Status Update</h1>
    </div>
    <div class="email-body">
      <h2>Dear ${storeName},</h2>
      <p>We're writing to inform you that your merchant account has been temporarily suspended.</p>
      
      <div class="alert-danger">
        <strong>Account Status:</strong> Suspended
      </div>

      <div class="info-box">
        <p><strong>Reason:</strong></p>
        <p>${reason}</p>
      </div>

      <h3>What this means:</h3>
      <ul>
        <li>Your products are no longer visible on the platform</li>
        <li>You cannot process new orders</li>
        <li>Existing orders will be fulfilled as normal</li>
        <li>Pending payouts will be processed</li>
      </ul>

      <p>To reactivate your account, please contact our support team to address the issues mentioned above.</p>

      <a href="mailto:support@yourplatform.com" class="button">Contact Support</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const weeklyPayoutSummaryTemplate = (
  storeName: string,
  weekStart: string,
  weekEnd: string,
  totalSales: number,
  commission: number,
  netPayout: number,
  ordersCount: number
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>📊 Weekly Payout Summary</h1>
    </div>
    <div class="email-body">
      <h2>Hello ${storeName},</h2>
      <p>Here's your sales summary for the week of ${weekStart} to ${weekEnd}.</p>
      
      <div class="info-box">
        <p><strong>Total Sales:</strong> NGN ${totalSales.toLocaleString(
          "en-NG",
          { minimumFractionDigits: 2 }
        )}</p>
        <p><strong>Platform Commission:</strong> NGN ${commission.toLocaleString(
          "en-NG",
          { minimumFractionDigits: 2 }
        )}</p>
        <p><strong>Net Payout:</strong> NGN ${netPayout.toLocaleString(
          "en-NG",
          { minimumFractionDigits: 2 }
        )}</p>
        <p><strong>Orders Processed:</strong> ${ordersCount}</p>
      </div>

      <div class="alert-success">
        Your payout will be processed within the next 24-48 hours.
      </div>

      <a href="https://yourplatform.com/merchant/reports" class="button">View Detailed Report</a>
    </div>
    <div class="email-footer">
      <p>© 2025 Merchant Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
