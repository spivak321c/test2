# Codebase Analysis: test2
Generated: 2025-09-12 23:47:18
---

## 📂 Project Structure
```tree
📁 test2
├── api/
│   └── index.ts
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── index.ts
│   ├── controllers/
│   │   ├── announcement.ts
│   │   ├── category.ts
│   │   ├── dispute.ts
│   │   ├── merchant.ts
│   │   ├── payout.ts
│   │   └── settings.ts
│   ├── docs/
│   │   └── openapi.ts
│   ├── jobs/
│   │   ├── notification_job.ts
│   │   └── payout_job.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── logging.ts
│   │   └── ratelimit.ts
│   ├── models/
│   │   ├── admins.ts
│   │   ├── announcement.ts
│   │   ├── category.ts
│   │   ├── dispute.ts
│   │   ├── merchant.ts
│   │   ├── merchant_applications.ts
│   │   ├── order.ts
│   │   ├── payout.ts
│   │   ├── settings.ts
│   │   └── users.ts
│   ├── repositories/
│   │   ├── announcement_repository.ts
│   │   ├── category_repository.ts
│   │   ├── dispute_repository.ts
│   │   ├── merchant_repository.ts
│   │   ├── order_repository.ts
│   │   ├── payout_repository.ts
│   │   ├── settings_repository.ts
│   │   └── storage.ts
│   ├── routes/
│   │   ├── announcement.ts
│   │   ├── category.ts
│   │   ├── dispute.ts
│   │   ├── index.ts
│   │   ├── merchants.ts
│   │   ├── payout.ts
│   │   └── settings.ts
│   ├── services/
│   │   ├── announcement_service.ts
│   │   ├── category_service.ts
│   │   ├── dispute_service.ts
│   │   ├── merchant_service.ts
│   │   ├── notification_service.ts
│   │   ├── payout_service.ts
│   │   └── settings_service.ts
│   ├── tests/
│   │   ├── e2e/
│   │   │   ├── category.test.ts
│   │   │   ├── dispute.test.ts
│   │   │   ├── payout.test.js
│   │   │   └── payout.test.ts
│   │   ├── integration/
│   │   │   └── merchant_controller.test.js
│   │   ├── mocks/
│   │   │   └── payment_mock.js
│   │   └── unit/
│   │       └── dispute_service.test.js
│   ├── utils/
│   │   ├── email.ts
│   │   ├── external.ts
│   │   ├── logger.ts
│   │   └── validator.ts
│   ├── index.ts
│   └── seed.ts
├── types/
│   └── express.d.ts
├── .env
├── drizzle.config.ts
├── package.json
├── something.json
├── tsconfig.json
└── vercel.json
```
---

## 📄 File Contents
### something.json
- Size: 0.41 KB
- Lines: 23
- Last Modified: 2025-09-12 20:17:27

<xaiArtifact artifact_id="cac914c8-66e1-433e-9957-b2bfdb1a09d7" artifact_version_id="24b245fc-c061-435a-9c52-ddb7ad6fb914" title="something.json" contentType="application/json">
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node",
      "config": {
        "buildCommand": "npm run build && npx drizzle-kit generate && npx drizzle-kit migrate && npx tsx src/seed.ts  "  
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/index.ts"
    }
  ],
  "functions": {
    "src/index.ts": {
      "runtime": "nodejs22.x" 
    }
  }
}
```
</xaiArtifact>

---
### vercel.json
- Size: 0.29 KB
- Lines: 17
- Last Modified: 2025-09-12 23:41:30

<xaiArtifact artifact_id="f104c769-e7c6-4811-bccc-e9645531e72a" artifact_version_id="aae58e03-90fd-4987-966a-8dd2fdf4c955" title="vercel.json" contentType="application/json">
```json
{
  "version": 2,
  "functions": {
    "api/**": {
      "runtime": "@vercel/node@5.3.22"

    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.ts"
    }
  ],
  "installCommand": "npm install && npm run db:generate && npm run db:migrate && npm run seed"
  
}

```
</xaiArtifact>

---
### drizzle.config.ts
- Size: 0.58 KB
- Lines: 22
- Last Modified: 2025-09-12 20:16:02

<xaiArtifact artifact_id="626f8b55-c778-42da-8223-956a8f015c52" artifact_version_id="a61a2233-89fa-4a83-a322-d5ca2fc5b3ff" title="drizzle.config.ts" contentType="text/typescript">
```typescript
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  //schema: "./src/models/*.ts", // Updated to multiple files
  schema: [
    "./src/models/merchant.ts",
    "./src/models/admins.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
    // Key: Only migrate the 'merchant' table (ignores merchant_application)
  // // Optional: Add if you want verbose output for debugging
   verbose: true,

});

```
</xaiArtifact>

---
### tsconfig.json
- Size: 0.54 KB
- Lines: 21
- Last Modified: 2025-09-11 03:31:37

<xaiArtifact artifact_id="656b2a1a-4b19-438f-b292-61e68df73e16" artifact_version_id="36b2175f-96f0-42d6-a20c-7134f043d268" title="tsconfig.json" contentType="application/json">
```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "node",
    "target": "esnext",
    "module": "esnext",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node", "express"],
    "typeRoots": ["./node_modules/@types", "./types"],
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "types/**/*"],
  "exclude": ["node_modules", "dist"]
}

```
</xaiArtifact>

---
### package.json
- Size: 1.18 KB
- Lines: 50
- Last Modified: 2025-09-12 23:42:24

<xaiArtifact artifact_id="87ff02f5-6153-4ff4-9e1f-3c190c472be3" artifact_version_id="935b7113-0b41-4ebd-8f52-c72a744c02ce" title="package.json" contentType="application/json">
```json
{
  "name": "api-admin",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "seed": "tsx src/seed.ts"
  },
 "engines": {
    "node": "22.x"
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    "@vercel/node": "^5.3.22",
    "bcrypt": "^5.1.1",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.5",
    "drizzle-orm": "^0.44.5",
    "express": "^4.21.2",
    "fs": "0.0.1-security",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.15",
    "path": "0.12.7",
    "pg": "^8.16.3",
    "stripe": "^16.0.0",
    "uuid": "^10.0.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^20.16.11",
    "@types/nodemailer": "^7.0.1",
    "@types/uuid": "^10.0.0",
    "drizzle-kit": "^0.31.0",
    "ts-node": "^10.9.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}

```
</xaiArtifact>

---
### .env
- Size: 0.33 KB
- Lines: 8
- Last Modified: 2025-09-12 19:44:05

<xaiArtifact artifact_id="7cc17398-5f65-4805-9231-bf977167a55a" artifact_version_id="148a1693-c8e7-4252-bfe1-cf63f90db7bc" title=".env" contentType="text/plain">
```plain
DATABASE_URL=postgresql://neondb_owner:npg_VlAEowN2S6UT@ep-quiet-darkness-adb75ds6-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=jared33@ethereal.email
SMTP_PASS=TeBKbB3h5vqJ31U3gH
SMTP_FROM=sarah@transperth.com
JWT_SECRET=your_jwt_secret
PORT=8080
```
</xaiArtifact>

---
### src/index.ts
- Size: 2.32 KB
- Lines: 95
- Last Modified: 2025-09-12 19:12:04

<xaiArtifact artifact_id="19fc1b8c-0406-4a0c-92f2-cd1f62d1c4b2" artifact_version_id="7e2bcd9b-2296-45d2-9e7a-449e4ab677fe" title="src/index.ts" contentType="text/typescript">
```typescript
// import express from 'express';
// import { registerRoutes } from './routes/index';  // Changed to named import (fixes TS1192)
// import { config } from './config';
// import { loggingMiddleware } from './middleware/logging';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(loggingMiddleware);

// // Register routes and start server (replaces app.use('/api', router) and app.listen())
// registerRoutes(app);  // Call the function; no need for await since it's sync (see below)
// import express from 'express';

// import { registerRoutes } from './routes/index';  // Changed to named import (fixes TS1192)
// import { loggingMiddleware } from './middleware/logging';
// import { config } from 'dotenv';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(loggingMiddleware);

// // Register routes and start server (replaces app.use('/api', router) and app.listen())
// registerRoutes(app);  // Call the function; no need for await since it's sync (see below)

// // const port = process.env.PORT || 5000;  // Use env or default
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });

// app.listen(config.port, () => {
//   console.log(`Server on port ${config.port}`);
// });



/*
import { config } from 'dotenv';
config(); // Load .env first

import express from 'express';
import { registerRoutes } from './routes/index';
import { loggingMiddleware } from './middleware/logging';
import { config as appConfig } from './config/index';

const app = express();

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Register routes
registerRoutes(app);

app.listen(appConfig.port, () => {
  console.log(`Server on port ${appConfig.port}`);
});
*/











import "dotenv/config";  // <-- loads .env before any other module


import express from "express"
//import cors from "cors"
import { registerRoutes } from "./routes/index"
import { loggingMiddleware } from "./middleware/logging"
import { config as appConfig } from "./config/index"

const app = express()

//app.use(cors())
app.use(express.json())
//app.use(express.raw({ type: "application/webhook+json" }))
app.use(loggingMiddleware)

registerRoutes(app)
export default app;

const port = appConfig.port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

```
</xaiArtifact>

---
### src/seed.ts
- Size: 3.10 KB
- Lines: 96
- Last Modified: 2025-09-12 20:12:11

<xaiArtifact artifact_id="deb5130b-b440-44b6-9fc7-3a034df24e23" artifact_version_id="88657e81-2b82-4a97-bf50-a05f47a90045" title="src/seed.ts" contentType="text/typescript">
```typescript
import { drizzle } from 'drizzle-orm/neon-serverless'; // Or neon-http if not switched
import { Pool } from '@neondatabase/serverless';
import { v4 as uuid } from 'uuid';
import { merchantApplication } from './models/merchant_applications';
import { merchants } from './models/merchant';
import bcrypt from 'bcrypt';
import { admins } from './models/admins';

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not set');
// }

const DATABASE_URL="postgresql://neondb_owner:npg_VlAEowN2S6UT@ep-quiet-darkness-adb75ds6-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

async function seed() {
/*
  console.log('Seeding merchant_application...');
  await db.insert(merchantApplication).values({
    id: uuid(),
    storeName: 'Test Store',
    name: 'Test Applicant',
    personalEmail: 'test@personal.com',
    workEmail: 'test@work.com',
    phoneNumber: '123-456-7890',
    personalAddress: { street: '123 Personal St', city: 'Test City' },
    workAddress: { street: '456 Work Ave', city: 'Test City' },
    businessType: 'Individual',
    website: 'https://teststore.com',
    businessDescription: 'Test business',
    businessRegistrationNumber: 'TEST123456',
    storeLogoUrl: 'https://test.com/logo.png',
    businessRegistrationCertificate: 'https://test.com/cert.pdf',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('Seeding merchant with test accountId...');
  const tempPassword = await bcrypt.hash('testpass', 10);
  await db.insert(merchants).values({
    id: uuid(),
    applicationId: uuid(), // Link to a real app ID if needed
    merchantId: uuid(),
    storeName: 'Seeded Store',
    name: 'Seeded Merchant',
    personalEmail: 'seeded@personal.com',
    workEmail: 'seeded@work.com',
    phoneNumber: '987-654-3210',
    personalAddress: { street: '789 Seeded St', city: 'Seed City' },
    workAddress: { street: '012 Seeded Ave', city: 'Seed City' },
    businessType: 'Individual',
    website: 'https://seeded.com',
    businessDescription: 'Seeded business',
    businessRegistrationNumber: 'SEED987654',
    storeLogoUrl: 'https://seeded.com/logo.png',
    businessRegistrationCertificate: 'https://seeded.com/cert.pdf',
    password: tempPassword,
    status: 'active',
    commissionTier: 'standard',
    commissionRate: '5.00',
    accountBalance: '0.00',
    totalSales: '0.00',
    totalPayouts: '0.00',
    accountId: 'test-seeded-account-12345', // Seeded test accountId
    payoutSchedule: 'weekly',
    lastPayoutDate: null,
    banner: null,
    policies: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('Seeding complete!');
}

*/
}
console.log('Seeding admins...');
const adminPassword = await bcrypt.hash('adminpass', 10);
await db.insert(admins).values({
  id: uuid(), // Generates UUID
  username: 'admin',
  password: adminPassword,
  role: 'admin',
  email: 'admin@mail.com',
  createdAt: new Date(),
});

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
//npm run seed
```
</xaiArtifact>

---
### api/index.ts
- Size: 0.25 KB
- Lines: 7
- Last Modified: 2025-09-12 22:59:31

<xaiArtifact artifact_id="6bf4d000-844a-4ae4-bbf9-0afe60ca98d4" artifact_version_id="5b9fd191-5685-461f-833e-709a5348c71f" title="api/index.ts" contentType="text/typescript">
```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index'; // import your Express app

// Vercel handler that delegates to Express
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res);
}

```
</xaiArtifact>

---
### types/express.d.ts
- Size: 1.29 KB
- Lines: 44
- Last Modified: 2025-09-11 03:07:36

<xaiArtifact artifact_id="d7b3fbbc-fbba-4dbb-9065-94554e4cab72" artifact_version_id="0998c617-0ba8-484b-bbf2-1ccabf809972" title="types/express.d.ts" contentType="text/typescript">
```typescript
// // import { ParamsDictionary, Query } from 'express-serve-static-headers';  // Import necessary types
// // import { IncomingHttpHeaders } from 'http';

// // declare module 'express' {
// //   interface Request {
// //     user?: {
// //       id: string;
// //       role: string;
// //     };
// //     params: ParamsDictionary;  // Explicitly add params as record
// //     body: any;                // Allow any body (or use generics in controllers if needed)
// //     query: Query;             // Explicitly add query
// //     headers: IncomingHttpHeaders;  // From 'http' module, for headers
// //   }
// // }
// import { IncomingHttpHeaders } from 'http';
// import 'express';  // Rely on @types/express for ParamsDictionary and Query

// declare module 'express' {
//   interface Request {
//     user?: {
//       id: string;
//       role: string;
//     };
//     body: any;                // Allow any body (or use generics in controllers if needed)
//     headers: IncomingHttpHeaders;  // From 'http' module, for headers
//   }
// }

import type { IncomingHttpHeaders } from "http"
import "express"

declare module "express" {
  interface Request {
    user?: {
      id: string
      role: string
      username?: string
      email?: string
    }
    body: any
    headers: IncomingHttpHeaders
  }
}

```
</xaiArtifact>

---
### src/utils/external.ts
- Size: 1.09 KB
- Lines: 37
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="81dfe73f-313d-4b56-b592-8976cb179102" artifact_version_id="b9bb0a57-1a43-4c96-8fb2-8469d07b071f" title="src/utils/external.ts" contentType="text/typescript">
```typescript
// External service clients (e.g., Stripe)
import Stripe from 'stripe';
import { Request, Response } from 'express';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe webhook handler
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    // Construct event from webhook
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update order status to processing
      const paymentIntent = event.data.object;
      // Assume updateOrderStatus(paymentIntent.id, 'processing');
      console.log(`Payment succeeded: ${paymentIntent.id}`);
      break;
    // Add more events (e.g., charge.refunded)
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

