import { pgTable, varchar, timestamp, uuid, } from "drizzle-orm/pg-core";
// Update existing users table definition
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(), // Change to uuid if not already
    email: varchar('email').unique().notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    password: varchar('password'), // Can be null for OAuth
    googleId: varchar('google_id'),
    country: varchar('country', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
// export const userRelations = relations(users, ({ many }) => ({
//   carts: many(carts),
//   orders: many(orders),
// }));
//# sourceMappingURL=users.js.map