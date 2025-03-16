import { getCurrentUserId } from "~/lib/auth";
import { getUserRecipes } from "~/data/index";

import RecipeCard from "../../../_components/recipes/RecipeCard";
// import ImportRecipeButton from "../../_components/recipes/AddRecipeButton";

export default async function MyRecipesPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const userRecipes = await getUserRecipes(userId);

  return (
    <div className="container mx-auto px-8">
      {/* Page title and actions */}
      <header className="mb-6 flex items-center justify-between pt-6">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <div className="flex items-center gap-2">
          {/* Any header actions can go here */}
        </div>
      </header>

      {/* Recipe grid */}
      <div className="mb-20">
        {userRecipes.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/50">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              No recipes yet
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Add your first recipe using the button below
            </p>
          </div>
        ) : (
          <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {userRecipes.map((recipe) => (
              <div key={recipe.id} className="aspect-video">
                <RecipeCard
                  name={recipe.name}
                  description={recipe.description}
                  img={recipe.imageUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed action button */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <ImportRecipeButton />
      </div> */}
    </div>
  );
}
