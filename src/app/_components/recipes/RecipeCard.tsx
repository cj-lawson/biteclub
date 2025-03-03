import RecipeImage from "./RecipeImage";

interface RecipeProps {
  img?: string | null;
  name: string;
  description?: string | null;
}

export default function RecipeCard({ img, name, description }: RecipeProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <RecipeImage src={img} />
      </div>
      <div className="mt-2 flex flex-col">
        <p className="truncate font-medium leading-tight">{name}</p>
        {description && (
          <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}
