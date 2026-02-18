import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png"; 

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  // Track if message is sent for the notification dot
  const [hasMessage, setHasMessage] = useState(false);

  const phoneNumber = "8427395293"; 
  const defaultFallbackMessage = "Hi Design Brew! I'm interested in your services.";
  
  // Refs for click-outside logic
  const chatRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // --- 1. HANDLE CLICK OUTSIDE ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If chat is open...
      if (isOpen) {
        // ...and the click is NOT inside the chat window
        // ...and the click is NOT on the toggle button itself
        if (
          chatRef.current && !chatRef.current.contains(event.target as Node) &&
          btnRef.current && !btnRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --- TYPING TIMER ---
  useEffect(() => {
    if (isOpen && isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setHasMessage(true); 
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMessage = message.trim() ? message : defaultFallbackMessage;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 w-[320px] md:w-[350px] bg-[#E5DDD5] rounded-lg shadow-2xl overflow-hidden font-sans"
          >
            {/* --- Header --- */}
            <div className="bg-[#075E54] p-4 text-white flex items-center gap-3 shadow-md">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={logo} 
                    alt="Design Brew Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#075E54] rounded-full"></div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white leading-tight">Design Brew</h3>
                <p className="text-xs text-green-100 opacity-90">
                  {isTyping ? "typing..." : "Online"}
                </p>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white/80 hover:text-white"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* --- Chat Body --- */}
            <div 
              className="p-4 h-[200px] flex flex-col justify-end space-y-2 overflow-y-auto bg-opacity-10 bg-repeat"
              style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }} 
            >
              <div className="text-center text-xs text-gray-500 my-2 bg-[#E1F3FB] py-1 px-2 rounded-lg inline-block self-center shadow-sm">
                Today
              </div>

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] self-start shadow-sm w-16"
                >
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              {!isTyping && (
                 <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-3 text-sm text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[85%] self-start shadow-sm relative"
                 >
                   Hi! 👋 How can we assist you today?
                   <span className="text-[10px] text-gray-400 block text-right mt-1">
                     {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                 </motion.div>
              )}
            </div>

            {/* --- Input Area --- */}
            <form onSubmit={handleSendMessage} className="bg-[#f0f0f0] p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-white border-none rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button 
                type="submit"
                className={`p-2 rounded-full text-white transition-colors duration-200 flex items-center justify-center ${message.trim() ? 'bg-[#008a7c] hover:bg-[#075E54]' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912Z"></path>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Floating Action Button --- */}
      <motion.button
        ref={btnRef} // Attach ref here to exclude from click-outside logic
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center outline-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={`relative p-3.5 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center ${isOpen ? "bg-[#25D366]" : "bg-[#25D366] hover:bg-[#20bd5a]"}`}>
          
          <AnimatePresence mode="wait">
            
              <div className="relative">
                 {/* WhatsApp Icon */}
                 <motion.svg 
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  duration={0.2}
                  viewBox="0 0 24 24" 
                  width="28" 
                  height="28" 
                  fill="white"
                  className="w-7 h-7"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </motion.svg>
                
                {/* --- 2. GLOWING RED NOTIFICATION DOT --- */}
                {hasMessage && (
                  <span className="absolute top-0 right-0 -mt-2.5 -mr-2.5 flex h-3 w-3">
                    {/* The Ping/Glow Effect */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    {/* The Actual Dot */}
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border-2 border-white"></span>
                  </span>
                )}
              </div>
            
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}