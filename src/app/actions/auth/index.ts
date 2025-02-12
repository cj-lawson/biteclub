"user server";

import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { users, profiles } from "~/server/db/schema";
import { revalidatePath } from "next/cache";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error?message=an uknown error has occured");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
