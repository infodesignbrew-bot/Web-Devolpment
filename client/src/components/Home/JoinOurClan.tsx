import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, Star, Zap } from "lucide-react";
// Assuming this import path is correct in your project
import transformed from "@/assets/transformed.svg";

const JoinOurClan = () => {
  const stats = [
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "100%", label: "On-time Delivery", icon: Zap },
    { value: "24/7", label: "Support Available", icon: Clock },
    { value: "85%", label: "Repeat Clients", icon: Users },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden border-t border-border/40 relative font-sans">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 flex flex-col items-center text-center">

        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Helping teams turn ideas into <br className="hidden md:block" />
            <span className="text-primary relative inline-block">
              thriving businesses
            </span>
          </h2>
        </motion.div>

        {/* Central Graphic - The "Bridge" */}
        <div className="relative z-20 -my-6 md:-my-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow behind the SVG */}
            <div className="absolute scale-75" />
            
            <motion.img
              src={transformed}
              alt="Growth Transformation"
              whileHover={{
                scale: 1.1,
                rotate: 5,
               
              }}
              transition={{ type: "spring", stiffness: 300 }}
              draggable="false"
              className="w-32 h-32 md:w-48 md:h-48 relative z-10 cursor-pointer drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-6xl mt-8 md:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-transparent hover:border-primary/10 transition-all duration-300"
              >
                {/* Icon Bubble */}
                <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-secondary/30">
                  <stat.icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                </div>
                
                {/* Data */}
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-1 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinOurClan;