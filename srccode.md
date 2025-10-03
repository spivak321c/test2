# Codebase Analysis: src
Generated: 2025-10-03 20:57:03
---

## 📂 Project Structure
```tree
📁 src
├── config/
│   ├── database.ts
│   └── index.ts
├── controllers/
│   ├── admin.ts
│   ├── announcement.ts
│   ├── category.ts
│   ├── dispute.ts
│   ├── generic_resource.ts
│   ├── merchant.ts
│   ├── payout.ts
│   └── settings.ts
├── docs/
│   ├── openapi.ts
│   └── swagger.ts
├── jobs/
│   └── payout-scheduler.ts
├── middleware/
│   ├── auth.ts
│   ├── logging.ts
│   ├── ratelimit.ts
│   ├── rbac.ts
│   └── webhook.ts
├── models/
│   ├── admins.ts
│   ├── announcement.ts
│   ├── bank_details.ts
│   ├── cart.ts
│   ├── cart_item.ts
│   ├── category.ts
│   ├── dispute.ts
│   ├── inventory.ts
│   ├── media.ts
│   ├── merchant.ts
│   ├── merchant_applications.ts
│   ├── order.ts
│   ├── order_item.ts
│   ├── order_merchant_split.ts
│   ├── payment.ts
│   ├── payout.ts
│   ├── products.ts
│   ├── promotion.ts
│   ├── return_request.ts
│   ├── settings.ts
│   ├── users.ts
│   └── variant.ts
├── repositories/
│   ├── announcement_repository.ts
│   ├── bank_details_repository.ts
│   ├── category_repository.ts
│   ├── dispute_repository.ts
│   ├── generic_repository.ts
│   ├── merchant_repository.ts
│   ├── order_repository.ts
│   ├── payout_repository.ts
│   ├── settings_repository.ts
│   └── storage.ts
├── routes/
│   ├── admin.ts
│   ├── announcement.ts
│   ├── category.ts
│   ├── dispute.ts
│   ├── generic_admin.ts
│   ├── index.ts
│   ├── merchants.ts
│   ├── payout.ts
│   ├── settings.ts
│   └── webhook.ts
├── services/
│   ├── admin_service.ts
│   ├── announcement_service.ts
│   ├── bank_details_service.ts
│   ├── category_service.ts
│   ├── dispute_service.ts
│   ├── generic_resource_service.ts
│   ├── merchant_service.ts
│   ├── notification_service.ts
│   ├── payout_service.ts
│   └── settings_service.ts
├── types/
│   ├── express.d.ts
│   └── roles.ts
├── utils/
│   ├── email-templates.tsx
│   ├── email.ts
│   ├── external.ts
│   ├── logger.ts
│   └── validator.ts
├── index.ts
└── seed.ts
```
---

## 📄 File Contents
### index.ts
- Size: 4.75 KB
- Lines: 158
- Last Modified: 2025-10-01 09:44:49

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

import "dotenv/config";
import express from "express";
// import session from "express-session";
// import connectRedis from "connect-redis";
// import { createClient } from "redis";
import { Pool } from "@neondatabase/serverless";
import { registerRoutes } from "./routes/index.js";
//import { loggingMiddleware } from "./middleware/logging.js";
import { config as appConfig } from "./config/index.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./docs/swagger.js";
import { adminRouter } from "./admin/admin.js";
import expressWinston from "express-winston";
import { logger } from "./utils/logger.js";
import webhookRouter from "./routes/webhook.js"
import { startPayoutSchedulers } from "./jobs/payout-scheduler.js"
// import "dotenv/config";  // <-- loads .env before any other module

// import express from "express"
// //import cors from "cors"
// import { registerRoutes } from "./routes/index"
// import { loggingMiddleware } from "./middleware/logging"
// import { config as appConfig } from "./config/index"
// import swaggerUi from 'swagger-ui-express';
// import { specs } from './docs/swagger';
// // import AdminJS from 'adminjs';
// import AdminJSExpress from '@adminjs/express';
// import { admins } from "./models/admins";
// import { categories } from "./models/category";
// import { merchants } from "./models/merchant";

const app = express();

app.use("/webhook", express.raw({ type: "application/json" }), webhookRouter);
// 📌 Request logging middleware
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: false, // no full metadata (keeps it clean)
    msg: "HTTP {{req.method}} {{req.url}} → {{res.statusCode}}",
    colorize: true,
  })
);

//app.use(cors())
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//app.use(express.raw({ type: "application/webhook+json" }))
//app.use(loggingMiddleware)
//import { adminRouter } from './admin/admin';  // New import

app.use("/admin", adminRouter);

// TEST ENDPOINT: Add this temporarily to confirm Express routing works
app.get("/test-admin", (req, res) =>
  res.json({ message: "Admin route base is working!" })
);

registerRoutes(app);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// export default app;

// const adminJs = new AdminJS({
//   resources: [merchants, admins, categories ],
//   rootPath: '/admin',
// });
// const router = AdminJSExpress.buildRouter(adminJs);
// app.use(adminJs.options.rootPath, router);

// const port = appConfig.port
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : appConfig.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

if (
  appConfig.env === "production" ||
  process.env.ENABLE_SCHEDULERS === "true"
) {
  startPayoutSchedulers();
  logger.info("Payout schedulers enabled");
} else {
  logger.info(
    "Payout schedulers disabled (set ENABLE_SCHEDULERS=true to enable)"
  );
}

export default app;

```

---
### seed.ts
- Size: 3.28 KB
- Lines: 99
- Last Modified: 2025-09-30 12:15:22

```typescript
import { drizzle } from 'drizzle-orm/neon-serverless'; // Or neon-http if not switched
import { Pool } from '@neondatabase/serverless';
import { v4 as uuid } from 'uuid';
import { merchantApplication } from './models/merchant_applications.js';
import { merchants } from './models/merchant.js';
import bcrypt from 'bcrypt';
import { admins } from './models/admins.js';

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not set');
// }

//const DATABASE_URL="postgresql://neondb_owner:npg_VlAEowN2S6UT@ep-quiet-darkness-adb75ds6-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const DATABASE_URL="postgresql://neondb_owner:npg_CcwoeLb6V1XH@ep-wild-haze-adu0bdvq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"


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
  username: 'adminrt',
  password: adminPassword,
  role: 'admin',
  email: 'admin1@mail.com',
  createdAt: new Date(),
});

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
//npm run seed
```

---
### config/database.ts
- Size: 1.93 KB
- Lines: 56
- Last Modified: 2025-09-30 21:56:17

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
import { neon } from "@neondatabase/serverless";
//import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle } from "drizzle-orm/neon-serverless"; // Use neon-serverless instead of neon-http
import { Pool } from "@neondatabase/serverless";
import { merchants } from "../models/merchant.js";
import { merchantApplication } from "../models/merchant_applications.js";
import { adminLogs, admins } from "../models/admins.js";
import { payouts } from "../models/payout.js";
import { disputes } from "../models/dispute.js";
import { returnRequests } from "../models/return_request.js";
import { settings } from "../models/settings.js";
import { users } from "../models/users.js";
import { orderMerchantSplits } from "../models/order_merchant_split.js";
import { merchantBankDetails } from "../models/bank_details.js";

// Ensure DATABASE_URL is set in environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
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
    payouts,
    disputes,
    returnRequests,
    settings,
    users,
    orderMerchantSplits,
    merchantBankDetails,
  },
});

```

---
### config/index.ts
- Size: 1.02 KB
- Lines: 42
- Last Modified: 2025-09-30 21:40:31

```typescript
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "DATABASE_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "JWT_SECRET",
  "PAYSTACK_SECRET_KEY",
];

for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "5000"),
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: "24h" as const,
  },
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number.parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    from: process.env.SMTP_FROM as string,
    secure: process.env.SMTP_SECURE === "true",
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY!,
    webhookSecret:
      process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY!,
  },
};

```

---
### controllers/admin.ts
- Size: 2.48 KB
- Lines: 93
- Last Modified: 2025-09-30 21:41:10

```typescript
import type { Request, Response } from "express";
import * as adminService from "../services/admin_service.js";
import { AdminRole } from "../types/roles.js";

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin sign-in
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@mail.com
 *               password:
 *                 type: string
 *                 example: adminpass
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
export const adminSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { token, user } = await adminService.adminLogin(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json({ admins });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!Object.values(AdminRole).includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const admin = await adminService.createAdmin({
      username,
      email,
      password,
      role,
      createdBy: req.user!.id,
    });

    res.status(201).json({ admin });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !Object.values(AdminRole).includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const admin = await adminService.updateAdminRole(id, role, req.user!.id);
    res.json({ admin });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

```

---
### controllers/announcement.ts
- Size: 0.87 KB
- Lines: 26
- Last Modified: 2025-09-30 01:53:37

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

---
### controllers/category.ts
- Size: 10.03 KB
- Lines: 357
- Last Modified: 2025-09-30 01:53:37

```typescript


import { Request, Response } from 'express';
import { CategoryService } from '../services/category_service';

const service = new CategoryService();





/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               attributes:
 *                 type: object
 *                 example: { "color": "string", "size": "string" }
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 name:
 *                   type: string
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 attributes:
 *                   type: object
 *                   example: { "color": "string", "size": "string" }
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid category data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};




/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 */

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await service.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};




/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 123e4567-e89b-12d3-a456-426614174000
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   parentId:
 *                     type: string
 *                     format: uuid
 *                     nullable: true
 *                     example: null
 *                   attributes:
 *                     type: object
 *                     example: { "color": "string", "size": "string" }
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-09-13T11:00:00Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
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




/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *               parentId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               attributes:
 *                 type: object
 *                 example: { "color": "string", "size": "string" }
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 name:
 *                   type: string
 *                   example: Updated Electronics
 *                 parentId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 attributes:
 *                   type: object
 *                   example: { "color": "string", "size": "string" }
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid category data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 */
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

---
### controllers/dispute.ts
- Size: 1.98 KB
- Lines: 66
- Last Modified: 2025-10-01 09:48:42

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

---
### controllers/merchant.ts
- Size: 18.00 KB
- Lines: 600
- Last Modified: 2025-09-30 01:53:37

```typescript
import type { Request, Response } from "express"
import * as merchantService from "../services/merchant_service"
import { v4 as uuid } from 'uuid';



