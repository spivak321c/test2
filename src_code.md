# Codebase Analysis: src
Generated: 2025-09-30 12:34:30
---

## 📂 Project Structure
```tree
📁 src
├── admin/
│   └── admin.ts
├── config/
│   ├── database.ts
│   └── index.ts
├── controllers/
│   ├── admin.ts
│   ├── announcement.ts
│   ├── category.ts
│   ├── dispute.ts
│   ├── merchant.ts
│   ├── payout.ts
│   └── settings.ts
├── docs/
│   ├── openapi.ts
│   └── swagger.ts
├── jobs/
│   ├── notification_job.ts
│   └── payout_job.ts
├── middleware/
│   ├── auth.ts
│   ├── logging.ts
│   └── ratelimit.ts
├── models/
│   ├── admins.ts
│   ├── announcement.ts
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
│   ├── category_repository.ts
│   ├── dispute_repository.ts
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
│   ├── index.ts
│   ├── merchants.ts
│   ├── payout.ts
│   └── settings.ts
├── services/
│   ├── admin_service.ts
│   ├── announcement_service.ts
│   ├── category_service.ts
│   ├── dispute_service.ts
│   ├── merchant_service.ts
│   ├── notification_service.ts
│   ├── payout_service.ts
│   └── settings_service.ts
├── tests/
│   ├── e2e/
│   │   ├── category.test.ts
│   │   ├── dispute.test.ts
│   │   ├── payout.test.js
│   │   └── payout.test.ts
│   ├── integration/
│   │   └── merchant_controller.test.js
│   ├── mocks/
│   │   └── payment_mock.js
│   └── unit/
│       └── dispute_service.test.js
├── utils/
│   ├── email.ts
│   ├── external.ts
│   ├── logger.ts
│   └── validator.ts
├── bundle-admin.ts
├── index.ts
└── seed.ts
```
---

## 📄 File Contents
### bundle-admin.ts
- Size: 0.32 KB
- Lines: 12
- Last Modified: 2025-09-30 01:53:37

```typescript
 /*
 import { bundle } from '@adminjs/bundler';

 (async () => {
   await bundle({
     destinationDir: 'dist/adminjs-bundle', // Output to this dir (relative to CWD)
   });
   console.log('✅ AdminJS bundle generated in dist/adminjs-bundle');
 })().catch(err => {
   console.error('❌ Bundle error:', err.message);
 });
 */
```

---
### index.ts
- Size: 4.29 KB
- Lines: 157
- Last Modified: 2025-09-30 12:15:22

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

const app = express()



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
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//app.use(express.raw({ type: "application/webhook+json" }))
//app.use(loggingMiddleware)
//import { adminRouter } from './admin/admin';  // New import


app.use('/admin', adminRouter);

// TEST ENDPOINT: Add this temporarily to confirm Express routing works
app.get('/test-admin', (req, res) => res.json({ message: 'Admin route base is working!' }));

registerRoutes(app)

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);



export default app;

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
- Size: 1.41 KB
- Lines: 42
- Last Modified: 2025-09-30 01:53:37

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
import { merchants } from '../models/merchant.js';
import { merchantApplication } from '../models/merchant_applications.js';
import { adminLogs,admins } from '../models/admins.js';

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

---
### config/index.ts
- Size: 2.66 KB
- Lines: 100
- Last Modified: 2025-09-30 01:53:37

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





/*
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
*/


import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"];

