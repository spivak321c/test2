import {
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("customer"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
