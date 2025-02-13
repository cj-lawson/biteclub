"use server";

import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: session } = await supabase.auth.signUp(data);

  if (session?.user) {
    redirect(`/dashboard`);
  } else {
    redirect("/error?message=an uknown error has occured");
  }
}
