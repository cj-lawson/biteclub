import { db } from "../server/db/index";
import { recipes } from "../server/db/schema/recipes";
import { eq } from "drizzle-orm";

// Get user's recipes
export async function getUserRecipes(userId: string) {
  return await db.select().from(recipes).where(eq(recipes.profile_id, userId));
}

// Create a recipe
export async function createRecipe(
  profile_id: string,
  name: string,
  description: string,
) {
  const [newRecipe] = await db
    .insert(recipes)
    .values({ profile_id, name, description });
}
