import React from 'react';
import { motion } from 'framer-motion';

// --- Assets ---
import healthcare from "@/assets/midsection-man-using-mobile-phone_533890-5854.avif"
import food from "@/assets/front-view-female-cook-cutting-apple-dark-cooking-salad-health-job-diet-vegetable-meal-food-fruit_179666-43823.avif"
import ecommerce from "@/assets/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.avif"
import education from "@/assets/front-view-academic-cap-with-books-pencils_23-2148756619.avif" 
import automotive from "@/assets/automobile-assembly-line-production-generative-ai_153608-35080.avif"
import travel from "@/assets/happy-caucasian-female-tourist-with-backpack-using-smart-phone-while-walking-old-city-chiang-mai-northern-thailand_35674-17167.avif"
import manufacturing from "@/assets/robotic-arms-welding-assembling-automotive-factories_198067-1164777.jpg"
import fashion from "@/assets/model-women-dressed-fashionable-pastel-blazers-pants-with-stylish-sneakers-posing-cube-white-background-studio_8544-2567.avif"
import { getImage } from '@/utils/imagekit';

const bgSection = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000";

// Updated Data with specific "hover text" for each industry
const industries = [
  {
    id: 1,
    name: "Healthcare",
    img: getImage("Work/midsection-man.avif", 800),
    text: "Patient-First Digital Care",
  },
  {
    id: 2,
    name: "Fashion",
    img: getImage("Work/model-women.avif", 800),
    text: "Trendsetting Design",
  },
  {
    id: 3,
    name: "Food",
    img: getImage("Work/vegetable-meal.avif", 800),
    text: "Fresh & Fast Food Solutions",
  },
  {
    id: 4,
    name: "E-Commerce",
    img: getImage("Work/showing-cart-trolley.avif", 800),
    text: "Seamless Shopping Exp.",
  },
  {
    id: 5,
    name: "Education",
    img: getImage("Work/front-view-academic.avif", 800),
    text: "Next-Gen EdTech",
  },
  {
    id: 6,
    name: "Real Estate",
    img: getImage("Work/real.avif", 800),
    text: "Virtual Property Tours",
  },
  {
    id: 7,
    name: "Automotive",
    img: getImage("Work/automobile-assembly-line.avif", 800),
    text: "Smart Mobility Tech",
  },
  {
    id: 8,
    name: "Travel",
    img: getImage("Work/happy-caucasian-female.avif", 800),
    text: "Global Booking Systems",
  },
  {
    id: 9,
    name: "Manufacturing",
    img: getImage("Work/robotic-arms-welding.jpg", 800),
    text: "Industry 4.0 Automation",
  },
];

const Industries = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-slate-900">
      
      {/* --- Section Background Image --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgSection} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* --- LEFT SIDE: Sticky Content --- */}
          <div className="lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-1 bg-primary mb-8" />
              
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                Industries We Serve
              </h2>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                At <span className="text-white font-bold">Design Brew</span>, we have a proven track record of delivering innovative and customized solutions for various industries. We leverage our expertise in cloud services, modern workspace, process automation, and digital transformation to help our clients achieve their business goals and stay ahead of the competition.
              </p>
              
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: 3x3 Grid --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {industries.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg bg-slate-800 cursor-pointer border border-white/5 shadow-2xl"
              >
                {/* 1. The Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  loading='lazy'
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* 2. The Text Overlay (Always Visible but subtle, then pops on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-white font-display font-bold text-lg md:text-xl transform transition-transform duration-300 group-hover:-translate-y-8">
                        {item.name}
                    </span>
                </div>

                {/* 3. The Hover Content (Slides UP from bottom) */}
                <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center p-4 text-center">
                  
                  <span className="text-white font-display font-bold text-xl md:text-2xl mb-2">
                    {item.name}
                  </span>
                  
                  {/* Unique Text per Industry */}
                  <span className="text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-2 group-hover:translate-y-0">
                    {item.text}
                  </span>
                  
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Industries;