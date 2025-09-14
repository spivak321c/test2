// Payout schema
import { pgTable, varchar, decimal, text, timestamp } from 'drizzle-orm/pg-core';

export const payouts = pgTable('payouts', {
  id: varchar('id').primaryKey(),
  merchantId: varchar('merchant_id').notNull(),
  amount: decimal('amount').notNull(),
  status: text('status').notNull().default('pending'),
  transferId: text('transfer_id'), // Stripe transfer ID
  createdAt: timestamp('created_at').defaultNow(),
});


// Add relation
// export const payoutRelations = relations(payouts, ({ one }) => ({
//   merchant: one(merchants, {
//     fields: [payouts.merchantId],
//     references: [merchants.id],
//   }),
// }));