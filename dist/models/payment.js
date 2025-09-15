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
//# sourceMappingURL=payment.js.map