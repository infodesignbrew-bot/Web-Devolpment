import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import blend from "@/assets/blend.mp4";

const VideoTransition = () => {
  const container = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.2, 0.8], ["60vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0.2, 0.8], ["50vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.8], ["20px", "0px"]);
  const padding = useTransform(scrollYProgress, [0.2, 0.8], ["24px", "0px"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // 🔥 autoplay on scroll + sound attempt
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = false;
        await video.play(); // try with sound
      } catch (err) {
        video.muted = true; // fallback muted autoplay
        video.play();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={container} className="relative h-[250vh] bg-[#fdfbf7]">

      <div className="sticky top-0 h-screen flex items-center justify-center">

        <motion.div
          style={{ width, height, borderRadius, padding }}
          className="relative bg-white shadow-2xl overflow-hidden"
        >

          {/* VIDEO */}
          <motion.video
            ref={videoRef}
            style={{ scale: videoScale }}
            className="w-full h-full object-cover object-[50%_37%]"
            loop
            playsInline
            muted
          >
            <source src={blend} type="video/mp4" />
          </motion.video>

          {/* soft overlay */}
          <div className="absolute inset-0 bg-black/5" />

        </motion.div>
      </div>
    </section>
  );
};

export default VideoTransition;