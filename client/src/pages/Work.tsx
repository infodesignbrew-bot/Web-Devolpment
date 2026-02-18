import Events from "@/components/About/Events";
import Industries from "@/components/Industries";
import { PageTransition } from "@/components/PageTransition";
import ProcessSection from "@/components/Service/ServiceNext";
import UnderConstruction from "@/components/UnderConstruction";
import { Link } from "wouter";


export default function Work() {
  // return <UnderConstruction/>
  return (
    <PageTransition>
      <Events/>
       <Industries/>
      <ProcessSection/>
    </PageTransition>
  );
}
