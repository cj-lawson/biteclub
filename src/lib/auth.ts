import { createClient } from "./supabase/server";

// Grabs the user from the current session
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.getUser();
  if (error || !data.user) return null;

  return data.user.id;
}
