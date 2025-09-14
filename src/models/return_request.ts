import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orderItems } from './order_item';

export const returnRequests = pgTable('return_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderItemId: uuid('order_item_id').notNull(),
  reason: text('reason'),
  status: varchar('status').default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const returnRequestRelations = relations(returnRequests, ({ one }) => ({
  orderItem: one(orderItems, {
    fields: [returnRequests.orderItemId],
    references: [orderItems.id],
  }),
}));