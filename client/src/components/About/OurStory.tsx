import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getImage } from "@/utils/imagekit";

const OurStory = () => {
  // Animation for the highlighter effect
  const highlightVariant = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 1, delay: 0.5, ease: "circOut" },
    },
  };

  return (
    <section className="relative py-32 bg-[#FDFBF7] overflow-hidden">
      {/* Inject Font Locally */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
          .font-handwriting { font-family: 'Shadows Into Light', cursive; }
        `}
      </style>

      <div className="absolute top-10 right-[-100px] md:right-[10%] w-[300px] h-[300px] pointer-events-none opacity-5">
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT: The "Polaroid Stack" Visual */}
          <div className="relative flex justify-center lg:justify-start h-[450px] w-full items-center">

            {/* Image 1: "Decoration" (Bottom Layer) */}
            <motion.div
              initial={{ rotate: -15, x: -20, opacity: 0 }}
              whileInView={{ rotate: -6, x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute w-[280px] md:w-[320px] bg-white p-3 pb-12 shadow-lg rounded-sm transform -rotate-6 z-10 border border-gray-200"
            >
              <img
                src={getImage("About/photo-1549490349", 800)}
                alt="Abstract Art"
                className="w-full h-[280px] object-cover grayscale opacity-60"
                loading="lazy"
              />

              <div className="absolute bottom-4 left-0 w-full text-center">
                <span className="font-handwriting text-xl text-gray-400 line-through">Just Pretty Pictures</span>
              </div>
            </motion.div>

            {/* Image 2: "Strategy" (Top Layer) */}
            <motion.div
              initial={{ rotate: 15, x: 20, opacity: 0 }}
              whileInView={{ rotate: 3, x: 40, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-[280px] md:w-[320px] bg-white p-3 pb-12 shadow-2xl rounded-sm transform rotate-3 z-20 border border-gray-200"
            >

              <img
                src={getImage(
                  "About/Design_without_strategy_is_decoration_Design_Brew_11zon.jpg",
                  1200
                )}
                alt="Strategic Design"
                className="w-full h-[280px] object-cover"
                loading="lazy"
              />

              <div className="absolute bottom-4 left-0 w-full text-center">
                <span className="relative inline-block font-handwriting text-2xl text-slate-800 px-2">
                  The Real Deal
                </span>
              </div>

            </motion.div>

          </div>

          {/* RIGHT: The Story Content */}
          <div className="relative">

            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="bg-primary p-2 rounded-full text-white">
                  <Quote size={20} fill="currentColor" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Our Origin Story</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-slate-900">
                Design without strategy is <br />
                <span className="relative inline-block text-slate-900 px-1">
                  <span className="relative z-10">decoration.</span>

                </span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6 text-lg text-slate-600 leading-relaxed font-serif"
            >
              <p>
                Design Brew was founded on a simple truth. In a market where speed is prioritized over substance, we noticed brands were getting "loud" but not getting "heard."
              </p>

              <p>
                We chose to <span className="font-bold text-primary underline decoration-wavy decoration-primary/30 underline-offset-4">slow down</span>.
              </p>

              <p>
                We decided to build brands the right way — with research, positioning, and clarity at the core. Because pretty visuals fade, but a solid strategy builds a legacy.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;