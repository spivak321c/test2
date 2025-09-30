# Email Service Documentation

## Overview

The email service provides professional, branded email templates for all merchant and admin communications.

## Features

- Professional HTML templates with responsive design
- Consistent branding and styling
- Support for multiple email types
- Nodemailer integration for reliable delivery
- Environment-based configuration

## Email Types

### 1. Application Emails

#### Approval Email
Sent when a merchant application is approved.
- Includes temporary password
- Login instructions
- Next steps guide

#### Rejection Email
Sent when an application is rejected.
- Clear rejection reason
- Reapplication guidance
- Support contact information

#### More Info Request
Sent when additional information is needed.
- Specific information requirements
- Response instructions

### 2. Payout Emails

#### Payout Initiated
Sent when a payout is initiated.
- Amount and reference
- Expected arrival time
- Tracking information

#### Payout Completed
Sent when a payout is successfully completed.
- Confirmation details
- Transaction reference
- Account credit notification

#### Payout Failed
Sent when a payout fails.
- Failure reason
- Resolution steps
- Support contact

### 3. Account Management

#### Merchant Suspended
Sent when a merchant account is suspended.
- Suspension reason
- Impact explanation
- Reactivation process

#### Weekly Summary
Sent weekly with payout summary.
- Sales statistics
- Commission breakdown
- Net payout amount

## Configuration

### Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourplatform.com
MERCHANT_LOGIN_URL=https://yourplatform.com/merchant/login
```

### SMTP Providers

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

## Usage Examples

### Send Approval Email

```typescript
import { sendApprovalEmail } from './utils/email.js'

await sendApprovalEmail(
  'merchant@example.com',
  'My Store',
  'temp123'
)
```

### Send Payout Notification

```typescript
import { sendPayoutNotificationEmail } from './utils/email.js'

await sendPayoutNotificationEmail(
  'merchant@example.com',
  'My Store',
  50000.00
)
```

### Send Weekly Summary

```typescript
import { sendWeeklyPayoutSummary } from './utils/email.js'

await sendWeeklyPayoutSummary(
  'merchant@example.com',
  'My Store',
  {
    weekStart: '2025-01-01',
    weekEnd: '2025-01-07',
    totalSales: 100000,
    commission: 5000,
    netPayout: 95000,
    ordersCount: 25
  }
)
```

## Template Customization

Templates are defined in \`utils/email-templates.ts\`. To customize:

1. Edit the template function
2. Modify HTML structure and styling
3. Update email styles in \`emailStyles\` constant
4. Test with different email clients

## Best Practices

1. **Always test emails** before deploying to production
2. **Use environment variables** for sensitive configuration
3. **Include unsubscribe links** for marketing emails
4. **Keep templates responsive** for mobile devices
5. **Monitor delivery rates** and bounce rates
6. **Use transactional email services** for better deliverability

## Troubleshooting

### Emails not sending
- Check SMTP credentials
- Verify firewall/port settings
- Check spam folder
- Review email service logs

### Formatting issues
- Test in multiple email clients
- Use inline CSS for better compatibility
- Avoid complex layouts
- Test on mobile devices

## Future Enhancements

- Email queue system for bulk sending
- Email analytics and tracking
- A/B testing for templates
- Multi-language support
- SMS notifications integration
