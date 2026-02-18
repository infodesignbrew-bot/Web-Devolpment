import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { getImage } from "@/utils/imagekit";

const Hubspot = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const certificates = [
    { 
    img: getImage("Home/DBCertificate.png", 1200),
    label: "HubSpot Digital Marketing Certification",
    delay: 0.1,
  },
  ];

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 bg-[#fff5eb] relative overflow-hidden"
    >
      <div className="container-padding mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-8 text-slate-900">
              HubSpot Certified, <br />
              <span className="text-orange-600">
                Strategic Applied
              </span>
            </h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                We are officially certified by HubSpot Academy in Digital
                Marketing. This certification validates our expertise in
                inbound marketing, SEO, content strategy, paid campaigns,
                social media marketing, and performance analytics.
              </p>

              <div className="flex gap-4 items-start border-l-4 border-orange-500 pl-6 py-3 bg-white rounded-r-xl shadow-sm">
                <Award className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                <p className="text-sm md:text-base text-slate-600">
                  Certified in advanced digital marketing practices including
                  SEO optimization, campaign planning, automation workflows,
                  and ROI tracking.
                </p>
              </div>

              <p className="font-medium text-slate-800">
                We build digital systems that are strategic, scalable, and
                performance-focused.
              </p>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-orange-100/50 rounded-3xl -rotate-1 scale-105 opacity-50 pointer-events-none" />

            <div className="relative z-10 w-full">
              {certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: cert.delay,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-orange-100">
                    <img
                      src={cert.img}
                      alt={cert.label}
                      className="w-full h-auto object-contain pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hubspot;
