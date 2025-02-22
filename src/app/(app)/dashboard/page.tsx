import { getCurrentUserId } from "~/lib/auth";
import { getUserRecipes } from "~/data/index";

import RecipeCard from "../../_components/recipes/RecipeCard";
import ImportRecipeButton from "../../_components/recipes/AddRecipeButton";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const userRecipes = await getUserRecipes(userId);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="md: grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        <div className="fixed bottom-0 left-0 flex h-[80px] w-full bg-gradient-to-t from-white to-transparent">
          <div className="ml-auto mr-auto">
            <ImportRecipeButton />
          </div>
        </div>
      </div>
    </>
  );
}
