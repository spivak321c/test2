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