/**
 * @swagger
 * /merchants/applications:
 *   get:
 *     summary: Get all merchant applications
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   storeName:
 *                     type: string
 *       500:
 *         description: Server error
 */
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





/**
 * @swagger
 * /merchants/applications/{id}/approve:
 *   post:
 *     summary: Approve a merchant application
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tempPassword:
 *                 type: string
 *                 format: password
 *                 example: temp123pass
 *             required:
 *               - tempPassword
 *     responses:
 *       200:
 *         description: Application approved and merchant created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     status:
 *                       type: string
 *                       example: approved
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-13T11:00:00Z
 *                 merchant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 456e7890-f12c-34d5-a678-426614174001
 *                     merchantId:
 *                       type: string
 *                       format: uuid
 *                       example: 789f0123-g45h-67i8-j901-426614174002
 *                     storeName:
 *                       type: string
 *                       example: Test Store
 *                     status:
 *                       type: string
 *                       example: active
 *                     commissionTier:
 *                       type: string
 *                       example: standard
 *                     commissionRate:
 *                       type: number
 *                       format: float
 *                       example: 5.00
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Application not found or already processed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const approveApplication = async (req: Request, res: Response) => {
  try {
    // if (!req.user?.id) {
    //   //return res.status(400).json({ error: "Unauthorized: No user data found" })
    //    const testAdminId = "ff710920-dc5b-4588-8f6e-578406707a55" // Generate valid UUID
    //   req.user = { id: testAdminId, role: "admin", email: "admin@mail.com", username: "admin" };
    // }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { application, merchant } = await merchantService.approveApplication(req.params.id, req.user.id)
    res.json({ application, merchant })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}



/**
 * @swagger
 * /merchants/applications/{id}/reject:
 *   post:
 *     summary: Reject a merchant application
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Incomplete documentation
 *             required:
 *               - reason
 *     responses:
 *       200:
 *         description: Application rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     status:
 *                       type: string
 *                       example: rejected
 *                     rejectionReason:
 *                       type: string
 *                       example: Incomplete documentation
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Application not found or already processed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const rejectApplication = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
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


/**
 * @swagger
 * /merchants/applications/{id}/more-info:
 *   post:
 *     summary: Request more information for a merchant application
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Please provide updated business registration certificate
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: More info request sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     status:
 *                       type: string
 *                       example: pending
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Application not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const requestMoreInfo = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
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


/**
 * @swagger
 * /merchants/{id}/suspend:
 *   post:
 *     summary: Suspend a merchant
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Merchant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Violation of terms
 *             required:
 *               - reason
 *     responses:
 *       200:
 *         description: Merchant suspended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 merchant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 456e7890-f12c-34d5-a678-426614174001
 *                     status:
 *                       type: string
 *                       example: suspended
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Merchant not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const suspendMerchant = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
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

/**
 * @swagger
 * /merchants/{id}/commission:
 *   patch:
 *     summary: Update merchant commission tier
 *     tags: [Merchants]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Merchant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commissionTier:
 *                 type: string
 *                 enum: [standard, premium, enterprise]
 *                 example: premium
 *               commissionRate:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 3.5
 *             required:
 *               - commissionTier
 *               - commissionRate
 *     responses:
 *       200:
 *         description: Commission tier updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 merchant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 456e7890-f12c-34d5-a678-426614174001
 *                     commissionTier:
 *                       type: string
 *                       example: premium
 *                     commissionRate:
 *                       type: number
 *                       format: float
 *                       example: 3.5
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid tier or rate
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Merchant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Merchant not found
 */
export const updateCommissionTier = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
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






```

---
### controllers/payout.ts
- Size: 1.56 KB
- Lines: 53
- Last Modified: 2025-09-30 21:41:33

```typescript
import type { Request, Response } from "express";
import * as payoutService from "../services/payout_service.js";

export const getAllPayouts = async (req: Request, res: Response) => {
  try {
    const { merchantId, status, limit } = req.query;

    const payouts = await payoutService.getAllPayouts({
      merchantId: merchantId as string,
      status: status as string,
      limit: limit ? Number.parseInt(limit as string) : undefined,
    });

    res.json({ payouts });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMerchantPayoutSummary = async (req: Request, res: Response) => {
  try {
    const { merchantId } = req.params;
    const summary = await payoutService.getMerchantPayoutSummary(merchantId);
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregatePayouts = async (req: Request, res: Response) => {
  try {
    const results = await payoutService.aggregateEligiblePayouts();
    res.json({
      message: "Payout aggregation completed",
      results,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const processPayout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await payoutService.processPayout(id, req.user!.id);
    res.json({
      message: "Payout processing initiated",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

```

---
### controllers/settings.ts
- Size: 4.18 KB
- Lines: 148
- Last Modified: 2025-09-30 01:53:37

```typescript
import { Request, Response } from 'express';
import * as settingsService from '../services/settings_service';



/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get global settings
 *     tags: [Settings]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: Global settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: global
 *                 fees:
 *                   type: number
 *                   format: float
 *                   example: 5.00
 *                 taxRate:
 *                   type: number
 *                   format: float
 *                   example: 0.00
 *                 shippingOptions:
 *                   type: object
 *                   example: { "standard": "5.00", "express": "15.00" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const getSettings = async (req: Request, res: Response) => {
  try {
    
    const theset = await settingsService.getSettings();
    res.json(theset);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * @swagger
 * /settings:
 *   patch:
 *     summary: Update global settings
 *     tags: [Settings]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fees:
 *                 type: number
 *                 format: float
 *                 example: 5.00
 *               taxRate:
 *                 type: number
 *                 format: float
 *                 example: 0.00
 *               shippingOptions:
 *                 type: object
 *                 example: { "standard": "5.00", "express": "15.00" }
 *     responses:
 *       200:
 *         description: Settings updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: global
 *                 fees:
 *                   type: number
 *                   format: float
 *                   example: 5.00
 *                 taxRate:
 *                   type: number
 *                   format: float
 *                   example: 0.00
 *                 shippingOptions:
 *                   type: object
 *                   example: { "standard": "5.00", "express": "15.00" }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid settings data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */

export const updateSettings = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
    const updated = await settingsService.updateSettings(req.body, req.user.id);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
```

---
### controllers/generic_resource.ts
- Size: 4.30 KB
- Lines: 164
- Last Modified: 2025-10-03 03:10:23

```typescript
import type { Request, Response } from "express";
import * as genericService from "../services/generic_resource_service.js";

/**
 * @swagger
 * /admin/{model}:
 *   get:
 *     summary: List records (superadmin only)
 *     tags: [Superadmin Resources]
 *     security: [AdminAuth: []]
 *     parameters:
 *       - in: path, name: model, required: true, schema: { type: string, enum: [admins, merchants, ...] }
 *     responses:
 *       200: { description: List of records }
 */
export const list = async (req: Request, res: Response) => {
  try {
    const result = await genericService.handleAction(
      "list",
      req.params.model,
      { filters: req.query },
      req.user!
    );
    res.json({ data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}/search:
 *   get:
 *     summary: Search records (superadmin only)
 *     parameters: [model, q: query string]
 *     responses: 200: { description: Search results }
 */
export const search = async (req: Request, res: Response) => {
  try {
    const result = await genericService.handleAction(
      "search",
      req.params.model,
      { query: req.query.q as string },
      req.user!
    );
    res.json({ data: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}:
 *   post:
 *     summary: Create record (superadmin only)
 *     requestBody: { required: true, content: { application/json: { schema: { type: object } } } }
 *     responses: 201: { description: New record }
 */
export const create = async (req: Request, res: Response) => {
  try {
    const result = await genericService.handleAction(
      "create",
      req.params.model,
      { data: req.body },
      req.user!
    );
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}/{id}:
 *   get:
 *     summary: Show record (superadmin only)
 *     parameters: [model, id]
 *     responses: 200: { description: Record details }
 */
export const show = async (req: Request, res: Response) => {
  try {
    const result = await genericService.handleAction(
      "show",
      req.params.model,
      { id: req.params.id },
      req.user!
    );
    if (!result) return res.status(404).json({ error: "Record not found" });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}/{id}:
 *   patch:
 *     summary: Update record (superadmin only)
 *     requestBody: { ... }
 *     responses: 200: { description: Updated record }
 */
export const update = async (req: Request, res: Response) => {
  try {
    const result = await genericService.handleAction(
      "update",
      req.params.model,
      { id: req.params.id, data: req.body },
      req.user!
    );
    if (!result) return res.status(404).json({ error: "Record not found" });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}/{id}:
 *   delete:
 *     summary: Delete record (superadmin only)
 *     responses: 204: { description: Deleted }
 */
export const del = async (req: Request, res: Response) => {
  try {
    await genericService.handleAction(
      "delete",
      req.params.model,
      { id: req.params.id },
      req.user!
    );
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /admin/{model}/bulk:
 *   delete:
 *     summary: Bulk delete (superadmin only)
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { ids: { type: array, items: { type: string } } } } } }
 *     responses: 200: { description: Bulk delete result }
 */
export const bulkDelete = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ error: "IDs array required" });
    const result = await genericService.handleAction(
      "bulkDelete",
      req.params.model,
      { ids },
      req.user!
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

```

---
### docs/openapi.ts
- Size: 0.10 KB
- Lines: 4
- Last Modified: 2025-09-30 01:53:37

```typescript
// Swagger generation (placeholder)
export const generateSwagger = () => {
  // Generate docs
};

```

---
### docs/swagger.ts
- Size: 0.72 KB
- Lines: 31
- Last Modified: 2025-09-30 01:53:37

```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API',
      version: '1.0.0',
      description: 'API for merchant admin panel',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        AdminAuth: {
          type: 'http',
          scheme: 'Admin',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ AdminAuth: [] }],  // Global auth for protected routes
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],  // Scan for JSDoc
};

export const specs = swaggerJsdoc(options);
```

---
### middleware/auth.ts
- Size: 1.90 KB
- Lines: 63
- Last Modified: 2025-10-03 20:46:47

```typescript
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";
import { admins } from "../models/admins.js";
import { eq } from "drizzle-orm";
import { config } from "../config/index.js";
//import { AdminRole } from "@/types/roles.js";
import { AdminRole, hasPermission } from "../types/roles"; // Add this import

export const requireRole = (requiredRole: AdminRole) => 
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (req.user.role !== requiredRole) { // Or use hasPermission if needed
      return res.status(403).json({ message: `Requires ${requiredRole} role` });
    }
    next();
  };

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Admin ")) {
    return res
      .status(401)
      .json({ message: "Authentication required: Use Admin <token>" });
  }

  const token = authHeader.substring(6);
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: string;
      role: string;
      email: string;
      username: string;
    };

    // Fetch admin from DB to verify role
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.id, decoded.id));
    if (!admin) {
      return res.status(403).json({ message: "Admin not found" });
    }

    // Attach admin info to request
    req.user = {
      id: admin.id,
      role: admin.role as AdminRole, // Cast to enum
      email: admin.email,
      username: admin.username,
    };
    next();
  } catch (error) {
    console.error("Invalid token:", (error as Error).message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

```

---
### middleware/ratelimit.ts
- Size: 0.33 KB
- Lines: 9
- Last Modified: 2025-09-30 01:53:37

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

---
### middleware/logging.ts
- Size: 0.54 KB
- Lines: 16
- Last Modified: 2025-09-30 12:15:22

```typescript
// Request and audit logging middleware
import { Request, Response, NextFunction } from 'express';
// import { log } from '../utils/logger.js';

// // Logging middleware
// export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   // Log request details
//   log(`${req.method} ${req.url} - ${req.ip}`);

//   // Audit log for sensitive actions (expand as needed)
//   if (req.url.includes('/financial')) {
//     log(`Audit: Financial action by user ${req.user?.id}`);
//   }

//   next();
// };

```

---
### middleware/rbac.ts
- Size: 2.63 KB
- Lines: 106
- Last Modified: 2025-09-30 21:44:02

```typescript
// Role-based access control middleware

import type { Request, Response, NextFunction } from "express";
import { type Permission, hasPermission, AdminRole } from "../types/roles.js";

// Extend Express Request to include user with role
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
        username: string;
      };
    }
  }
}

// Middleware to check if user has required permission
export const requirePermission = (permission: Permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = req.user.role as AdminRole;
    if (!hasPermission(userRole, permission)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        required: permission,
        role: userRole,
      });
    }

    next();
  };
};

// Middleware to check if user has any of the required permissions
export const requireAnyPermission = (permissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = req.user.role as AdminRole;
    const hasAccess = permissions.some((permission) =>
      hasPermission(userRole, permission)
    );

    if (!hasAccess) {
      return res.status(403).json({
        error: "Insufficient permissions",
        required: permissions,
        role: userRole,
      });
    }

    next();
  };
};

// Middleware to check if user has all required permissions
export const requireAllPermissions = (permissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = req.user.role as AdminRole;
    const hasAccess = permissions.every((permission) =>
      hasPermission(userRole, permission)
    );

    if (!hasAccess) {
      return res.status(403).json({
        error: "Insufficient permissions",
        required: permissions,
        role: userRole,
      });
    }

    next();
  };
};

// Middleware to restrict access to super admin only
export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.role !== AdminRole.SUPER_ADMIN) {
    return res.status(403).json({
      error: "Super admin access required",
      role: req.user.role,
    });
  }

  next();
};

```

---
### middleware/webhook.ts
- Size: 0.77 KB
- Lines: 26
- Last Modified: 2025-09-30 21:44:32

```typescript
// Middleware for webhook routes that need raw body for signature verification

import type { Request, Response, NextFunction } from "express";
import express from "express";

// Raw body parser for webhook signature verification
export const rawBodyParser = express.raw({ type: "application/json" });

// Convert raw body back to JSON for processing
export const parseWebhookBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body instanceof Buffer) {
    try {
      // Store raw body for signature verification
      (req as any).rawBody = req.body.toString("utf8");
      // Parse JSON for processing
      req.body = JSON.parse((req as any).rawBody);
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }
  next();
};

```

---
### models/announcement.ts
- Size: 0.32 KB
- Lines: 9
- Last Modified: 2025-09-30 01:53:37

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

---
### models/dispute.ts
- Size: 0.57 KB
- Lines: 15
- Last Modified: 2025-09-30 01:53:37

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

---
### models/settings.ts
- Size: 0.36 KB
- Lines: 9
- Last Modified: 2025-09-30 01:53:37

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

---
### models/admins.ts
- Size: 0.83 KB
- Lines: 31
- Last Modified: 2025-10-01 09:50:40

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
  username: text("username").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt:timestamp("created_at").defaultNow()
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

---
### models/cart.ts
- Size: 0.73 KB
- Lines: 20
- Last Modified: 2025-09-30 12:51:11

```typescript
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { cartItems } from "./cart_item";

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(), // Go uses gorm.Model (uint), but align to uuid for consistency
  userId: uuid("user_id").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartRelations = relations(carts, ({ many, one }) => ({
  cartItems: many(cartItems),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

```

---
### models/cart_item.ts
- Size: 1.10 KB
- Lines: 36
- Last Modified: 2025-09-30 12:51:44

```typescript
import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { carts } from "./cart";
import { products } from "./products";
import { merchants } from "./merchant";
import { variants } from "./variant";

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id").notNull(),
  variantId: uuid("variant_id"),
  productId: uuid("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  merchantId: uuid("merchant_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
  merchant: one(merchants, {
    fields: [cartItems.merchantId],
    references: [merchants.id],
  }),
  variant: one(variants, {
    fields: [cartItems.variantId],
    references: [variants.id],
  }),
}));

```

---
### models/category.ts
- Size: 0.93 KB
- Lines: 27
- Last Modified: 2025-09-30 01:53:37

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

---
### models/inventory.ts
- Size: 1.18 KB
- Lines: 39
- Last Modified: 2025-09-30 12:53:56

```typescript
import {
  pgTable,
  uuid,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { variants } from "./variant";
import { merchants } from "./merchant";

export const inventories = pgTable("inventories", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id"),
  variantId: uuid("variant_id"),
  merchantId: uuid("merchant_id").notNull(),
  quantity: integer("quantity").notNull().default(0),
  reservedQuantity: integer("reserved_quantity").notNull().default(0),
  lowStockThreshold: integer("low_stock_threshold").default(5),
  backorderAllowed: boolean("backorder_allowed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inventoryRelations = relations(inventories, ({ one }) => ({
  product: one(products, {
    fields: [inventories.productId],
    references: [products.id],
  }),
  variant: one(variants, {
    fields: [inventories.variantId],
    references: [variants.id],
  }),
  merchant: one(merchants, {
    fields: [inventories.merchantId],
    references: [merchants.id],
  }),
}));

```

---
### models/media.ts
- Size: 0.69 KB
- Lines: 20
- Last Modified: 2025-09-30 13:06:23

```typescript
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const medias = pgTable("medias", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  url: varchar("url").notNull(),
  type: varchar("type").notNull().default("image"), // enum-like: image, video
  publicId: varchar("public_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mediaRelations = relations(medias, ({ one }) => ({
  product: one(products, {
    fields: [medias.productId],
    references: [products.id],
  }),
}));

```

---
### models/merchant.ts
- Size: 3.47 KB
- Lines: 97
- Last Modified: 2025-09-30 21:59:06

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
import { relations } from "drizzle-orm"; // For FK/relations if needed later
import { sql } from "drizzle-orm";
import { merchantApplication } from "./merchant_applications";
import { products } from "./products";
import { cartItems } from "./cart_item";
import { orderItems } from "./order_item";
import { payouts } from "./payout";

// Merchant table (migrated by TS, queries both)
export const merchants = pgTable(
  "merchant",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id").notNull().unique(),
    merchantId: uuid("merchant_id").notNull().unique(),
    storeName: varchar("store_name", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    personalEmail: varchar("personal_email", { length: 255 })
      .notNull()
      .unique(),
    workEmail: varchar("work_email", { length: 255 }).notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 50 }),
    personalAddress: jsonb("personal_address").notNull(),
    workAddress: jsonb("work_address").notNull(),
    businessType: varchar("business_type", { length: 100 }),
    website: varchar("website", { length: 255 }),
    businessDescription: text("business_description"),
    businessRegistrationNumber: varchar("business_registration_number", {
      length: 255,
    })
      .notNull()
      .unique(),
    businessRegistrationCertificate: varchar(
      "business_registration_certificate",
      { length: 255 }
    ),
    storeLogoUrl: varchar("store_logo_url", { length: 255 }),
    password: varchar("password", { length: 255 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("active"),
    commissionTier: varchar("commission_tier").default("standard"),
    commissionRate: decimal("commission_rate", {
      precision: 10,
      scale: 2,
    }).default("5.00"),
    accountBalance: decimal("account_balance", {
      precision: 15,
      scale: 2,
    }).default("0.00"),
    totalSales: decimal("total_sales", { precision: 15, scale: 2 }).default(
      "0.00"
    ),
    totalPayouts: decimal("total_payouts", { precision: 15, scale: 2 }).default(
      "0.00"
    ),
    //stripeAccountId: text("stripe_account_id"),
    accountId: text("account_id"),
    payoutSchedule: varchar("payout_schedule").default("weekly"),
    lastPayoutDate: timestamp("last_payout_date", { mode: "date" }),
    banner: varchar("banner", { length: 255 }),
    policies: jsonb("policies"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    statusIdx: index("merchant_status_idx").on(table.status), // For filtering active/suspended
  })
);

// Relations for joins (admin API queries)
export const merchantsRelations = relations(merchants, ({ one }) => ({
  application: one(merchantApplication, {
    fields: [merchants.applicationId],
    references: [merchantApplication.id],
  }),
}));

// Add to merchantsRelations
export const merchantsRelations = relations(merchants, ({ many }) => ({
  products: many(products),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  payouts: many(payouts),
  // promotions: many(promotions),
}));

```

---
### models/merchant_applications.ts
- Size: 2.05 KB
- Lines: 49
- Last Modified: 2025-09-30 01:53:37

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

---
### models/order.ts
- Size: 1.10 KB
- Lines: 33
- Last Modified: 2025-09-30 13:00:24

```typescript
import {
  pgTable,
  uuid,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { orderItems } from "./order_item";
import { payments } from "./payment";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  subTotal: decimal("sub_total", { precision: 10, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Pending"),
  shippingMethod: varchar("shipping_method", { length: 50 }),
  couponCode: varchar("coupon_code", { length: 50 }),
  currency: varchar("currency", { length: 3 }).default("NGN"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderRelations = relations(orders, ({ many, one }) => ({
  orderItems: many(orderItems),
  payments: many(payments),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));

```

---
### models/order_item.ts
- Size: 1.15 KB
- Lines: 41
- Last Modified: 2025-09-30 13:01:10

```typescript
import {
  pgTable,
  uuid,
  integer,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { orders } from "./order";
import { products } from "./products";
import { merchants } from "./merchant";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull(),
  productId: uuid("product_id").notNull(),
  merchantId: uuid("merchant_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  fulfillmentStatus: varchar("fulfillment_status", { length: 20 })
    .notNull()
    .default("New"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  merchant: one(merchants, {
    fields: [orderItems.merchantId],
    references: [merchants.id],
  }),
}));

```

---
### models/payment.ts
- Size: 0.89 KB
- Lines: 28
- Last Modified: 2025-09-30 13:02:54

```typescript
import {
  pgTable,
  uuid,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { orders } from "./order";

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN"),
  status: varchar("status", { length: 20 }).notNull().default("Pending"),
  transactionId: varchar("transaction_id", { length: 100 }).unique(),
  authorizationUrl: varchar("authorization_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paymentRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

```

---
### models/payout.ts
- Size: 0.81 KB
- Lines: 26
- Last Modified: 2025-09-30 13:03:34

```typescript
import {
  pgTable,
  uuid,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { merchants } from "./merchant";

export const payouts = pgTable("payouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  merchantId: uuid("merchant_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Pending"),
  payoutAccountId: varchar("payout_account_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payoutRelations = relations(payouts, ({ one }) => ({
  merchant: one(merchants, {
    fields: [payouts.merchantId],
    references: [merchants.id],
  }),
}));

```

---
### models/products.ts
- Size: 1.32 KB
- Lines: 46
- Last Modified: 2025-09-30 13:04:12

```typescript
import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { merchants } from "./merchant";
import { categories } from "./category";
import { variants } from "./variant";
import { medias } from "./media";
import { inventories } from "./inventory";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  merchantId: uuid("merchant_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 100 }).unique().notNull(),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  categoryId: integer("category_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const productRelations = relations(products, ({ one, many }) => ({
  merchant: one(merchants, {
    fields: [products.merchantId],
    references: [merchants.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(variants),
  medias: many(medias),
  simpleInventory: one(inventories, {
    fields: [products.id],
    references: [inventories.productId],
  }),
}));

```

---
### models/promotion.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```typescript

```

---
### models/return_request.ts
- Size: 0.68 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orderItems } from './order_item';

export const returnRequests = pgTable('return_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderItemId: uuid('order_item_id').notNull(),
  reason: text('reason'),
  status: varchar('status').default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const returnRequestRelations = relations(returnRequests, ({ one }) => ({
  orderItem: one(orderItems, {
    fields: [returnRequests.orderItemId],
    references: [orderItems.id],
  }),
}));
```

---
### models/users.ts
- Size: 0.69 KB
- Lines: 20
- Last Modified: 2025-09-30 13:07:27

```typescript
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { carts } from "./cart";
import { orders } from "./order";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email").unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  password: varchar("password"),
  googleId: varchar("google_id"),
  country: varchar("country", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  carts: many(carts),
  orders: many(orders),
}));

```

---
### models/variant.ts
- Size: 1.11 KB
- Lines: 38
- Last Modified: 2025-09-30 13:05:07

```typescript
import {
  pgTable,
  uuid,
  jsonb,
  decimal,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { inventories } from "./inventory";

export const variants = pgTable("variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  sku: varchar("sku", { length: 100 }).unique().notNull(),
  priceAdjustment: decimal("price_adjustment", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  attributes: jsonb("attributes").default({}),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const variantRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
  inventory: one(inventories, {
    fields: [variants.id],
    references: [inventories.variantId],
  }),
}));

```

---
### models/bank_details.ts
- Size: 1.12 KB
- Lines: 30
- Last Modified: 2025-09-30 13:18:40

```typescript
import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { merchants } from "./merchant";

export const merchantBankDetails = pgTable("merchant_bank_details", {
  id: uuid("id").primaryKey().defaultRandom(),
  merchantId: uuid("merchant_id")
    .notNull()
    .references(() => merchants.id, { onDelete: "cascade" })
    .unique(),
  bankName: varchar("bank_name", { length: 100 }),
  bankCode: varchar("bank_code", { length: 3 }),
  accountNumber: varchar("account_number", { length: 10 }),
  accountName: varchar("account_name", { length: 100 }),
  recipientCode: varchar("recipient_code", { length: 50 }),
  currency: varchar("currency", { length: 3 }).default("NGN"),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const merchantBankDetailsRelations = relations(
  merchantBankDetails,
  ({ one }) => ({
    merchant: one(merchants, {
      fields: [merchantBankDetails.merchantId],
      references: [merchants.merchantId],
    }),
  })
);

```

---
### models/order_merchant_split.ts
- Size: 1.19 KB
- Lines: 38
- Last Modified: 2025-09-30 13:15:49

```typescript
import {
  pgTable,
  uuid,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { orders } from "./order";
import { merchants } from "./merchant";

export const orderMerchantSplits = pgTable("order_merchant_splits", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull(), // References orders.id
  merchantId: uuid("merchant_id")
    .notNull()
    .references(() => merchants.id),
  amountDue: decimal("amount_due", { precision: 10, scale: 2 }).notNull(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, payout_requested, paid, reversed
  holdUntil: timestamp("hold_until").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderMerchantSplitRelations = relations(
  orderMerchantSplits,
  ({ one }) => ({
    order: one(orders, {
      fields: [orderMerchantSplits.orderId],
      references: [orders.id],
    }),
    merchant: one(merchants, {
      fields: [orderMerchantSplits.merchantId],
      references: [merchants.id],
    }),
  })
);

```

---
### repositories/announcement_repository.ts
- Size: 0.59 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/dispute_repository.ts
- Size: 0.71 KB
- Lines: 24
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/payout_repository.ts
- Size: 0.56 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/settings_repository.ts
- Size: 0.47 KB
- Lines: 14
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/storage.ts
- Size: 8.55 KB
- Lines: 228
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/category_repository.ts
- Size: 2.71 KB
- Lines: 86
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/merchant_repository.ts
- Size: 7.76 KB
- Lines: 281
- Last Modified: 2025-09-30 01:53:37

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

---
### repositories/order_repository.ts
- Size: 1.28 KB
- Lines: 48
- Last Modified: 2025-09-30 01:53:37

```typescript
// Order queries using Drizzle
import { db } from "../config/database";
//import { orders, products } from "../models/order";
import { eq, and, inArray } from "drizzle-orm";

// Get order by ID
/*
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
*/
```

---
### repositories/bank_details_repository.ts
- Size: 1.08 KB
- Lines: 39
- Last Modified: 2025-10-03 02:33:37

```typescript
import { db } from "../config/database.js";
import { merchantBankDetails } from "../models/bank_details.js";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

type MerchantBankDetails = InferSelectModel<typeof merchantBankDetails>;

export const createBankDetails = async (
  data: Omit<MerchantBankDetails, "id" | "createdAt" | "updatedAt">
) => {
  const [result] = await db
    .insert(merchantBankDetails)
    .values({ ...data })
    .returning();
  return result;
};

export const getBankDetailsByMerchantId = async (merchantId: string) => {
  return await db
    .select()
    .from(merchantBankDetails)
    .where(eq(merchantBankDetails.merchantId, merchantId));
};

export const updateBankDetails = async (
  id: string,
  data: Partial<MerchantBankDetails>
) => {
  const [result] = await db
    .update(merchantBankDetails)
    .set(data)
    .where(eq(merchantBankDetails.id, id))
    .returning();
  return result;
};

export const deleteBankDetails = async (id: string) => {
  await db.delete(merchantBankDetails).where(eq(merchantBankDetails.id, id));
};

```

---
### repositories/generic_repository.ts
- Size: 4.40 KB
- Lines: 121
- Last Modified: 2025-10-03 20:22:00

```typescript
import { db } from "../config/database.js";
import { eq, like, and, SQL } from "drizzle-orm";
import { z } from "zod"; // For validation

// Dynamic import models (assume exported from models/index.ts or direct)
const getModel = (modelName: string) => {
  // Map string to imported model (extend as needed)
  const models = {
    admins: () => import("../models/admins.js").then((m) => m.admins),
    announcements: () =>
      import("../models/announcement.js").then((m) => m.announcements),
    bank_details: () =>
      import("../models/bank_details.js").then((m) => m.merchantBankDetails),
    carts: () => import("../models/cart.js").then((m) => m.carts),
    cart_items: () => import("../models/cart_item.js").then((m) => m.cartItems),
    categories: () => import("../models/category.js").then((m) => m.categories),
    disputes: () => import("../models/dispute.js").then((m) => m.disputes),
    inventories: () =>
      import("../models/inventory.js").then((m) => m.inventories),
    media: () => import("../models/media.js").then((m) => m.medias),
    merchants: () => import("../models/merchant.js").then((m) => m.merchants),
    merchant_applications: () =>
      import("../models/merchant_applications.js").then(
        (m) => m.merchantApplication
      ),
    orders: () => import("../models/order.js").then((m) => m.orders),
    order_items: () =>
      import("../models/order_item.js").then((m) => m.orderItems),
    order_merchant_splits: () =>
      import("../models/order_merchant_split.js").then(
        (m) => m.orderMerchantSplits
      ),
    payments: () => import("../models/payment.js").then((m) => m.payments),
    payouts: () => import("../models/payout.js").then((m) => m.payouts),
    products: () => import("../models/products.js").then((m) => m.products),
    //promotions: () => import("../models/promotion.js").then((m) => m.promotion),
    return_requests: () =>
      import("../models/return_request.js").then((m) => m.returnRequests),
    settings: () => import("../models/settings.js").then((m) => m.settings),
    users: () => import("../models/users.js").then((m) => m.users),
    variants: () => import("../models/variant.js").then((m) => m.variants),
  };
  const model = models[modelName as keyof typeof models];
  if (!model) throw new Error(`Model ${modelName} not supported`);
  return model();
};

export const listRecords = async (
  modelName: string,
  filters?: Record<string, any>,
  limit = 50
) => {
  const Model = await getModel(modelName);
  let query = db.select().from(Model);
  if (filters) {
    const conditions: SQL[] = []; // Import SQL from drizzle-orm if needed
    Object.entries(filters).forEach(([key, value]) => {
      const column = Model[key as keyof typeof Model];
      if (typeof value === "string" && value.includes("%")) {
        conditions.push(like(column, value));
      } else {
        conditions.push(eq(column, value));
      }
    });
    if (conditions.length > 0) {
      query = query.where(and(...conditions)); // Single where, combined with and()
    }
  }
  return await query.limit(limit);
};

export const searchRecords = async (
  modelName: string,
  query: string,
  field = "title"
) => {
  const Model = await getModel(modelName);
  return await db
    .select()
    .from(Model)
    .where(like(Model[field as keyof typeof Model], `%${query}%`));
};

export const createRecord = async (
  modelName: string,
  data: Record<string, any>
) => {
  const { default: Model } = await getModel(modelName);
  const [result] = await db.insert(Model).values(data).returning();
  return result;
};

export const getRecord = async (modelName: string, id: string) => {
  const { default: Model } = await getModel(modelName);
  const [result] = await db.select().from(Model).where(eq(Model.id, id));
  return result || null;
};

export const updateRecord = async (
  modelName: string,
  id: string,
  data: Record<string, any>
) => {
  const Model = await getModel(modelName);
  const [result] = await db
    .update(Model)
    .set(data)
    .where(eq(Model.id, id))
    .returning();
  return result || null;
};

export const deleteRecord = async (modelName: string, id: string) => {
  const { default: Model } = await getModel(modelName);
  await db.delete(Model).where(eq(Model.id, id));
};

export const bulkDeleteRecords = async (modelName: string, ids: string[]) => {
  const { default: Model } = await getModel(modelName);
  await db.delete(Model).where(Model.id.inArray(ids)); // Drizzle's inArray
};

```

---
### routes/admin.ts
- Size: 0.81 KB
- Lines: 32
- Last Modified: 2025-09-30 21:47:06

```typescript
import { Router } from "express";
import * as adminController from "../controllers/admin.js";
import { requireAdmin } from "../middleware/auth.js";
import { requirePermission, requireSuperAdmin } from "../middleware/rbac.js";
import { Permission } from "../types/roles.js";

const router = Router();

// Public routes
router.post("/login", adminController.adminSignIn);

// Protected routes - require authentication
router.use(requireAdmin);

// Admin management routes - require specific permissions
router.get(
  "/admins",
  requirePermission(Permission.VIEW_ADMINS),
  adminController.getAllAdmins
);
router.post(
  "/admins",
  requirePermission(Permission.CREATE_ADMINS),
  adminController.createAdmin
);
router.patch(
  "/admins/:id/role",
  requireSuperAdmin,
  adminController.updateAdminRole
);

export default router;

```

---
### routes/announcement.ts
- Size: 0.34 KB
- Lines: 10
- Last Modified: 2025-09-30 01:53:37

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

---
### routes/category.ts
- Size: 0.58 KB
- Lines: 22
- Last Modified: 2025-09-30 01:53:37

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
} from '../controllers/category.js';

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

---
### routes/dispute.ts
- Size: 0.50 KB
- Lines: 13
- Last Modified: 2025-09-30 01:53:37

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

---
### routes/merchants.ts
- Size: 1.48 KB
- Lines: 36
- Last Modified: 2025-09-30 01:53:37

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

---
### routes/payout.ts
- Size: 0.93 KB
- Lines: 28
- Last Modified: 2025-09-30 21:47:42

```typescript
import { Router } from "express"
import * as payoutController from "../controllers/payout.js"
import { requireAdmin } from "../middleware/auth.js"
import { requirePermission } from "../middleware/rbac.js"
import { Permission } from "../types/roles.js"

const router = Router()

// All payout routes require authentication
router.use(requireAdmin)

// Get all payouts
router.get("/", requirePermission(Permission.VIEW_PAYOUTS), payoutController.getAllPayouts)

// Get merchant payout summary
router.get(
  "/merchant/:merchantId",
  requirePermission(Permission.VIEW_PAYOUTS),
  payoutController.getMerchantPayoutSummary,
)

// Trigger manual payout aggregation
router.post("/aggregate", requirePermission(Permission.PROCESS_PAYOUTS), payoutController.aggregatePayouts)

// Process a specific payout
router.post("/:id/process", requirePermission(Permission.PROCESS_PAYOUTS), payoutController.processPayout)

export default router

```

---
### routes/settings.ts
- Size: 0.25 KB
- Lines: 9
- Last Modified: 2025-09-30 01:53:37

```typescript
// Settings routes
import { Router } from 'express';
import * as controller from '../controllers/settings.js';

const router = Router();
//router.get('/', controller.getSettings);
router.put('/', controller.updateSettings);

export default router;

```

---
### routes/index.ts
- Size: 4.89 KB
- Lines: 131
- Last Modified: 2025-10-03 20:47:38

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
import type { Express } from "express";
import adminRoutes from "./admin.js";
import categoryRoutes from "./category.js";
import merchantRoutes from "./merchants.js";
import settingsRoutes from "./settings.js";
//import authRoutes from "./auth"
import { requireAdmin } from "../middleware/auth.js";
import genericAdminRouter from "./generic_admin.js";
//import { loggingMiddleware } from "../middleware/logging.js"
//import { stripeWebhook } from "../utils/external.js"

export function registerRoutes(app: Express) {
  //app.use(loggingMiddleware)

  //app.use("/api/auth", authRoutes)
  app.use("/adminv", adminRoutes);
  app.use("/api/categories", requireAdmin, categoryRoutes);
  app.use("/api/merchants", requireAdmin, merchantRoutes);
  app.use("/api/settings", requireAdmin, settingsRoutes);

router.use(requireAdmin, requireRole(AdminRole.SUPER_ADMIN)); // Mounts /api/admin/:model/...

  //app.post("/api/webhooks/stripe", stripeWebhook)

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  });

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
          "GET /api/admin/merchants/applications/pending":
            "Get pending applications",
          "POST /api/admin/merchants/applications/:id/approve":
            "Approve application",
          "POST /api/admin/merchants/applications/:id/reject":
            "Reject application",
          "POST /api/admin/merchants/applications/:id/more-info":
            "Request more info",
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
        // webhooks: {
        //   "POST /api/webhooks/stripe": "Stripe webhook handler",
        // },
      },
    });
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { error: err.message }),
    });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
  });
}

```

---
### routes/webhook.ts
- Size: 2.27 KB
- Lines: 77
- Last Modified: 2025-09-30 21:48:27

```typescript
import { Router } from "express"
import crypto from "crypto"
import { config } from "../config/index.js"
import { handleTransferWebhook } from "../services/payout_service.js"
import { logger } from "../utils/logger.js"
import type { Request, Response } from "express"

const router = Router()

// Verify Paystack webhook signature
const verifyPaystackSignature = (req: Request): boolean => {
  const hash = crypto.createHmac("sha512", config.paystack.secretKey).update(JSON.stringify(req.body)).digest("hex")

  return hash === req.headers["x-paystack-signature"]
}

/**
 * @swagger
 * /webhook/paystack:
 *   post:
 *     summary: Paystack webhook endpoint
 *     tags: [Webhook]
 *     description: Receives webhook events from Paystack for transfer status updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid signature
 */
router.post("/paystack", async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (!verifyPaystackSignature(req)) {
      logger.warn("Invalid Paystack webhook signature")
      return res.status(400).json({ error: "Invalid signature" })
    }

    const event = req.body

    logger.info(`Paystack webhook received: ${event.event}`, {
      event: event.event,
      data: event.data,
    })

    // Handle different event types
    switch (event.event) {
      case "transfer.success":
      case "transfer.failed":
      case "transfer.reversed":
        await handleTransferWebhook(event)
        break

      case "charge.success":
        // Handle successful payment (if needed for order processing)
        logger.info("Charge success event received", { reference: event.data.reference })
        break

      default:
        logger.info(`Unhandled webhook event: ${event.event}`)
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({ status: "success" })
  } catch (error: any) {
    logger.error("Error processing Paystack webhook:", error)
    // Still return 200 to prevent Paystack from retrying
    res.status(200).json({ status: "error", message: error.message })
  }
})

export default router

```

---
### routes/generic_admin.ts
- Size: 0.75 KB
- Lines: 26
- Last Modified: 2025-10-03 03:12:37

```typescript
import { Router } from "express";
import {
  list,
  search,
  create,
  show,
  update,
  del,
  bulkDelete,
} from "../controllers/generic_resource.js";
import { authenticateAdmin, requireRole } from "../middleware/auth.js"; // implement requireRole('super_admin') and authenticateAdmin
import { AdminRole } from "../types/roles.js";

const router = Router({ mergeParams: true }); // For {model} param

router.use(authenticateAdmin, requireRole(AdminRole.SUPER_ADMIN)); // Superadmin only

router.get("/:model", list);
router.get("/:model/search", search);
router.post("/:model", create);
router.get("/:model/:id", show);
router.patch("/:model/:id", update);
router.delete("/:model/:id", del);
router.delete("/:model/bulk", bulkDelete);

export default router;

```

---
### services/settings_service.ts
- Size: 0.53 KB
- Lines: 13
- Last Modified: 2025-09-30 01:53:37

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

---
### services/admin_service.ts
- Size: 2.37 KB
- Lines: 101
- Last Modified: 2025-09-30 21:48:46

```typescript
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../config/database.js"
import { admins } from "../models/admins.js"
import { eq } from "drizzle-orm"
import { config } from "../config/index.js"
import type { SignOptions } from "jsonwebtoken"
import type { AdminRole } from "../types/roles.js"

