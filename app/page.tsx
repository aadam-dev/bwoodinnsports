import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import EventsCarousel from "@/components/sections/EventsCarousel";
import FacilitiesPreview from "@/components/sections/FacilitiesPreview";
import Section from "@/components/ui/Section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <EventsCarousel />
      <FacilitiesPreview />
      <Footer />
    </main>
  );
}

