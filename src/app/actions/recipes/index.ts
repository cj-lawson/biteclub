"use server";

import { createRecipe } from "~/data/index";
import { getCurrentUserId } from "~/lib/auth";

export async function createRecipeAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("not authenticated");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) {
    throw new Error("name is required");
  }

  const newRecipe = await createRecipe(userId, name, description);
  console.log(newRecipe);
}
