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
//# sourceMappingURL=order.js.map