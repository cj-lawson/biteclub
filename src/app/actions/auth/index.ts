"use server";

import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  console.log(prevState);

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: session } = await supabase.auth.signUp(data);

  if (session?.user) {
    redirect(`/dashboard`);
  } else {
    redirect("/error?message=an uknown error has occured");
  }
}

export async function login(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  console.log(prevState);

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: session } = await supabase.auth.signInWithPassword(data);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/error?message=an uknown error has occured");
  }
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
