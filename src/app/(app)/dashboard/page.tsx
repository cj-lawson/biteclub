import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/my-recipes");
  return null;
}
