// src/server/db/schema/profiles.ts
import {
  pgTable,
  pgSchema,
  uuid,
  timestamp,
  text,
  unique,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id")
      .references(() => users.id)
      .notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    username: text("username"),
    full_name: text("full_name"),
    avatar_url: text("avatar_url"),
    website: text("website"),
  },
  (table) => ({
    usernameKey: unique("profiles_username_key").on(table.username),
  }),
);
