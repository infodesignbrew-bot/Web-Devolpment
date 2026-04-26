import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import blend from "@/assets/blend.mp4";
import { VolumeX } from "lucide-react";

const VideoTransition = () => {
  const container = useRef(null);
  const videoRef = useRef(null);

  // Track if the user has interacted with the page AT ALL
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  // Track if we still need to show the fallback button
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.2, 0.8], ["60vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0.2, 0.8], ["50vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.8], ["20px", "0px"]);
  const padding = useTransform(scrollYProgress, [0.2, 0.8], ["24px", "0px"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // 🔥 1. Listen for ANY user interaction to unlock audio
  useEffect(() => {
    const unlockAudio = () => {
      setAudioUnlocked(true);
      // Clean up the listeners once unlocked
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // 🔥 2. Handle the scroll intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            // If the user has clicked anywhere on the site previously, this WILL work with sound.
            video.muted = !audioUnlocked;
            await video.play();
            setNeedsInteraction(!audioUnlocked);
          } catch (err) {
            // Ultimate fallback just in case
            video.muted = true;
            setNeedsInteraction(true);
            video.play().catch(e => console.error(e));
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [audioUnlocked]); // Re-run this effect if the unlocked state changes

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setNeedsInteraction(false);
      setAudioUnlocked(true);
    }
  };

  return (
    <section ref={container} className="relative h-[250vh] bg-[#fdfbf7]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ width, height, borderRadius, padding }}
          className="relative bg-white shadow-2xl overflow-hidden"
        >
          <motion.video
            ref={videoRef}
            style={{ scale: videoScale }}
            className="w-full h-full object-cover object-[50%_37%]"
            loop
            playsInline
          >
            <source src={blend} type="video/mp4" />
          </motion.video>

          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

          {needsInteraction && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-8 right-8 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-md transition-all shadow-lg z-10"
            >
              <VolumeX size={20} />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTransition;