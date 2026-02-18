import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles, HelpCircle } from "lucide-react";
import { sanityClient } from "@/sanity/client";
import faqImage from "@/assets/Curious_Minds_Design_Brew.avif";
import { getImage } from "@/utils/imagekit";

export default function CreativeFAQ() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        // Updated query to match your schema name: "servicesfaq"
        sanityClient
            .fetch(`*[_type == "servicesfaq"] | order(_createdAt asc)`)
            .then((data) => {
                setFaqs(data);
            })
            .catch(console.error);
    }, []);

    return (
        <section className="relative w-full py-24 bg-[#fcfbf9] overflow-hidden">
            <style>
                {`
                  @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
                  .font-handwriting { font-family: 'Shadows Into Light', cursive; }
                `}
            </style>

            {/* Background Textures */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            <div className="container-padding max-w-7xl mx-auto relative z-10 px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* --- LEFT COLUMN: Sticky Header --- */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-10">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-block relative"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute -top-10 -left-6 text-primary/20"
                                >
                                    <HelpCircle size={30} strokeWidth={1.5} />
                                </motion.div>

                                <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 relative z-10 leading-[0.9]">
                                    Curious
                                    <span className="text-primary"> Minds</span>
                                </h2>
                            </motion.div>
                            <p className="mt-6 text-xl text-slate-500 font-handwriting">
                                Everything you need to know, straight from the source.
                            </p>
                        </div>

                        {/* Visual Image */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
                            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative hidden lg:block group max-w-sm"
                        >
                            <div className="relative bg-white p-2 pb-8 shadow-lg border border-slate-200 rotate-[-2deg] transition-transform duration-500 group-hover:rotate-0">
                                <div className="aspect-[2/3] bg-slate-100 overflow-hidden ">
                                    <img
                                        src={getImage(
                                            "Services/Curious_Minds_Design_Brew.avif",
                                            1200
                                        )}
                                        alt="Creative Team"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                </div>
                                <div className="absolute left-4">
                                    <p className="font-handwriting text-lg text-slate-800">We're here to help!</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- RIGHT COLUMN: Dynamic FAQ List --- */}
                    <div className="lg:col-span-7 space-y-6 mt-10 lg:mt-40">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={faq._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="relative group cursor-pointer"
                                >
                                    <div
                                        className={`
                                            relative bg-white border-2 border-slate-200 rounded-lg overflow-hidden transition-all duration-300
                                            ${isOpen ? 'shadow-xl -rotate-1 scale-[1.02] border-slate-900' : 'shadow-sm hover:shadow-md hover:-translate-y-1'}
                                        `}
                                    >
                                        <div className="p-4 md:p-5 flex items-center justify-between gap-3">
                                            <h3 className={`text-base md:text-lg font-semibold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
                                                {faq.question}
                                            </h3>

                                            <div className={`
                                                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                                ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'bg-transparent border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary'}
                                            `}>
                                                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 md:px-8 pb-8 pt-0 relative">
                                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                            {faq.answer}
                                                        </p>

                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}