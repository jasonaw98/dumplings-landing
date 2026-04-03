import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowToSection } from "@/components/how-to-section";
import { MenuSection } from "@/components/menu-section";
import { FloatingDumplings } from "@/components/floating-dumplings";
import { LocationsSection } from "@/components/locations-section";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FloatingDumplings />
      <div className="relative z-10">
        <Hero />
        <MenuSection />
        <HowToSection />
        <AboutSection />
        <LocationsSection />
        <Footer />
      </div>
    </main>
  );
}
