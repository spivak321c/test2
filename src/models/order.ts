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
