"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  { id: 1, title: "Origin", date: "April 12, 2026", location: "Nairobi", img: "/logo.jpg" },
  { id: 2, title: "The Pulse", date: "May 25, 2026", location: "Mombasa", img: "/logo.jpg" },
  { id: 3, title: "Echoes", date: "July 10, 2026", location: "Kisumu", img: "/logo.jpg" },
  { id: 4, title: "Awakening", date: "Sept 05, 2026", location: "Naivasha", img: "/logo.jpg" }
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
    <section ref={sectionRef} id="events" className="relative h-[80dvh] md:h-[100dvh] w-full bg-brand-brown text-brand-light overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] md:opacity-[0.2] mix-blend-normal md:mix-blend-overlay pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] md:w-[120vw] md:h-[120vh] bg-brand-dark/80 rounded-[100%] blur-[80px] md:blur-[150px] pointer-events-none" />

      <div className="absolute top-12 md:top-20 left-6 md:left-24 z-20">
        <h2 className="text-4xl md:text-8xl font-heading font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px rgba(46, 107, 58, 0.4)", color: "rgba(46, 107, 58, 0.05)"}}>
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
              <Link 
                href="/events"
                className="interactive px-5 py-2 md:px-6 md:py-3 bg-brand-orange text-white rounded-full font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-white hover:text-brand-orange text-sm md:text-base border border-transparent shadow-xl inline-block"
              >
                Get Tickets
              </Link>
            </div>
          </div>
        ))}

        {/* Explore All Events CTA Card */}
        <div className="group relative w-full md:w-[450px] h-[300px] md:h-[600px] rounded-2xl overflow-hidden shrink-0 cursor-none shadow-2xl flex items-center justify-center bg-brand-dark/50 border border-white/10 hover:border-brand-orange/50 transition-colors duration-500">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-orange)_0%,_transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
           <div className="text-center p-8 z-10 relative">
             <h3 className="text-3xl md:text-5xl font-heading font-black uppercase mb-6 text-white group-hover:text-brand-orange transition-colors duration-300">
               Want More?
             </h3>
             <p className="text-white/60 mb-8 max-w-xs mx-auto">
               Discover the full lineup of Mataha experiences happening across the country.
             </p>
             <Link 
                href="/events"
                className="interactive px-8 py-4 bg-transparent border-2 border-brand-orange text-brand-orange rounded-full font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:shadow-[0_0_50px_rgba(255,87,34,0.6)] inline-block"
              >
                View All Events &rarr;
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