```
</xaiArtifact>

---
### src/utils/email.ts
- Size: 6.92 KB
- Lines: 183
- Last Modified: 2025-09-10 19:16:12

<xaiArtifact artifact_id="c2a54d42-580b-493d-9fab-eb50250317a5" artifact_version_id="82dc240a-25aa-4580-a098-a3bd7ac1bcd3" title="src/utils/email.ts" contentType="text/typescript">
```typescript
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
export const sendApprovalEmail = async (email: string, storeName: string, tempPassword: string) => {
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
export const sendRejectionEmail = async (email: string, reason: string) => {
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
export const requestMoreInfoEmail = async (email: string, message: string) => {
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
```
</xaiArtifact>

---
### src/utils/logger.ts
- Size: 0.22 KB
- Lines: 6
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="3c610ed4-6210-47ef-8782-948ab64453a6" artifact_version_id="625723bc-a060-4871-bd08-5206e52b9971" title="src/utils/logger.ts" contentType="text/typescript">
```typescript

// Logging utility for audit and errors
export const log = (message: string, level = 'info') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};
```
</xaiArtifact>

---
### src/utils/validator.ts
- Size: 0.20 KB
- Lines: 8
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="846ce689-016f-448b-9bc6-64ea935992ce" artifact_version_id="5aacc036-881d-47b3-a80b-ed64ad4e120d" title="src/utils/validator.ts" contentType="text/typescript">
```typescript
// Input validation using Zod
import { z } from 'zod';

// Example validator for application
export const applicationValidator = z.object({
  storeName: z.string().min(1),
  // Add more fields
});

```
</xaiArtifact>

---
### src/docs/openapi.ts
- Size: 0.10 KB
- Lines: 4
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="f5133535-09f4-46d9-b5a0-6dd85ba88251" artifact_version_id="c5b33444-5b26-4c21-bd24-2f2c5f960115" title="src/docs/openapi.ts" contentType="text/typescript">
```typescript
// Swagger generation (placeholder)
export const generateSwagger = () => {
  // Generate docs
};

```
</xaiArtifact>

---
### src/config/database.ts
- Size: 1.40 KB
- Lines: 42
- Last Modified: 2025-09-11 21:22:28

<xaiArtifact artifact_id="1c1f2cc8-a4a3-44b3-b7ca-1d0509d70b35" artifact_version_id="7cee27f8-2dd7-4d40-bb43-21a7c199570c" title="src/config/database.ts" contentType="text/typescript">
```typescript
// Database configuration for Neon PostgreSQL using Drizzle ORM
/*
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Ensure DATABASE_URL is set in environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Create Neon SQL client
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle ORM with the Neon client
export const db = drizzle(sql);
*/
import { neon } from '@neondatabase/serverless';
//import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle } from 'drizzle-orm/neon-serverless'; // Use neon-serverless instead of neon-http
import { Pool } from '@neondatabase/serverless';
import { merchants } from '../models/merchant';
import { merchantApplication } from '../models/merchant_applications';
import { adminLogs,admins } from '../models/admins';

// Ensure DATABASE_URL is set in environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Create Neon SQL client
//const sql = neon(process.env.DATABASE_URL, { fullResults: true }); // fullResults for compatibility
// Initialize Drizzle ORM with the Neon client and schema
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, {
  schema: {
    merchantApplication,
    merchants,
    adminLogs,
    admins,
  },
});
```
</xaiArtifact>

---
### src/config/index.ts
- Size: 1.79 KB
- Lines: 69
- Last Modified: 2025-09-11 02:58:07

<xaiArtifact artifact_id="04f0231c-4f85-408c-90b2-be06549de576" artifact_version_id="10333fad-bb3e-4271-bcea-243e48deb1d9" title="src/config/index.ts" contentType="text/typescript">
```typescript
// // Placeholder config (original has none; add env vars if needed)
// export const config = {
//     env: process.env.NODE_ENV || 'development',
//     port: process.env.PORT || 5000,
//     // Add DB config if switching from in-memory
//   };


// Placeholder config (original has none; add env vars if needed)




// import dotenv from 'dotenv';

// dotenv.config();  // Load env vars early

// const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"];
// for (const env of requiredEnv) {
//   if (!process.env[env]) {
//     throw new Error(`Missing environment variable: ${env}`);
//   }
// }

// export const config = {
//   env: process.env.NODE_ENV || 'development',
//   port: process.env.PORT || 8080,
//   // Add DB config if switching from in-memory
// };

// console.log('Loaded PORT:', process.env.PORT); // Debug






import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"]

for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`)
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "5000"),
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "24h",
  },
  // stripe: {
  //   secretKey: process.env.STRIPE_SECRET_KEY,
  //   webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  // },
  smtp: {
    host: process.env.SMTP_HOST!,
    port: Number.parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    from: process.env.SMTP_FROM!,
    secure: process.env.SMTP_SECURE === "true",
  },
}

```
</xaiArtifact>

---
### src/middleware/logging.ts
- Size: 0.50 KB
- Lines: 16
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="33c6c2fc-6373-402c-8343-f8ffd096ed35" artifact_version_id="56233e11-6d0f-47b1-a4ac-a9914f4a21ef" title="src/middleware/logging.ts" contentType="text/typescript">
```typescript
// Request and audit logging middleware
import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/logger';

// Logging middleware
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Log request details
  log(`${req.method} ${req.url} - ${req.ip}`);

  // Audit log for sensitive actions (expand as needed)
  if (req.url.includes('/financial')) {
    log(`Audit: Financial action by user ${req.user?.id}`);
  }

  next();
};

```
</xaiArtifact>

---
### src/middleware/auth.ts
- Size: 3.66 KB
- Lines: 115
- Last Modified: 2025-09-09 14:14:07

<xaiArtifact artifact_id="1f3c8f7c-ef23-42a9-9c78-bc6e4f00c6a1" artifact_version_id="f625ee98-0bf3-4731-b780-ce3cd9458875" title="src/middleware/auth.ts" contentType="text/typescript">
```typescript
// Authentication middleware with MFA for admins
// import { Request, Response, NextFunction } from "express";
// import { db } from "../config/database";
// import { users } from "../models/merchant"; // Assuming users in merchant schema
/*
export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Authentication required" });

  // Validate token (simple for demo; use JWT in production)
  const token = authHeader.substring(7);
  if (token !== "admin-token-123")
    return res.status(401).json({ message: "Invalid token" });

  // Fetch admin user
  const admin = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, "admin"),
  });
  if (!admin || admin.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });

  // MFA check (placeholder; integrate real MFA)
  // if (!verifyMFA(token)) return res.status(401).json({ message: 'MFA required' });

  req.user = admin;
  next();
};
*/

// Authentication middleware with JWT for admins
/*
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { db } from "../config/database";
import { admins } from "../models/admins";
import { eq } from 'drizzle-orm';

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Validate JWT
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string, role: string };
    
    // Fetch admin user
    const admin = await db.query.admins.findFirst({
      where: eq(admins.id, decoded.id),
    });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = admin;
    next();
  } catch (error) {
    console.log('Invalid token: ' + (error as Error).message, 'error');
    return res.status(401).json({ message: "Invalid token" });
  }
};
*/

// Authentication middleware with JWT for admins

import { Request, Response, NextFunction } from "express";  // This should now resolve
import jwt from 'jsonwebtoken';
import { db } from "../config/database";
import { admins } from "../models/admins";
import { eq } from 'drizzle-orm';

export const requireAdmin = async (
  req: Request,  // No generics needed here since headers is now augmented
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Validate JWT
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string, role: string };
    
    // Fetch admin user
    const admin = await db.query.admins.findFirst({
      where: eq(admins.id, decoded.id),
    });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = admin;
    next();
  } catch (error) {
    console.log('Invalid token: ' + (error as Error).message, 'error');
    return res.status(401).json({ message: "Invalid token" });
  }
};
```
</xaiArtifact>

---
### src/middleware/ratelimit.ts
- Size: 0.33 KB
- Lines: 9
- Last Modified: 2025-09-10 19:34:47

<xaiArtifact artifact_id="4f0abac5-b651-4794-9e9c-9ce9aeb02f9f" artifact_version_id="4ccff94d-44f8-4800-ace4-1c28bd1ff165" title="src/middleware/ratelimit.ts" contentType="text/typescript">
```typescript
// // Rate limiting middleware
// import rateLimit from 'express-rate-limit';

// // Rate limiter configuration
// export const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
//   message: 'Too many requests, please try again later.',
// });

```
</xaiArtifact>

---
### src/services/payout_service.ts
- Size: 1.81 KB
- Lines: 54
- Last Modified: 2025-09-09 23:37:09

<xaiArtifact artifact_id="824ba480-8a45-47d9-8214-529a53424410" artifact_version_id="4eee4bf8-7e83-4255-a1e2-856bef2da6d5" title="src/services/payout_service.ts" contentType="text/typescript">
```typescript
// Payout logic
/*
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
*/
```
</xaiArtifact>

---
### src/services/dispute_service.ts
- Size: 2.84 KB
- Lines: 73
- Last Modified: 2025-09-10 20:53:51

<xaiArtifact artifact_id="474d02f9-7383-4d7e-a10b-1e748f9a14d3" artifact_version_id="b57448f7-512b-434f-8730-72ea54ca1e28" title="src/services/dispute_service.ts" contentType="text/typescript">
```typescript
// Dispute logic
/*
import * as repo from '../repositories/dispute_repository';
import * as orderRepo from '../repositories/order_repository';
import { createAdminLog } from '../repositories/merchant_repository';
import { stripe } from '../utils/external';
import { mockEmailService } from '../utils/email';

// Get all disputes
export const getAllDisputes = async () => repo.getAllDisputes();

// Get dispute
export const getDispute = async (id: string) => (await repo.getDisputeById(id))[0];

// Create dispute (customer requests return)
export const createDispute = async (data: any) => {
  const dispute = await repo.createDispute(data);
  // Notify merchant
  mockEmailService.notifyMerchantNewDispute(data.merchantId, data.orderId);
  return dispute;
};

// Review dispute (merchant)
export const reviewDispute = async (id: string, updates: any, merchantId: string) => {
  const dispute = await getDispute(id);
  if (dispute.merchantId !== merchantId) throw new Error('Unauthorized');
  // Update status to accepted/rejected
  const updated = await repo.updateDispute(id, updates);
  if (updates.status === 'resolved') {
    // If accepted, auto refund?
    await approveRefund(id, merchantId, true); // Merchant approved refund
  }
  return updated;
};

// Escalate dispute (admin)
export const escalateDispute = async (id: string, adminId: string) => {
  const updated = await repo.updateDispute(id, { status: 'in_review' });
  await createAdminLog({ adminId, action: 'ESCALATE_DISPUTE', targetType: 'dispute', targetId: id });
  return updated;
};

// Approve refund (admin or merchant)
export const approveRefund = async (id: string, approverId: string, isMerchant = false) => {
  const dispute = await getDispute(id);
  if (dispute.status !== 'open' && dispute.status !== 'in_review') throw new Error('Invalid status');

  const order = await orderRepo.getOrderById(dispute.orderId);
  // Process refund via payment provider
  await stripe.refunds.create({ payment_intent: order.paymentIntentId });

  // Update order status
  await orderRepo.updateOrder(dispute.orderId, { status: 'refunded' });

  // Restock inventory
  const product = await orderRepo.getProductById(order.productId);
  const newStock = product.stock + order.quantity;
  await orderRepo.updateProductStock(order.productId, newStock);

  // Update dispute
  const updatedDispute = await repo.updateDispute(id, { status: 'resolved', resolution: 'refund_approved', resolvedAt: new Date() });

  // Log action if admin
  if (!isMerchant) {
    await createAdminLog({ adminId: approverId, action: 'APPROVE_REFUND', targetType: 'dispute', targetId: id, details: { amount: order.totalAmount } });
  }

  // Notify customer
  mockEmailService.notifyCustomerRefundApproved(dispute.customerId, dispute.orderId);

  return { dispute: updatedDispute, order };
};
*/
```
</xaiArtifact>

---
### src/services/category_service.ts
- Size: 8.81 KB
- Lines: 283
- Last Modified: 2025-09-12 02:24:04

<xaiArtifact artifact_id="7dd31954-9ad9-46cf-a2ac-4cd40df19a33" artifact_version_id="d7938c61-86fb-4335-ae7e-e2df8cbe24f8" title="src/services/category_service.ts" contentType="text/typescript">
```typescript
// Category logic
/*
import * as repo from '../repositories/category_repository';
import { createAdminLog } from '../repositories/merchant_repository';

// Get all categories
export const getAllCategories = async () => repo.getAllCategories();

// Create category
export const createCategory = async (data: any, adminId?: string) => {
  const category = await repo.createCategory(data);
  if (adminId) await createAdminLog({ adminId, action: 'CREATE_CATEGORY', targetType: 'category', targetId: category[0].id });
  return category;
};

// Update category
export const updateCategory = async (id: string, data: any, adminId?: string) => {
  const category = await repo.updateCategory(id, data);
  if (adminId) await createAdminLog({ adminId, action: 'UPDATE_CATEGORY', targetType: 'category', targetId: id });
  return category;
};

// Delete category
export const deleteCategory = async (id: string, adminId?: string) => {
  await repo.deleteCategory(id);
  if (adminId) await createAdminLog({ adminId, action: 'DELETE_CATEGORY', targetType: 'category', targetId: id });
};




















import { drizzle } from 'drizzle-orm/neon-serverless'; // Adjust import if using different connector
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { categories, categoryRelations } from '../models/category';
import { db } from '../config/database'; // Assuming centralized DB export
import { CategoryRepository } from '../repositories/category_repository';
const repo = new CategoryRepository();

// Validation schemas
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentId: z.string().optional(),
  attributes: z.record(z.any()).optional(), // JSONB: e.g., { color: ['red', 'blue'] }
});

const updateCategorySchema = categorySchema.partial();

// Interface for Category (inferred from schema, but explicit for clarity)
interface Category {
  id: string;
  name: string;
  parentId?: string | null;
  attributes?: Record<string, any> | null;
  createdAt: Date;
}

// Recursive type for tree
interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export class CategoryService {
  async createCategory(data: unknown): Promise<Category> {
  const validated = categorySchema.parse(data);
  if (validated.parentId) {
    await this.checkCycle(validated.parentId, validated.parentId);
  }
  validated.id = crypto.randomUUID(); // Or handle in repo
  return repo.create(validated);
}

  async getCategoryById(id: string): Promise<Category | null> {
  return repo.findById(id);
}
  async getAllCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(desc(categories.createdAt));
  }

  async getCategoryTree(): Promise<CategoryTree[]> {
    const allCats = await repo.findAll();
    const catMap = new Map<string, CategoryTree>(allCats.map(cat => [cat.id, { ...cat, children: [] }]));
    
    // Build tree
    const roots: CategoryTree[] = [];
    allCats.forEach(cat => {
      if (cat.parentId && catMap.has(cat.parentId)) {
        catMap.get(cat.parentId)!.children!.push(catMap.get(cat.id)!);
      } else {
        roots.push(catMap.get(cat.id)!);
      }
    });
    return roots;
  }

 async updateCategory(id: string, data: unknown): Promise<Category | null> {
  const validated = updateCategorySchema.parse(data);
  if (validated.parentId) {
    await this.checkCycle(id, validated.parentId);
  }
  return repo.update(id, validated);
}

async deleteCategory(id: string): Promise<void> {
  const children = await repo.findChildren(id);
  if (children.length > 0) {
    throw new Error('Cannot delete category with children');
  }
  await repo.delete(id);
}

private async checkCycle(startId: string, newParentId: string): Promise<void> {
  let current = newParentId;
  while (current) {
    if (current === startId) {
      throw new Error('Category hierarchy cycle detected');
    }
    const parentPath = await repo.findParentPath(current); // Use repo helper
    if (parentPath.includes(startId)) {
      throw new Error('Category hierarchy cycle detected');
    }
    const cat = await repo.findById(current);
    current = cat?.parentId || '';
  }
}

async addAttribute(id: string, key: string, value: any): Promise<Category | null> {
  const cat = await repo.findById(id);
  if (!cat) throw new Error('Category not found');
  const attributes = { ...(cat.attributes || {}), [key]: value };
  return repo.update(id, { attributes });
}
}

*/




import { z } from 'zod';
import { CategoryRepository } from '../repositories/category_repository';
import { categories } from '../models/category';

// Validation schemas
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentId: z.string().nullable().optional(), // Align with Drizzle's nullable
  attributes: z.record(z.any()).nullable().optional(), // Align with JSONB
});

const updateCategorySchema = categorySchema.partial();

// Interface for Category (aligned with Drizzle schema)
interface Category {
  id: string;
  name: string;
  parentId: string | null;
  attributes: Record<string, any> | null;
  createdAt: Date | null;
}

// Recursive type for tree
interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export class CategoryService {
  private repo: CategoryRepository;

  constructor() {
    this.repo = new CategoryRepository();
  }

  async createCategory(data: unknown): Promise<Category> {
    const validated = categorySchema.parse(data);
    const newCategory = {
      ...validated,
      id: crypto.randomUUID(),
      attributes: validated.attributes === undefined ? null : validated.attributes, // Convert undefined to null
    };
    const created = await this.repo.create(newCategory);
    return this.mapToCategory(created);
  }
  async getCategoryById(id: string): Promise<Category | null> {
    const cat = await this.repo.findById(id);
    return cat ? this.mapToCategory(cat) : null;
  }

  async getAllCategories(): Promise<Category[]> {
    const cats = await this.repo.findAll();
    return cats.map(this.mapToCategory);
  }

  async getCategoryTree(): Promise<CategoryTree[]> {
    const allCats = await this.getAllCategories();
    const catMap = new Map<string, CategoryTree>(
      allCats.map(cat => [cat.id, { ...cat, children: [] }])
    );
    
    // Build tree
    const roots: CategoryTree[] = [];
    allCats.forEach(cat => {
      if (cat.parentId && catMap.has(cat.parentId)) {
        catMap.get(cat.parentId)!.children!.push(catMap.get(cat.id)!);
      } else {
        roots.push(catMap.get(cat.id)!);
      }
    });
    return roots;
  }

  async updateCategory(id: string, data: unknown): Promise<Category | null> {
    const validated = updateCategorySchema.parse(data);
    if (validated.parentId) {
      await this.checkCycle(id, validated.parentId);
    }
    const updated = await this.repo.update(id, validated);
    return updated ? this.mapToCategory(updated) : null;
  }

  async deleteCategory(id: string): Promise<void> {
    const children = await this.repo.findChildren(id);
    if (children.length > 0) {
      throw new Error('Cannot delete category with children');
    }
    await this.repo.delete(id);
  }

  private async checkCycle(startId: string, newParentId: string | null): Promise<void> {
    if (!newParentId) return; // No cycle if no parent
    let current: string = newParentId; // Explicitly type as string
    while (current) {
      if (current === startId) {
        throw new Error('Category hierarchy cycle detected');
      }
      const parentPath = await this.repo.findParentPath(current);
      if (parentPath.includes(startId)) {
        throw new Error('Category hierarchy cycle detected');
      }
      const cat = await this.repo.findById(current);
      current = cat?.parentId ?? ''; // Use empty string as fallback
    }
  }
  async addAttribute(id: string, key: string, value: any): Promise<Category | null> {
    const cat = await this.repo.findById(id);
    if (!cat) throw new Error('Category not found');
    const attributes = { ...(cat.attributes || {}), [key]: value };
    const updated = await this.repo.update(id, { attributes });
    return updated ? this.mapToCategory(updated) : null;
  }

  // Helper to map Drizzle types to Category interface
  private mapToCategory(cat: typeof categories.$inferSelect): Category {
    // Ensure attributes is Record<string, any> | null
    const attributes = cat.attributes === null || cat.attributes === undefined
      ? null
      : (typeof cat.attributes === 'object' ? cat.attributes : {}) as Record<string, any>;

    return {
      id: cat.id,
      name: cat.name,
      parentId: cat.parentId,
      attributes,
      createdAt: cat.createdAt,
    };
  }
}
```
</xaiArtifact>

---
### src/services/merchant_service.ts
- Size: 10.11 KB
- Lines: 270
- Last Modified: 2025-09-11 23:48:27

<xaiArtifact artifact_id="dcb469de-ee06-44c6-84b9-e0174bb68798" artifact_version_id="869180d8-bbca-49e5-8867-52513eaf9471" title="src/services/merchant_service.ts" contentType="text/typescript">
```typescript
// Merchant logic
/*
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

*/

// Merchant logic
// Merchant logic
import * as repo from "../repositories/merchant_repository";
import { stripe } from "../utils/external";
import { sendApprovalEmail, sendRejectionEmail, requestMoreInfoEmail } from "../utils/email";
import { v4 as uuid } from "uuid";
import { db } from "../config/database";
import { merchants } from "../models/merchant";
import { merchantApplication } from "../models/merchant_applications";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { MerchantInsert, MerchantApplicationUpdate, MerchantUpdate } from "../repositories/merchant_repository";
//import { adminLogs } from "../models/admins";
import { validate as uuidValidate } from 'uuid';
import { admins } from "../models/admins";

// Get all applications
export const getAllApplications = async () => repo.getAllApplications();

// Get pending applications
export const getPendingApplications = async () => repo.getPendingApplications();

// Approve application


export const approveApplication = async (id: string, adminId: string) => {
  if (!uuidValidate(adminId)) {
    throw new Error('Invalid adminId: Must be a valid UUID');
  }

  const [admin] = await db.select().from(admins).where(eq(admins.id, adminId)).limit(1);
    if (!admin) {
      throw new Error(`Admin with ID ${adminId} does not exist`);
    }
  return await db.transaction(async (tx) => {
    const [application] = await tx
      .select()
      .from(merchantApplication)
      .where(eq(merchantApplication.id, id));

    if (!application || application.status !== "pending") throw new Error("Already processed");

    // const stripeAccount = await stripe.accounts.create({
    //   type: "express",
    //   email: application.workEmail,
    //   business_type: "individual",
    // });

    const merchantId = uuid();
    const tempPassword = uuid().slice(0, 8);

    // Full denormalization with all fields (fixes missing lastPayoutDate, banner)
    const merchantData: MerchantInsert = {
      applicationId: id,
      merchantId,
      storeName: application.storeName,
      name: application.name,
      personalEmail: application.personalEmail,
      workEmail: application.workEmail,
      phoneNumber: application.phoneNumber,
      personalAddress: application.personalAddress,
      workAddress: application.workAddress,
      businessType: application.businessType,
      website: application.website,
      businessDescription: application.businessDescription,
      businessRegistrationNumber: application.businessRegistrationNumber,
      businessRegistrationCertificate: application.businessRegistrationCertificate,
      storeLogoUrl: application.storeLogoUrl,
      password: await bcrypt.hash(tempPassword, 10),
      //stripeAccountId: stripeAccount.id,
      accountId: 'test-seeded-account-' + uuid(),
      status: "active",
      commissionTier: "standard",
      commissionRate: "5.00",
      accountBalance: "0.00",
      totalSales: "0.00",
      totalPayouts: "0.00",
      payoutSchedule: "weekly",
      lastPayoutDate: null, // Fixes missing property
      banner: null, // Fixes missing property
      policies: null,
    };

    // Create merchant (fixes overload with MerchantInsert type)
    const [merchant] = await tx.insert(merchants).values(merchantData).returning();

    // Update application status
    const updateData: MerchantApplicationUpdate = {
      status: "approved" as const,
      reviewedAt: new Date(),
      reviewedBy: adminId,
    };
    const [updatedApp] = await tx
      .update(merchantApplication)
      .set(updateData)
      .where(eq(merchantApplication.id, id))
      .returning();

    // Log action
    // await tx.insert(repo.adminLogs).values({
    //   adminId,
    //   action: "APPROVE_APPLICATION",
    //   targetType: "application",
    //   targetId: id,
    // });

    // Send email
    await sendApprovalEmail(application.workEmail, application.storeName, tempPassword);

    return { application: updatedApp, merchant };
  });
};







// Reject application
export const rejectApplication = async (id: string, reason: string, adminId: string) => {
  const updateData: MerchantApplicationUpdate = {
    status: "rejected" as const,
    rejectionReason: reason,
    reviewedAt: new Date(),
    reviewedBy: adminId,
  };
  const [updatedApp] = await repo.updateApplication(id, updateData);
  await repo.createAdminLog({ adminId, action: "REJECT_APPLICATION", targetType: "application", targetId: id, details: { reason } });
  await sendRejectionEmail(updatedApp.workEmail, reason);
  return updatedApp;
};

// Request more info
export const requestMoreInfo = async (id: string, message: string, adminId: string) => {
  const updateData: MerchantApplicationUpdate = {
    status: "more_info" as const,
    rejectionReason: message,
    reviewedAt: new Date(),
    reviewedBy: adminId,
  };
  const [updatedApp] = await repo.updateApplication(id, updateData);
  await repo.createAdminLog({ adminId, action: "REQUEST_MORE_INFO", targetType: "application", targetId: id, details: { message } });
  await requestMoreInfoEmail(updatedApp.workEmail, message);
  return updatedApp;
};

// Get all merchants
export const getAllMerchants = async () => repo.getAllMerchants();

// Suspend merchant
export const suspendMerchant = async (id: string, reason: string, adminId: string) => {
  const updateData: MerchantUpdate = {
    status: "suspended" as const,
  };
  const [updated] = await repo.updateMerchant(id, updateData);
  await repo.createAdminLog({ adminId, action: "SUSPEND_MERCHANT", targetType: "merchant", targetId: id, details: { reason } });
  return updated;
};

// Update commission tier
export const updateCommissionTier = async (id: string, tier: string, adminId: string) => {
  const rate = tier === "premium" ? "3.00" : "5.00";
  const updateData: MerchantUpdate = {
    commissionTier: tier,
    commissionRate: rate,
  };
  const [updated] = await repo.updateMerchant(id, updateData);
  await repo.createAdminLog({ adminId, action: "UPDATE_COMMISSION", targetType: "merchant", targetId: id, details: { tier } });
  return updated;
};
```
</xaiArtifact>

---
### src/services/announcement_service.ts
- Size: 0.84 KB
- Lines: 21
- Last Modified: 2025-09-10 20:58:10

<xaiArtifact artifact_id="a7e506ff-2eb8-4e9f-b92d-55c51ff2df19" artifact_version_id="7a9410be-d240-438d-961c-0ef64ffcdbbf" title="src/services/announcement_service.ts" contentType="text/typescript">
```typescript
// Announcement logic
import * as repo from '../repositories/announcement_repository';
import { createAdminLog } from '../repositories/merchant_repository';

// Get all announcements
/*
export const getAllAnnouncements = async () => repo.getAllAnnouncements();

// Create announcement
export const createAnnouncement = async (data: any, adminId: string) => {
  const announcement = await repo.createAnnouncement({ ...data, id: uuid() });
  await createAdminLog({ adminId, action: 'CREATE_ANNOUNCEMENT', targetType: 'announcement', targetId: announcement[0].id });
  return announcement;
};

// Delete announcement
export const deleteAnnouncement = async (id: string, adminId: string) => {
  await repo.deleteAnnouncement(id);
  await createAdminLog({ adminId, action: 'DELETE_ANNOUNCEMENT', targetType: 'announcement', targetId: id });
};
*/
```
</xaiArtifact>

---
### src/services/notification_service.ts
- Size: 0.43 KB
- Lines: 16
- Last Modified: 2025-09-10 19:33:47

<xaiArtifact artifact_id="f7427543-c982-4d60-a4eb-257eb00bbd51" artifact_version_id="34ff1eb1-bc39-49aa-bf49-be4d116a4bc5" title="src/services/notification_service.ts" contentType="text/typescript">
```typescript
// Notification handling
/*
import { mockEmailService } from '../utils/email';

// Send notification (email/SMS)
export const sendNotification = async (type: string, data: any) => {
  switch (type) {
    case 'new_application':
      mockEmailService.notifyAdminNewApplication(data.storeName, data.email);
      break;
    // Add more types as needed
    default:
      throw new Error('Unknown notification type');
  }
};
*/
```
</xaiArtifact>

---
### src/services/settings_service.ts
- Size: 0.53 KB
- Lines: 13
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="8423d502-8e59-4866-9caa-907792502fac" artifact_version_id="5a73c0b2-1207-440f-a421-9876fa15f3a5" title="src/services/settings_service.ts" contentType="text/typescript">
```typescript
// Settings logic
import * as repo from '../repositories/settings_repository';
import { createAdminLog } from '../repositories/merchant_repository';

// Get settings
export const getSettings = async () => (await repo.getGlobalSettings())[0];

// Update settings
export const updateSettings = async (data: any, adminId: string) => {
  const updated = await repo.updateGlobalSettings(data);
  await createAdminLog({ adminId, action: 'UPDATE_SETTINGS', targetType: 'settings', targetId: 'global', details: data });
  return updated;
};

```
</xaiArtifact>

---
### src/routes/dispute.ts
- Size: 0.50 KB
- Lines: 13
- Last Modified: 2025-09-10 20:56:53

<xaiArtifact artifact_id="a4858550-803c-421a-8dac-1befe8077a69" artifact_version_id="3aa20e7d-2ab2-458c-8500-0e19743e2f91" title="src/routes/dispute.ts" contentType="text/typescript">
```typescript
// // Dispute routes
// import { Router } from 'express';
// import * as controller from '../controllers/dispute';

// const router = Router();
// router.get('/', controller.getDisputes);
// router.get('/:id', controller.getDispute);
// router.post('/:id/escalate', controller.escalateDispute);
// router.post('/:id/approve-refund', controller.approveRefund);
// router.post('/', controller.createReturnRequest);
// router.put('/:id/review', controller.reviewReturnRequest);

// export default router;

```
</xaiArtifact>

---
### src/routes/payout.ts
- Size: 0.31 KB
- Lines: 12
- Last Modified: 2025-09-10 19:31:30

<xaiArtifact artifact_id="10ea0023-ba3b-43a4-ac62-7ac8e9676b0a" artifact_version_id="0f9c8e0d-ee81-4c17-a2e6-d6eebdce4d87" title="src/routes/payout.ts" contentType="text/typescript">
```typescript
// Payout routes
/*
import { Router } from 'express';
import * as controller from '../controllers/payout';

const router = Router();
router.get('/', controller.getPayouts);
router.get('/:merchantId', controller.getMerchantPayouts);
router.post('/trigger', controller.triggerPayout);

export default router;
*/
```
</xaiArtifact>

---
### src/routes/settings.ts
- Size: 0.25 KB
- Lines: 9
- Last Modified: 2025-09-10 20:57:39

<xaiArtifact artifact_id="95d0eeb1-e7fe-48a4-8816-cda1c73508dd" artifact_version_id="977be1ae-1a41-4518-a36c-f21b5552863a" title="src/routes/settings.ts" contentType="text/typescript">
```typescript
// Settings routes
import { Router } from 'express';
import * as controller from '../controllers/settings';

const router = Router();
//router.get('/', controller.getSettings);
router.put('/', controller.updateSettings);

export default router;

```
</xaiArtifact>

---
### src/routes/index.ts
- Size: 4.58 KB
- Lines: 123
- Last Modified: 2025-09-12 00:03:36

<xaiArtifact artifact_id="995830fb-3c86-4d90-bacf-0232a3d52ee7" artifact_version_id="2cb3c892-3668-45fc-b26f-6197f2e35add" title="src/routes/index.ts" contentType="text/typescript">
```typescript
// Main router that mounts domain routers
/*
import { Express } from "express";
import { createServer } from "http";
import categoryRoutes from "./category";
//import disputeRoutes from "./dispute";
import merchantRoutes from "./merchants";
//import payoutRoutes from "./payout";
import settingsRoutes from "./settings";
//import announcementRoutes from "./announcement";
//import { requireAdmin } from "../middleware/auth";
import { loggingMiddleware } from "../middleware/logging";
//import { rateLimiter } from "../middleware/ratelimit";
import { stripeWebhook } from "../utils/external"; // For webhook handling
import { config } from '../config';  // Added: Missing import for config.port

export function registerRoutes(app: Express) {  // Removed 'async' (no awaits inside)
  // Apply global middleware
  app.use(loggingMiddleware);
//  app.use(rateLimiter);

  // Mount domain routes with admin auth
  app.use("/api/admin/categories",  categoryRoutes);
  //app.use("/api/admin/disputes", requireAdmin, disputeRoutes);
  app.use("/api/admin/merchants",  merchantRoutes);
  //app.use("/api/admin/payouts", requireAdmin, payoutRoutes);
  app.use("/api/admin/settings",  settingsRoutes);
  //app.use("/api/admin/announcements", requireAdmin, announcementRoutes);

  // Shared routes (e.g., for customers/merchants, with their auth)
  //app.use("/api/disputes", disputeRoutes); // Customer/merchant dispute actions

  // Payment webhook (no auth, but signature verification)
  app.post("/api/webhooks/stripe", stripeWebhook);

  // Error handler
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: "Internal Server Error" });
  });

  const port = config.port;
  const server = createServer(app);
  server.listen(port, () => console.log(`Server on port ${port}`));
  return server;
}
*/
import type { Express } from "express"
import categoryRoutes from "./category.js"
import merchantRoutes from "./merchants.js"
import settingsRoutes from "./settings.js"
//import authRoutes from "./auth"
import { requireAdmin } from "../middleware/auth.js"
import { loggingMiddleware } from "../middleware/logging.js"
import { stripeWebhook } from "../utils/external.js"

export function registerRoutes(app: Express) {
  app.use(loggingMiddleware)

  //app.use("/api/auth", authRoutes)

  app.use("/api/admin/categories",  categoryRoutes)
  app.use("/api/admin/merchants",  merchantRoutes)
  app.use("/api/admin/settings", requireAdmin, settingsRoutes)

  app.post("/api/webhooks/stripe", stripeWebhook)

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    })
  })

  app.get("/api", (req, res) => {
    res.json({
      name: "Merchant Backend API",
      version: "1.0.0",
      endpoints: {
        auth: {
          "POST /api/auth/login": "Admin login",
          "POST /api/auth/admin": "Create admin user",
          "GET /api/auth/profile": "Get admin profile (requires auth)",
        },
        merchants: {
          "GET /api/admin/merchants/applications": "Get all applications",
          "GET /api/admin/merchants/applications/pending": "Get pending applications",
          "POST /api/admin/merchants/applications/:id/approve": "Approve application",
          "POST /api/admin/merchants/applications/:id/reject": "Reject application",
          "POST /api/admin/merchants/applications/:id/more-info": "Request more info",
          "GET /api/admin/merchants": "Get all merchants",
          "POST /api/admin/merchants/:id/suspend": "Suspend merchant",
          "PUT /api/admin/merchants/:id/commission": "Update commission tier",
        },
        categories: {
          "GET /api/admin/categories": "Get all categories",
          "POST /api/admin/categories": "Create category",
          "PUT /api/admin/categories/:id": "Update category",
          "DELETE /api/admin/categories/:id": "Delete category",
        },
        settings: {
          "GET /api/admin/settings": "Get settings",
          "PUT /api/admin/settings": "Update settings",
        },
        webhooks: {
          "POST /api/webhooks/stripe": "Stripe webhook handler",
        },
      },
    })
  })

  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Error:", err)
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { error: err.message }),
    })
  })

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Endpoint not found" })
  })
}

```
</xaiArtifact>

---
### src/routes/category.ts
- Size: 0.58 KB
- Lines: 22
- Last Modified: 2025-09-12 02:11:25

<xaiArtifact artifact_id="6d46765f-4bff-47be-8616-353fd10e3ba4" artifact_version_id="75790137-342c-4601-a683-31c30d42303a" title="src/routes/category.ts" contentType="text/typescript">
```typescript
// Category routes
import { Router } from 'express';
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  getCategoryTree,
  updateCategory,
  deleteCategory,
  addAttribute,
} from '../controllers/category';

const router = Router();
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/tree', getCategoryTree); // Special endpoint for hierarchy
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id/attributes', addAttribute);

export default router;
```
</xaiArtifact>

---
### src/routes/merchants.ts
- Size: 1.48 KB
- Lines: 36
- Last Modified: 2025-09-11 03:29:32

<xaiArtifact artifact_id="ac9a7e5c-83bd-430e-a2c0-6777536d1a0f" artifact_version_id="af201b4b-ae58-4263-8c4d-bf013a1ade2d" title="src/routes/merchants.ts" contentType="text/typescript">
```typescript
// Merchant routes
/*
import { Router } from 'express';
import * as controller from '../controllers/merchant';

const router = Router();
router.get('/applications', controller.getApplications);
router.get('/applications/pending', controller.getPendingApplications);
router.post('/applications/:id/approve', controller.approveApplication);
router.post('/applications/:id/reject', controller.rejectApplication);
router.post('/applications/:id/more-info', controller.requestMoreInfo);
router.get('/', controller.getMerchants);
router.post('/:id/suspend', controller.suspendMerchant);
router.put('/:id/commission', controller.updateCommissionTier);

export default router;
*/
import { Router } from "express";
import * as controller from "../controllers/merchant.js"; // Fixed: merchant.ts
//import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes (if needed)
router.get("/applications", controller.getApplications);
router.get("/applications/pending", controller.getPendingApplications);

// Admin routes
router.post("/applications/:id/approve",  controller.approveApplication);
router.post("/applications/:id/reject",  controller.rejectApplication);
router.post("/applications/:id/more-info",  controller.requestMoreInfo);
router.get("/merchants",  controller.getMerchants);
router.post("/merchants/:id/suspend",  controller.suspendMerchant);
router.put("/merchants/:id/commission",controller.updateCommissionTier);

export default router;
```
</xaiArtifact>

---
### src/routes/announcement.ts
- Size: 0.34 KB
- Lines: 10
- Last Modified: 2025-09-10 20:22:19

<xaiArtifact artifact_id="d109c494-9f2f-4b87-b01f-81bbdde14f52" artifact_version_id="addceef8-a217-451b-84fe-d93791b05cd4" title="src/routes/announcement.ts" contentType="text/typescript">
```typescript
// // Announcement routes
// import { Router } from 'express';
// import * as controller from '../controllers/announcement';

// const router = Router();
// router.get('/', controller.getAnnouncements);
// router.post('/', controller.createAnnouncement);
// router.delete('/:id', controller.deleteAnnouncement);

// export default router;

```
</xaiArtifact>

---
### src/jobs/payout_job.ts
- Size: 0.28 KB
- Lines: 8
- Last Modified: 2025-09-10 20:55:46

<xaiArtifact artifact_id="3eeb06fa-293f-4f3c-9499-de445a740dd8" artifact_version_id="65b32d22-52d1-4f61-ae17-6d822468ae7e" title="src/jobs/payout_job.ts" contentType="text/typescript">
```typescript
// // Nightly payout aggregation job
// import { runPayout } from '../services/payout_service';

// // Run daily (use cron in production)
// setInterval(async () => {
//   console.log('Running nightly payout');
//   await runPayout();
// }, 24 * 60 * 60 * 1000); // 24 hours

```
</xaiArtifact>

---
### src/jobs/notification_job.ts
- Size: 0.20 KB
- Lines: 6
- Last Modified: 2025-09-10 20:37:50

<xaiArtifact artifact_id="61b59d80-c9aa-4ccd-8779-822bb0b26195" artifact_version_id="adc536d5-b62c-4840-a427-b284df8230d6" title="src/jobs/notification_job.ts" contentType="text/typescript">
```typescript
// import { sendNotification } from '../services/notification_service';

// // Set interval for notifications
// setInterval(async () => {
//   await sendNotification();
// }, 60000); // Every minute
```
</xaiArtifact>

---
### src/controllers/dispute.ts
- Size: 1.98 KB
- Lines: 66
- Last Modified: 2025-09-10 20:54:50

<xaiArtifact artifact_id="6479fa79-3ae0-45d2-97e6-60d7bf008099" artifact_version_id="140ed393-f82a-4763-a0f3-9c200437f7c0" title="src/controllers/dispute.ts" contentType="text/typescript">
```typescript
/*
import { Request, Response } from 'express';
import * as disputeService from '../services/dispute_service';

// Get all disputes
export const getAllDisputes = async (req: Request, res: Response) => {
  try {
    const disputes = await disputeService.getAllDisputes();
    res.json(disputes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Escalate dispute
export const escalateDispute = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const dispute = await disputeService.escalateDispute(req.params.id, req.user.id);
    res.json(dispute);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Approve refund
export const approveRefund = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { dispute, order } = await disputeService.approveRefund(req.params.id, req.user.id);
    res.json({ dispute, order });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Create dispute
export const createDispute = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { dispute } = await disputeService.createDispute({ ...req.body, customerId: req.user.id });
    res.json(dispute);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Review dispute
export const reviewDispute = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const dispute = await disputeService.reviewDispute(req.params.id, req.body, req.user.id);
    res.json(dispute);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
*/
```
</xaiArtifact>

---
### src/controllers/payout.ts
- Size: 0.86 KB
- Lines: 26
- Last Modified: 2025-09-10 19:28:51

<xaiArtifact artifact_id="38da4a47-2bda-4222-8d3e-99331524d18f" artifact_version_id="c4dccbb1-48c9-47e6-8648-6a16efec7505" title="src/controllers/payout.ts" contentType="text/typescript">
```typescript
// Controllers for payout run management
/*
import { Request, Response } from 'express';
import * as payoutService from '../services/payout_service';

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
```
</xaiArtifact>

---
### src/controllers/settings.ts
- Size: 0.47 KB
- Lines: 14
- Last Modified: 2025-09-10 20:37:02

<xaiArtifact artifact_id="b44d68b8-0e09-4320-a050-f04c777c0d53" artifact_version_id="26428a6f-0586-456e-9ba5-f295682d1a0f" title="src/controllers/settings.ts" contentType="text/typescript">
```typescript
import { Request, Response } from 'express';
import * as settingsService from '../services/settings_service';

export const updateSettings = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updated = await settingsService.updateSettings(req.body, req.user.id);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
```
</xaiArtifact>

---
### src/controllers/category.ts
- Size: 3.33 KB
- Lines: 106
- Last Modified: 2025-09-12 02:09:51

<xaiArtifact artifact_id="7f135ef5-59ff-4ba9-9307-3c2dab5fec16" artifact_version_id="1cfea25b-3f7e-4a21-9917-5b7b9f448a3a" title="src/controllers/category.ts" contentType="text/typescript">
```typescript
// Controllers for category taxonomy management
/*
import { Request, Response } from 'express';
import * as categoryService from '../services/category_service';

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  // Fetch categories from service
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  // Validate and create category
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  // Update existing category by ID
  const category = await categoryService.updateCategory(req.params.id, req.body);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  // Delete category by ID
  await categoryService.deleteCategory(req.params.id);
  res.status(204).send();
};
*/

import { Request, Response } from 'express';
import { CategoryService } from '../services/category_service';

const service = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await service.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    const tree = await service.getCategoryTree();
    res.json(tree);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await service.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addAttribute = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    const category = await service.addAttribute(req.params.id, key, value);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
```
</xaiArtifact>

---
### src/controllers/announcement.ts
- Size: 0.87 KB
- Lines: 26
- Last Modified: 2025-09-10 19:27:39

<xaiArtifact artifact_id="fa4a75bc-e7e9-4aef-84cc-8b50ea1e9853" artifact_version_id="fe9e7350-62ad-4760-9ae1-508460292a2d" title="src/controllers/announcement.ts" contentType="text/typescript">
```typescript
// Controllers for site-wide announcements
/*
import { Request, Response } from 'express';
import * as announcementService from '../services/announcement_service';

// Get all announcements
export const getAnnouncements = async (req: Request, res: Response) => {
  // Fetch announcements
  const announcements = await announcementService.getAllAnnouncements();
  res.json(announcements);
};

// Create announcement
export const createAnnouncement = async (req: Request, res: Response) => {
  // Create new announcement
  const announcement = await announcementService.createAnnouncement(req.body, req.user.id);
  res.status(201).json(announcement);
};

// Delete announcement
export const deleteAnnouncement = async (req: Request, res: Response) => {
  // Delete announcement
  await announcementService.deleteAnnouncement(req.params.id);
  res.status(204).send();
};
*/
```
</xaiArtifact>

---
### src/controllers/merchant.ts
- Size: 7.27 KB
- Lines: 222
- Last Modified: 2025-09-11 22:35:57

<xaiArtifact artifact_id="8d0cc473-8f37-4ac7-b81c-9b6e1e429a8e" artifact_version_id="ddcc407d-f924-491c-83bf-37af9bf3779a" title="src/controllers/merchant.ts" contentType="text/typescript">
```typescript
import type { Request, Response } from "express"
import * as merchantService from "../services/merchant_service"
import { v4 as uuid } from 'uuid';

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getAllApplications()
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getPendingApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getPendingApplications()
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const approveApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      //return res.status(400).json({ error: "Unauthorized: No user data found" })
       const testAdminId = "108eea47-fea1-4b28-8d2e-e418edf80053" // Generate valid UUID
      req.user = { id: testAdminId, role: "admin", email: "admin@mail.com", username: "admin" };
    }
    const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id)
    res.json({ application, merchant })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const rejectApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" })
    }
    const { reason } = req.body
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" })
    }
    const application = await merchantService.rejectApplication(req.params.id, reason, req.user.id)
    res.json(application)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const requestMoreInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" })
    }
    const { message } = req.body
    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }
    const application = await merchantService.requestMoreInfo(req.params.id, message, req.user.id)
    res.json(application)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await merchantService.getAllMerchants()
    res.json(merchants)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const suspendMerchant = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" })
    }
    const { reason } = req.body
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" })
    }
    const merchant = await merchantService.suspendMerchant(req.params.id, reason, req.user.id)
    res.json(merchant)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateCommissionTier = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" })
    }
    const { tier } = req.body
    if (!tier || !["standard", "premium"].includes(tier)) {
      return res.status(400).json({ error: "Valid tier is required (standard or premium)" })
    }
    const merchant = await merchantService.updateCommissionTier(req.params.id, tier, req.user.id)
    res.json(merchant)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}





/*

import { Request, Response } from "express";
import * as merchantService from "../services/merchant_service";

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getAllApplications();
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingApplications = async (req: Request, res: Response) => {
  try {
    const applications = await merchantService.getPendingApplications();
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id);
    res.json({ application, merchant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" });
    }
    const application = await merchantService.rejectApplication(req.params.id, reason, req.user.id);
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const requestMoreInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const application = await merchantService.requestMoreInfo(req.params.id, message, req.user.id);
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await merchantService.getAllMerchants();
    res.json(merchants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const suspendMerchant = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ error: "Reason is required" });
    }
    const merchant = await merchantService.suspendMerchant(req.params.id, reason, req.user.id);
    res.json(merchant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCommissionTier = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }
    const { tier } = req.body;
    if (!tier || !["standard", "premium"].includes(tier)) {
      return res.status(400).json({ error: "Valid tier is required (standard or premium)" });
    }
    const merchant = await merchantService.updateCommissionTier(req.params.id, tier, req.user.id);
    res.json(merchant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

*/
```
</xaiArtifact>

---
### src/repositories/category_repository.ts
- Size: 2.71 KB
- Lines: 86
- Last Modified: 2025-09-12 02:17:05

<xaiArtifact artifact_id="85e4d6dc-aa76-4710-a078-20db40c8bfa5" artifact_version_id="1e2728b3-cfaa-4232-8080-7394e3b390b1" title="src/repositories/category_repository.ts" contentType="text/typescript">
```typescript
// Category queries using Drizzle
/*
import { db } from "../config/database";
import { categories } from "../models/category";
import { eq } from "drizzle-orm";
interface CategoryData {
  id: string;
  name: string;
  parentId?: string;
}

// Get all categories
export const getAllCategories = async () => {
  return db.select().from(categories);
};

// Create category
interface CategoryData {
  id: string;
  name: string;
  parentId?: string;
}
export const createCategory = async (data: CategoryData) => {
  return db.insert(categories).values(data).returning();
};

// Update category
export const updateCategory = async (id: string, data: any) => {
  return db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
};

// Delete category
export const deleteCategory = async (id: string) => {
  return db.delete(categories).where(eq(categories.id, id));
};
*/
// src/repositories/category_repository.ts
import { drizzle } from 'drizzle-orm/neon-serverless'; // Adjust if needed
import { eq, desc } from 'drizzle-orm';
import { categories } from '../models/category';
import { db } from '../config/database'; // Centralized DB

export class CategoryRepository {
  async create(data: Omit<typeof categories.$inferInsert, 'createdAt'>): Promise<typeof categories.$inferSelect> {
    const [newCat] = await db.insert(categories).values({ ...data, createdAt: new Date() }).returning();
    return newCat;
  }

  async findById(id: string): Promise<typeof categories.$inferSelect | null> {
    const [cat] = await db.select().from(categories).where(eq(categories.id, id));
    return cat || null;
  }

  async findAll(): Promise<(typeof categories.$inferSelect)[]> {
    return db.select().from(categories).orderBy(desc(categories.createdAt));
  }

  async findChildren(parentId: string): Promise<(typeof categories.$inferSelect)[]> {
    return db.select().from(categories).where(eq(categories.parentId, parentId));
  }

  async findParentPath(id: string): Promise<string[]> {
    const path: string[] = [];
    let current = id;
    while (current) {
      const [cat] = await db.select({ parentId: categories.parentId }).from(categories).where(eq(categories.id, current));
      if (!cat) break;
      path.push(current);
      current = cat.parentId || '';
    }
    return path;
  }

  async update(id: string, data: Partial<typeof categories.$inferInsert>): Promise<typeof categories.$inferSelect | null> {
    const [updated] = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
    return updated || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }
}
```
</xaiArtifact>

---
### src/repositories/dispute_repository.ts
- Size: 0.71 KB
- Lines: 24
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="e1616bb3-9ea4-4690-930e-5e232fef8bc5" artifact_version_id="6da1a65b-9e37-43d6-b36f-8f088a6f7990" title="src/repositories/dispute_repository.ts" contentType="text/typescript">
```typescript
// Dispute queries using Drizzle
import { db } from '../config/database';
import { disputes } from '../models/dispute';
import { eq } from 'drizzle-orm';

// Get all disputes
export const getAllDisputes = async () => {
  return db.select().from(disputes);
};

// Get dispute by ID
export const getDisputeById = async (id: string) => {
  return db.select().from(disputes).where(eq(disputes.id, id)).limit(1);
};

// Create dispute
export const createDispute = async (data: any) => {
  return db.insert(disputes).values(data).returning();
};

// Update dispute
export const updateDispute = async (id: string, data: any) => {
  return db.update(disputes).set(data).where(eq(disputes.id, id)).returning();
};

```
</xaiArtifact>

---
### src/repositories/merchant_repository.ts
- Size: 7.76 KB
- Lines: 281
- Last Modified: 2025-09-10 21:02:50

<xaiArtifact artifact_id="5dc809b7-e45c-4fd1-9877-b9c062b7b130" artifact_version_id="383cb9f5-238a-4ec9-a5de-247c1160f5eb" title="src/repositories/merchant_repository.ts" contentType="text/typescript">
```typescript
// Merchant queries using Drizzle
/*
import { db } from "../config/database";
import { merchant_application, merchants } from "../models/merchant";
//import { users } from "../models/users";
import { eq } from "drizzle-orm";
import { adminLogs } from "../models/admins";

export const getAllApplications = async () => db.query.merchantApplications.findMany();

// Get pending applications
export const getPendingApplications = async () => db.query.merchantApplications.findMany({
  where: (merchantApplications, { eq }) => eq(merchantApplications.status, 'pending'),
});

// Get application by ID
export const getApplicationById = async (id: string) => db.query.merchantApplications.findFirst({
  where: (merchantApplications, { eq }) => eq(merchantApplications.id, id),
});

// Update application
export const updateApplication = async (id: string, data: any) => db.update(merchant_application)
  .set(data)
  .where(eq(merchantApplications.id, id))
  .returning();

// Create merchant
export const createMerchant = async (data: any) => db.insert(merchants).values(data).returning();

// Create admin log
export const createAdminLog = async (data: any) => db.insert(adminLogs).values(data).returning();


// Get all applications
export const getAllApplications = async () => {
  return db.select().from(merchantApplications);
};

// Get pending applications
export const getPendingApplications = async () => {
  return db
    .select()
    .from(merchantApplications)
    .where(eq(merchantApplications.status, "pending"));
};

// Get application by ID
export const getApplicationById = async (id: string) => {
  return db
    .select()
    .from(merchantApplications)
    .where(eq(merchantApplications.id, id))
    .limit(1);
};

// Update application
export const updateApplication = async (id: string, data: any) => {
  return db
    .update(merchantApplications)
    .set(data)
    .where(eq(merchantApplications.id, id))
    .returning();
};

// Create user
export const createUser = async (data: any) => {
  return db.insert(users).values(data).returning();
};

// Create merchant
export const createMerchant = async (data: any) => {
  return db.insert(merchants).values(data).returning();
};

// Get all merchants
export const getAllMerchants = async () => {
  return db.select().from(merchants);
};

// Update merchant
export const updateMerchant = async (id: string, data: any) => {
  return db.update(merchants).set(data).where(eq(merchants.id, id)).returning();
};

// Create admin log
export const createAdminLog = async (data: any) => {
  return db.insert(adminLogs).values(data).returning();
};
*/

// Merchant queries using Drizzle
/*
import { db } from "../config/database";
import { merchants } from "../models/merchant";  // Updated imports (singular app)
import { eq, and } from "drizzle-orm";
import { adminLogs } from "../models/admins";
import bcrypt from "bcrypt";  // For hashing
import { merchantApplication } from "../models/merchant_applications";

// Raw queries for existing merchant_application (no migration needed)
export const getAllApplications = async () => {
  return await db.select().from(merchantApplication);
};

export const getPendingApplications = async () => {
  return await db
    .select()
    .from(merchantApplication)
    .where(eq(merchantApplication.status, "pending"));
};

export const getApplicationById = async (id: string) => {
  return await db
    .select()
    .from(merchantApplication)
    .where(eq(merchantApplication.id, id))
    .limit(1);
};

export const updateApplication = async (id: string, data: any) => {
  // Manually set updated_at if needed (GORM auto, but Drizzle doesn't)
  data.updatedAt = new Date();
  return await db
    .update(merchantApplication)
    .set(data)
    .where(eq(merchantApplication.id, id))
    .returning();
};

// For new merchants table (migrated)
export const createMerchant = async (data: any) => {
  // Hash password before insert
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  data.updatedAt = new Date();  // Manual
  return await db.insert(merchants).values(data).returning();
};

export const getAllMerchants = async () => {
  return await db.select().from(merchants);
};

export const updateMerchant = async (id: string, data: any) => {
  data.updatedAt = new Date();  // Manual
  return await db
    .update(merchants)
    .set(data)
    .where(eq(merchants.id, id))
    .returning();
};

// Admin logs (assumes admins model migrated separately)
export const createAdminLog = async (data: any) => {
  data.timestamp = new Date();
  return await db.insert(adminLogs).values(data).returning();
};
*/

































import { db } from "../config/database";
import { merchants } from "../models/merchant";
import { merchantApplication } from "../models/merchant_applications";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { InferInsertModel } from "drizzle-orm"; // For $inferInsert

// Stub for adminLogs (matches models/admins.ts)
import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id").notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  targetType: varchar("target_type", { length: 20 }).notNull(),
  targetId: uuid("target_id").notNull(),
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Type-safe schemas using $inferInsert
export type MerchantInsert = InferInsertModel<typeof merchants>;
export type MerchantApplicationUpdate = Partial<{
  status: "pending" | "approved" | "rejected" | "more_info";
  reviewedAt: Date;
  reviewedBy: string;
  rejectionReason: string;
}>;
export type MerchantUpdate = Partial<{
  status: "active" | "suspended";
  commissionTier: string;
  commissionRate: string;
}>;
export type AdminLogInsert = InferInsertModel<typeof adminLogs>;

// Raw queries for merchant_application
export const getAllApplications = async () => {
  return await db.select().from(merchantApplication);
};

export const getPendingApplications = async () => {
  return await db
    .select()
    .from(merchantApplication)
    .where(eq(merchantApplication.status, "pending"));
};

export const getApplicationById = async (id: string) => {
  return await db
    .select()
    .from(merchantApplication)
    .where(eq(merchantApplication.id, id))
    .limit(1);
};

export const updateApplication = async (id: string, data: MerchantApplicationUpdate) => {
  const updateData = { ...data, updatedAt: new Date() };
  return await db
    .update(merchantApplication)
    .set(updateData)
    .where(eq(merchantApplication.id, id))
    .returning();
};

// For merchants
export const createMerchant = async (data: MerchantInsert) => {
  const insertData = { ...data };
  if (insertData.password) {
    insertData.password = await bcrypt.hash(insertData.password, 10);
  }
  return await db.insert(merchants).values(insertData).returning();
};

export const getAllMerchants = async () => {
  return await db.select().from(merchants);
};

export const updateMerchant = async (id: string, data: MerchantUpdate) => {
  const updateData = { ...data, updatedAt: new Date() };
  return await db
    .update(merchants)
    .set(updateData)
    .where(eq(merchants.id, id))
    .returning();
};

export const createAdminLog = async (data: AdminLogInsert) => {
  // Remove timestamp; schema's defaultNow() handles it
  const { timestamp, ...insertData } = data; // Destructure to exclude timestamp
  return await db.insert(adminLogs).values(insertData).returning();
};
```
</xaiArtifact>

---
### src/repositories/order_repository.ts
- Size: 1.27 KB
- Lines: 46
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="dd8b5f5e-7854-484f-9a63-1280c762c6ad" artifact_version_id="b95023ea-0fd5-4cc4-9e92-c89035489efb" title="src/repositories/order_repository.ts" contentType="text/typescript">
```typescript
// Order queries using Drizzle
import { db } from "../config/database";
import { orders, products } from "../models/order";
import { eq, and, inArray } from "drizzle-orm";

// Get order by ID
export const getOrderById = async (id: string) => {
  return db.select().from(orders).where(eq(orders.id, id)).limit(1);
};

// Update order
export const updateOrder = async (id: string, data: any) => {
  return db.update(orders).set(data).where(eq(orders.id, id)).returning();
};

// Get product by ID
export const getProductById = async (id: string) => {
  return db.select().from(products).where(eq(products.id, id)).limit(1);
};

// Update product stock
export const updateProductStock = async (id: string, stock: number) => {
  return db
    .update(products)
    .set({ stock })
    .where(eq(products.id, id))
    .returning();
};

//getUnsettledOrders
export const getUnsettledOrders = async (merchantId: string) => {
  return db
    .select()
    .from(orders)
    .where(
      and(eq(orders.merchantId, merchantId), eq(orders.status, "delivered"))
    );
};

export const markOrdersSettled = async (orderIds: string[]) => {
  return db
    .update(orders)
    .set({ status: "settled" })
    .where(inArray(orders.id, orderIds))
    .returning();
};

```
</xaiArtifact>

---
### src/repositories/announcement_repository.ts
- Size: 0.59 KB
- Lines: 19
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="4dc26408-3c8a-4b34-a10f-4f9c13ae6563" artifact_version_id="cfdb2e9f-6197-4c6d-9bad-b62b8b8f1602" title="src/repositories/announcement_repository.ts" contentType="text/typescript">
```typescript
// Announcement queries using Drizzle
import { db } from '../config/database';
import { announcements } from '../models/announcement';
import { eq } from 'drizzle-orm';

// Get all announcements
export const getAllAnnouncements = async () => {
  return db.select().from(announcements);
};

// Create announcement
export const createAnnouncement = async (data: any) => {
  return db.insert(announcements).values(data).returning();
};

// Delete announcement
export const deleteAnnouncement = async (id: string) => {
  return db.delete(announcements).where(eq(announcements.id, id));
};

```
</xaiArtifact>

---
### src/repositories/settings_repository.ts
- Size: 0.47 KB
- Lines: 14
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="72226776-28f6-4b45-998f-f0eccc6093ba" artifact_version_id="5bf23f42-3b81-4248-a5f7-41376bd6d7ab" title="src/repositories/settings_repository.ts" contentType="text/typescript">
```typescript
// Settings queries using Drizzle
import { db } from '../config/database';
import { settings } from '../models/settings';
import { eq } from 'drizzle-orm';

// Get settings
export const getGlobalSettings = async () => {
  return db.select().from(settings).where(eq(settings.id, 'global')).limit(1);
};

// Update settings
export const updateGlobalSettings = async (data: any) => {
  return db.update(settings).set(data).where(eq(settings.id, 'global')).returning();
};

```
</xaiArtifact>

---
### src/repositories/payout_repository.ts
- Size: 0.56 KB
- Lines: 19
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="48e6205e-da8f-41ae-88da-2bdd34bad57b" artifact_version_id="952d66b0-076c-4d8e-99d7-4b7f41bc25c1" title="src/repositories/payout_repository.ts" contentType="text/typescript">
```typescript
// Payout queries using Drizzle
import { db } from '../config/database';
import { payouts } from '../models/payout';
import { eq } from 'drizzle-orm';

// Get all payouts
export const getAllPayouts = async () => {
  return db.select().from(payouts);
};

// Get payouts by merchant
export const getPayoutsByMerchant = async (merchantId: string) => {
  return db.select().from(payouts).where(eq(payouts.merchantId, merchantId));
};

// Create payout
export const createPayout = async (data: any) => {
  return db.insert(payouts).values(data).returning();
};

```
</xaiArtifact>

---
### src/repositories/storage.ts
- Size: 8.55 KB
- Lines: 228
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="b83ca50f-b71c-42df-a7c3-60f34865944f" artifact_version_id="3b096c92-92ec-49f9-8679-2fa76a3ea8a2" title="src/repositories/storage.ts" contentType="text/typescript">
```typescript
// /*
// import {
//     type User,
//   type InsertUser,
//   type MerchantApplication,
//   type InsertMerchantApplication,
//   type Merchant,
//   type InsertMerchant,
//   type Product,
//   type InsertProduct,
//   type Order,
//   type InsertOrder,
//   type Dispute,
//   type InsertDispute,
//   type AdminLog,
//   type InsertAdminLog
//     // ...
//   } from "../models/schema";
//   import { randomUUID } from "crypto";

//   export interface IStorage {
//     // User operations
//     getUser(id: string): Promise<User | undefined>;
//     getUserByUsername(username: string): Promise<User | undefined>;
//     getUserByEmail(email: string): Promise<User | undefined>;
//     createUser(user: InsertUser): Promise<User>;
//     updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

//     // Merchant Application operations
//     getMerchantApplication(id: string): Promise<MerchantApplication | undefined>;
//     getAllMerchantApplications(): Promise<MerchantApplication[]>;
//     getPendingMerchantApplications(): Promise<MerchantApplication[]>;
//     createMerchantApplication(application: InsertMerchantApplication): Promise<MerchantApplication>;
//     updateMerchantApplication(id: string, updates: Partial<MerchantApplication>): Promise<MerchantApplication | undefined>;

//     // Merchant operations
//     getMerchant(id: string): Promise<Merchant | undefined>;
//     getMerchantByUserId(userId: string): Promise<Merchant | undefined>;
//     getAllMerchants(): Promise<Merchant[]>;
//     createMerchant(merchant: InsertMerchant): Promise<Merchant>;
//     updateMerchant(id: string, updates: Partial<Merchant>): Promise<Merchant | undefined>;

//     // /* Commented out: Product, Order, Dispute, AdminLog operations not in focus */
//     // getProduct(id: string): Promise<Product | undefined>;
//     // ...

//     createAdminLog(log: InsertAdminLog): Promise<AdminLog>;
//     getAdminLogs(limit?: number): Promise<AdminLog[]>;
//     getAdminLogsByTarget(targetType: string, targetId: string): Promise<AdminLog[]>;
//   }

//   export class MemStorage implements IStorage {
//     private users: Map<string, User>;
//     private merchantApplications: Map<string, MerchantApplication>;
//     private merchants: Map<string, Merchant>;
//     // /* Commented out: Other maps not in focus */
//     // private products: Map<string, Product>;
//     // ...

//     constructor() {
//       this.users = new Map();
//       this.merchantApplications = new Map();
//       this.merchants = new Map();
//       // /* Commented out: Other initializations */
//       // this.products = new Map();
//       // ...

//       this.initializeSampleData();
//     }

//     private initializeSampleData() {
//       // Create admin user
//       const adminId = randomUUID();
//       const admin: User = {
//         id: adminId,
//         username: "admin",
//         password: "admin123", // In production, this would be hashed
//         email: "admin@vendorhub.com",
//         role: "admin",
//         createdAt: new Date(),
//       };
//       this.users.set(adminId, admin);
//     }

//     // User operations (kept as needed for approval)
//     async getUser(id: string): Promise<User | undefined> {
//       return this.users.get(id);
//     }

//     async getUserByUsername(username: string): Promise<User | undefined> {
//       return Array.from(this.users.values()).find(user => user.username === username);
//     }

//     async getUserByEmail(email: string): Promise<User | undefined> {
//       return Array.from(this.users.values()).find(user => user.email === email);
//     }

//     async createUser(insertUser: InsertUser): Promise<User> {
//       const id = randomUUID();
//       const user: User = {
//         ...insertUser,
//         id,
//         createdAt: new Date(),
//       };
//       this.users.set(id, user);
//       return user;
//     }

//     async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
//       const user = this.users.get(id);
//       if (!user) return undefined;

//       const updatedUser = { ...user, ...updates };
//       this.users.set(id, updatedUser);
//       return updatedUser;
//     }

//     // Merchant Application operations (focus)
//     async getMerchantApplication(id: string): Promise<MerchantApplication | undefined> {
//       return this.merchantApplications.get(id);
//     }

//     async getAllMerchantApplications(): Promise<MerchantApplication[]> {
//       return Array.from(this.merchantApplications.values()).sort(
//         (a, b) => new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime()
//       );
//     }

//     async getPendingMerchantApplications(): Promise<MerchantApplication[]> {
//       return Array.from(this.merchantApplications.values())
//         .filter(app => app.status === "pending")
//         .sort((a, b) => new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime());
//     }

//     async createMerchantApplication(insertApplication: InsertMerchantApplication): Promise<MerchantApplication> {
//       const id = randomUUID();
//       const application: MerchantApplication = {
//         ...insertApplication,
//         id,
//         status: "pending",
//         submittedAt: new Date(),
//         reviewedAt: null,
//         reviewedBy: null,
//         rejectionReason: null,
//       };
//       this.merchantApplications.set(id, application);
//       return application;
//     }

//     async updateMerchantApplication(id: string, updates: Partial<MerchantApplication>): Promise<MerchantApplication | undefined> {
//       const application = this.merchantApplications.get(id);
//       if (!application) return undefined;

//       const updatedApplication = { ...application, ...updates };
//       this.merchantApplications.set(id, updatedApplication);
//       return updatedApplication;
//     }

//     // Merchant operations (needed for approval)
//     async getMerchant(id: string): Promise<Merchant | undefined> {
//       return this.merchants.get(id);
//     }

//     async getMerchantByUserId(userId: string): Promise<Merchant | undefined> {
//       return Array.from(this.merchants.values()).find(merchant => merchant.userId === userId);
//     }

//     async getAllMerchants(): Promise<Merchant[]> {
//       return Array.from(this.merchants.values()).sort(
//         (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
//       );
//     }

//     async createMerchant(insertMerchant: InsertMerchant): Promise<Merchant> {
//       const id = randomUUID();
//       const merchant: Merchant = {
//         ...insertMerchant,
//         id,
//         status: "active",
//         totalSales: "0.00",
//         createdAt: new Date(),
//       };
//       this.merchants.set(id, merchant);
//       return merchant;
//     }

//     async updateMerchant(id: string, updates: Partial<Merchant>): Promise<Merchant | undefined> {
//       const merchant = this.merchants.get(id);
//       if (!merchant) return undefined;

//       const updatedMerchant = { ...merchant, ...updates };
//       this.merchants.set(id, updatedMerchant);
//       return updatedMerchant;
//     }

//     // /* Commented out: Product operations not in focus */
//     // async getProduct(id: string): Promise<Product | undefined> {
//     //   return this.products.get(id);
//     // }
//     // ...

//     // /* Commented out: Other operations (orders, disputes, etc.) */

//     async createAdminLog(insertLog: InsertAdminLog): Promise<AdminLog> {
//         const id = randomUUID();
//         const log: AdminLog = {
//           ...insertLog,
//           id,
//           timestamp: new Date(),
//         };
//         this.adminLogs.set(id, log);
//         return log;
//       }

//       async getAdminLogs(limit: number = 50): Promise<AdminLog[]> {
//         return Array.from(this.adminLogs.values())
//           .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
//           .slice(0, limit);
//       }

//       async getAdminLogsByTarget(targetType: string, targetId: string): Promise<AdminLog[]> {
//         return Array.from(this.adminLogs.values())
//           .filter(log => log.targetType === targetType && log.targetId === targetId)
//           .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime());
//       }
//   }

//   export const storage = new MemStorage();

```
</xaiArtifact>

---
### src/models/dispute.ts
- Size: 0.57 KB
- Lines: 15
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="ce33f691-bce1-4038-93f3-619e14ea9a93" artifact_version_id="c0f8a842-f3e5-48c1-81dd-a28fa51ae58c" title="src/models/dispute.ts" contentType="text/typescript">
```typescript
// Dispute schema
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const disputes = pgTable('disputes', {
  id: varchar('id').primaryKey(),
  orderId: varchar('order_id').notNull(),
  customerId: varchar('customer_id').notNull(),
  merchantId: varchar('merchant_id').notNull(),
  reason: text('reason').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull().default('open'),
  resolution: text('resolution'),
  createdAt: timestamp('created_at').defaultNow(),
  resolvedAt: timestamp('resolved_at'),
});

```
</xaiArtifact>

---
### src/models/order.ts
- Size: 1.14 KB
- Lines: 27
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="8510ff55-32ad-4353-bab5-6d9dce82da4b" artifact_version_id="8cccb8d2-454a-4098-b7be-8eda45889323" title="src/models/order.ts" contentType="text/typescript">
```typescript
// Order schema (shared with Golang APIs)
import { pgTable, varchar, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: varchar('id').primaryKey(),
  merchantId: varchar('merchant_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  basePrice: decimal('base_price').notNull(),
  stock: integer('stock').notNull().default(0), // Inventory stock
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: varchar('id').primaryKey(),
  customerId: varchar('customer_id').notNull(),
  merchantId: varchar('merchant_id').notNull(),
  productId: varchar('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  totalAmount: decimal('total_amount').notNull(),
  commissionAmount: decimal('commission_amount').notNull(),
  paymentIntentId: text('payment_intent_id'), // Stripe payment ID
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

```
</xaiArtifact>

---
### src/models/payout.ts
- Size: 0.43 KB
- Lines: 11
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="cc33373b-d25b-4469-a7df-03cdb3b461da" artifact_version_id="2bc94089-084e-4267-bd04-2a31bd9d96bb" title="src/models/payout.ts" contentType="text/typescript">
```typescript
// Payout schema
import { pgTable, varchar, decimal, text, timestamp } from 'drizzle-orm/pg-core';

export const payouts = pgTable('payouts', {
  id: varchar('id').primaryKey(),
  merchantId: varchar('merchant_id').notNull(),
  amount: decimal('amount').notNull(),
  status: text('status').notNull().default('pending'),
  transferId: text('transfer_id'), // Stripe transfer ID
  createdAt: timestamp('created_at').defaultNow(),
});

```
</xaiArtifact>

---
### src/models/admins.ts
- Size: 0.79 KB
- Lines: 30
- Last Modified: 2025-09-11 22:12:52

<xaiArtifact artifact_id="c7344450-c428-4a58-813d-3d8af5a2e98b" artifact_version_id="47ed9778-b1f1-4894-ba8a-db96ebb48d80" title="src/models/admins.ts" contentType="text/typescript">
```typescript
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
   uuid,
} from "drizzle-orm/pg-core";


export const admins = pgTable("admins", {
  //id: varchar("id").primaryKey(),
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminLogs = pgTable("admin_logs", {
  id: varchar("id").primaryKey(),
  adminId: varchar("admin_id").notNull(),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

```
</xaiArtifact>

---
### src/models/settings.ts
- Size: 0.36 KB
- Lines: 9
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="a41f3b00-1d98-42bf-a5b2-58f52a6afe41" artifact_version_id="386811cf-1575-487f-a7b4-377864f3c2d2" title="src/models/settings.ts" contentType="text/typescript">
```typescript
// Global settings schema
import { pgTable, text, decimal, jsonb } from 'drizzle-orm/pg-core';

export const settings = pgTable('settings', {
  id: text('id').primaryKey().default('global'),
  fees: decimal('fees').notNull().default('5.00'),
  taxRate: decimal('tax_rate').notNull().default('0.00'),
  shippingOptions: jsonb('shipping_options').notNull(),
});

```
</xaiArtifact>

---
### src/models/users.ts
- Size: 0.41 KB
- Lines: 17
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="b8c4ee84-c122-4b40-9090-9afb747822ef" artifact_version_id="02c6d9bf-5302-4bd3-a526-2ec852673a60" title="src/models/users.ts" contentType="text/typescript">
```typescript
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("customer"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

```
</xaiArtifact>

---
### src/models/category.ts
- Size: 0.93 KB
- Lines: 27
- Last Modified: 2025-09-12 01:30:52

<xaiArtifact artifact_id="c34dc33b-6106-4217-82ab-0ab49d6ee757" artifact_version_id="066b5316-38a8-4d3e-8f18-1b47edde36d3" title="src/models/category.ts" contentType="text/typescript">
```typescript
// Category schema
// import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

// export const categories = pgTable('categories', {
//   id: varchar('id').primaryKey(),
//   name: text('name').notNull(),
//   parentId: varchar('parent_id'),
//   createdAt: timestamp('created_at').defaultNow(),
// });
import { pgTable, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: varchar('id').primaryKey(),
  name: text('name').notNull(),
  parentId: varchar('parent_id'),
  attributes: jsonb('attributes'),  // Align with Go's map[string]any
  createdAt: timestamp('created_at').defaultNow(),
});

// Add relations for hierarchy
export const categoryRelations = relations(categories, ({ one }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
}));
```
</xaiArtifact>

---
### src/models/merchant_applications.ts
- Size: 2.05 KB
- Lines: 49
- Last Modified: 2025-09-10 19:18:11

<xaiArtifact artifact_id="b5aa16db-4a0c-4d10-8b2b-a354bf7b4cac" artifact_version_id="58886ace-7dfd-4f84-b866-d559c0f4f8e1" title="src/models/merchant_applications.ts" contentType="text/typescript">
```typescript
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
  index,
  uniqueIndex,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";  // For FK/relations if needed later
import { sql } from "drizzle-orm";
import { merchants } from "./merchant";


export const merchantApplication = pgTable("merchant_application", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`).notNull(),
  storeName: varchar("store_name", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  personalEmail: varchar("personal_email", { length: 255 }).notNull().unique(),
  workEmail: varchar("work_email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 50 }),
  personalAddress: jsonb("personal_address").notNull(),
  workAddress: jsonb("work_address").notNull(),
  businessType: varchar("business_type", { length: 100 }),
  website: varchar("website", { length: 255 }),
  businessDescription: text("business_description"),
  businessRegistrationNumber: varchar("business_registration_number", { length: 255 }).notNull().unique(),
  storeLogoUrl: varchar("store_logo_url", { length: 255 }),
  businessRegistrationCertificate: varchar("business_registration_certificate", { length: 255 }),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => ({
  personalEmailIdx: uniqueIndex("uni_merchant_application_personal_email").on(table.personalEmail),
  workEmailIdx: uniqueIndex("uni_merchant_application_work_email").on(table.workEmail),
  businessRegNumIdx: uniqueIndex("uni_merchant_application_business_registration_number").on(table.businessRegistrationNumber),
}));

export const merchantApplicationRelations = relations(merchantApplication, ({ one }) => ({
  merchant: one(merchants, {
    fields: [merchantApplication.id],
    references: [merchants.applicationId],
  }),
}));

export { merchants };

```
</xaiArtifact>

---
### src/models/announcement.ts
- Size: 0.32 KB
- Lines: 9
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="4fd072c8-42f0-41b1-91e8-0b7ac5e9b1aa" artifact_version_id="e241e509-157d-4c3f-af89-dfc4e570e962" title="src/models/announcement.ts" contentType="text/typescript">
```typescript
// Announcement schema
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const announcements = pgTable('announcements', {
  id: varchar('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

```
</xaiArtifact>

---
### src/models/merchant.ts
- Size: 2.85 KB
- Lines: 63
- Last Modified: 2025-09-11 21:56:15

<xaiArtifact artifact_id="aefb66c1-3b3c-4719-8732-019342db3558" artifact_version_id="209efcca-8b3c-40b5-bd40-a87393594ad6" title="src/models/merchant.ts" contentType="text/typescript">
```typescript
// Merchant schema, including applications and merchants
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
  index,
  uniqueIndex,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";  // For FK/relations if needed later
import { sql } from "drizzle-orm";
import { merchantApplication } from "./merchant_applications";

// Merchant table (migrated by TS, queries both)
export const merchants = pgTable("merchant", {
  id: uuid("id").defaultRandom().primaryKey(),
  applicationId: uuid("application_id").notNull().unique(),
  merchantId: uuid("merchant_id").notNull().unique(),
  storeName: varchar("store_name", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  personalEmail: varchar("personal_email", { length: 255 }).notNull().unique(),
  workEmail: varchar("work_email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 50 }),
  personalAddress: jsonb("personal_address").notNull(),
  workAddress: jsonb("work_address").notNull(),
  businessType: varchar("business_type", { length: 100 }),
  website: varchar("website", { length: 255 }),
  businessDescription: text("business_description"),
  businessRegistrationNumber: varchar("business_registration_number", { length: 255 }).notNull().unique(),
  businessRegistrationCertificate: varchar("business_registration_certificate", { length: 255 }),
  storeLogoUrl: varchar("store_logo_url", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  commissionTier: varchar("commission_tier").default("standard"),
  commissionRate: decimal("commission_rate", { precision: 10, scale: 2 }).default("5.00"),
  accountBalance: decimal("account_balance", { precision: 15, scale: 2 }).default("0.00"),
  totalSales: decimal("total_sales", { precision: 15, scale: 2 }).default("0.00"),
  totalPayouts: decimal("total_payouts", { precision: 15, scale: 2 }).default("0.00"),
  //stripeAccountId: text("stripe_account_id"),
  accountId: text("account_id"),
  payoutSchedule: varchar("payout_schedule").default("weekly"),
  lastPayoutDate: timestamp("last_payout_date", { mode: "date" }),
  banner: varchar("banner", { length: 255 }),
  policies: jsonb("policies"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("merchant_status_idx").on(table.status), // For filtering active/suspended
}));

// Relations for joins (admin API queries)
export const merchantsRelations = relations(merchants, ({ one }) => ({
  application: one(merchantApplication, {
    fields: [merchants.applicationId],
    references: [merchantApplication.id],
  }),
}));



```
</xaiArtifact>

---
### src/tests/e2e/dispute.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="429ea774-fa3e-4679-b6f4-1beeedf96ff2" artifact_version_id="a8199342-2dae-4af4-9960-10983c226a23" title="src/tests/e2e/dispute.test.ts" contentType="text/typescript">
```typescript

```
</xaiArtifact>

---
### src/tests/e2e/payout.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="09d8113b-5688-49df-a7b8-4ee16070db54" artifact_version_id="1cf83abe-0f5b-49ca-99a5-0df6a100b6f9" title="src/tests/e2e/payout.test.js" contentType="text/javascript">
```javascript

```
</xaiArtifact>

---
### src/tests/e2e/payout.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="a265adce-b65e-4a57-9cc2-45454a3f65eb" artifact_version_id="f3ab67e1-0709-4766-b652-5c5baeb01518" title="src/tests/e2e/payout.test.ts" contentType="text/typescript">
```typescript

```
</xaiArtifact>

---
### src/tests/e2e/category.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="c5682dba-2449-4e00-b8b8-fa953b7345a7" artifact_version_id="8c3ebb5c-1337-48e9-ae5d-73b69b7fad02" title="src/tests/e2e/category.test.ts" contentType="text/typescript">
```typescript

```
</xaiArtifact>

---
### src/tests/unit/dispute_service.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="41ae488d-b3d2-4c70-b8d4-7cad666f758f" artifact_version_id="e5573fb4-aa91-4d67-98e7-52c680eb865d" title="src/tests/unit/dispute_service.test.js" contentType="text/javascript">
```javascript

```
</xaiArtifact>

---
### src/tests/integration/merchant_controller.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="68f6c9b8-a2f0-4120-baed-b8662f192f83" artifact_version_id="b82cc5db-7f35-428d-bd56-6448bd20ee5f" title="src/tests/integration/merchant_controller.test.js" contentType="text/javascript">
```javascript

```
</xaiArtifact>

---
### src/tests/mocks/payment_mock.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-09 01:00:33

<xaiArtifact artifact_id="ae9037db-906a-41ab-a4b0-7bf6db99f67c" artifact_version_id="c051907e-5262-4e88-9c8d-83ab4861483f" title="src/tests/mocks/payment_mock.js" contentType="text/javascript">
```javascript

```
</xaiArtifact>

---

---
## 📊 Summary
- Total files: 67
- Total size: 107.64 KB
- File types: .js, .json, .ts, unknown
