import Hero from "./components/Hero";
// import OrganizeRecipes from './components/OrganizeRecipes';
// import CreateRecipes from './components/CreateRecipes';
// import ShareRecipes from './components/ShareRecipes';
// import Footer from './Footer';
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 px-3 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <Hero />
        <div className="mx-auto">
          {/* <Image
            width={900}
            height={358}
            src="app-shot.svg"
            alt="Biteclube logo mark"
          /> */}
        </div>
        <div className="mx-auto">{/* <OrganizeRecipes /> */}</div>
        <div className="mx-auto">{/* <CreateRecipes /> */}</div>
        <div className="mx-auto">{/* <ShareRecipes /> */}</div>
        <div className="mx-auto">{/* <Footer /> */}</div>
      </main>
    </div>
  );
}
