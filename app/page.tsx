import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { Navbar } from "@/components/navbar";
import { FloatingDumplings } from "@/components/floating-dumplings";
import { LocationsSection } from "@/components/locations-section";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FloatingDumplings />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MenuSection />
        <AboutSection />
        <LocationsSection />
        <Footer />
      </div>
    </main>
  );
}
