import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Undo2, PenTool, Search, TrendingUp, FileText, Code, Share2, Palette, Video, MousePointerClick } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import bgimage from "@/assets/multi-exposure-abstract-graphic-world-map-hologram-modern-furnished-office-interior-background-connection-communication-concept_258654-12213.avif";

// Image builder for Sanity
const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

// Icon mapping based on ID
const iconMap: Record<string, any> = {
  brand: PenTool, google: Search, seo: TrendingUp, content: FileText,
  web: Code, meta: Share2, graphic: Palette, video: Video
};

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: any;
  people?: any[];
}

const ServiceHeader = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "service"] | order(_createdAt asc)`);
        setServices(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleCardClick = (id: string) => setFlippedId(flippedId === id ? null : id);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
          .font-handwriting { font-family: 'Shadows Into Light', cursive; }
          .text-shadow-glow { text-shadow: 0 0 30px rgba(255,255,255,0.15); }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .perspective-1000 { perspective: 1000px; }
        `}
      </style>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-32 md:py-40 overflow-hidden flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img src={bgimage} alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white text-shadow-glow mb-8"
          >
            Our Expertise
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We combine data-driven strategies with scroll-stopping creativity to ensure your brand dominates.
          </p>
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <section className="bg-[#f8fafc] py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.id] || FileText;
              const isFlipped = flippedId === service.id;

              return (
                <div
                  key={service.id}
                  className="relative h-[420px] cursor-pointer perspective-1000 group"
                  onClick={() => handleCardClick(service.id)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                  >
                    {/* FRONT: Polaroid Style */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="h-full w-full bg-white p-3 shadow-xl rounded-xl border border-slate-200 relative">
                        
                        {/* ---------------- NEW CLICK ME BADGE ---------------- */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="absolute bottom-3 -right-1 z-20 rotate-12"
                        >
                          <div className="text-slate-900 font-handwriting font-bold text-sm  px-3 py-1 flex items-center gap-1">
                             Know More! 
                             <MousePointerClick size={16} className="opacity-75" />
                          </div>
                        </motion.div>
                        {/* ---------------------------------------------------- */}

                        <div className="h-64 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={urlFor(service.image).width(600).url()}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-6 px-2 flex justify-between items-end">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BACK: Details Style */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className="h-full w-full bg-[#fdfbf7] p-8 shadow-2xl rounded-xl border border-stone-200 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-slate-900" />
                            <h4 className="text-2xl font-bold text-slate-900">
                              What's included
                            </h4>
                          </div>
                          <Undo2 className="text-slate-300" size={20} />
                        </div>

                        <ul className="flex-grow space-y-4">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-slate-700 font-medium">
                              <CheckCircle2 className="w-5 h-5 text-blue-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {service.people && (
                          <div className="mt-6 text-slate-600 text-sm leading-relaxed">
                            {service.people.map((block, i) => (
                              <p key={i} className="mb-2">
                                {block.children?.map((child: any) => child.text).join("")}
                              </p>
                            ))}
                          </div>
                        )}

                        <Link href="/contact">
                          <button className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                            GET STARTED <ArrowRight size={18} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHeader;