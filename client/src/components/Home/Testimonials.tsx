import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source).width(200).url();

type Testimonial = {
  _id: string;
  name: string;
  company?: string;
  description: string;
};

const colors = [
  "bg-[#fffdf5]",
  "bg-[#f0f9ff]",
  "bg-[#fff1f2]",
  "bg-[#fdf4ff]",
  "bg-[#f0fdf4]",
  "bg-[#fff7ed]",
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "testimonial"]{
          _id,
          name,
          company,
          description,
        }`
      )
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Caveat:wght@700&display=swap');
          .font-handwriting { font-family: 'Shadows Into Light', cursive; }
          .font-marker { font-family: 'Caveat', cursive; }
        `}
      </style>
      <div className="container-padding relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <div className="bg-white px-8 py-4 shadow-lg rotate-[-2deg] border border-stone-200 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-600 z-20" />
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-stone-800">
                The <span className="text-primary">Wall of Love</span>
              </h2>
            </div>
          </motion.div>

          <p className="mt-6 text-stone-500 font-handwriting text-xl">
            Notes from our favorite people.
          </p>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full pb-12">
          <CarouselContent className="-ml-4 md:-ml-8 py-10">
            {testimonials.map((t, idx) => (
              <CarouselItem
                key={t._id}
                className="pl-4 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full px-2 pt-4">
                  <motion.div
                    whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                    initial={{ rotate: idx % 2 === 0 ? 2 : -2 }}
                    className={`relative h-full ${
                      colors[idx % colors.length]
                    } p-8 pt-12 shadow-md hover:shadow-2xl transition-all duration-300 border border-black/5 group`}
                  >
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="font-medium text-stone-700 leading-relaxed mb-6 flex-grow  text-xl select-none">
                        "{t.description}"
                      </p>

                      <div className="border-t border-stone-900/10 pt-4 mt-auto">
                        <h3 className="font-marker text-2xl font-bold text-stone-800">
                          {t.name}
                        </h3>
                        {t.company && (
                          <p className="text-xs uppercase tracking-widest font-bold text-stone-400 mt-1">
                            {t.company}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-multiply" />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static h-14 w-14 border-2 border-stone-800 bg-transparent hover:bg-stone-800 hover:text-white rounded-full" />
            <CarouselNext className="static h-14 w-14 border-2 border-stone-800 bg-stone-800 text-white rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
