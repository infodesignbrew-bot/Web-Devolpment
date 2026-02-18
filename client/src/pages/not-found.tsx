import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Search, MapPin } from "lucide-react";
import error404 from "@/assets/businessman-with-doubts_23-2147618177.avif";

// --- Creative SVGs ---

const CoffeeSpill = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.8,33.4C59.6,44.7,48.7,54.1,36.4,61.9C24.1,69.7,10.4,75.9,-2.4,80C-15.2,84.1,-29.4,86.1,-41.8,80.7C-54.2,75.3,-64.8,62.5,-73.4,49.1C-82,35.7,-88.6,21.7,-88.3,7.9C-88,-5.9,-80.8,-19.5,-70.8,-30.9C-60.8,-42.3,-48,-51.5,-35.1,-59.5C-22.2,-67.5,-9.2,-74.3,5.1,-83.1L19.4,-91.9" transform="translate(100 100)" />
  </svg>
);

const DoodleArrow = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M10 25 Q 40 10 90 25"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.path 
      d="M80 15 L 90 25 L 80 35" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
    />
  </svg>
);

const GrainTexture = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter404">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter404)"/>
  </svg>
);

const FloatingSymbol = ({ delay, x, y, children }: { delay: number, x: string, y: string, children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -15, 0] }}
    transition={{ 
      opacity: { delay, duration: 0.5 },
      y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    }}
    className={`absolute ${x} ${y} text-primary/20 pointer-events-none font-handwriting font-bold text-6xl`}
  >
    {children}
  </motion.div>
);

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fdfbf7] text-center px-4 pt-20 relative overflow-hidden">
      
      {/* Background Texture */}
      <GrainTexture />
      <div className="absolute inset-0 bg-[linear-gradient(#00000005_1px,transparent_1px),linear-gradient(90deg,#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 z-10 relative">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-left relative"
        >
          
          <h1 className="text-7xl md:text-9xl font-display font-black leading-[0.8] mb-6 tracking-tighter text-neutral-900 relative">
            Lost in the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600">Grind</span>
            <span className="text-primary">.</span>
          </h1>

          <p className="text-xl text-neutral-500 mb-10 leading-relaxed max-w-md font-medium">
             We can't seem to find the page you're looking for. It might have been moved, deleted, or perhaps it's just still brewing.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start items-center mb-20">
            <div className="relative">
                <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-14 text-lg bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl group"
                >
                <Link href="/" className="flex items-center gap-2">
                    <Home size={20} />
                    Back to Home
                </Link>
                </Button>
                
            </div>

           
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex justify-center lg:justify-end"
        >
          <div className="relative mt-12 w-full max-w-[500px] md:max-w-[600px]">
            {/* The Image Container with "Torn Paper" Clip Path */}
            <div className="relative z-10 p-4 bg-white shadow-2xl rotate-2">
                {/* Image Frame */}
                <div className="overflow-hidden bg-neutral-100 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                        src={error404} 
                        alt="Confused businessman" 
                        className="w-full h-80 object-cover mix-blend-multiply opacity-90" 
                        style={{ clipPath: "polygon(2% 2%, 98% 1%, 100% 98%, 85% 96%, 70% 99%, 55% 96%, 40% 98%, 25% 95%, 10% 98%, 0% 95%)" }} // CSS Torn edge effect
                    />
                    {/* Grain overlay on image */}
                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                </div>

                {/* Caption */}
                <div className="mt-4 text-center">
                    <p className="font-handwriting text-neutral-400 text-xl font-bold">Error 404: Page Not Found</p>
                </div>
            </div>

            {/* Background Blob behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[80px] -z-10" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}