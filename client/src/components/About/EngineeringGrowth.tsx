import React from 'react';
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import your from "@/assets/Your_growth_expertly_engineered_Design_Brew.avif";
import { getImage } from '@/utils/imagekit';

const EngineeringGrowth = () => {
  // Animation for drawing SVG lines
  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, delay: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Decorative Background Grid (Blueprint feel) */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight relative">
              Your growth,
              <br />
              <span className="relative inline-block text-primary">
                expertly engineered
              </span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed relative z-10">
              <p className="font-medium text-foreground text-xl">
                Design Brew was founded on a simple truth:{" "}
                <span className="font-bold text-foreground">
                  Design without strategy is decoration.
                </span>
              </p>


              <p>
                In a market where speed is prioritized over substance, we chose to slow down and build brands the right way — with research, positioning, and clarity at the core.
              </p>

              <div className="relative inline-block">
                <p>
                  Design Brew works with a wide variety of clients to transform their idea's to stunning and functional websites and mobile apps, and has helped the clients to make their mark digitally.
                </p>
                {/* Arrow Doodle pointing to quote */}
                <svg className="absolute -bottom-24 -right-12 w-20 h-20 text-muted-foreground/40 rotate-12 hidden lg:block" viewBox="0 0 50 50" fill="none">
                  <path d="M10,0 Q25,25 0,40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
                  <path d="M0,40 L10,38 M0,40 L5,30" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Styled Quote Block */}
            <div className="mt-12 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full" />
              <div className="pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="text-primary w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Goal</span>
                </div>
                <p className="text-xl font-display font-bold italic text-slate-800">
                  "Our team specializes in creating unique solutions which will meet all your long-term business goals and objectives."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Image Composition */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Abstract Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            <motion.div
              initial={{ opacity: 0, rotate: 2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md"
            >

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white bg-white">
                <img
                  src={getImage("About/Your_growth.avif")}
                  alt="Team brainstorming"
                  className="w-full h-[500px] object-cover"
                  loading="eager"
                />

                {/* Gradient Overlay at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default EngineeringGrowth