import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Scale, ShieldCheck, TrendingUp } from "lucide-react";

const BenefitsOfWorking = () => {
  const benefits = [
    {
      title: "Growth",
      desc: "Mentorship to fast-track your career.",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
      title: "Policies",
      desc: "Flexible, people-first workplace rules.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Fair Appraisals",
      desc: "Merit-based reviews valuing real impact.",
      icon: <Scale className="w-8 h-8 text-primary" />,
    },
    {
      title: "Work-Life Balance",
      desc: "Schedules that prioritize your well-being.",
      icon: <Heart className="w-8 h-8 text-primary" />,
    },
  ];
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Background Decor (Optional) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />

      <div className="container-padding relative">

        {/* Handwriting Annotation - Desktop only */}
        <div className="absolute left-30 top-0 hidden xl:block pointer-events-none">
          <div className="relative w-[180px]">
            <p
              className="text-primary"
              style={{
                fontFamily: '"Shadows Into Light", cursive, urbane, sans-serif',
                fontSize: '20px',
                fontWeight: 100,
                lineHeight: '28px',
                letterSpacing: '0.5px',
                opacity: 0.85,
                transform: 'rotate(-20deg) translateY(40px)'
              }}
            >
              Dedicated to digital excellence – that’s us
            </p>


            <svg
              className="absolute top-[110px] right-[-50px] text-primary "

              width="200"
              height="40"
              viewBox="0 0 124 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 25.7132C2 25.7132 48 51.7132 69 38.2132C90 24.7132 84.5 2.21323 69 2.21323C49 2.21323 49.0765 35.2868 71.5 33.7132C100 31.7132 122.5 6.71323 122.5 6.71323"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 250,      // total length of path (adjust if needed)
                  strokeDashoffset: 250,     // hide the path initially
                  animation: 'drawLine 3s linear forwards'
                }}
              />
            </svg>

          </div>
        </div>

        {/* Header - shifted fully right */}
        <div className="max-w-3xl mb-16 lg:ml-auto text-right">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Benefits of working at <span className="text-primary">Design Brew</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl lg:ml-24">
            The best performance in the workplace is fuelled by a happy life outside work. Therefore, investing in your career and life is at the heart of our philosophy. Here’s how we go the extra mile for our team...
          </p>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {benefits.map((benefit, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="group border-[10px] border-gray-900 bg-slate-50 h-full rounded-none transition-all duration-300 hover:bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] select-none">
                  <CardContent className="p-10 flex flex-col items-center text-center h-full">
                    <div className="mb-6 p-4 bg-white border-2 border-gray-900 rounded-full transition-transform group-hover:scale-110 shadow-sm">
                      {benefit.icon}
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-tighter mb-3">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex gap-4 mt-16 justify-center lg:justify-center lg:mr-8">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 border-2 border-gray-900 hover:bg-gray-100 transition-all rounded-full" />
            <CarouselNext className="static translate-y-0 h-14 w-14 bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary transition-all rounded-full" />
          </div>

        </Carousel>
      </div>
    </section>
  )
}

export default BenefitsOfWorking
