import { getCurrentUserId } from "~/lib/auth";
import { getUserRecipes } from "~/data/index";

import RecipeCard from "../components/RecipeCard";
import ImportRecipeButton from "../components/AddRecipeButton";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const userRecipes = await getUserRecipes(userId);

  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container relative ml-auto mr-auto max-w-screen-lg">
        <div className="mt-20 grid min-w-full grid-cols-2 justify-items-stretch gap-x-8 gap-y-16 sm:grid-cols-3">
          {userRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard name={recipe.name} description={recipe.description} />
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 flex h-[80px] w-full bg-gradient-to-t from-white to-transparent">
          <div className="ml-auto mr-auto">
            <ImportRecipeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
