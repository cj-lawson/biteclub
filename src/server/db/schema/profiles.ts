import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // Profile information
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),

  // Metadata
  lastActive: timestamp("last_active"),
  updatedAt: timestamp("updated_at"),
});
