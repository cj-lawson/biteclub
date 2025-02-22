import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface RecipeImageProps {
  src?: string | null;
  width?: number;
  height?: number;
}

export default function RecipeImage({ src }: RecipeImageProps) {
  if (!src) {
    return (
      <div className="flex h-[140px] w-full items-center justify-center rounded-md bg-gray-100 sm:h-[200px]">
        <PhotoIcon width={44} height={44} className="text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative h-[140px] w-full rounded-md sm:h-[200px]">
      <Image
        src={src}
        fill
        alt={"food-image"}
        className="rounded-md object-cover"
      />
    </div>
  );
}
