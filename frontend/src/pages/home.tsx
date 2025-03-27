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
    <main className="min-h-screen 2xl:max-w-5xl w-full mx-auto">
      <HeroHighlight>
        <Navbar />
        <Hero />
        <TrustedBy />
        <Featured />
        <Testimonial />
        <Status />
        <Footer />
      </HeroHighlight>
    </main>
  );
};

export default home;
