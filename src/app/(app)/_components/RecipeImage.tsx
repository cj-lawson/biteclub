import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface RecipeImageProps {
  src?: string | null;
  width?: number;
  height?: number;
}

export default function RecipeImage({ src, width, height }: RecipeImageProps) {
  if (!src) {
    return (
      <div className="flex h-[200px] items-center justify-center bg-gray-100">
        <PhotoIcon width={44} height={44} className="text-gray-300" />
      </div>
    );
  }

  return <Image src={src} width={width} height={height} alt={"food-image"} />;
}
