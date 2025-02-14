// src/server/db/schema/profiles.ts
import { pgTable, uuid, timestamp, text, unique } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().notNull(),
    user_id: uuid("user_id") // Add this field to reference auth.users
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    username: text("username"),
    full_name: text("full_name"),
    avatar_url: text("avatar_url"),
    website: text("website"),
    updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  },
  (table) => ({
    usernameKey: unique("profiles_username_key").on(table.username),
  }),
);
