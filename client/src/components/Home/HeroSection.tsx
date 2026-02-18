import React from 'react'
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getImage } from '@/utils/imagekit';

const HeroSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={getImage("Home/Background.avif", 1600)}
          alt="Hero Background"
          className="w-full h-full object-cover blur-sm sm:blur-md lg:blur-none"
          loading="eager"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] lg:bg-gradient-to-r lg:from-background lg:via-background/70 lg:to-transparent" />
      </div>

      <div className="container-padding relative z-10 w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl lg:text-left flex flex-col items-center lg:items-start mt-20 sm:mt-32 lg:mt-0"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-display font-bold leading-[1.1] mb-8 text-center lg:text-left">
            One Stop Solution <br />
            <span className="text-4xl sm:text-5xl md:text-5xl">
              for all your{" "} <br />
              <span className="text-accent text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
                Infinite Ideas
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl 
text-white/70 lg:text-muted-foreground 
mb-10 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            A strategy-led digital marketing agency helping brands build authority, consistency, and measurable growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-68 sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-[220px] rounded-full px-8 py-4 text-lg 
shadow-lg transition-all duration-300
hover:scale-105 hover:shadow-xl hover:shadow-primary/40 border-none"
              >
                Start Your Project
              </Button>
            </Link>

            <Link href="/work" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-[220px] rounded-full px-8 py-4 text-lg
  text-foreground
  bg-background/90 lg:bg-background/50
  backdrop-blur-md transition-all duration-300
  hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg"
              >
                View Our Work
              </Button>

            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
