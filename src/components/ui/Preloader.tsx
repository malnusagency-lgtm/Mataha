"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "";
      },
    });

    // Simple rhythmic pulsing animation
    tl.to(textRef.current, {
      scale: 1.1,
      duration: 0.4,
      repeat: 3,
      yoyo: true,
      ease: "power2.inOut",
    })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-dark text-brand-orange"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="relative overflow-hidden">
            <h1 ref={textRef} className="text-6xl md:text-8xl font-heading font-bold uppercase tracking-widest">
              Mataha
            </h1>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            <motion.div
              animate={{ height: ["10px", "30px", "10px"] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              className="w-2 bg-brand-orange rounded-full"
            />
            <motion.div
              animate={{ height: ["10px", "40px", "10px"] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 bg-brand-yellow rounded-full"
            />
            <motion.div
              animate={{ height: ["10px", "20px", "10px"] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 bg-brand-green rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
