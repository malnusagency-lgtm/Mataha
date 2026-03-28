"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Important for Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // pin for 1500px of scroll
        pin: true,
      });

      // Animate the text words
      const words = gsap.utils.toArray(".story-word");
      gsap.fromTo(words, 
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
          }
        }
      );
      
      // Animate image
      gsap.fromTo(imgRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        { 
          y: -50, 
          opacity: 1, 
          scale: 1.05, 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top top", 
            end: "+=1200", 
            scrub: true 
          } 
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const storyText = "Mataha is more than music. It is the heartbeat of a generation finding its voice. Rooted in pure African rhythm, elevated by boundless modern energy. We don't just throw parties. We craft memories that linger long after the bass fades.";

  return (
    <section ref={containerRef} id="story" className="relative h-[100dvh] w-full bg-brand-light text-brand-dark flex flex-col md:flex-row items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] md:opacity-[0.15] mix-blend-normal md:mix-blend-overlay pointer-events-none" />
      
      <div ref={imgRef} className="absolute -left-20 top-1/4 md:top-20 w-80 h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl opacity-0 transform-gpu rotate-[-5deg] z-0 hidden md:block group">
        <Image src="/logo.jpg" alt="Mataha Culture" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-brand-orange/20 mix-blend-color z-10 pointer-events-none" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full pl-6 md:pl-48">
        <div ref={textRef} className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium leading-[1.2] tracking-tight">
          {storyText.split(" ").map((word, i) => (
            <span key={i} className="story-word inline-block mr-3 md:mr-5 mb-2">
              {word}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 text-sm font-bold uppercase tracking-widest text-brand-dark/40 rotate-90 origin-right hidden md:block">
        The Story
      </div>
    </section>
  );
}
