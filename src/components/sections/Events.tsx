"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  { id: 1, title: "Origin", date: "April 12, 2026", location: "Nairobi", img: "/gallery/7.jpg" },
  { id: 2, title: "The Pulse", date: "May 25, 2026", location: "Mombasa", img: "/gallery/8.jpg" },
  { id: 3, title: "Echoes", date: "July 10, 2026", location: "Kisumu", img: "/gallery/9.jpg" },
  { id: 4, title: "Awakening", date: "Sept 05, 2026", location: "Naivasha", img: "/gallery/10.jpg" }
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const ctx = gsap.context(() => {
        const totalScroll = container.scrollWidth - window.innerWidth;
        
        gsap.to(container, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
          }
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="relative h-[80vh] md:h-screen w-full bg-brand-brown text-brand-light overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-brand-dark/80 rounded-[100%] blur-[150px] pointer-events-none" />

      <div className="absolute top-12 md:top-20 left-6 md:left-24 z-20">
        <h2 className="text-4xl md:text-8xl font-heading font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px rgba(245, 245, 245, 0.4)", color: "rgba(245, 245, 245, 0.05)"}}>
          Upcoming Exp.
        </h2>
      </div>

      <div 
        ref={containerRef} 
        className="flex flex-col md:flex-row gap-8 md:gap-24 px-6 md:px-48 pt-32 md:pt-20 h-full md:h-[70vh] items-center relative z-10 w-full md:w-max overflow-y-auto md:overflow-visible pb-12"
      >
        {events.map((event) => (
          <div key={event.id} className="group relative w-full md:w-[450px] h-[300px] md:h-[600px] rounded-2xl overflow-hidden shrink-0 cursor-none shadow-2xl">
            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image src={event.img} alt={event.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-30 transform md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block">{event.date} // {event.location}</span>
              <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-4 text-white drop-shadow-lg">{event.title}</h3>
              <button 
                className="interactive px-5 py-2 md:px-6 md:py-3 bg-brand-orange text-white rounded-full font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-white hover:text-brand-orange text-sm md:text-base border border-transparent shadow-xl"
              >
                Get Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
