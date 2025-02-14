// src/server/db/schema/auth.ts
import { pgSchema, pgTable, uuid } from "drizzle-orm/pg-core";

// Define auth schema
export const authSchema = pgSchema("auth");

// Reference to Supabase auth.users table
export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});
