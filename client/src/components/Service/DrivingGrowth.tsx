import React from 'react'
import partners from "@/assets/Driving_Growth_Together_Design_Brew.avif";
import { getImage } from '@/utils/imagekit';

const DrivingGrowth = () => {
  return (
    <section className="bg-slate-50 border-y border-border/40 overflow-visible">
      <div className="container-padding flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 py-8 lg:py-0">

        {/* Left Side: Content */}
        <div className="lg:w-3/5 lg:ml-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            Driving <span className="text-primary">Growth</span> Together
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
            By collaborating with top technology platforms, we empower businesses with
            seamless digital transformation and innovative solutions.
          </p>
        </div>

        {/* Right Side: Partners Image */}
        <div className="lg:w-2/5 w-full flex justify-center lg:justify-end overflow-visible">
          <div className="relative max-w-[320px] lg:max-w-[380px] group overflow-visible">
            <img
              src={getImage(
                "Services/Driving_Growth_Together_Design_Brew.avif",
                1200
              )}
              alt="Our Technology Partners"
              className="relative w-full h-auto object-contain opacity-90 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2"
              loading="lazy"
            />

          </div>
        </div>

      </div>
    </section>
  )
}

export default DrivingGrowth
