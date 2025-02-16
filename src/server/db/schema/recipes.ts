// src/server/db/schema/recipes.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().notNull(),
  profile_id: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});
