"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const images = [
  { id: 1, src: "/gallery/1.jpg", alt: "Mataha crowd energy", size: "tall" },
  { id: 2, src: "/gallery/2.jpg", alt: "Live DJ performance", size: "wide" },
  { id: 3, src: "/gallery/3.jpg", alt: "Festival vibes and dancing", size: "square" },
  { id: 4, src: "/gallery/4.jpg", alt: "African cultural celebration", size: "square" },
  { id: 5, src: "/gallery/5.jpg", alt: "Dance floor moments", size: "tall" },
  { id: 6, src: "/gallery/6.jpg", alt: "Night life atmosphere", size: "wide" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <section ref={containerRef} id="gallery" className="py-32 px-6 bg-brand-dark text-white relative min-h-screen z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 md:mb-32 text-center pt-12">
        <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter">
          Visual <span className="text-brand-orange">Echoes</span>
        </h2>
        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg md:text-xl">
          A glimpse into the energy, the people, and the unforgettable moments that make Mataha Experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 overflow-visible">
          {/* Column 1 */}
          <motion.div style={{ y: isMobile ? 0 : y1 }} className="flex flex-col gap-6 md:gap-8 h-max">
            {images.slice(0, 2).map((img) => (
              <div 
                key={img.id} 
                className={`interactive relative w-full rounded-2xl overflow-hidden cursor-none group ${img.size === 'tall' ? 'h-[500px]' : 'h-[300px]'}`}
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </motion.div>
          
          {/* Column 2 */}
          <motion.div style={{ y: isMobile ? 0 : y2 }} className="flex flex-col gap-6 md:gap-8 mt-12 md:mt-24 h-max">
            {images.slice(2, 4).map((img) => (
              <div 
                key={img.id} 
                className={`interactive relative w-full rounded-2xl overflow-hidden cursor-none group ${img.size === 'tall' ? 'h-[500px]' : 'h-[400px]'}`}
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: isMobile ? 0 : y3 }} className="flex flex-col gap-6 md:gap-8 mt-6 md:mt-12 h-max">
            {images.slice(4, 6).map((img) => (
              <div 
                key={img.id} 
                className={`interactive relative w-full rounded-2xl overflow-hidden cursor-none group ${img.size === 'tall' ? 'h-[600px]' : 'h-[350px]'}`}
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 cursor-none"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute top-8 right-8 text-white font-bold uppercase tracking-widest text-sm hover:text-brand-orange transition-colors cursor-none pointer-events-auto">
              [ Close ]
            </div>
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-lg overflow-hidden pointer-events-none shadow-2xl"
            >
              <Image src={selectedImage} alt="Fullscreen View" fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
