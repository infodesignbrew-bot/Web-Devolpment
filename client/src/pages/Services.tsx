import { PageTransition } from "@/components/PageTransition";
import DrivingGrowth from "@/components/Service/DrivingGrowth";
import BenefitsOfWorking from "@/components/Service/BenefitsOfWorking";
import ServiceHeader from "@/components/Service/ServiceHeader";
import CreativeFAQ from "@/components/Service/faqs";
import TopServices from "@/components/Service/TopServices";
import CoreValues from "@/components/Service/CoreValues";
import Toolkit from "@/components/Service/Toolkit";


export default function Services() {

  return (
    <PageTransition>

     <ServiceHeader/>   
      <DrivingGrowth />
       <CoreValues/>
      <BenefitsOfWorking />
      <CreativeFAQ/>
     <Toolkit/>
     
    </PageTransition>
    
  );
}
