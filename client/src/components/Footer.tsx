import { Instagram, Mail, Linkedin, ArrowUpRight, MessageCircle, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { sanityClient } from "@/sanity/client";

import whatsapp from "@/assets/whatsapp-svgrepo-com.svg";
import instagram from "@/assets/instagram-svgrepo-com.svg";
import linkedin from "@/assets/linkedin-svgrepo-com.svg";

export const Footer = () => {
  const [contact, setContact] = useState<any>(null);

  const socialLinks = [
    { icon: instagram, href: "https://www.instagram.com/design_brew_co/", label: "Instagram" },
    { icon: linkedin, href: "https://www.linkedin.com/company/design-brew-company-com/", label: "LinkedIn" },
    { icon: whatsapp, href: "https://wa.me/918427395293?text=Hello%20Design%20Brew%21", label: "WhatsApp" },
  ];

  useEffect(() => {
    sanityClient
      .fetch(`*[_type=="footer"][0]{ contact }`)
      .then((data) => setContact(data?.contact));
  }, []);

  const handleEmailClick = () => {
    if (!contact?.email) return;
    const subject = "Request regarding your service";
    const body = "Hi, Design Brew";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-background/20 to-transparent" />

      <div className="container-padding relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">

          {/* Brand Column (UNCHANGED) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-display font-bold text-3xl mb-4 tracking-tight text-red-50">
              Design Brew
            </h3>
            <p className="text-background/60 leading-relaxed mb-8 max-w-sm text-lg">
              One Stop Solution for all your Infinite Ideas. We craft exceptional
              digital experiences that inspire and convert.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  whileHover={{ y: -4 }}
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-background/25 rounded-xl flex items-center justify-center hover:bg-background/40 transition-all duration-300 group"
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-5 h-5 brightness-0 invert"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Column (CMS DRIVEN) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            <h4 className="font-display font-bold text-2xl mb-4 tracking-tight text-red-50">
              Contact Us
            </h4>

            {contact && (
              <div className="flex flex-col gap-5 w-full">
                {/* Phone */}
                <div
                  className="flex items-center justify-center md:justify-start gap-3 cursor-pointer group transition-all"
                  onClick={() => window.open(`tel:${contact.phone}`, "_self")}
                >
                  <Phone className="w-5 h-5 text-background/50 group-hover:text-background shrink-0" />
                  <span className="text-background/60 text-lg hover:text-background">
                    {contact.phone}
                  </span>
                </div>

                {/* Email */}
                <div
                  className="flex items-center justify-center md:justify-start gap-3 cursor-pointer group transition-all"
                  onClick={handleEmailClick}
                >
                  <Mail className="w-5 h-5 text-background/50 group-hover:text-background shrink-0" />
                  <span className="text-background/60 text-lg hover:text-background">
                    {contact.email}
                  </span>
                </div>

                {/* Address */}
                <div
                  className="flex items-start justify-center md:justify-start gap-3 cursor-pointer group transition-all"
                  onClick={() => window.open(contact.mapLink, "_blank")}
                >
                  <MapPin className="w-5 h-5 text-background/50 mt-1 group-hover:text-background shrink-0" />
                  {/* 'text-left' ensures multi-line addresses look good even when the block is centered */}
                  <span className="text-background/60 text-lg hover:text-background text-left">
                    {contact.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Resources Column (UNCHANGED) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-display font-bold text-2xl mb-4 tracking-tight text-red-50">
              Resources
            </h4>
            <ul className="space-y-4">
              {["Read our Blog", "Our Work", "Terms of Service", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <Link
                    href={
                      link === "Read our Blog"
          ? "/blog"
          : link === "Terms of Service"
          ? "/terms"
          : link === "Privacy Policy"
          ? "/privacy-policy"
          : "/work"
                    }
                    className="text-background/60 text-lg hover:text-background leading-relaxed"
                  >
                    {link}
                    <ArrowUpRight size={14} className="inline ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
