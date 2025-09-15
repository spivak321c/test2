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
//# sourceMappingURL=variant.js.map