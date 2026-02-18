import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Hammer, ArrowLeft, Construction, PaintBucket } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#fdfbf7] flex items-center justify-center overflow-hidden">
      
      {/* --- Styles for Handwriting & Texture --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Permanent+Marker&display=swap');
          .font-marker { font-family: 'Permanent Marker', cursive; }
          
          .bg-grid-paper {
            background-size: 40px 40px;
            background-image:
              linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          }
          
          .tape-strip {
             background-color: rgba(255, 255, 255, 0.4);
             box-shadow: 0 1px 3px rgba(0,0,0,0.1);
             backdrop-filter: blur(2px);
             border-left: 1px dashed rgba(0,0,0,0.1);
             border-right: 1px dashed rgba(0,0,0,0.1);
          }
        `}
      </style>

      {/* 1. Background Grid & Noise */}
      <div className="absolute inset-0 bg-grid-paper opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* 2. Caution Tape Strips (Decorative) */}
      <div className="absolute top-10 -left-10 w-[120%] h-12 bg-yellow-400 rotate-[-5deg] flex items-center justify-center overflow-hidden shadow-sm border-y-4 border-yellow-500 z-0">
         <div className="flex gap-8 whitespace-nowrap font-marker text-black/80 text-xl tracking-widest opacity-70">
            {Array(10).fill("WORK IN PROGRESS • ").map((t, i) => <span key={i}>{t}</span>)}
         </div>
      </div>
      <div className="absolute bottom-20 -right-10 w-[120%] h-12 bg-yellow-400 rotate-[5deg] flex items-center justify-center overflow-hidden shadow-sm border-y-4 border-yellow-500 z-0">
         <div className="flex gap-8 whitespace-nowrap font-marker text-black/80 text-xl tracking-widest opacity-70">
            {Array(10).fill("DO NOT ENTER • ").map((t, i) => <span key={i}>{t}</span>)}
         </div>
      </div>

      {/* 3. The Main Card */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: -2 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative bg-white p-8 md:p-12 max-w-lg w-full mx-4 shadow-2xl rounded-sm border border-stone-200 z-10"
      >
        {/* Top Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-primary/20 -rotate-1 backdrop-blur-sm opacity-80" />

        <div className="text-center space-y-6">
            
            {/* Icon Group */}
            <div className="flex justify-center gap-4 text-slate-700 mb-4">
                <motion.div 
                    animate={{ rotate: [0, 15, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Hammer size={48} strokeWidth={1.5} />
                </motion.div>
                <div className="text-primary">
                    <Construction size={48} strokeWidth={1.5} />
                </div>
                <motion.div 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                     <PaintBucket size={48} strokeWidth={1.5} />
                </motion.div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
                Building <br/> Something Cool
            </h1>

            <div className="font-handwriting text-2xl text-slate-600 leading-relaxed rotate-1">
                <p>This web page is in construction.</p>
                <p className="text-primary font-bold mt-2">Please come back tomorrow!</p>
            </div>

            <div className="pt-6 border-t border-dashed border-slate-300">
                 <Link href="/">
                    <button className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-primary hover:scale-105 transition-all shadow-lg">
                        <ArrowLeft size={18} />
                        Return Home
                    </button>
                 </Link>
            </div>
        </div>

        {/* Coffee Stain Doodle */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-[6px] border-[#6F4E37]/10 rounded-full pointer-events-none blur-[1px]" />
      </motion.div>

    </div>
  );
};

export default UnderConstruction;