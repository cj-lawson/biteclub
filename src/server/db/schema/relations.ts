// src/server/db/schema/relations.ts
import { relations } from "drizzle-orm/relations";
import { users } from "./auth";
import { profiles } from "./profiles";

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.user_id],
    references: [users.id],
  }),
}));
