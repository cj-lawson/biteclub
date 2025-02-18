import RecipeImage from "./RecipeImage";

interface RecipeProps {
  img?: string | null;
  name: string;
  description?: string | null;
}

export default function RecipeCard({ img, name, description }: RecipeProps) {
  return (
    <div className="justify-items-stretch">
      <div className="min-height-12 relative h-full w-full rounded-lg">
        <RecipeImage src={img} />
      </div>
      <div className="mt-3">
        <p className="text-md truncate font-medium leading-relaxed">{name}</p>
        <div className="flex items-center gap-1">
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
