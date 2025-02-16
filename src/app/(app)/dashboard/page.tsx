import { getCurrentUserId } from "~/lib/auth";
import { getUserRecipes } from "~/data/index";

export default async function DashboardPage() {
  // 1. Grab the current user's ID via Supabase Auth
  const userId = await getCurrentUserId();
  if (!userId) {
    // handle unauthed state, e.g. redirect to /login or throw an error
    throw new Error("Not authenticated");
  }

  // 2. Query Drizzle for the user's recipes
  const userRecipes = await getUserRecipes(userId);

  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <h1>Your Recipes</h1>
        {userRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
