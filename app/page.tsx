import { Partners } from "@/components/main/partners";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Features } from "@/components/main/features";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Partners />
        <Features />
        <Projects />
      </div>
    </main>
  );
}
