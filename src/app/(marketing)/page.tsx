import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-w-screen-xl flex min-h-screen flex-col justify-items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <Hero />
      </main>
    </div>
  );
}
