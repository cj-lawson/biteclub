import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id").references(() => users.id),
});
