import React from 'react';
import { motion } from 'framer-motion';
import { getImage } from '@/utils/imagekit';

type EventCardProps = {
  image: string;
  title: string;
  description: string;
  index: number;
};

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  description,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 last:mb-0 relative"
    >
      {/* Image Block */}
      <div className={`relative perspective-1000 ${!isEven ? 'lg:order-last' : ''}`}>

        {/* Floating Blur Behind */}
        <div className="absolute top-10 left-10 w-full h-full bg-primary/20 blur-[60px] rounded-full opacity-40 -z-10" />

        <motion.div
          whileHover={{ rotateY: isEven ? 3 : -3, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 group"
        >
          {/* Main Image */}
          <div className="overflow-hidden rounded-[2rem] shadow-2xl bg-white border-[8px] border-white relative">
            <img
              src={image}
              alt={title}
              className="w-full h-[320px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
              loading='eager'
            />
            {/* Gradient Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* Sticker Annotation */}
        <div className={`absolute -bottom-6 ${isEven ? '-left-6' : '-right-6'} z-30 hidden md:block`}>
          <motion.div
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="bg-white text-slate-900 px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rotate-[-4deg] rounded-sm border border-slate-200"
          >
            <p className="font-handwriting text-xl font-bold tracking-wide">
              {index === 0 ? "★ Highly Recommended" : "Featured Event"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Text Block */}
      <div className={`flex flex-col relative z-10 ${isEven ? 'lg:pl-6' : 'lg:pr-6 items-end text-right'}`}>

        <h3 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-6 leading-[1.05]">
          {title}
        </h3>

        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const bgImage = getImage("Work/blurred-co.avif", 1920);
  const eventData = [
    {
      title: "The Future of Digital Transformation",
      description: "Join our industry experts as they discuss the upcoming trends in AI and automation that are shaping the modern business landscape. Learn how to pivot before the market does.",
      image: getImage(
        "Work/business-video-call-laptop_23-2148667505.avif",
        1400
      ),
    },
    // Add more events here if needed
  ];

  return (
    <>
      {/* --- TOP SECTION WITH BACKGROUND IMAGE --- */}
      <section className="relative pt-32 pb-48 overflow-hidden">

        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Background Office"
            className="w-full h-full object-cover"
            loading='eager'
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 text-white">

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 tracking-tight leading-none"
          >

            <span className="text-transparent bg-clip-text bg-slate-200">
              Our Work
            </span>
          </motion.h2>

          {/* Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto font-light leading-relaxed"
          >
            We don't just follow the conversation; we drive it. Dive into our archive of
            <span className="text-white font-medium"> breakthrough strategies</span>,
            industry-defining events, and the technical case studies that prove our methodology works.
          </motion.p>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[#fdfbf7] rounded-t-[50%] scale-x-150 translate-y-12 z-20" />
      </section>

      {/* --- BOTTOM SECTION (CLEAN / WHITE) --- */}
      <section className="relative w-full pb-32 pt-10 bg-[#fdfbf7] z-20">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-6xl mx-auto">
            {eventData.map((event, index) => (
              <EventCard key={index} index={index} {...event} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Events;