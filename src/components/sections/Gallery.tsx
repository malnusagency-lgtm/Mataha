"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { id: 1, src: "/gallery/1.jpg", alt: "Mataha crowd energy" },
  { id: 2, src: "/gallery/3.jpg", alt: "Festival vibes and dancing" },
  { id: 3, src: "/gallery/5.jpg", alt: "Dance floor moments" },
  { id: 4, src: "/gallery/8.jpg", alt: "Crowd vibes" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={containerRef} id="gallery" className="py-32 px-6 bg-brand-dark text-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 text-center pt-12">
        <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter">
          Visual <span className="text-brand-orange">Echoes</span>
        </h2>
        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg md:text-xl">
          A glimpse into the energy, the people, and the unforgettable moments that make Mataha Experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
            {images.slice(0, 2).map((img) => (
              <div key={img.id} className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </motion.div>

          <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 mt-0 md:mt-16">
            {images.slice(2, 4).map((img) => (
              <div key={img.id} className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA to full gallery */}
      <div className="text-center mt-16 md:mt-24">
        <Link
          href="/gallery"
          className="interactive group relative inline-block px-10 py-5 bg-white text-brand-dark rounded-full font-bold text-lg overflow-hidden shadow-2xl"
        >
          <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-[200%]">
            View Full Gallery →
          </span>
          <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 text-white bg-brand-orange">
            View Full Gallery →
          </span>
        </Link>
      </div>
    </section>
  );
}
