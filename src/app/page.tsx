import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="relative bg-brand-light dark:bg-brand-dark min-h-screen selection:bg-brand-orange selection:text-white">
      <Preloader />
      <Navbar />
      <Hero />
      <Story />
      <Events />
      <Gallery />
      <CtaSection />
      <Footer />
    </main>
  );
}
