import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownLeft } from 'lucide-react';
import blend from '@/assets/blend.mp4';

const VideoTransition = () => {
  const container = useRef(null);

  // Track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // --- Dimensions & Scaling ---
  const width = useTransform(
    scrollYProgress,
    [0.2, 0.8], // Adjusted timing for better feel
    ["60vw", "100vw"]
  );

  const height = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["50vh", "100vh"]
  );

  // --- Aesthetic Transforms ---
  
  // 1. The Border Radius (Goes from rounded photo to sharp screen)
  const borderRadius = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["20px", "0px"]
  );

  // 2. The White Border Thickness (The Polaroid Frame effect)
  const padding = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["24px", "0px"]
  );

  // 3. Fade out the "Scrapbook Elements" (Tape, Text) so they don't block full screen
  const scrapbookOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5], 
    [1, 0]
  );

  // 4. Video Inner Scale (Parallax effect inside the frame)
  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.2, 1]
  );

  return (
    <section ref={container} className="relative h-[250vh] bg-[#fdfbf7] z-10">
      
      {/* Styles for fonts and patterns */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
          .font-handwriting { font-family: 'Shadows Into Light', cursive; }
          .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        `}
      </style>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-40" />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- The Expanding Card --- */}
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            padding, // This creates the "White Border"
          }}
          className="relative overflow-hidden z-20 shadow-2xl bg-white origin-center"
        >
          
          {/* 1. Scrapbook Decorations (These fade out) */}
          <motion.div style={{ opacity: scrapbookOpacity }} className="absolute inset-0 z-30 pointer-events-none">

            {/* Handwritten Caption */}
            <div className="absolute -bottom-24 -right-20 w-64 text-slate-800 rotate-[-10deg] hidden md:block">
                 <div className="flex flex-col items-center">
                    <span className="font-handwriting text-3xl font-bold">See it in action</span>
                    <ArrowDownLeft className="w-12 h-12 stroke-1 text-slate-400 rotate-90" />
                 </div>
            </div>
          </motion.div>

          {/* 2. The Video Container */}
          <div className="w-full h-full overflow-hidden relative rounded-[inherit]">
            <motion.video
              style={{ scale: videoScale }}
              className="object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={blend} type="video/mp4" />
            </motion.video>
            
            {/* Vintage Film Grain Overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen" 
                 style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} 
            />
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default VideoTransition;