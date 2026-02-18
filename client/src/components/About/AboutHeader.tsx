import React from 'react'
import { motion } from "framer-motion";
import { getImage } from '@/utils/imagekit';

// --- 1. The Pencil SVG Component ---
const Pencil = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" fill="#fca5a5" stroke="#ef4444" />
    <path d="m15 5 4 4" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-[#fdfbf7] overflow-hidden pt-15">

      {/* --- Global Styles --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
          .font-marker { font-family: 'Permanent Marker', cursive; }
          .font-serif { font-family: 'Playfair Display', serif; }
        `}
      </style>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-black mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="container-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT COL: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-left space-y-8 relative"
        >

          <h1 className="text-5xl md:text-7xl font-display font-black text-stone-900 leading-[1.1]">
            We are your <br />
            <span className="relative inline-block mt-2">

              {/* UPDATED: Changed "an Agency" to "Agency" so the grammar flows: "We are your... Agency... Partners" */}
              <span className="relative z-10 opacity-40">Agency</span>

              <div className="absolute -inset-x-2 -inset-y-1 md:-inset-x-4 md:-inset-y-2 z-20 pointer-events-none">

                {/* A. The Red Line (SVG Path) */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
                  <motion.path
                    d="M 5 50 Q 150 20 295 55"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                  />
                </svg>

                {/* B. The Pencil Following the Line */}
                <motion.div
                  className="absolute w-8 h-8 md:w-12 md:h-12 text-red-600 drop-shadow-lg"
                  initial={{ left: "0%", top: "70%", opacity: 0 }}
                  whileInView={{
                    left: ["1%", "50%", "98%"],
                    top: ["71%", "28%", "78%"],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                >
                  <Pencil className="w-full h-full -rotate-12 -translate-y-8 translate-x-2" />
                </motion.div>
              </div>

              {/* 4. Handwriting correction */}
              <motion.span
                initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-12 md:-bottom-16 left-0 md:left-2 text-5xl md:text-6xl text-red-600 font-marker whitespace-nowrap z-30"
              >
                Partners
              </motion.span>
            </span>
          </h1>

          <div className="pt-10 md:pt-16">
            <p className="text-xl text-stone-600 font-serif italic max-w-lg leading-relaxed border-l-4 border-yellow-400 pl-6 py-2">
              "Design Brew blends strategy, creativity, and technology to help ambitious businesses grow confidently."
            </p>
          </div>
        </motion.div>

        {/* RIGHT COL: Scrapbook Visual */}
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end perspective-1000">
          <motion.div
            initial={{ rotate: 0, opacity: 0 }}
            whileInView={{ rotate: 12, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute right-auto lg:right-10 top-10 w-56 md:w-64 h-72 md:h-80 bg-stone-200 rounded-sm border-2 border-dashed border-stone-400 -z-10"
          />
          <motion.div
            initial={{ y: 50, opacity: 0, rotate: 0 }}
            whileInView={{ y: 0, opacity: 1, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative bg-white p-3 pb-12 shadow-2xl w-64 md:w-96 transform rotate-[-6deg] z-10 cursor-pointer"
          >

            <div className="bg-stone-100 w-full h-56 md:h-64 overflow-hidden ">
              <img
                src={getImage("About/Partners", 1200)}
                alt="Team brainstorming"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute bottom-4 left-4 font-marker text-stone-800 text-lg md:text-xl rotate-[-2deg]">
              How we work  🚀
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection