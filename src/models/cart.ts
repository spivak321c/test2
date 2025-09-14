import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { cartItems } from './cart_item';

export const carts = pgTable('carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const cartRelations = relations(carts, ({ many, one }) => ({
  cartItems: many(cartItems),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));