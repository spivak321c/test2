// Merchant schema, including applications and merchants
import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";

export const merchantApplications = pgTable("merchant_applications", {
  id: varchar("id").primaryKey(),
  storeName: text("store_name").notNull(),
  registrantName: text("registrant_name").notNull(),
  personalEmail: text("personal_email").notNull(),
  workEmail: text("work_email").notNull(),
  personalAddress: jsonb("personal_address").notNull(),
  workAddress: jsonb("work_address").notNull(),
  businessRegistrationNumber: text("business_registration_number").notNull(),
  certificate: text("certificate"), // URL or base64 for business cert
  logo: text("logo"), // URL for store logo
  category: text("category").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"),
  rejectionReason: text("rejection_reason"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by"),
});

export const merchants = pgTable("merchants", {
  id: varchar("id").primaryKey(),
  merchantId: varchar("merchant_id").notNull(),
  applicationId: varchar("application_id").notNull(),
  storeName: text("store_name").notNull(),
  status: text("status").notNull().default("active"),
  commissionTier: text("commission_tier").notNull().default("standard"),
  commissionRate: decimal("commission_rate").notNull().default("5.00"),
  totalSales: decimal("total_sales").notNull().default("0.00"),
  stripeAccountId: text("stripe_account_id"), // For payment splits
  createdAt: timestamp("created_at").defaultNow(),
});
