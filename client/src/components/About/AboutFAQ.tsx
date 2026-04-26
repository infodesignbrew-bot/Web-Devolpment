import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Play, Pause } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import whyDesignBrew from "@/assets/whyDesignBrew.mp4";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

const ServiceFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative mt-24 container-padding pb-32 overflow-hidden bg-background">

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
            Why <span className="text-primary">Design Brew</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We design thoughtful digital experiences that feel effortless,
            refined, and built to convert.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* VIDEO SECTION */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">

              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-[2rem] translate-x-4 translate-y-4" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl w-full h-[450px] bg-black group"
              >
                {/* VIDEO */}
                <video
                  ref={videoRef}
                  src={whyDesignBrew}
                  className="w-full h-full object-cover"
                  playsInline
                  onEnded={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0; // go back to start
                    }
                    setIsPlaying(false); // show play button again
                  }}
                />

                {/* Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="w-20 h-20 rounded-full flex items-center justify-center 
                      bg-white/10 backdrop-blur-md border border-white/20 text-white
                      hover:scale-110 transition"
                    >
                      <Play size={30} fill="currentColor" />
                    </button>
                  </div>
                )}

                {/* Pause Button (top right when playing) */}
                {isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white"
                  >
                    <Pause size={18} />
                  </button>
                )}
              </motion.div>
            </div>
          </div>

          {/* FAQ */}
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
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-bold text-lg ${isOpen ? "text-primary" : ""}`}>
                      {faq.question}
                    </span>

                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${isOpen ? "bg-primary text-white" : "bg-primary/10"
                      }`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <motion.div
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;