interface AdminLoginPayload {
  id: string
  role: string
  email: string
  username: string
}

export const adminLogin = async (email: string, password: string) => {
  const [admin] = await db.select().from(admins).where(eq(admins.email, email))
  if (!admin) {
    throw new Error("Invalid email")
  }

  const isValidPassword = await bcrypt.compare(password, admin.password)
  if (!isValidPassword) {
    throw new Error("Invalid password")
  }

  const payload: AdminLoginPayload = {
    id: admin.id,
    role: admin.role,
    email: admin.email,
    username: admin.username,
  }
  const options: SignOptions = { expiresIn: config.jwt.expiresIn }
  const token = jwt.sign(payload, config.jwt.secret as string, options)

  return {
    token,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  }
}

export const createAdmin = async (data: {
  username: string
  email: string
  password: string
  role: AdminRole
  createdBy: string
}) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10)

  // Create admin
  const [newAdmin] = await db
    .insert(admins)
    .values({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    })
    .returning()

  return {
    id: newAdmin.id,
    username: newAdmin.username,
    email: newAdmin.email,
    role: newAdmin.role,
  }
}

export const updateAdminRole = async (adminId: string, newRole: AdminRole, updatedBy: string) => {
  const [updatedAdmin] = await db
    .update(admins)
    .set({ role: newRole, updatedAt: new Date() })
    .where(eq(admins.id, adminId))
    .returning()

  return {
    id: updatedAdmin.id,
    username: updatedAdmin.username,
    email: updatedAdmin.email,
    role: updatedAdmin.role,
  }
}

export const getAllAdmins = async () => {
  const allAdmins = await db.select().from(admins)
  return allAdmins.map((admin) => ({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
  }))
}

```

---
### services/announcement_service.ts
- Size: 0.84 KB
- Lines: 21
- Last Modified: 2025-09-30 01:53:37

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

---
### services/category_service.ts
- Size: 8.81 KB
- Lines: 283
- Last Modified: 2025-09-30 01:53:37

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

---
### services/dispute_service.ts
- Size: 2.84 KB
- Lines: 73
- Last Modified: 2025-09-30 01:53:37

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

---
### services/merchant_service.ts
- Size: 10.84 KB
- Lines: 335
- Last Modified: 2025-10-03 20:51:47

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
import {
  sendApprovalEmail,
  sendRejectionEmail,
  requestMoreInfoEmail,
} from "../utils/email";
import { v4 as uuid } from "uuid";
import { db } from "../config/database";
import { merchants } from "../models/merchant";
import { merchantApplication } from "../models/merchant_applications";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import {
  MerchantInsert,
  MerchantApplicationUpdate,
  MerchantUpdate,
} from "../repositories/merchant_repository";
//import { adminLogs } from "../models/admins";
import { validate as uuidValidate } from "uuid";
import { admins } from "../models/admins";
import { config } from "../config";
import { merchantBankDetails } from "../models/bank_details";
const { Paystack } = require("@paystack/paystack-sdk");
const paystack = new Paystack(config.paystack.secretKey);
interface MerchantService {
  getAllMerchants?: (filters?: Record<string, any>) => Promise<any>;
  // Add other methods
}

// Get all applications
export const getAllApplications = async () => repo.getAllApplications();

// Get pending applications
export const getPendingApplications = async () => repo.getPendingApplications();

// Approve application

export const approveApplication = async (id: string, adminId: string) => {
  if (!uuidValidate(adminId)) {
    throw new Error("Invalid adminId: Must be a valid UUID");
  }

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.id, adminId))
    .limit(1);
  if (!admin) {
    throw new Error(`Admin with ID ${adminId} does not exist`);
  }
  return await db.transaction(async (tx) => {
    const [application] = await tx
      .select()
      .from(merchantApplication)
      .where(eq(merchantApplication.id, id));

    if (!application || application.status !== "pending")
      throw new Error("Already processed");

    const recipient = await paystack.transferRecipient.create({
      type: "nuban",
      name: application.name,
      account_number: merchantBankDetails.accountNumber,
      bank_code: merchantBankDetails.bankCode,
      currency: "NGN",
    });
    merchantBankDetails.recipientCode = recipient.data.recipient_code;

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
      businessRegistrationCertificate:
        application.businessRegistrationCertificate,
      storeLogoUrl: application.storeLogoUrl,
      password: await bcrypt.hash(tempPassword, 10),
      //stripeAccountId: stripeAccount.id,
      accountId: "test-seeded-account-" + uuid(),
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
    const [merchant] = await tx
      .insert(merchants)
      .values(merchantData)
      .returning();

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
    await sendApprovalEmail(
      application.workEmail,
      application.storeName,
      tempPassword
    );

    return { application: updatedApp, merchant };
  });
};

// Reject application
export const rejectApplication = async (
  id: string,
  reason: string,
  adminId: string
) => {
  const updateData: MerchantApplicationUpdate = {
    status: "rejected" as const,
    rejectionReason: reason,
    reviewedAt: new Date(),
    reviewedBy: adminId,
  };
  const [updatedApp] = await repo.updateApplication(id, updateData);
  await repo.createAdminLog({
    adminId,
    action: "REJECT_APPLICATION",
    targetType: "application",
    targetId: id,
    details: { reason },
  });
  await sendRejectionEmail(updatedApp.workEmail, reason);
  return updatedApp;
};

// Request more info
export const requestMoreInfo = async (
  id: string,
  message: string,
  adminId: string
) => {
  const updateData: MerchantApplicationUpdate = {
    status: "more_info" as const,
    rejectionReason: message,
    reviewedAt: new Date(),
    reviewedBy: adminId,
  };
  const [updatedApp] = await repo.updateApplication(id, updateData);
  await repo.createAdminLog({
    adminId,
    action: "REQUEST_MORE_INFO",
    targetType: "application",
    targetId: id,
    details: { message },
  });
  await requestMoreInfoEmail(updatedApp.workEmail, message);
  return updatedApp;
};

// Get all merchants
export const getAllMerchants = async () => repo.getAllMerchants();

// Suspend merchant
export const suspendMerchant = async (
  id: string,
  reason: string,
  adminId: string
) => {
  const updateData: MerchantUpdate = {
    status: "suspended" as const,
  };
  const [updated] = await repo.updateMerchant(id, updateData);
  await repo.createAdminLog({
    adminId,
    action: "SUSPEND_MERCHANT",
    targetType: "merchant",
    targetId: id,
    details: { reason },
  });
  return updated;
};

// Update commission tier
export const updateCommissionTier = async (
  id: string,
  tier: string,
  adminId: string
) => {
  const rate = tier === "premium" ? "3.00" : "5.00";
  const updateData: MerchantUpdate = {
    commissionTier: tier,
    commissionRate: rate,
  };
  const [updated] = await repo.updateMerchant(id, updateData);
  await repo.createAdminLog({
    adminId,
    action: "UPDATE_COMMISSION",
    targetType: "merchant",
    targetId: id,
    details: { tier },
  });
  return updated;
};

```

---
### services/notification_service.ts
- Size: 0.43 KB
- Lines: 16
- Last Modified: 2025-09-30 01:53:37

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

---
### services/payout_service.ts
- Size: 10.35 KB
- Lines: 369
- Last Modified: 2025-10-03 01:49:02

```typescript
import { eq, and, lt, sum } from "drizzle-orm";
import { db } from "../config/database.js";
import { payouts } from "../models/payout.js";
import { orderMerchantSplits } from "../models/order_merchant_split.js";
import { merchants } from "../models/merchant.js";
import { config } from "../config/index.js";
import { logger } from "../utils/logger.js";
import {
  sendPayoutNotificationEmail,
  sendPayoutFailedEmail,
} from "../utils/email.js";

const { Paystack } = require("@paystack/paystack-sdk");
const paystack = new Paystack(config.paystack.secretKey);

export const aggregateEligiblePayouts = async () => {
  logger.info("Starting automatic payout aggregation...");

  try {
    // Get all active merchants
    const activeMerchants = await db
      .select()
      .from(merchants)
      .where(eq(merchants.status, "active"));

    const results = [];

    for (const merchant of activeMerchants) {
      // Find eligible splits: status = 'payout_requested' and holdUntil has passed
      const eligibleSplits = await db
        .select()
        .from(orderMerchantSplits)
        .where(
          and(
            eq(orderMerchantSplits.merchantId, merchant.id),
            eq(orderMerchantSplits.status, "payout_requested"),
            lt(orderMerchantSplits.holdUntil, new Date())
          )
        );

      if (eligibleSplits.length === 0) continue;

      // Calculate total amount
      const totalAmount = eligibleSplits.reduce(
        (sum, split) => sum + Number(split.amountDue),
        0
      );

      // Check if merchant has recipient code
      if (!merchant.recipientCode) {
        logger.warn(
          `Merchant ${merchant.id} has no recipient code, skipping payout`
        );
        continue;
      }

      // Create payout record
      const [payout] = await db
        .insert(payouts)
        .values({
          merchantId: merchant.id,
          amount: totalAmount.toFixed(2),
          status: "pending",
          payoutAccountId: merchant.recipientCode,
        })
        .returning();

      logger.info(
        `Created payout ${payout.id} for merchant ${merchant.storeName}: ${totalAmount}`
      );

      results.push({
        payoutId: payout.id,
        merchantId: merchant.id,
        amount: totalAmount,
        splitsCount: eligibleSplits.length,
      });
    }

    logger.info(
      `Payout aggregation complete. Created ${results.length} payouts.`
    );
    return results;
  } catch (error) {
    logger.error("Error during payout aggregation:", error);
    throw error;
  }
};
/*
export const processPayout = async (payoutId: string, adminId?: string) => {
  return await db.transaction(async (tx) => {
    const [payout] = await tx
      .select()
      .from(payouts)
      .where(eq(payouts.id, payoutId));

    if (!payout) throw new Error("Payout not found");
    if (payout.status !== "pending")
      throw new Error(`Payout status is ${payout.status}`);

    // Verify eligible amount from splits
    const eligibleAmount = await tx
      .select({ total: sum(orderMerchantSplits.amountDue) })
      .from(orderMerchantSplits)
      .where(
        and(
          eq(orderMerchantSplits.merchantId, payout.merchantId),
          eq(orderMerchantSplits.status, "payout_requested"),
          lt(orderMerchantSplits.holdUntil, new Date())
        )
      );

    const calculatedAmount = Number(eligibleAmount[0].total || 0);
    if (Math.abs(calculatedAmount - Number(payout.amount)) > 0.01) {
      throw new Error(
        `Amount mismatch: expected ${payout.amount}, got ${calculatedAmount}`
      );
    }

    const [merchant] = await tx
      .select()
      .from(merchants)
      .where(eq(merchants.id, payout.merchantId));

    if (!merchant.recipientCode)
      throw new Error("No recipient code set for merchant");

    // Initiate Paystack transfer
    const transfer = await paystack.transfer.create({
      source: "balance",
      amount: Math.round(Number(payout.amount) * 100), // Convert to kobo
      recipient: merchant.recipientCode,
      reference: `payout_${payout.id}`,
      reason: `Payout for ${merchant.storeName}`,
    });

    // Update payout status
    await tx
      .update(payouts)
      .set({
        status: "processing",
        paystackTransferId: transfer.data.transfer_code,
        updatedAt: new Date(),
      })
      .where(eq(payouts.id, payoutId));

    logger.info(
      `Payout ${payoutId} initiated for merchant ${merchant.storeName}. Transfer code: ${transfer.data.transfer_code}`
    );

    // Send notification email
    await sendPayoutNotificationEmail(
      merchant.workEmail,
      merchant.storeName,
      Number(payout.amount)
    );

    return { payout, transfer: transfer.data };
  });
};
*/

export const processPayout = async (payoutId: string, adminId?: string) => {
  return await db.transaction(async (tx) => {
    const [payout] = await tx
      .select()
      .from(payouts)
      .where(eq(payouts.id, payoutId));

    if (!payout) throw new Error("Payout not found");
    if (payout.status !== "pending")
      throw new Error(`Payout status is ${payout.status}`);

    const [merchant] = await tx
      .select()
      .from(merchants)
      .where(eq(merchants.id, payout.merchantId));

    // Initiate Paystack transfer
    const transfer = await paystack.transfer.create({
      source: "balance",
      amount: Math.round(Number(payout.amount) * 100),
      recipient: merchant.recipientCode,
      reference: `payout_${payout.id}`,
      reason: `Payout for ${merchant.storeName}`,
    });

    await tx
      .update(payouts)
      .set({
        status: "processing",
        paystackTransferId: transfer.data.transfer_code,
        updatedAt: new Date(),
      })
      .where(eq(payouts.id, payoutId));

    await sendPayoutNotificationEmail(
      merchant.workEmail,
      merchant.storeName,
      Number(payout.amount)
    );

    return { payout, transfer: transfer.data };
  });
};

export const handleTransferWebhook = async (event: any) => {
  logger.info(`Received Paystack webhook: ${event.event}`);

  if (event.event === "transfer.success") {
    const transferCode = event.data.transfer_code;
    const [payout] = await db
      .select()
      .from(payouts)
      .where(eq(payouts.paystackTransferId, transferCode));

    if (!payout) {
      logger.warn(`No payout found for transfer code: ${transferCode}`);
      return;
    }

    // Update payout to completed
    await db
      .update(payouts)
      .set({ status: "completed", updatedAt: new Date() })
      .where(eq(payouts.id, payout.id));

    // Mark all related splits as paid
    await db
      .update(orderMerchantSplits)
      .set({ status: "paid", updatedAt: new Date() })
      .where(
        and(
          eq(orderMerchantSplits.merchantId, payout.merchantId),
          eq(orderMerchantSplits.status, "payout_requested")
        )
      );

    // Update merchant totals
    const [merchant] = await db
      .select()
      .from(merchants)
      .where(eq(merchants.id, payout.merchantId));

    await db
      .update(merchants)
      .set({
        totalPayouts: (
          Number(merchant.totalPayouts) + Number(payout.amount)
        ).toFixed(2),
        lastPayoutDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(merchants.id, payout.merchantId));

    logger.info(`Payout ${payout.id} completed successfully`);
  } else if (
    event.event === "transfer.failed" ||
    event.event === "transfer.reversed"
  ) {
    const transferCode = event.data.transfer_code;
    const [payout] = await db
      .select()
      .from(payouts)
      .where(eq(payouts.paystackTransferId, transferCode));

    if (!payout) {
      logger.warn(`No payout found for transfer code: ${transferCode}`);
      return;
    }

    // Update payout to failed
    await db
      .update(payouts)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(payouts.id, payout.id));

    // Reset splits back to payout_requested
    await db
      .update(orderMerchantSplits)
      .set({ status: "payout_requested", updatedAt: new Date() })
      .where(
        and(
          eq(orderMerchantSplits.merchantId, payout.merchantId),
          eq(orderMerchantSplits.status, "payout_requested")
        )
      );

    // Get merchant and send failure notification
    const [merchant] = await db
      .select()
      .from(merchants)
      .where(eq(merchants.id, payout.merchantId));

    await sendPayoutFailedEmail(
      merchant.workEmail,
      merchant.storeName,
      Number(payout.amount),
      event.data.reason || "Unknown error"
    );

    logger.error(`Payout ${payout.id} failed: ${event.data.reason}`);
  }
};

export const getAllPayouts = async (filters?: {
  merchantId?: string;
  status?: string;
  limit?: number;
}) => {
  let query = db.select().from(payouts);

  if (filters?.merchantId) {
    query = query.where(eq(payouts.merchantId, filters.merchantId)) as any;
  }

  if (filters?.status) {
    query = query.where(eq(payouts.status, filters.status)) as any;
  }

  const results = await query.limit(filters?.limit || 100);
  return results;
};

export const getMerchantPayoutSummary = async (merchantId: string) => {
  const [merchant] = await db
    .select()
    .from(merchants)
    .where(eq(merchants.id, merchantId));

  if (!merchant) throw new Error("Merchant not found");

  // Get pending splits
  const pendingSplits = await db
    .select()
    .from(orderMerchantSplits)
    .where(
      and(
        eq(orderMerchantSplits.merchantId, merchantId),
        eq(orderMerchantSplits.status, "payout_requested")
      )
    );

  const pendingAmount = pendingSplits.reduce(
    (sum, split) => sum + Number(split.amountDue),
    0
  );

  // Get recent payouts
  const recentPayouts = await db
    .select()
    .from(payouts)
    .where(eq(payouts.merchantId, merchantId))
    .limit(10);

  return {
    merchant: {
      id: merchant.id,
      storeName: merchant.storeName,
      totalPayouts: merchant.totalPayouts,
      lastPayoutDate: merchant.lastPayoutDate,
    },
    pending: {
      amount: pendingAmount,
      splitsCount: pendingSplits.length,
    },
    recentPayouts,
  };
};

```

---
### services/bank_details_service.ts
- Size: 1.30 KB
- Lines: 38
- Last Modified: 2025-10-03 02:41:50

```typescript
import * as repo from "../repositories/bank_details_repository.js";
//import { paystack } from "../utils/external.js"; // Assume Paystack client
//import type { MerchantBankDetails } from "../types";
import type { InferSelectModel } from "drizzle-orm";
import { merchantBankDetails } from "../models/bank_details.js";
import { config } from "../config/index.js";
const { Paystack } = require("@paystack/paystack-sdk");
const paystack = new Paystack(config.paystack.secretKey);

type MerchantBankDetails = InferSelectModel<typeof merchantBankDetails>;

export const createBankDetails = async (
  data: Omit<MerchantBankDetails, "id">
) => {
  // Validate bank details with Paystack
  const validation = await paystack.misc.resolveAccountNumbers({
    account_number: data.accountNumber,
    bank_code: data.bankCode,
  });
  if (validation.status !== true) throw new Error("Invalid bank details");

  return await repo.createBankDetails(data);
};

export const getBankDetailsByMerchantId = async (merchantId: string) => {
  return await repo.getBankDetailsByMerchantId(merchantId);
};

export const updateBankDetails = async (
  id: string,
  data: Partial<MerchantBankDetails>
) => {
  return await repo.updateBankDetails(id, data);
};

export const deleteBankDetails = async (id: string) => {
  await repo.deleteBankDetails(id);
};

```

---
### services/generic_resource_service.ts
- Size: 2.40 KB
- Lines: 76
- Last Modified: 2025-10-03 20:50:53

```typescript
import * as genericRepo from "../repositories/generic_repository.js";
import { hasPermission } from "../types/roles.js";
import type { AdminRole } from "../types/roles.js";

// Map to specific services (extend for existing ones)
const specificServices = {
  merchants: () => import("./merchant_service.js"),
  categories: () => import("./category_service.js"),
  // ... add others like payouts, disputes, etc.
};

export const handleAction = async (
  action:
    | "list"
    | "search"
    | "create"
    | "show"
    | "update"
    | "delete"
    | "bulkDelete",
  modelName: string,
  params: {
    id?: string;
    query?: string;
    filters?: Record<string, any>;
    data?: Record<string, any>;
    ids?: string[];
  } = {},
  currentUser: { role: AdminRole }
) => {
  if (
    !hasPermission(currentUser.role,Permission.MANAGE_ALL_RESOURCES) &&
    currentUser.role !== AdminRole.SUPER_ADMIN
  ) {
    throw new Error("Insufficient permissions");
  }

  // Delegate to specific service if exists
  const specific = specificServices[modelName as keyof typeof specificServices];
if (specific) {
  const svcModule = await specific(); // Renamed for clarity
  // Use type guard or check existence
  if (action === "list" && typeof (svcModule as any).getAll === 'function') {
    return await (svcModule as any).getAll(params.filters);
  }
  // Add similar checks for other actions, e.g., if it's getAllMerchants:
  // if (action === "list" && typeof (svcModule as any).getAllMerchants === 'function') {
  //   return await (svcModule as any).getAllMerchants(params.filters);
  // }
}
  // Fallback to generic
  switch (action) {
    case "list":
      return await genericRepo.listRecords(modelName, params.filters);
    case "search":
      return await genericRepo.searchRecords(modelName, params.query!);
    case "create":
      return await genericRepo.createRecord(modelName, params.data!);
    case "show":
      return await genericRepo.getRecord(modelName, params.id!);
    case "update":
      return await genericRepo.updateRecord(
        modelName,
        params.id!,
        params.data!
      );
    case "delete":
      await genericRepo.deleteRecord(modelName, params.id!);
      return { success: true };
    case "bulkDelete":
      await genericRepo.bulkDeleteRecords(modelName, params.ids!);
      return { success: true, deleted: params.ids!.length };
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
};

```

