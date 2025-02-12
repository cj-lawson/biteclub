import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Managed by supabase auth
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // matches Supabase auth.users.id
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
