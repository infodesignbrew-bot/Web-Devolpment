import React from 'react';
import { motion } from "framer-motion";
import { Layers, Zap, BarChart, Check } from "lucide-react";

const ValueProposition = () => {

  const features = [
    {
      icon: Layers,
      title: "Strategy-first",
      desc: "We don't just make things look pretty. We build systems that solve real problems.",
      list: ["Data-driven decisions", "Competitive analysis", "Custom roadmap"],
      rotate: "rotate-[-2deg]",
      accent: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Brand-focused",
      desc: "Minimalist, purposeful aesthetics that communicate value without the noise.",
      list: ["User-centered design", "Modern aesthetics", "Brand consistency"],
      rotate: "rotate-[2deg]",
      paperType: "bg-[#fdfbf7]", // Warm off-white
      texture: "bg-noise-subtle", 
      accent: "text-purple-600"
    },
    {
      icon: BarChart,
      title: "Results-driven",
      desc: "Data-driven marketing campaigns focused on ROI and sustainable growth.",
      list: ["Performance tracking", "ROI analysis", "Continuous optimization"],
      rotate: "rotate-[-1deg]",
      paperType: "bg-[#fffbeb]",
      accent: "text-green-600"
    }
  ];

  return (
    <section className="py-24 bg-stone-100 relative overflow-hidden">

      {/* --- Styles for Handwriting --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Patrick+Hand&display=swap');
          
          .bg-noise-subtle {
             background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          }
        `}
      </style>

      {/* Background Doodles */}


      <div className="container-padding max-w-7xl mx-auto relative z-10">

        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >


          <div className="space-y-6">
            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight">
              We Don’t Just Design Brands <br />
              <span className="text-blue-600">We Engineer Growth</span>
            </h2>

          </div>
        </motion.div>

        {/* --- Cards Grid --- */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12 px-4 select-none">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
              whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative group ${feature.rotate}`}
            >


              {/* The Card */}
              <div className={`h-full ${feature.paperType} ${feature.texture} p-8 pt-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] border border-stone-200 transition-all duration-300`}>

                {/* Icon "Stamp" */}
                <div className={`w-16 h-16 rounded-full border-4 border-current ${feature.accent} opacity-80 mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 stroke-[2.5]" />
                </div>

                <h3 className="font-display font-bold text-2xl mb-4 text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                  {feature.desc}
                </p>

                {/* Hand-drawn List */}
                <ul className="space-y-3">
                  {feature.list.map((item, idx) => (
                    <li key={idx} className="flex items-start text-slate-700 text-lg">
                      <span className={`${feature.accent} mr-3 mt-1`}>
                        {/* Custom "Scribble" Checkmark */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ValueProposition;