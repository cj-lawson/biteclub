import { createRecipeAction } from "~/app/actions/recipes";
import RecipeForm from "../_components/RecipeForm";

export default function NewRecipePage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const newRecipe = await createRecipeAction(formData);
    console.log(newRecipe);
  }

  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container relative ml-auto mr-auto max-w-screen-lg">
        <RecipeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
