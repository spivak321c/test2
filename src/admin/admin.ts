import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';  // Note: Use the non-scoped version if you have issues with @adminjs/express
import { Database, Resource } from 'adminjs-drizzle/pg';  // ✅ PostgreSQL-specific import
import bcrypt from 'bcrypt';  // For password comparison
import { db } from '../config/database';  // Your Drizzle instance (with Neon Pool)
import { admins } from '../models/admins';
import { merchants } from '../models/merchant';
import { merchantApplication } from '../models/merchant_applications';
import { eq } from 'drizzle-orm';
import { categories } from '../models/category';
import { config } from '../config/index';  // Your JWT config
// Import other models as needed (e.g., import { orders } from '../models/order';)

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

// Build authenticated router (handles /admin/login, sessions via cookies)
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate,
  cookiePassword: config.jwt.secret,  // Secure session cookie with your JWT secret
});

// Optional: Apply your existing requireAdmin middleware for extra layer
// import { requireAdmin } from '../middleware/auth';
// adminRouter.use(requireAdmin);

export { adminJs };