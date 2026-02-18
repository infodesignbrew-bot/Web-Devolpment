import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import HeroSection from "@/components/About/AboutHeader";
import EngineeringGrowth from "@/components/About/EngineeringGrowth";
import Numbers from "@/components/About/Numbers";
import Team from "@/components/About/Team";
import ServiceFAQ from "@/components/About/AboutFAQ";
import OurApproach from "@/components/About/OurApproach";
import OurStory from "@/components/About/OurStory";
import TopServices from "@/components/Service/TopServices";

export default function About() {
  return (
    <PageTransition>
      <div className="relative bg-background overflow-hidden">

        <HeroSection />
        <EngineeringGrowth />
        <Numbers />
        {/* <ISO /> */}
        {/* <GlobalImpact /> */}
        {/* <Events /> */}
        <TopServices/>
        <OurApproach/>
        <OurStory/>
        <Team />
        <ServiceFAQ />
      </div>
    </PageTransition>
  );
}