import { db } from "../server/db/index";
import { recipes } from "../server/db/schema/recipes";
import { eq } from "drizzle-orm";

// Get user's recipes
export async function getUserRecipes(userId: string) {
  return await db.select().from(recipes).where(eq(recipes.profile_id, userId));
}
