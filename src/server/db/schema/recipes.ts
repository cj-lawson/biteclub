import { pgSchema, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  profile_id: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
});
