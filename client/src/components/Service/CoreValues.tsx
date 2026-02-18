import { getImage } from "@/utils/imagekit";
import React, { useState, useEffect, useRef } from "react";

// --- Images ---
const imgCollaboration = getImage(
  "Services/photo-1522071820081",
  1000
);

const imgGrowth = getImage(
  "Services/photo-1517245386807",
  1000
);

const imgHappiness = getImage(
  "Services/photo-1521737604893",
  1000
);

const imgImpact = getImage(
  "Services/photo-1559027615",
  1000
);

const values = [
  {
    id: 0,
    title: "Collaboration",
    description: "We believe in the power of collective intelligence. By working together, we break down silos and spark innovation that no single individual could achieve alone.",
    image: imgCollaboration,
  },
  {
    id: 1,
    title: "Employee Growth",
    description: "Your potential is our priority. We invest in continuous learning, mentorship, and career pathways to ensure every team member evolves into their best self.",
    image: imgGrowth,
  },
  {
    id: 2,
    title: "Happiness",
    description: "A joyful culture fuels great work. We prioritize mental well-being, work-life balance, and a supportive environment where laughter is part of the daily grind.",
    image: imgHappiness,
  },
  {
    id: 3,
    title: "Social Impact",
    description: "Business is a force for good. We remain committed to ethical practices and community initiatives that leave a positive footprint on the world around us.",
    image: imgImpact,
  },
];

const CYCLE_DURATION = 5000; // 5 seconds per slide

const CoreValues = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Ref to reset animation key to restart css animation
  const progressRef = useRef(null);

  // Preload images
  useEffect(() => {
    values.forEach((v) => {
      const img = new Image();
      img.src = v.image;
    });
  }, []);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Our Core Values</h2>
          <p className="text-stone-500 text-sm md:text-base">At Design Brew, we believe growth starts with people.</p>
        </div>

        {/* Navigation Tabs (Scrollable on very small mobile, centered on desktop) */}
        <div className="flex justify-start md:justify-center mb-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="inline-flex bg-stone-200/60 p-1 rounded-full whitespace-nowrap">
            {values.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ease-out
                    ${isActive 
                        ? "bg-white text-stone-900 shadow-sm scale-100 ring-1 ring-stone-900/5" 
                        : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"
                    }
                  `}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div 
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-stone-100 overflow-hidden flex flex-col md:grid md:grid-cols-2 relative group">
            
           
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-100 z-30">
              
            </div>

            {/* 2. Image Section */}
            <div className="relative h-56 md:h-auto min-h-[250px] md:min-h-[450px] bg-stone-100 overflow-hidden order-1">
              {values.map((item, index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`
                    absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
                    ${activeIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="relative p-6 md:p-12 order-2 grid place-items-center">
               {values.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                        col-start-1 row-start-1 text-left w-full transition-all duration-500 ease-in-out
                        ${activeIndex === index 
                            ? "opacity-100 translate-y-0 pointer-events-auto" 
                            : "opacity-0 translate-y-4 pointer-events-none absolute md:static" 
                            /* On mobile, hidden items are absolute to not push height, 
                               but on desktop grid handles stacking perfectly. 
                               Actually, 'col-start-1' handles stacking everywhere. 
                               We use pointer-events-none to prevent clicking hidden items. */
                        }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-stone-900">{item.title}</h3>
                    </div>
                    
                    <div className="w-12 h-1 bg-stone-900 mb-6 rounded-full" />
                    
                    <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                        {item.description}
                    </p>

                  </div>
               ))}
            </div>

          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .paused {
            animation-play-state: paused !important;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CoreValues;