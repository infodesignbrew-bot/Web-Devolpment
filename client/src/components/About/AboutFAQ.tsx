import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Play, X } from "lucide-react";
import { sanityClient } from "@/sanity/client";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

// Replaced with the new YouTube ID
const YOUTUBE_VIDEO_ID = "yNAFtADhzss";

const ServiceFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type=="faq"] | order(_createdAt asc){
        _id,
        question,
        answer
      }`)
      .then(setFaqs)
      .catch(console.error);
  }, []);

  return (
    <section className="relative mt-24 container-padding pb-32 overflow-hidden bg-background">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24 relative">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight tracking-tight relative inline-block">
            Why <span className="relative text-primary">Design Brew</span>?
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-6">
            We design thoughtful digital experiences that feel effortless,
            refined, and built to convert.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Video Thumbnail / Play Button Section */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Offset Decorative Border */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-[2rem] translate-x-4 translate-y-4" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsVideoOpen(true)}
                className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl w-full h-[450px] flex items-center justify-center cursor-pointer group bg-black"
              >
                {/* --- Image Thumbnail beside/behind the play button --- */}
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />

                {/* Dark Overlay to ensure play button contrast */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="relative z-20 w-24 h-24 rounded-full 
  flex items-center justify-center 
  bg-white/5 backdrop-blur-md 
  border border-white/20 
  text-white/90
  group-hover:scale-110 
  group-hover:bg-white/10
  transition-all duration-300"
                >
                  <Play size={36} className="ml-1 opacity-90" fill="currentColor" />
                </div>

              </motion.div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col space-y-4 pt-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-card border-primary shadow-lg ring-1 ring-primary/20"
                    : "bg-background/50 border-border/60 hover:border-primary/50"
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <span
                      className={`font-bold text-lg transition-colors ${isOpen ? "text-primary" : "text-foreground"
                        }`}
                    >
                      {faq.question}
                    </span>

                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen
                        ? "bg-primary text-primary-foreground rotate-90"
                        : "bg-primary/10 text-secondary-foreground group-hover:bg-primary/10"
                        }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed relative">
                      <div className="absolute left-0 top-0 bottom-6 w-[4px] bg-primary rounded-r-full" />
                      <p className="pl-4 border-l border-border/0">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Small Centered Video Modal --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button integrated into the video container top right */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-[110] p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="Design Brew Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceFAQ;