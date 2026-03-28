"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-brand-light text-brand-dark flex flex-col items-center justify-center relative overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] md:opacity-[0.1] mix-blend-normal md:mix-blend-overlay pointer-events-none" />
      
      <motion.div style={{ scale, opacity }} className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-8 leading-tight">
          Ready to <br className="hidden md:block"/> <span className="text-brand-orange">Experience?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-brand-dark/70 mb-12 max-w-2xl font-medium">
          Tickets for the upcoming highly anticipated Mataha events are strictly limited. Secure your spot now.
        </p>
        
        <Link href="/events" className="interactive group relative px-12 py-6 bg-brand-dark text-white rounded-full font-bold text-xl overflow-hidden shadow-2xl inline-block">
          <span className="relative z-10 flex items-center justify-center gap-3 transition-transform duration-300 group-hover:-translate-y-[200%]">
            Get Your Tickets Now
          </span>
          <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 text-brand-dark bg-brand-orange">
            Get Your Tickets Now
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
