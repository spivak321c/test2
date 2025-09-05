// Category schema
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: varchar('id').primaryKey(),
  name: text('name').notNull(),
  parentId: varchar('parent_id'),
  createdAt: timestamp('created_at').defaultNow(),
});
