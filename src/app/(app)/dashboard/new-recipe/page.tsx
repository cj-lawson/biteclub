import { createRecipeAction } from "~/app/actions/recipes";

export default function NewRecipePage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const newRecipe = await createRecipeAction(formData);
  }

  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container relative ml-auto mr-auto max-w-screen-lg">
        <form action={handleSubmit}>
          <label>
            Name: <input name="name" required />
          </label>
          <br />
          <label>
            Description: <textarea name="description" />
          </label>
          <br />
          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  );
}
