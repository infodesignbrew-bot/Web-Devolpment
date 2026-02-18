import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2 } from 'lucide-react';
import { getImage } from '@/utils/imagekit';

const Performance = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#fdfbf7] overflow-hidden relative">

      {/* --- Styles for Handwriting & Texture --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Shadows+Into+Light&display=swap');
          .font-marker { font-family: 'Permanent Marker', cursive; }
          .font-handwriting { font-family: 'Shadows Into Light', cursive; }
        `}
      </style>

      {/* Background Texture: Blue Blueprint Grid */}
      <div className="absolute inset-0 opacity-60 pointer-events-none" />

      {/* Vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(253,251,247,0.8)_100%)] pointer-events-none" />

      <div className="container-padding relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* --- Left Content: The Pitch --- */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative Tag */}
            <div className="inline-block px-4 py-1 mb-6 bg-black text-white transform -rotate-2">
              <span className="font-mono text-sm uppercase tracking-widest font-bold">Overview</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-display font-black leading-[1.1] mb-8 text-slate-900">
              In today’s noisy digital market, attention is expensive — <span className="text-slate-500">and clarity is rare.</span>
            </h2>

            <div className="relative">
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                At <span className="font-bold text-slate-900">Design Brew</span>, we help ambitious brands cut through the clutter with marketing that is intentional, structured, and performance-driven. No random posts. No borrowed aesthetics. Only a clear strategy backed by execution that delivers results.
              </p>
            </div>

            {/* Checklist items - Derived from your text to fit the design */}
            <ul className="space-y-4 mb-8">
              {[
                "Digitize business processes",
                "Data-driven insights for better ROI",
                "Amazing digital brand experiences"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-lg font-bold text-slate-800"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-200 text-green-600 shrink-0">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="text-base text-slate-500 leading-relaxed">
              We are a team of talented experts working on the latest technology stacks. We use our in-depth industry knowledge to understand the complexities of the business and combine creative and technical expertise to produce effective solutions.
            </p>

          </motion.div>

          {/* --- Right Content: The Visual Collage --- */}
          <div className="lg:col-span-6 relative perspective-1000">

            {/* 1. Main Image */}
            <motion.div
              initial={{ rotate: 3, opacity: 0, y: 50 }}
              whileInView={{ rotate: 3, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10 bg-white p-3 shadow-xl border border-stone-200 rotate-3"
            >
              <div className="overflow-hidden bg-slate-100 h-[400px] md:h-[500px] relative">
                <img
                  src={getImage("Home/overview", 1600)}
                  alt="Overview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Noise Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-20 mix-blend-multiply" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Performance;