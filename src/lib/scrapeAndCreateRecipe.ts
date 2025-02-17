import { buildSupabaseRecipeData, extractRecipeFromURL } from "./recipeParser";
import { createRecipe } from "~/data";

export async function scrapeAndCreateRecipe(url: string, userId: string) {
  // 1) Scrape
  const extracted = await extractRecipeFromURL(url);
  if (!extracted) {
    throw new Error("No recipe data found in JSON-LD");
  }

  // 2) Transform
  const recipeData = buildSupabaseRecipeData(extracted, userId);

  // 3) Create
  const newRecipe = await createRecipe(
    recipeData.userId,
    recipeData.name,
    recipeData.description,
  );

  return newRecipe;
}
