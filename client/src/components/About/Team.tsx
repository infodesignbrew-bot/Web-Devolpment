import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/client";


const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const Team = () => {
  const [founder, setFounder] = useState<any>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "founder"][0]{
        name,
        image,
        description
      }`)
      .then((data) => setFounder(data));
  }, []);

  if (!founder) return null;

  return (
    <section className="relative w-full py-24 overflow-hidden bg-background">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Meet our <span className="text-primary">visionary</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto lg:mx-0 max-w-md lg:max-w-full"
          >
            <div className="relative z-10">
              <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-[2rem] rotate-6 scale-105" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay" />

                <img
                  src={urlFor(founder.image).width(800).url()}
                  alt={founder.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-mono text-sm font-semibold tracking-widest uppercase">
                Founder & Serial Entrepreneur
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[1.1]">
              {founder.name}
            </h2>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <PortableText value={founder.description} />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Team;
