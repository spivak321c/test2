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
//# sourceMappingURL=media.js.map