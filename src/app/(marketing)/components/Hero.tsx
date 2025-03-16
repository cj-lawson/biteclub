import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full overflow-clip bg-[#F9F4F2]">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="relative sm:overflow-hidden sm:rounded-2xl">
          <div className="relative px-6 pt-10 sm:pt-12 lg:px-8 lg:pt-16">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">All your recipes</span>
                <span className="block">in one place</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl opacity-80 sm:max-w-3xl">
                The easiest way to collect, organize and share all your favorite
                recipes from one place.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:gap-5 sm:space-y-0">
                <Link
                  href="/signup"
                  className="bg-brand-500 flex items-center justify-center rounded-full border border-transparent px-4 py-3 text-base font-medium text-white sm:px-8"
                >
                  Get started for free
                </Link>
              </div>
            </div>
            <div className="relative w-full">
              <Image
                width={1100}
                height={558}
                src="/hero-img.svg"
                alt="Biteclube logo mark"
                className="ml-auto mr-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