for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "5000"),
  jwt: {
    secret: process.env.JWT_SECRET as string, // Explicitly type as string
    expiresIn: "24h" as const, // Use 'as const' for literal type
  },
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number.parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    from: process.env.SMTP_FROM as string,
    secure: process.env.SMTP_SECURE === "true",
  },
};
```

---
### controllers/admin.ts
- Size: 1.52 KB
- Lines: 58
- Last Modified: 2025-09-30 01:53:37

```typescript
import type { Request, Response } from 'express';
import * as adminService from '../services/admin_service';




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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
export const adminSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { token, user } = await adminService.adminLogin(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
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
- Last Modified: 2025-09-30 01:53:37

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
- Size: 0.86 KB
- Lines: 26
- Last Modified: 2025-09-30 01:53:37

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
### jobs/notification_job.ts
- Size: 0.20 KB
- Lines: 6
- Last Modified: 2025-09-30 01:53:37

```typescript
// import { sendNotification } from '../services/notification_service';

// // Set interval for notifications
// setInterval(async () => {
//   await sendNotification();
// }, 60000); // Every minute
```

---
### jobs/payout_job.ts
- Size: 0.28 KB
- Lines: 8
- Last Modified: 2025-09-30 01:53:37

```typescript
// // Nightly payout aggregation job
// import { runPayout } from '../services/payout_service';

// // Run daily (use cron in production)
// setInterval(async () => {
//   console.log('Running nightly payout');
//   await runPayout();
// }, 24 * 60 * 60 * 1000); // 24 hours

```

---
### middleware/auth.ts
- Size: 5.10 KB
- Lines: 159
- Last Modified: 2025-09-30 01:53:37

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
/*
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
*/

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { admins } from '../models/admins.js';
import { eq } from 'drizzle-orm';
import { config } from '../config/index.js';

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Admin ')) {
    return res.status(401).json({ message: 'Authentication required: Use Admin <token>' });
  }

  // Extract and validate JWT
  const token = authHeader.substring(6); // 'Admin ' is 6 chars
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string; role: string; email: string; username: string };
    
    // Fetch admin from DB to verify role (prevents tampering)
    const [admin] = await db.select().from(admins).where(eq(admins.id, decoded.id));
    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Attach decoded payload to req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      username: decoded.username,
    };
    next();
  } catch (error) {
    console.error('Invalid token:', (error as Error).message);
    return res.status(401).json({ message: 'Invalid token' });
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
- Size: 0.78 KB
- Lines: 30
- Last Modified: 2025-09-30 01:53:37

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
- Size: 0.66 KB
- Lines: 20
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { cartItems } from './cart_item';

export const carts = pgTable('carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 0.95 KB
- Lines: 30
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { carts } from './cart';
import { products } from './products';
import { merchants } from './merchant_applications';

export const cartItems = pgTable('cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  cartId: uuid('cart_id').notNull(),
  productId: uuid('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  merchantId: uuid('merchant_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 0.69 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const inventories = pgTable('inventories', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull(),
  stockQuantity: integer('stock_quantity').notNull(),
  lowStockThreshold: integer('low_stock_threshold').notNull().default(10),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const inventoryRelations = relations(inventories, ({ one }) => ({
  product: one(products, {
    fields: [inventories.productId],
    references: [products.id],
  }),
}));
```

---
### models/media.ts
- Size: 0.66 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const medias = pgTable('medias', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  type: varchar('type', { length: 20 }).notNull().default('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 3.12 KB
- Lines: 72
- Last Modified: 2025-09-30 01:53:37

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


// Add to merchantsRelations
// export const merchantsRelations = relations(merchants, ({ many }) => ({
//   products: many(products),
//   cartItems: many(cartItems),
//   orderItems: many(orderItems),
//   payouts: many(payouts),
//   promotions: many(promotions),
// }));


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
- Size: 2.28 KB
- Lines: 58
- Last Modified: 2025-09-30 01:53:37

```typescript
// Order schema (shared with Golang APIs)
//import { pgTable, varchar, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';


/*export const products = pgTable('products', {
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
*/

// Note: Your existing 'orders' in order.ts seems to match GORM's OrderItem more closely.
// This is a new definition matching GORM's Order struct.

import { pgTable, uuid, decimal, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orderItems } from './order_item';
import { payments } from './payment';
import { users } from './users';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 20 }).notNull().default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 1.12 KB
- Lines: 32
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, integer, decimal, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orders } from './order';
import { products } from './products';
import { merchants } from './merchant';

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull(),
  productId: uuid('product_id').notNull(),
  merchantId: uuid('merchant_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  fulfillmentStatus: varchar('fulfillment_status', { length: 20 }).notNull().default('New'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 0.68 KB
- Lines: 19
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, decimal, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orders } from './order';

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
- Size: 0.64 KB
- Lines: 20
- Last Modified: 2025-09-30 01:53:37

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


// Add relation
// export const payoutRelations = relations(payouts, ({ one }) => ({
//   merchant: one(merchants, {
//     fields: [payouts.merchantId],
//     references: [merchants.id],
//   }),
// }));
```

---
### models/products.ts
- Size: 3.13 KB
- Lines: 82
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, varchar, text, decimal, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { merchants } from './merchant';
import { categories } from './category';
import { variants } from './variant';
import { medias } from './media';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  merchantId: uuid('merchant_id').notNull().$type<string>(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  sku: varchar('sku', { length: 100 }).unique().notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  deletedAt: timestamp('deleted_at', { mode: 'date' }),
}, (table) => ({
  merchantIdIdx: index('products_merchant_id_idx').on(table.merchantId),
  skuIdx: index('products_sku_idx').on(table.sku),
  categoryIdIdx: index('products_category_id_idx').on(table.categoryId),
  deletedAtIdx: index('products_deleted_at_idx').on(table.deletedAt),
}));

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

 // inventory: one(inventories, { fields: [products.id], references: [inventories.productId] }),
}));






// export const variants = pgTable('variants', {
//   id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
//   productId: uuid('product_id').notNull(),
//   attributes: jsonb('attributes').default(sql`'{}'::jsonb`),
//   price: decimal('price', { precision: 10, scale: 2 }).notNull(),
//   sku: varchar('sku', { length: 100 }).unique().notNull(),
//   createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
//   updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
// }, (table) => ({
//   productIdIdx: index('variants_product_id_idx').on(table.productId),
//   skuIdx: index('variants_sku_idx').on(table.sku),
// }));

// export const variantRelations = relations(variants, ({ one }) => ({
//   product: one(products, {
//     fields: [variants.productId],
//     references: [products.id],
//   }),
// }));

// export const medias = pgTable('medias', {
//   id: uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
//   productId: uuid('product_id').notNull(),
//   url: varchar('url', { length: 500 }).notNull(),
//   type: varchar('type', { length: 20 }).notNull().default('image'),
//   createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
//   updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
// }, (table) => ({
//   productIdIdx: index('medias_product_id_idx').on(table.productId),
// }));

// export const mediaRelations = relations(medias, ({ one }) => ({
//   product: one(products, {
//     fields: [medias.productId],
//     references: [products.id],
//   }),
// }));
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
- Size: 0.83 KB
- Lines: 29
- Last Modified: 2025-09-30 01:53:37

```typescript
import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
import { carts } from "./cart";
import { orders } from "./order";

// Update existing users table definition
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(), // Change to uuid if not already
  email: varchar('email').unique().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  password: varchar('password'), // Can be null for OAuth
  googleId: varchar('google_id'),
  country: varchar('country', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// export const userRelations = relations(users, ({ many }) => ({
//   carts: many(carts),
//   orders: many(orders),
// }));
```

---
### models/variant.ts
- Size: 0.74 KB
- Lines: 20
- Last Modified: 2025-09-30 01:53:37

```typescript
import { pgTable, uuid, jsonb, decimal, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const variants = pgTable('variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull(),
  attributes: jsonb('attributes').default({}),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  sku: varchar('sku', { length: 100 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const variantRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));
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
### routes/admin.ts
- Size: 0.17 KB
- Lines: 8
- Last Modified: 2025-09-30 01:53:37

```typescript
import { Router } from 'express';
import { adminSignIn } from '../controllers/admin.js';

const router = Router();

router.post('/login', adminSignIn);

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
- Size: 0.31 KB
- Lines: 12
- Last Modified: 2025-09-30 01:53:37

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
- Size: 4.69 KB
- Lines: 124
- Last Modified: 2025-09-30 12:15:22

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
import adminRoutes from './admin.js';
import categoryRoutes from "./category.js"
import merchantRoutes from "./merchants.js"
import settingsRoutes from "./settings.js"
//import authRoutes from "./auth"
import { requireAdmin } from "../middleware/auth.js"
//import { loggingMiddleware } from "../middleware/logging.js"
//import { stripeWebhook } from "../utils/external.js"

export function registerRoutes(app: Express) {
  //app.use(loggingMiddleware)

  //app.use("/api/auth", authRoutes)
  app.use('/adminv', adminRoutes);
  app.use("/api/admin/categories", requireAdmin, categoryRoutes)
  app.use("/api/admin/merchants", requireAdmin, merchantRoutes)
  app.use("/api/admin/settings", requireAdmin, settingsRoutes)

  //app.post("/api/webhooks/stripe", stripeWebhook)

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
        // webhooks: {
        //   "POST /api/webhooks/stripe": "Stripe webhook handler",
        // },
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
- Size: 1.19 KB
- Lines: 48
- Last Modified: 2025-09-30 01:53:37

```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { admins } from '../models/admins';
import { eq } from 'drizzle-orm';
import { config } from '../config/index';
import { SignOptions } from 'jsonwebtoken';

interface AdminLoginPayload {
  id: string;
  role: string;
  email: string;
  username: string;
}

export const adminLogin = async (email: string, password: string) => {
  // Fetch admin by email
  const [admin] = await db.select().from(admins).where(eq(admins.email, email));
  if (!admin) {
    throw new Error('Invalid email ');
  }

  // Validate password
  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  // Generate JWT
  const payload: AdminLoginPayload = {
    id: admin.id,
    role: admin.role,
    email: admin.email,
    username: admin.username,
  };
  const options: SignOptions = { expiresIn: config.jwt.expiresIn };
  const token = jwt.sign(payload, config.jwt.secret as string, options);

  return {
    token,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
};
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
- Size: 10.11 KB
- Lines: 270
- Last Modified: 2025-09-30 01:53:37

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
- Size: 1.81 KB
- Lines: 54
- Last Modified: 2025-09-30 01:53:37

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

---
### tests/e2e/category.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```typescript

```

---
### tests/e2e/dispute.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```typescript

```

---
### tests/e2e/payout.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```javascript

```

---
### tests/e2e/payout.test.ts
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```typescript

```

---
### tests/integration/merchant_controller.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```javascript

```

---
### tests/mocks/payment_mock.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```javascript

```

---
### tests/unit/dispute_service.test.js
- Size: 0.00 KB
- Lines: 0
- Last Modified: 2025-09-30 01:53:37

```javascript

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
- Size: 6.92 KB
- Lines: 183
- Last Modified: 2025-09-30 01:53:37

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
### admin/admin.ts
- Size: 3.32 KB
- Lines: 92
- Last Modified: 2025-09-30 01:53:37

```typescript
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';  // Note: Use the non-scoped version if you have issues with @adminjs/express
import { Database, Resource } from 'adminjs-drizzle/pg';  // 
import bcrypt from 'bcrypt';  // For password comparison
import { db } from '../config/database.js';  // Your Drizzle instance (with Neon Pool)
import { admins } from '../models/admins.js';
import { merchants } from '../models/merchant.js';
import { merchantApplication } from '../models/merchant_applications.js';
import { eq } from 'drizzle-orm';
import { categories } from '../models/category.js';
import { config } from '../config/index.js';  // Your JWT config
// Import other models as needed (e.g., import { orders } from '../models/order';)


//process.env.ADMIN_JS_SKIP_BUNDLE = "true"; // String "true"

process.env.ADMIN_JS_TMP_DIR = process.env.ADMIN_JS_TMP_DIR || "/tmp";
console.log("🔍 AdminJS bundle dir:", process.env.ADMIN_JS_TMP_DIR);

// Register the adapter with AdminJS
AdminJS.registerAdapter({ Database, Resource });

// Initialize AdminJS
// Option 1: Specify resources individually (safer for control)
const adminJs = new AdminJS({
  resources: [
    { resource: { table: admins, db }, options: { properties: { password: { isVisible: true } } } },  // Hide sensitive fields
    { resource: { table: merchants, db }, options: { properties: { password: { isVisible: true } } } },
    { resource: { table: merchantApplication, db } },
    { resource: { table: categories, db } },
    // Add more: { resource: { table: orders, db } },
  ],
  rootPath: '/admin',
  branding: { companyName: 'Your Merchant Admin' },
 
});

// Option 2: If you prefer database-level (uncomment if above doesn't fit)
// const adminJs = new AdminJS({
//   databases: [{ database: db, schema: [admins, merchants, merchantApplication, categories] }],
//   rootPath: '/admin',
//   branding: { companyName: 'Your Merchant Admin' },
// });




// Build the router (add auth later as per previous steps)
//export const adminRouter = AdminJSExpress.buildRouter(adminJs);



// Auth handler: Verify email/password against your admins table
const authenticate = async (email: string, password: string) => {
  if (!email || !password) return null;
  
  // Query admin by email
  const [admin] = await db.select().from(admins).where(eq(admins.email, email));
  if (!admin) return null;
  
  // Compare hashed password
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return null;
  
  // Return user object for AdminJS session (include role)
  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,  // e.g., 'admin' or 'editor'
  };
};

// const sessionOptions = {
//   secret: config.jwt.secret,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production", httpOnly: true },
// };


// Build authenticated router (handles /admin/login, sessions via cookies)
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate,
  cookiePassword: config.jwt.secret,  // Secure session cookie with your JWT secret
});

// Optional: Apply your existing requireAdmin middleware for extra layer
// import { requireAdmin } from '../middleware/auth';
// adminRouter.use(requireAdmin);

export { adminJs };
```

---

---
## 📊 Summary
- Total files: 75
- Total size: 147.53 KB
- File types: .js, .ts
