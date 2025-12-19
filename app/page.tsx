import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <MenuSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
