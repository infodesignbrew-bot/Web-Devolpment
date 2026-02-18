import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import sucess from "@/assets/tall-modern-building-reflects-abstract-cityscape-pattern-generated-by-ai_188544-27403.avif";

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const count = useMotionValue(0);

  // 👇 spring drives the animation
  const spring = useSpring(count, {
    stiffness: 40,
    damping: 20
  });

  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    count.set(isInView ? value : 0);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};


const Numbers = () => {
  const stats = [
    { label: "CUSTOMERS", value: 150, suffix: "+" },
    { label: "PROJECTS COMPLETED", value: 320, suffix: "+" },
    { label: "YEARS EXPERIENCE", value: 5, suffix: "+" },
  ];

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: { duration: 0.4 } // Quick fade out when leaving
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Quintic ease-out for smoother arrival
      }
    }
  };

  return (
    <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img src={sucess} className="w-full h-full object-cover" alt="Background" />
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }} // Early trigger
            variants={contentVariants}
            className="text-4xl md:text-6xl font-bold leading-tight text-gray-100"
          >
            Technology <span className="text-blue-400">Enablers,</span><br />
            Automation Partners
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={contentVariants}
            className="flex flex-col lg:items-end"
          >
            <p className="text-lg text-gray-300 max-w-md lg:text-right mb-6">
              We strive to be a trusted partner, renowned for empowering progressive businesses.
            </p>
            <a href="/contact" className="border border-white/40 hover:border-white px-8 py-3 text-sm 
             md:px-8 md:py-3 md:text-base
             rounded-full transition-all duration-300 text-center">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Static Grid Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3  pt-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center px-4 py-10 md:py-4 ${i !== 0 ? "md:border-l border-white/10" : ""
                }`}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                // Using "0.1" here makes the numbers start counting as soon as 
                // the top of the stat container hits the bottom of the screen.
                viewport={{ once: false, amount: 0.1 }}
                variants={contentVariants}
                className="flex flex-col items-center"
              >
                <div className="text-6xl md:text-7xl font-extrabold text-white mb-2 tracking-tighter">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-400 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numbers;