import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Calendar, ArrowRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
];

// Custom SVG Scribble for Hover Effect on Links
const Scribble = () => (
  <svg className="absolute -bottom-1 left-0 w-full h-3 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
    <motion.path
      d="M0,5 Q50,10 100,5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </svg>
);

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: import.meta.env.VITE_CALENDLY_URL,
      });
    } else {
      console.warn("Calendly not loaded");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      {/* --- Global Styles --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
          .font-marker { font-family: 'Permanent Marker', cursive; }
          
          .paper-edge {
             mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 V40 Q30,60 60,40 T120,40 T180,40 T240,40 T300,40 T360,40 T420,40 T480,40 T540,40 T600,40 T660,40 T720,40 T780,40 T840,40 T900,40 T960,40 T1020,40 T1080,40 T1140,40 T1200,40 V0 Z' fill='black'/%3E%3C/svg%3E");
             mask-size: 60px 100%;
             mask-repeat: repeat-x;
             mask-position: bottom;
          }
        `}
      </style>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
            ? "bg-[#fdfbf7] py-2 shadow-sm"
            : "bg-transparent py-3 md:py-5"
          }`}
      >
        {/* Ripped Paper Edge (Visible on scroll) */}
        <div
          className={`absolute bottom-[-10px] left-0 right-0 h-[12px] bg-[#fdfbf7] w-full transition-opacity duration-300 paper-edge ${scrolled && !isOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="container-padding max-w-7xl mx-auto flex items-center justify-between relative z-20 px-4 md:px-6">

          {/* Logo */}
          <Link href="/" className="group relative">
            <div className="flex items-center gap-2 font-display font-black text-xl md:text-2xl tracking-tighter text-stone-900">
              <div className="relative group-hover:rotate-[-5deg] transition-transform duration-300">
                <img src={logo} alt="Design Brew" className="h-6 w-auto md:h-10 drop-shadow-sm" />
              </div>
              <span>Design Brew</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-2 py-1 text-base font-medium text-stone-600 hover:text-stone-900 transition-colors"
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {(location === link.href || hoveredLink === link.href) && <Scribble />}
              </Link>
            ))}

            <div className="h-6 w-px bg-stone-300 mx-2" />

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="
    group relative px-5 py-2
    font-bold text-sm tracking-wide
    border-2 border-stone-900 text-stone-900
    transition-all duration-200
    hover:bg-stone-900 hover:text-white
    hover:-translate-y-1 hover:-rotate-1
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]
  "
              >
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>Contact Us</span>
                </div>
              </Link>


              <button
                onClick={openCalendly}
                className="
                    group relative px-5 py-2
                    font-bold text-sm tracking-wide
                    text-white bg-stone-900
                    transition-transform duration-200
                    hover:-translate-y-1 hover:rotate-1
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]
                "
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Book Slot</span>
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-1 text-stone-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop: Darkens the rest of the screen & closes menu on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-stone-900/20 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Sheet: Auto height based on content */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              // Fixed top/left/right, H-AUTO to fit content, Rounded bottom
              className="fixed top-0 left-0 right-0 z-40 bg-[#fdfbf7] h-auto rounded-b-[2rem] shadow-2xl overflow-hidden"
            >
              <nav className="flex flex-col items-center pt-20 pb-8 px-6 gap-5 text-center">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl font-marker ${location === link.href ? "text-primary rotate-[-2deg]" : "text-stone-800"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-6 flex flex-col items-center gap-3"
                >
                  {/* Compact Mobile Buttons */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openCalendly();
                    }}
                    className="w-full max-w-[200px] px-4 py-2.5 bg-stone-900 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform rotate-1 flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} /> Book a Slot
                  </button>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full max-w-[200px] px-4 py-2.5 border-2 border-stone-900 text-stone-900 font-bold text-sm hover:bg-stone-100 transition-colors -rotate-1 flex items-center justify-center gap-2"
                  >
                    <Mail size={16} /> Contact Us
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}