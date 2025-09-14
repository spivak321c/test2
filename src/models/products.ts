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