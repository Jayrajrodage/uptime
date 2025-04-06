import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Navbar } from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import TrustedBy from "@/components/home/Trusted-by";
import Featured from "@/components/home/Featured";
import Testimonial from "@/components/home/testimonial";
import Status from "@/components/home/status";
import Footer from "@/components/home/footer";
const home = () => {
  return (
    <HeroHighlight>
      <main className="min-h-screen max-w-5xl mx-auto">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Featured />
        <Testimonial />
        <Status />
        <Footer />
      </main>
    </HeroHighlight>
  );
};

export default home;
