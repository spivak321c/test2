# Merchant Admin Platform

A comprehensive merchant management platform with automated payouts, role-based access control, and AdminJS integration.

## Features

### Core Functionality

- **Merchant Application Management** - Review, approve, reject merchant applications
- **Automated Payout System** - Scheduled payout aggregation and processing
- **Order Merchant Splits** - Track and manage merchant earnings per order
- **Role-Based Access Control** - Four admin roles with granular permissions
- **Paystack Integration** - Automated transfers with webhook support
- **Email Notifications** - Professional HTML email templates
- **Custom AdminJS Frontend** - Enhanced UI with custom React components

### Admin Roles

- **Super Admin** - Full system access, can manage other admins
- **Admin** - Manage merchants, applications, payouts, orders
- **Editor** - View and edit merchants, applications, orders
- **Viewer** - Read-only access to all resources

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Admin Panel**: AdminJS with custom React components
- **Payments**: Paystack
- **Email**: Nodemailer with HTML templates
- **Authentication**: JWT with bcrypt
- **Scheduling**: node-cron

## Project Structure

```
src/
├── admin/                      # AdminJS configuration and custom components
│   ├── components/            # Custom React components
│   │   ├── Dashboard.tsx      # Custom dashboard
│   │   ├── ProcessPayoutAction.tsx
│   │   └── MerchantDetails.tsx
│   ├── admin.ts               # AdminJS setup
│   └── component-loader.ts    # Component loader
├── config/                    # Configuration files
│   ├── database.ts            # Database connection
│   └── index.ts               # App configuration
├── controllers/               # Route controllers
│   ├── admin.ts
│   ├── merchant.ts
│   └── payout.ts
├── jobs/                      # Scheduled jobs
│   └── payout-scheduler.ts    # Automatic payout scheduler
├── middleware/                # Express middleware
│   ├── auth.ts                # JWT authentication
│   ├── rbac.ts                # Role-based access control
│   └── webhook.ts             # Webhook middleware
├── models/                    # Drizzle ORM models
│   ├── admins.ts
│   ├── merchant.ts
│   ├── merchant_applications.ts
│   ├── order.ts
│   ├── order_merchant_split.ts
│   ├── payout.ts
│   └── bank_details.ts
├── routes/                    # API routes
│   ├── admin.ts
│   ├── merchant.ts
│   ├── payout.ts
│   └── webhook.ts
├── services/                  # Business logic
│   ├── admin_service.ts
│   ├── merchant_service.ts
│   └── payout_service.ts
├── types/                     # TypeScript types
│   └── roles.ts               # RBAC types and permissions
├── utils/                     # Utility functions
│   ├── email.ts               # Email service
│   ├── email-templates.ts     # HTML email templates
│   └── logger.ts              # Winston logger
└── index.ts                   # App entry point
```

## Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Paystack account
- SMTP email service

### Setup

1. **Clone and install dependencies**

```bash
npm install
```

2. **Configure environment variables**

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# JWT
JWT_SECRET=your-secret-key-here

# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourplatform.com

# Paystack
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_WEBHOOK_SECRET=optional-webhook-secret

# App
PORT=5000
NODE_ENV=development
ENABLE_SCHEDULERS=true
MERCHANT_LOGIN_URL=https://yourplatform.com/merchant/login
```

3. **Run database migrations**

```bash
npm run db:push
```

4. **Seed initial admin user**

```bash
npm run db:seed
```

5. **Start the server**

```bash
npm run dev
```

## Usage

### Access AdminJS Panel

Navigate to `http://localhost:5000/admin` and login with your admin credentials.

### API Endpoints

#### Authentication

- `POST /api/admin/login` - Admin login

#### Merchants

- `GET /api/merchants` - List all merchants
- `GET /api/merchants/:id` - Get merchant details
- `PATCH /api/merchants/:id/suspend` - Suspend merchant

#### Applications

- `GET /api/applications` - List applications
- `POST /api/applications/:id/approve` - Approve application
- `POST /api/applications/:id/reject` - Reject application

#### Payouts

- `GET /api/payouts` - List payouts
- `GET /api/payouts/merchant/:merchantId` - Merchant payout summary
- `POST /api/payouts/aggregate` - Trigger manual aggregation
- `POST /api/payouts/:id/process` - Process specific payout

#### Webhooks

- `POST /webhook/paystack` - Paystack webhook handler

### Automatic Payout System

The system automatically:

1. **Aggregates eligible payouts** daily at 2 AM

   - Scans `order_merchant_splits` table
   - Finds splits with status `payout_requested` and `holdUntil` passed
   - Creates payout records for each merchant

2. **Processes pending payouts** hourly

   - Initiates Paystack transfers
   - Updates payout status to `processing`
   - Sends email notifications

3. **Handles webhook events**
   - Updates payout status on `transfer.success`
   - Marks splits as `paid`
   - Updates merchant totals
   - Sends completion emails

### Custom AdminJS Components

#### Dashboard Component

Shows key metrics and quick actions:

- Total merchants
- Pending applications
- Pending payouts
- Total payout amount

#### Process Payout Action

Custom action for processing individual payouts:

- Confirmation dialog
- Real-time status updates
- Error handling

#### Merchant Details

Enhanced merchant view with:

- Payout summary
- Financial statistics
- Quick links to related resources

### Role-Based Access Control

Protect routes with permission middleware:

```typescript
import { requirePermission } from "./middleware/rbac.js";
import { Permission } from "./types/roles.js";

router.post(
  "/payouts/:id/process",
  requireAdmin,
  requirePermission(Permission.PROCESS_PAYOUTS),
  processPayoutController
);
```

## Email Templates

Professional HTML templates for:

- Application approval/rejection
- Payout notifications
- Account suspension
- Weekly summaries

See `docs/EMAIL_SERVICE.md` for details.

## Paystack Webhook Setup

1. Go to Paystack Dashboard > Settings > Webhooks
2. Add webhook URL: `https://yourdomain.com/webhook/paystack`
3. Select events: `transfer.success`, `transfer.failed`, `transfer.reversed`
4. Save and copy webhook secret to `.env`

## Development

### Run in development mode

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

### Database commands

```bash
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
npm run db:generate  # Generate migrations
```

## Security Considerations

1. **Environment Variables** - Never commit `.env` files
2. **JWT Secret** - Use strong, random secret keys
3. **RBAC** - Always check permissions before sensitive operations
4. **Webhook Signatures** - Verify Paystack signatures
5. **Password Hashing** - Bcrypt with salt rounds of 10
6. **SQL Injection** - Use Drizzle ORM parameterized queries

## Troubleshooting

### Payouts not processing

- Check `ENABLE_SCHEDULERS=true` in `.env`
- Verify Paystack API key is valid
- Check merchant has `recipientCode` set
- Review logs for errors

### Emails not sending

- Verify SMTP credentials
- Check spam folder
- Test with different email provider
- Review email service logs

### AdminJS not loading

- Check `ADMIN_JS_TMP_DIR` permissions
- Clear `/tmp` directory
- Restart server
- Check browser console for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- GitHub Issues: [your-repo/issues]
- Email: support@yourplatform.com
- Documentation: [your-docs-url]

```

```
