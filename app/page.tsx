import Hero from "@/components/Hero";
import Store from "@/components/Store";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Certifications from "@/components/Certifications";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import DiDiButton from "@/components/DiDiButton";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Store />
      <About />
      <Pillars />
      <Certifications />
      <Process />
      <Reviews />
      <DiDiButton />
    </main>
  );
}
