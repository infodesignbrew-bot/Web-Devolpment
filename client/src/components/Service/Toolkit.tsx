import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Images (Ensure your imports remain)
import adobexd from '@/assets/adobe-xd-svgrepo-com.svg'
import adobeprem from '@/assets/adobe-premiere-svgrepo-com.svg'
import wordpress from '@/assets/wordpress-color-svgrepo-com.svg'
import google from '@/assets/google-ads.svg'
import meta from '@/assets/meta-ads.svg';
import figma from '@/assets/figma-svgrepo-com.svg';
import lightroom from "@/assets/lightroom-svgrepo-com.svg"
import acrobat from "@/assets/acrobat-reader-svgrepo-com.svg"
import aftereffect from "@/assets/adobe-after-effects-svgrepo-com.svg"

// Hook to handle responsive spread logic safely
const useDimensions = () => {
  // Default values
  const [dimensions, setDimensions] = useState({ spread: 250, iconSize: 70 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setDimensions({ spread: 140, iconSize: 58 }); 
      } else if (width < 1024) {
        setDimensions({ spread: 200, iconSize: 60 }); 
      } else {
        setDimensions({ spread: 250, iconSize: 72 }); 
      }
    };
    
    // Initial call
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

const ConnectionLine = ({ endX, endY, curveOffset, progress }) => {
  // Use the pre-calculated curveOffset so lines don't jitter on re-render
  const midX = endX / 2 + curveOffset.x; 
  const midY = endY / 2 + curveOffset.y;
  
  // Lines draw early [0.05 to 0.4]
  const lineProgress = useTransform(progress, [0.05, 0.4], [0, 1]);
  const opacity = useTransform(progress, [0.05, 0.2], [0, 1]);

  const path = `M 0 0 Q ${midX} ${midY} ${endX} ${endY}`;
  
  return (
    <svg className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none z-0" style={{ marginLeft: -1, marginTop: -1 }}>
      <motion.path 
        d={path}
        fill="none"
        stroke="#94a3b8" 
        strokeWidth="2" 
        strokeDasharray="4 4" 
        style={{ pathLength: lineProgress, opacity }}
      />
    </svg>
  );
};

const SkillCard = ({ src, x, y, rotate, progress, iconSize }) => {
    // Cards appear pop up [0.15 to 0.45]
    const scale = useTransform(progress, [0.15, 0.45], [0, 1]);
    const opacity = useTransform(progress, [0.15, 0.4], [0, 1]);
    
    return (
        <motion.div
            style={{ 
                x, 
                y, 
                scale, 
                opacity,
                rotate: rotate 
            }}
            // Center the card exactly on the coordinate
            className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center"
        >
            {/* The "Polaroid/Card" wrapper */}
            <div 
                className="bg-white p-2 pb-2 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] rounded-sm transform transition-transform hover:scale-110 hover:z-50 cursor-pointer"
                style={{ width: iconSize, marginLeft: -iconSize/2, marginTop: -iconSize/2 }} // distinct sizing
            >
                
                <div className="bg-stone-50 border border-stone-100 aspect-square flex items-center justify-center p-2 mb-1">
                    <img src={src} alt="tool" className="w-full h-full object-contain" />
                </div>
            </div>
        </motion.div>
    )
}

const Toolkit = () => {
  const containerRef = useRef(null);
  const { spread, iconSize } = useDimensions();

  // Define layout multipliers (relative positions)
  const partnerConfig = useMemo(() => [
    { src: adobexd, xm: -0.8, ym: -0.8, rotate: -5, curve: {x: -20, y: 10} },
    { src: adobeprem, xm: 0, ym: -1.0, rotate: 3, curve: {x: 10, y: -10} },
    { src: wordpress, xm: 0.8, ym: -0.8, rotate: -2, curve: {x: 20, y: 20} },
    { src: figma, xm: -1.0, ym: 0, rotate: 6, curve: {x: -10, y: -20} },
    { src: meta, xm: 1.0, ym: 0, rotate: -4, curve: {x: 15, y: 5} },
    { src: lightroom, xm: -0.8, ym: 0.8, rotate: 4, curve: {x: -25, y: 10} },
    { src: acrobat, xm: 0, ym: 1.0, rotate: -3, curve: {x: 5, y: 25} },
    { src: aftereffect, xm: 0.8, ym: 0.8, rotate: 2, curve: {x: 20, y: -5} },
  ], []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-stone-100 relative overflow-hidden border-t border-stone-200">
      
      {/* --- Styles --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
          .font-handwriting { font-family: 'Patrick Hand', cursive; }
        `}
      </style>

      {/* Background: Graph Paper */}
      <div className="absolute inset-0 opacity-50 pointer-events-none" />
      
      
      {/* Radial Gradient Fade for edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,245,244,1)_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 min-h-[600px] md:min-h-[800px] flex items-center justify-center relative">
        
        {/* The "Mind Map" Container */}
        <div className="relative w-full h-full flex items-center justify-center">

            {/* 1. Connecting Lines Layer */}
            {partnerConfig.map((partner, i) => (
                <ConnectionLine 
                    key={`line-${i}`}
                    endX={partner.xm * spread} 
                    endY={partner.ym * spread} 
                    curveOffset={partner.curve}
                    progress={smoothProgress}
                />
            ))}

            

            {/* 2. Central Hub (The "Idea") */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-20 text-center w-40 md:w-56 px-4 py-6 md:px-6 md:py-8 bg-white border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rotate-1"
            >
                {/* Pin Image */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md border border-red-700 z-30 flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-200 rounded-full opacity-50" />
                </div>
                
                <h2 className="text-xl md:text-2xl font-display font-black mb-2 text-stone-900">
                    Our Toolkit
                </h2>
                <p className="text-xs md:text-sm font-handwriting text-stone-600 leading-tight">
                    Everything we need to <br/>
                    drive your business
                </p>
            </motion.div>

            {/* 3. The Skills (The "Evidence") */}
            <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 w-0 h-0">
                    {partnerConfig.map((partner, i) => (
                        <div key={i} className="pointer-events-auto">
                            <SkillCard 
                                src={partner.src}
                                x={partner.xm * spread}
                                y={partner.ym * spread}
                                rotate={partner.rotate}
                                progress={smoothProgress} 
                                iconSize={iconSize}
                            />
                        </div>
                    ))}
                 </div>
            </div>

        </div>
      </div>
    </section>
  )
}

export default Toolkit;