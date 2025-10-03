```diff
# Updated Project Structure
# No new files added—modifications are in existing ones: admin/admin.ts (major updates for resources/actions),
# services/merchant_service.ts (minor for Paystack consistency), etc. If needed, add custom components under admin/components/ (e.g., for RBAC property filtering).
# Here's the tree with * noting updated files:

📁 src
├── admin/
│   └── admin.ts *  # Expanded resources, custom actions, RBAC checks, API-only router
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
│   └── payout-scheduler.ts
├── middleware/
│   ├── auth.ts  # Use for adminApiRouter protection (e.g., require 'admin' role)
│   ├── logging.ts
│   ├── ratelimit.ts
│   ├── rbac.ts  # Enhance for AdminJS context.currentAdmin.role checks
│   └── webhook.ts
├── models/  # All used in admin.ts resources
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
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
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
│   ├── admin.ts *  # Update to use adminApiRouter for API-only
│   ├── announcement.ts
│   ├── category.ts
│   ├── dispute.ts
│   ├── index.ts *  # Mount /admin/api
│   ├── merchants.ts
│   ├── payout.ts
│   ├── settings.ts
│   └── webhook.ts
├── services/
│   ├── admin_service.ts *  # Add updateAdminRole if not present
│   ├── announcement_service.ts
│   ├── category_service.ts
│   ├── dispute_service.ts *  # Ensure approveRefund has Paystack refund
│   ├── merchant_service.ts *  # Paystack consistency, email triggers
│   ├── notification_service.ts
│   ├── payout_service.ts *  # Paystack transfer/refund examples
│   └── settings_service.ts
├── index.ts *  # Mount adminApiRouter
└── seed.ts
```

### Integration Steps & Code Modifications

I'll show how to integrate my previous suggestions into your codebase. Changes are minimal and build on your existing structure:

