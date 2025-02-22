import { signOut } from "~/app/actions/auth/index";

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-10 w-full px-3 py-2 font-[family-name:var(--font-geist-sans)] backdrop-blur">
      <div className="container ml-auto mr-auto flex h-14 max-w-screen-lg items-center">
        {/* <nav className="flex items-center space-x-4 lg:space-x-6"></nav> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="space-x-4">
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full bg-[#F9F4F2] px-6 py-3 text-sm font-bold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
