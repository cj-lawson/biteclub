"use server";

import { createRecipe } from "~/data/index";
import { getCurrentUserId } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";

export async function createRecipeAction(formData: FormData) {
  const supabase = createClient();

  // Check user session
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("not authenticated");
  }

  // Extract form fields
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("mainImage") as File | null;

  if (!name) {
    throw new Error("name is required");
  }

  let imageUrl: string | undefined;

  // If there’s an uploaded file, push it to Supabase Storage
  if (file && file.size > 0) {
    const fileName = `${Date.now()}-${file.name}`;

    // upload file
    const { data: uploadData, error: uploadErr } = await (
      await supabase
    ).storage
      .from("recipe-images")
      .upload("fileName", file, {
        contentType: file.type,
      });

    if (uploadErr) {
      throw new Error("Upload error: ${uploadErr.message}");
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${uploadData?.path}`;
  }

  // Insert into supabase via drizzle
  const newRecipe = await createRecipe(userId, name, description, imageUrl);
  return newRecipe;
}