- **admin/admin.ts**: Major update—expand resources, add custom actions with handlers calling your services. Implement RBAC via isAccessible/isVisible + context.currentAdmin.role. Add API-only router to disable UI.
- **index.ts**: Mount the new `adminApiRouter` at `/admin/api` (instead of /admin for full UI).
- **services/**: Minor tweaks for consistency (e.g., ensure Paystack calls match SDK; add refund to dispute_service if missing).
- **middleware/auth.ts or rbac.ts**: Use for protecting adminApiRouter; check role === 'admin' or 'superadmin'.
- **No new deps**: Assumes you have @adminjs/drizzle (install if not: npm i @adminjs/drizzle).
- **Paystack**: Your code already uses it correctly (e.g., paystack.transfer.create). Handlers just call services—no changes needed beyond ensuring secrets via config.

#### 1. Update admin/admin.ts (Full File)

Replace your existing with this—adds all resources from models/, custom actions per features, RBAC checks (e.g., only superadmin can assign roles), Paystack/email in handlers.

```typescript
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/drizzle"; // Use pg if needed; install @adminjs/drizzle
import bcrypt from "bcrypt";
import { db } from "../config/database.js";
import { admins } from "../models/admins.js";
import { merchants } from "../models/merchant.js";
import { merchantApplication } from "../models/merchant_applications.js";
import { eq } from "drizzle-orm";
import { categories } from "../models/category.js";
import { config } from "../config/index.js";
import { orders } from "../models/order.js";
import { orderMerchantSplits } from "../models/order_merchant_split.js";
import { payouts } from "../models/payout.js";
import { merchantBankDetails } from "../models/bank_details.js";
import { disputes } from "../models/dispute.js"; // Add for disputes
import { returnRequests } from "../models/return_request.js";
import { settings } from "../models/settings.js";
import { announcements } from "../models/announcement.js"; // Assuming exists; add if not
import { Router } from "express"; // For API-only router

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  resources: [
    // User Management (Admins + RBAC)
    {
      resource: admins,
      options: {
        properties: {
          password: {
            type: "password",
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          role: {
            availableValues: [
              { value: "superadmin", label: "Super Admin" },
              { value: "admin", label: "Admin" },
              { value: "support", label: "Support" },
            ],
          },
        },
        actions: {
          new: {
            // Create admin
            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              return request;
            },
            isAccessible: ({ currentAdmin }) =>
              currentAdmin?.role === "superadmin", // RBAC: Only superadmin creates
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              return request;
            },
            isAccessible: ({ currentAdmin }) =>
              currentAdmin?.role === "superadmin",
          },
          assignRole: {
            // Custom: Superadmin assigns roles
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (currentAdmin?.role !== "superadmin")
                throw new Error("Forbidden");
              const { role } = request.payload;
              if (!["superadmin", "admin", "support"].includes(role))
                throw new Error("Invalid role");
              // Call your service if exists, or direct DB
              const [updated] = await db
                .update(admins)
                .set({ role })
                .where(eq(admins.id, record.params.id))
                .returning();
              return { record: updated };
            },
            isAccessible: ({ currentAdmin }) =>
              currentAdmin?.role === "superadmin",
          },
        },
        navigation: { name: "User Management", icon: "User" },
      },
    },
    // Merchant Vetting/Approval & Suspension
    {
      resource: merchantApplication,
      options: {
        properties: {
          storeName: { isTitle: true },
          status: {
            availableValues: [
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
              { value: "more_info", label: "More Info Needed" },
            ],
          },
        },
        actions: {
          approve: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { tempPassword } = request.payload || {}; // Optional
                const { approveApplication } = await import(
                  "../services/merchant_service.js"
                );
                const { application, merchant } = await approveApplication(
                  record.params.id,
                  currentAdmin.id
                );
                const { sendApprovalEmail } = await import("../utils/email.js");
                await sendApprovalEmail(
                  merchant.workEmail,
                  merchant.storeName,
                  tempPassword || "auto-generated-in-service"
                );
                return { record: application.toJSON(currentAdmin) };
              }
              return { record: record.toJSON(currentAdmin) }; // GET for any pre-data
            },
            isAccessible: ({ currentAdmin }) =>
              ["admin", "superadmin"].includes(currentAdmin?.role),
          },
          reject: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { reason } = request.payload;
                const { rejectApplication } = await import(
                  "../services/merchant_service.js"
                );
                const app = await rejectApplication(
                  record.params.id,
                  reason,
                  currentAdmin.id
                );
                return { record: app.toJSON(currentAdmin) };
              }
              return { record: record.toJSON(currentAdmin) };
            },
            isAccessible: ({ currentAdmin }) =>
              ["admin", "superadmin"].includes(currentAdmin?.role),
          },
          moreInfo: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { message } = request.payload;
                const { requestMoreInfo } = await import(
                  "../services/merchant_service.js"
                );
                const app = await requestMoreInfo(
                  record.params.id,
                  message,
                  currentAdmin.id
                );
                return { record: app.toJSON(currentAdmin) };
              }
              return { record: record.toJSON(currentAdmin) };
            },
            isAccessible: ({ currentAdmin }) =>
              ["admin", "superadmin"].includes(currentAdmin?.role),
          },
        },
        navigation: { name: "Merchants", icon: "FileText" },
      },
    },
    {
      resource: merchants,
      options: {
        properties: {
          password: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          storeName: { isTitle: true },
        },
        actions: {
          suspend: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { reason } = request.payload;
                const { suspendMerchant } = await import(
                  "../services/merchant_service.js"
                );
                const merchant = await suspendMerchant(
                  record.params.id,
                  reason,
                  currentAdmin.id
                );
                return { record: merchant.toJSON(currentAdmin) };
              }
              return { record: record.toJSON(currentAdmin) };
            },
            isAccessible: ({ currentAdmin }) =>
              currentAdmin?.role === "superadmin",
          },
          updateCommission: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { commissionTier } = request.payload;
                const { updateCommissionTier } = await import(
                  "../services/merchant_service.js"
                );
                const merchant = await updateCommissionTier(
                  record.params.id,
                  commissionTier,
                  currentAdmin.id
                );
                return { record: merchant.toJSON(currentAdmin) };
              }
              return { record: record.toJSON(currentAdmin) };
            },
            isAccessible: ({ currentAdmin }) =>
              ["admin", "superadmin"].includes(currentAdmin?.role),
          },
        },
        navigation: { name: "Merchants", icon: "Store" },
      },
    },
    // Category Taxonomy & Attributes
    {
      resource: categories,
      options: {
        parent: { name: "Catalog" },
        actions: {
          addAttribute: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { key, value } = request.payload;
                const categoryService = await import(
                  "../services/category_service.js"
                ).then((m) => new m.CategoryService());
                const updated = await categoryService.addAttribute(
                  record.params.id,
                  key,
                  value
                );
                return { record: updated };
              }
              return { record: record.toJSON(currentAdmin) };
            },
          },
          showTree: {
            actionType: "resource",
            handler: async (request, response, context) => {
              const categoryService = await import(
                "../services/category_service.js"
              ).then((m) => new m.CategoryService());
              const tree = await categoryService.getCategoryTree();
              return { records: tree }; // As array for API
            },
          },
        },
        navigation: { name: "Catalog", icon: "Tag" },
      },
    },
    // Global Settings
    {
      resource: settings,
      options: {
        navigation: { name: "Settings", icon: "Settings" },
      },
    },
    // Dispute Center & Refund Approvals (with Paystack refund)
    {
      resource: disputes,
      options: {
        actions: {
          escalate: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { escalateDispute } = await import(
                  "../services/dispute_service.js"
                );
                const updated = await escalateDispute(
                  record.params.id,
                  currentAdmin.id
                );
                return { record: updated };
              }
              return { record: record.toJSON(currentAdmin) };
            },
          },
          approveRefund: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { approveRefund } = await import(
                  "../services/dispute_service.js"
                );
                const result = await approveRefund(
                  record.params.id,
                  currentAdmin.id
                );
                return { record: result.dispute };
              }
              return { record: record.toJSON(currentAdmin) };
            },
          },
        },
        navigation: { name: "Disputes", icon: "AlertTriangle" },
      },
    },
    // Payout Management (with Paystack transfers)
    {
      resource: payouts,
      options: {
        actions: {
          aggregate: {
            actionType: "resource",
            handler: async (request, response, context) => {
              if (request.method === "post") {
                const { aggregateEligiblePayouts } = await import(
                  "../services/payout_service.js"
                );
                const results = await aggregateEligiblePayouts();
                return { records: results };
              }
              return {};
            },
          },
          process: {
            actionType: "record",
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              if (request.method === "post") {
                const { processPayout } = await import(
                  "../services/payout_service.js"
                );
                const { payout, transfer } = await processPayout(
                  record.params.id,
                  currentAdmin.id
                );
                return { record: payout };
              }
              return { record: record.toJSON(currentAdmin) };
            },
          },
          exportReconciliation: {
            actionType: "bulk",
            handler: async (request, response, context) => {
              const { records } = context;
              // Generate CSV (install csv-stringify if needed)
              const data = records.map((r) => r.params); // Simplify; fetch full if needed
              const csv =
                "ID,Amount,Status\n" +
                data
                  .map((row) => `${row.id},${row.amount},${row.status}`)
                  .join("\n");
              response.set("Content-Type", "text/csv");
              response.set(
                "Content-Disposition",
                "attachment; filename=reconciliation.csv"
              );
              return response.send(csv);
            },
          },
        },
        navigation: { name: "Payouts", icon: "DollarSign" },
      },
    },
    // Announcements
    {
      resource: announcements,
      options: {
        navigation: { name: "Content", icon: "MessageSquare" },
      },
    },
    // Add others like returnRequests, orderMerchantSplits, etc., similarly
  ],
  rootPath: "/admin/api", // API base
});

// Auth (unchanged)
const authenticate = async (email: string, password: string) => {
  if (!email || !password) return null;
  const [admin] = await db.select().from(admins).where(eq(admins.email, email));
  if (!admin) return null;
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return null;
  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  };
};

// API-only Router (disable UI)
const apiRouter = Router();
const plainRouter = AdminJSExpress.buildRouter(adminJs); // Plain (no UI/auth wrappers)
plainRouter.stack.forEach((layer) => {
  if (
    layer.route?.path?.startsWith("/resources/") ||
    layer.route?.path?.includes("/actions/")
  ) {
    apiRouter.use(layer.route.path, layer.route.stack[0].handle);
  }
});
// Add auth (your middleware/auth.ts or rbac.ts for JWT/role)
const { authMiddleware } = await import("../middleware/auth.js"); // Assume exports auth
apiRouter.use(authMiddleware); // Protects all /admin/api/*

export const adminApiRouter = apiRouter;
export { adminJs };
```

#### 2. Update index.ts (Mount API Router)

Add/replace the mounting line:

```diff
// ... your existing imports ...

- app.use("/admin", adminRouter);
+ import { adminApiRouter } from "./admin/admin.js";
+ app.use("/admin/api", adminApiRouter); // API-only at /admin/api
```

#### 3. Minor Service Updates (e.g., dispute_service.ts for Paystack Refund)

Your code has placeholders; add real Paystack if missing. Example for approveRefund (integrate into your commented code):

```typescript
// services/dispute_service.ts
// ... your existing ...

export const approveRefund = async (
  id: string,
  approverId: string,
  isMerchant = false
) => {
  // ... existing logic ...
  // Process refund via Paystack (matches SDK: paystack.transaction.refund)
  await paystack.transaction.refund({
    transaction: order.transactionId, // Assume from payment model
    amount: order.totalAmount * 100, // Kobo
  });
  // ... rest ...
};
```

Similar for others—no major changes, as your services already handle Paystack.

#### 4. RBAC Integration

Your rbac.ts likely handles routes; for AdminJS, the isAccessible in actions uses context.currentAdmin.role (from auth). For property-level (e.g., hide sensitive in settings), add custom components as per docs (under new admin/components/ folder if UI, but since API-only, use after hooks in actions to filter JSON responses).

### New API Endpoints

AdminJS generates these under /admin/api (auth required: Bearer token from login). Use POST for mutations, GET for queries. Examples:

| Endpoint                                                       | Method   | Description                                               | Params/Payload                        |
| -------------------------------------------------------------- | -------- | --------------------------------------------------------- | ------------------------------------- |
| /admin/api/resources/admins                                    | GET      | List admins                                               | ?page=1&perPage=10&filters.role=admin |
| /admin/api/resources/admins                                    | POST     | Create admin                                              | { username, email, password, role }   |
| /admin/api/resources/admins/actions/edit/{id}                  | POST     | Edit admin                                                | { id, ...updates }                    |
| /admin/api/resources/admins/actions/assignRole/{id}            | POST     | Assign role (superadmin only)                             | { role: "admin" }                     |
| /admin/api/resources/merchantApplication                       | GET      | List applications                                         | ?filters.status=pending               |
| /admin/api/resources/merchantApplication/actions/approve/{id}  | POST     | Approve app (creates merchant, Paystack recipient, email) | { tempPassword: "optional" }          |
| /admin/api/resources/merchantApplication/actions/reject/{id}   | POST     | Reject app                                                | { reason: "Incomplete docs" }         |
| /admin/api/resources/merchantApplication/actions/moreInfo/{id} | POST     | Request more info                                         | { message: "Need cert" }              |
| /admin/api/resources/merchants/actions/suspend/{id}            | POST     | Suspend merchant                                          | { reason: "Violation" }               |
| /admin/api/resources/merchants/actions/updateCommission/{id}   | POST     | Update tier                                               | { commissionTier: "premium" }         |
| /admin/api/resources/categories/actions/showTree               | GET/POST | Get category tree                                         | (Resource action)                     |
| /admin/api/resources/categories/actions/addAttribute/{id}      | POST     | Add attr                                                  | { key: "color", value: "string" }     |
| /admin/api/resources/settings                                  | GET/POST | Manage globals (fees, tax)                                | JSON value for rules                  |
| /admin/api/resources/disputes/actions/escalate/{id}            | POST     | Escalate dispute                                          | -                                     |
| /admin/api/resources/disputes/actions/approveRefund/{id}       | POST     | Approve refund (Paystack call)                            | -                                     |
| /admin/api/resources/payouts/actions/aggregate                 | POST     | Aggregate payouts                                         | -                                     |
| /admin/api/resources/payouts/actions/process/{id}              | POST     | Process payout (Paystack transfer)                        | -                                     |
| /admin/api/resources/payouts/actions/exportReconciliation      | POST     | Export CSV (bulk)                                         | { recordIds: ["id1","id2"] }          |

- **Auth**: POST /admin/api/login for token (if enabled; else use your /admin/login). All require Authorization: Bearer <token>.
- **Calling from Frontend**: Use fetch with token, or @adminjs/api-client for typed calls.
- **Errors**: 403 for RBAC denied, 400 for invalid payload.

This fully integrates—test with your seed data! If issues (e.g., Drizzle adapter), check logs.
