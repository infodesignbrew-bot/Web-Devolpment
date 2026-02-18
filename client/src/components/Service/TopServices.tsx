import React from 'react';
import { motion } from 'framer-motion';
import { getImage } from '@/utils/imagekit';

const steps = [
  {
    title: "Think Big",
    color: "bg-secondary/20",
    description:
      "We start by challenging assumptions and expanding the scope of what's possible.",
    image: getImage(
      "About/photo-1464822759023",
      1000
    ),
  },
  {
    title: "Get Set",
    color: "bg-secondary/20",
    description:
      "Strategic planning and laying the technical foundation for a flawless execution.",
    image: getImage(
      "About/photo-1498050108023",
      1000
    ),
  },
  {
    title: "Leap Ahead",
    color: "bg-secondary/20",
    description:
      "Rapid development and deployment using cutting-edge frameworks and tools.",
    image: getImage(
      "About/photo-1542204165",
      1000
    ),
  },
  {
    title: "Grow",
    color: "bg-secondary/20",
    description:
      "Data-driven iteration to scale your product and capture market share.",
    image: getImage(
      "About/photo-1521737604893",
      1000
    ),
  },
];


const TopServices = () => {
  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-stone-500 max-w-2xl mx-auto">
            To help businesses grow with {" "}
            <span className="font-bold text-stone-800">confidence, consistency,</span> and {" "}
            <span className="font-bold text-stone-800">credibility</span> {" "}
             in the digital space.
          </p>
        </div>

        {/* --- MOBILE VIEW: True Sticky Stack Effect --- */}
        <div className="md:hidden flex flex-col items-center">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="sticky w-full max-w-sm mb-12" // mb-12 adds scroll distance between cards
              style={{ 
                // 1. STICKY: Keeps it fixed while inside container
                // 2. TOP: Calculates offset so they peek out (Stack effect)
                //    First card sticks at 100px, 2nd at 115px, etc.
                top: `${100 + index * 15}px`, 
                zIndex: index 
              }}
            >
              <div className={`
                relative flex flex-col rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50
                h-[400px] w-full
                ${step.color}
                transform transition-transform duration-500
              `}>
                
                {/* Image Section (Top 60%) */}
                <div className="h-[60%] w-full relative">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                    loading='lazy'
                  />
                  {/* Gradient Overlay for text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>

                {/* Content Section (Bottom 40%) */}
                <div className="h-[40%] p-6 flex flex-col items-center justify-center text-center bg-white/90 backdrop-blur-md">
                  
                  <h3 className="text-2xl font-bold text-stone-900 uppercase tracking-tighter mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 font-medium leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to allow the last card to be scrolled past properly */}
          <div className="h-24" /> 
        </div>

        {/* --- DESKTOP VIEW: Grid Layout (Unchanged) --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 h-[320px] lg:h-[380px]">
          {steps.map((step, index) => (
            <DesktopCard key={index} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
};

// --- Desktop Card Component ---
const DesktopCard = ({ step }) => {
  return (
    <motion.div
      className={`relative h-full w-full rounded-3xl overflow-hidden ${step.color} group cursor-pointer`}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 z-10"
        variants={{
          initial: { y: "100%" },
          hover: { y: "0%" },
        }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      >
        <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div
        className="absolute z-20 w-full px-6"
        variants={{
          initial: { top: "50%", left: "50%", x: "-50%", y: "-50%" },
          hover: { top: "25%", left: "50%", x: "-50%", y: "0%" }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-2 w-full text-center">
          <motion.h3
            className="text-2xl font-bold uppercase tracking-tighter"
            variants={{
              initial: { color: "#1c1917" },
              hover: { color: "#ffffff" },
            }}
          >
            {step.title}
          </motion.h3>
        </div>
        <motion.p
          className="text-base leading-relaxed font-medium mt-3 text-center"
          variants={{
            initial: { opacity: 0, height: 0, display: "none" },
            hover: { opacity: 1, height: "auto", display: "block", color: "#e7e5e4" }
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {step.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default TopServices;