---
### utils/external.ts
- Size: 1.09 KB
- Lines: 37
- Last Modified: 2025-09-30 01:53:37

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

---
### utils/validator.ts
- Size: 0.20 KB
- Lines: 8
- Last Modified: 2025-09-30 01:53:37

```typescript
// Input validation using Zod
import { z } from 'zod';

// Example validator for application
export const applicationValidator = z.object({
  storeName: z.string().min(1),
  // Add more fields
});

```

---
### utils/email.ts
- Size: 4.22 KB
- Lines: 171
- Last Modified: 2025-09-30 21:29:23

```typescript
import nodemailer from "nodemailer";
import {
  applicationApprovedTemplate,
  applicationRejectedTemplate,
  moreInfoRequestTemplate,
  payoutInitiatedTemplate,
  payoutCompletedTemplate,
  payoutFailedTemplate,
  merchantSuspendedTemplate,
  weeklyPayoutSummaryTemplate,
} from "./email-templates.js";

// Validate environment variables
const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
];
for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
}

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendApprovalEmail = async (
  email: string,
  storeName: string,
  tempPassword: string
) => {
  const loginUrl =
    process.env.MERCHANT_LOGIN_URL || "https://yourplatform.com/merchant/login";

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `🎉 Your ${storeName} Application Has Been Approved!`,
    html: applicationApprovedTemplate(storeName, email, tempPassword, loginUrl),
  };

  await transporter.sendMail(mailOptions);
};

export const sendRejectionEmail = async (email: string, reason: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Merchant Application Status Update",
    html: applicationRejectedTemplate("Applicant", reason),
  };

  await transporter.sendMail(mailOptions);
};

export const requestMoreInfoEmail = async (email: string, message: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Additional Information Required - Merchant Application",
    html: moreInfoRequestTemplate("Applicant", message),
  };

  await transporter.sendMail(mailOptions);
};

export const sendPayoutNotificationEmail = async (
  email: string,
  storeName: string,
  amount: number
) => {
  const reference = `PAY-${Date.now()}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `💰 Payout Initiated - ${storeName}`,
    html: payoutInitiatedTemplate(storeName, amount, reference),
  };

  await transporter.sendMail(mailOptions);
};

export const sendPayoutFailedEmail = async (
  email: string,
  storeName: string,
  amount: number,
  reason: string
) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `⚠️ Payout Failed - ${storeName}`,
    html: payoutFailedTemplate(storeName, amount, reason),
  };

  await transporter.sendMail(mailOptions);
};

export const sendPayoutCompletedEmail = async (
  email: string,
  storeName: string,
  amount: number
) => {
  const reference = `PAY-${Date.now()}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `✅ Payout Completed - ${storeName}`,
    html: payoutCompletedTemplate(storeName, amount, reference),
  };

  await transporter.sendMail(mailOptions);
};

export const sendMerchantSuspendedEmail = async (
  email: string,
  storeName: string,
  reason: string
) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Account Status Update - ${storeName}`,
    html: merchantSuspendedTemplate(storeName, reason),
  };

  await transporter.sendMail(mailOptions);
};

export const sendWeeklyPayoutSummary = async (
  email: string,
  storeName: string,
  data: {
    weekStart: string;
    weekEnd: string;
    totalSales: number;
    commission: number;
    netPayout: number;
    ordersCount: number;
  }
) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `📊 Weekly Payout Summary - ${storeName}`,
    html: weeklyPayoutSummaryTemplate(
      storeName,
      data.weekStart,
      data.weekEnd,
      data.totalSales,
      data.commission,
      data.netPayout,
      data.ordersCount
    ),
  };

  await transporter.sendMail(mailOptions);
};

```

---
### utils/logger.ts
- Size: 0.63 KB
- Lines: 21
- Last Modified: 2025-09-30 12:15:22

```typescript

// Logging utility for audit and errors
// export const log = (message: string, level = 'info') => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
// };

// src/utils/logger.ts
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

```

---
### utils/email-templates.tsx
- Size: 13.47 KB
- Lines: 497
- Last Modified: 2025-09-30 21:30:13

```plaintext
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

```

---
### types/roles.ts
- Size: 2.48 KB
- Lines: 96
- Last Modified: 2025-10-03 03:00:05

```typescript
// Role-based access control types and permissions

export enum AdminRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export enum Permission {
  // Merchant permissions
  VIEW_MERCHANTS = "view_merchants",
  EDIT_MERCHANTS = "edit_merchants",
  SUSPEND_MERCHANTS = "suspend_merchants",
  DELETE_MERCHANTS = "delete_merchants",

  // Application permissions
  VIEW_APPLICATIONS = "view_applications",
  APPROVE_APPLICATIONS = "approve_applications",
  REJECT_APPLICATIONS = "reject_applications",

  // Payout permissions
  VIEW_PAYOUTS = "view_payouts",
  PROCESS_PAYOUTS = "process_payouts",
  CANCEL_PAYOUTS = "cancel_payouts",

  // Order permissions
  VIEW_ORDERS = "view_orders",
  EDIT_ORDERS = "edit_orders",
  REFUND_ORDERS = "refund_orders",

  // Admin permissions
  VIEW_ADMINS = "view_admins",
  CREATE_ADMINS = "create_admins",
  EDIT_ADMINS = "edit_admins",
  DELETE_ADMINS = "delete_admins",

  // System permissions
  VIEW_LOGS = "view_logs",
  MANAGE_SETTINGS = "manage_settings",
  MANAGE_ALL_RESOURCES = "manage_all_resources",
}

export const RolePermissions: Record<AdminRole, Permission[]> = {
  [AdminRole.SUPER_ADMIN]: Object.values(Permission),
  [AdminRole.ADMIN]: [
    Permission.VIEW_MERCHANTS,
    Permission.EDIT_MERCHANTS,
    Permission.SUSPEND_MERCHANTS,
    Permission.VIEW_APPLICATIONS,
    Permission.APPROVE_APPLICATIONS,
    Permission.REJECT_APPLICATIONS,
    Permission.VIEW_PAYOUTS,
    Permission.PROCESS_PAYOUTS,
    Permission.VIEW_ORDERS,
    Permission.EDIT_ORDERS,
    Permission.REFUND_ORDERS,
    Permission.VIEW_LOGS,
    Permission.MANAGE_ALL_RESOURCES,
  ],
  [AdminRole.EDITOR]: [
    Permission.VIEW_MERCHANTS,
    Permission.EDIT_MERCHANTS,
    Permission.VIEW_APPLICATIONS,
    Permission.VIEW_PAYOUTS,
    Permission.VIEW_ORDERS,
    Permission.EDIT_ORDERS,
  ],
  [AdminRole.VIEWER]: [
    Permission.VIEW_MERCHANTS,
    Permission.VIEW_APPLICATIONS,
    Permission.VIEW_PAYOUTS,
    Permission.VIEW_ORDERS,
  ],
};

export const hasPermission = (
  role: AdminRole,
  permission: Permission
): boolean => {
  return RolePermissions[role]?.includes(permission) || false;
};

export const hasAnyPermission = (
  role: AdminRole,
  permissions: Permission[]
): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

export const hasAllPermissions = (
  role: AdminRole,
  permissions: Permission[]
): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};

```

---
### types/express.d.ts
- Size: 0.24 KB
- Lines: 12
- Last Modified: 2025-10-03 20:16:07

```typescript
import { AdminRole } from "./roles"; // Adjust path if needed

declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: AdminRole; // Now matches enum
      email: string;
      username: string;
    };
  }
}

```

---
### jobs/payout-scheduler.ts
- Size: 1.91 KB
- Lines: 60
- Last Modified: 2025-09-30 21:33:10

```typescript
// Automatic payout scheduler using node-cron

import cron from "node-cron"
import { aggregateEligiblePayouts, processPayout } from "../services/payout_service.js"
import { logger } from "../utils/logger.js"
import { db } from "../config/database.js"
import { payouts } from "../models/payout.js"
import { eq } from "drizzle-orm"

// Run payout aggregation daily at 2 AM
export const startPayoutAggregationScheduler = () => {
  cron.schedule("0 2 * * *", async () => {
    logger.info("Running scheduled payout aggregation...")
    try {
      const results = await aggregateEligiblePayouts()
      logger.info(`Scheduled aggregation created ${results.length} payouts`)
    } catch (error) {
      logger.error("Scheduled payout aggregation failed:", error)
    }
  })

  logger.info("Payout aggregation scheduler started (daily at 2 AM)")
}

// Process pending payouts every hour
export const startPayoutProcessingScheduler = () => {
  cron.schedule("0 * * * *", async () => {
    logger.info("Running scheduled payout processing...")
    try {
      // Get all pending payouts
      const pendingPayouts = await db.select().from(payouts).where(eq(payouts.status, "pending")).limit(50)

      let processed = 0
      let failed = 0

      for (const payout of pendingPayouts) {
        try {
          await processPayout(payout.id)
          processed++
        } catch (error) {
          logger.error(`Failed to process payout ${payout.id}:`, error)
          failed++
        }
      }

      logger.info(`Scheduled payout processing complete. Processed: ${processed}, Failed: ${failed}`)
    } catch (error) {
      logger.error("Scheduled payout processing failed:", error)
    }
  })

  logger.info("Payout processing scheduler started (hourly)")
}

// Start all payout schedulers
export const startPayoutSchedulers = () => {
  startPayoutAggregationScheduler()
  startPayoutProcessingScheduler()
  logger.info("All payout schedulers initialized")
}

```

---

---
## 📊 Summary
- Total files: 79
- Total size: 189.52 KB
- File types: .ts, .tsx
