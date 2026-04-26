import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Zap, 
  BarChart, 
} from "lucide-react";
import { Link } from "wouter";
import { getImage } from "@/utils/imagekit";

// --- Custom SVGs ---

const Steam = () => (
  <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 text-gray-300 opacity-50" viewBox="0 0 50 50">
    <motion.path
      d="M15 25 Q 20 15, 15 5"
      stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"
      animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M25 25 Q 30 15, 25 5"
      stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"
      animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M35 25 Q 40 15, 35 5"
      stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"
      animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const ConnectorLine = () => (
  <div className="absolute left-8 md:left-1/2 top-48 bottom-0 w-1 -translate-x-1/2 md:translate-x-0 z-0 hidden md:block">
    <svg className="h-full w-24 overflow-visible" preserveAspectRatio="none">
      <motion.path
        d="M 0,0 Q 40,100 -40,200 T 0,400 Q 40,500 -40,600 T 0,800"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="3"
        strokeDasharray="10 10"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

// --- Updated Data with Images ---

const features = [
  {
    id: 1,
    icon: Layers,
    title: "Strategy First",
    color: "bg-yellow-100",
    rotate: "rotate-[-2deg]",
    image: getImage(
      "Work/Strategy_First.avif",
      1200
    )
  },
  {
    id: 2,
    icon: Zap,
    title: "Brand-focused",
    color: "bg-blue-100",
    rotate: "rotate-[1deg]",
    image: getImage(
      "Work/Brand_focused.avif",
      1200
    )
  },
  {
    id: 3,
    icon: BarChart,
    title: "Results-driven",
    color: "bg-orange-100",
    rotate: "rotate-[-1deg]",
    image: getImage(
      "Work/Results_driven.jpg",
      1200
    )
  }
];

const elevateImg = getImage("Work/confident.avif?v=2", 1200);

export default function ProcessSection() {
  return (
    <section className="relative py-24 bg-[#faf9f6] overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-[-50px] opacity-10 pointer-events-none">
        <div className="w-80 h-80 rounded-full border-[20px] border-[#8B4513] blur-md" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-800">
              Our Pillars
            </h2>
          </motion.div>
        </div>

        {/* The Timeline */}
        <div className="relative max-w-5xl mx-auto">
          <ConnectorLine />

          <div className="space-y-20 md:space-y-24">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >

                  {/* Text Side (Card) - Order 2 on Mobile */}
                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center w-full order-2 md:order-none`}>
                    <div className={`relative inline-block p-8 shadow-lg ${feature.color} ${feature.rotate} transition-transform hover:scale-105 duration-300 rounded-lg w-full max-w-md`}>
                      <h3 className="font-display font-bold text-3xl md:text-4xl mb-3 text-slate-900">
                        {feature.id}. {feature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Center Icon (The Process Marker) - Order 1 on Mobile */}
                  <div className="relative z-10 shrink-0 order-1 md:order-none">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-slate-100 shadow-xl flex items-center justify-center relative group">
                      <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                        {feature.id}
                      </div>

                      {/* Steam for the last step */}
                      {index === features.length - 1 && <Steam />}
                    </div>
                  </div>

                  {/* Image Side - Order 3 on Mobile (Removed hidden md:block) */}
                  <div className="flex-1 w-full order-3 md:order-none">
                    <div className={`relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ${feature.rotate} hover:scale-105 transition-transform duration-500`}>
                        
                        {/* Overlay for better blending */}
                        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply transition-opacity hover:opacity-0 z-10" />
                        
                        <img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-40 md:mt-28"
        >
          <div className="relative max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden">
            
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-20" />

            <div className="flex flex-col md:flex-row">
                
                {/* Left Side: Image */}
                <div className="w-full md:w-2/5 relative aspect-[2/3] md:aspect-auto overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply z-10 transition-opacity opacity-0 duration-500" />
                    <img 
  src={elevateImg}
  alt="Confident Business Professional"
  className="w-full h-full object-cover object-top md:object-center"
/>

                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center text-center md:text-left relative z-10">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Ready to elevate your brand?
                    </h3>

                    <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Let’s build something purposeful, scalable, and designed to perform. We turn your raw ideas into a refined digital experience.
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <Link to="/contact">
                            <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-slate-900 font-bold text-base shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50">
                                Get Started
                                <span className="transition-transform group-hover:translate-x-1">
                                →
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}