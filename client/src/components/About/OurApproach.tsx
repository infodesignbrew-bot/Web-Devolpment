import React from 'react';
import { motion } from "framer-motion";
import { Map, Palette, FileBarChart, TrendingUp, Check, Brain, Target } from 'lucide-react';

// Placeholder image representing strategy/teamwork
import strategyImage from "@/assets/Our_Approach_Design_Brew.avif";
import { getImage } from '@/utils/imagekit';

const OurApproach = () => {
  const approachData = [
    { icon: Map, title: "Strategy before execution" },
    { icon: Brain, title: "Thought before execution" },
    { icon: Target, title: "Purpose before performance" },
    { icon: Palette, title: "Custom solutions, not templates" },
    { icon: FileBarChart, title: "Clear reporting & honest communication" },
    { icon: TrendingUp, title: "Focus on long-term brand equity & ROI" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden relative font-sans">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block relative"
          >
            <span className="font-handwriting text-2xl text-primary rotate-[-3deg] block mb-1">The method behind the magic</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Our Approach
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white bg-white z-10">
              <img
                src={getImage("About/Our_Approach_Design_Brew.avif", 1400)}
                alt="Your Growth"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale-[20%] contrast-110 hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />

            </div>
            {/* Handwritten Caption */}
            <p className="font-handwriting text-xl text-muted-foreground text-center mt-6 rotate-1">
              "Collaboration is our secret weapon."
            </p>
          </motion.div>

          {/* Right Side: The Compact Approach List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col space-y-3 order-1 lg:order-2"
          >
            {approachData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-background/60 backdrop-blur-sm p-3 pr-6 rounded-xl border border-border/50 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                {/* Connecting dashed line - carefully aligned to new size */}
                {index !== approachData.length - 1 && (
                  <div className="absolute left-[1.95rem] top-10 bottom-[-14px] w-px border-l-2 border-dashed border-primary/10 group-hover:border-primary/30 transition-colors z-0" />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  {/* Icon Box - Smaller & Sleeker */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <item.icon size={20} strokeWidth={2} />
                    </div>
                    {/* Tiny checkmark */}
                    <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white rounded-full p-[2px] scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Check size={8} strokeWidth={4} />
                    </div>
                  </div>

                  {/* Text Content - Refined Size */}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurApproach;