import { PageTransition } from "@/components/PageTransition";
import Hubspot from "@/components/Home/Hubspot";
import Skills from "@/components/Home/Skills";
import VideoTransistion from "@/components/Home/VideoTransistion";
import JoinOurClan from "@/components/Home/JoinOurClan";
import Testimonials from "@/components/Home/Testimonials";
import ValueProposition from "@/components/Home/ValueProposition";
import HeroSection from "@/components/Home/HeroSection";
import Perfomance from "@/components/Home/Perfomance";

export default function Home() {

  return (
    <PageTransition>
      <HeroSection />
       <Perfomance />
      <VideoTransistion />
      <ValueProposition />
      <Testimonials />
      <Hubspot />
      <JoinOurClan />
      <Skills />

    </PageTransition>
  );
}