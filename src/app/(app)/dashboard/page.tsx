import { redirect } from "next/navigation";

import { createClient } from "~/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/login");
  }
  console.log(data.user);
  return <h1>dashboard</h1>;
}
