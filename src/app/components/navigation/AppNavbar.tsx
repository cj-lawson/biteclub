import Image from "next/image";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full px-3 py-2 font-[family-name:var(--font-geist-sans)] backdrop-blur">
      <div className="container ml-auto mr-auto flex h-14 max-w-screen-lg items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/app-logo.svg"
              width={116}
              height={116}
              alt="Biteclube logo mark"
            />
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="space-x-4">
            <Link href="/login" className="text-sm font-semibold">
              Login
            </Link>
            <button className="rounded-full bg-[#F9F4F2] px-6 py-3 text-sm font-bold">
              <Link href="/signup">Sign up</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
