import Link from "next/link";
import { createClient } from "../utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: todos } = await supabase.from("todos").select("*");

  console.log(todos);
  return (
    <ul className="text-red-800">
      {todos?.map((todo) => <li>{todo.task}</li>)}
    </ul>
  );
}
