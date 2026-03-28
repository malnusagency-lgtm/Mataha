"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    // Initial reveal animation after preloader
    const timer = setTimeout(() => {
      gsap.fromTo(
        ".hero-text-line",
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        }
      );
      
      gsap.fromTo(
        ".hero-cta",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
      );
    }, 2800); // Wait for preloader

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-brand-dark text-white pt-28"
    >
      {/* Background Visuals */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-brown)_0%,_transparent_70%)] opacity-30" />
        <div className="absolute top-1/4 -right-1/4 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-brand-orange/10 rounded-full blur-[60px] md:blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-brand-green/10 rounded-full blur-[60px] md:blur-[120px]" />
        
        {/* subtle noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] md:opacity-20 mix-blend-normal md:mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl mx-auto">
        <div className="perspective-[1000px]">
          <div className="overflow-hidden py-2" style={{ perspective: "1000px" }}>
            <h1 className="hero-text-line text-4xl md:text-6xl lg:text-8xl font-heading font-black uppercase leading-[0.9] tracking-tighter opacity-0 transform-gpu">
              This is not
            </h1>
          </div>
          <div className="overflow-hidden py-2" style={{ perspective: "1000px" }}>
            <h1 className="hero-text-line text-4xl md:text-6xl lg:text-8xl font-heading font-black uppercase leading-[0.9] tracking-tighter opacity-0 transform-gpu text-brand-light/90">
               an event.
            </h1>
          </div>
          <div className="overflow-hidden py-2" style={{ perspective: "1000px" }}>
            <h1 className="hero-text-line text-brand-orange text-5xl md:text-7xl lg:text-9xl font-heading font-black uppercase leading-[0.9] tracking-tighter opacity-0 transform-gpu mt-4 md:mt-6 transition-all">
               This is an <br className="md:hidden" /> experience.
            </h1>
          </div>
        </div>
        
        <p className="hero-cta text-white/70 text-lg md:text-xl max-w-2xl mt-8 opacity-0">
          Immerse yourself in the rhythm of African culture. 
          A journey through sound, art, and motion.
        </p>

      </div>
    </section>
  );
}
