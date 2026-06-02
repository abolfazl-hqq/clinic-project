import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import ServicesSlider from "@/components/ServicesSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <HeroSection/>
      <ServicesSlider/>
      <main id="home" className=" mx-auto max-w-6xl px-6 py-12">
      </main>
    </div>
  );
}
