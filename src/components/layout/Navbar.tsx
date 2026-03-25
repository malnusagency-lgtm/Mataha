"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[110] px-4 sm:px-6 py-4 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "glass" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <Link href="/" className="interactive group flex items-center gap-2 sm:gap-4 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full border border-white/10 group-hover:border-brand-orange transition-colors duration-300 bg-white shrink-0">
               <Image src="/logo.jpg" alt="Mataha Logo" fill className="object-cover" />
            </div>
            <span className="font-heading font-bold text-base sm:text-xl tracking-wide text-brand-dark dark:text-brand-light">MATAHA <span className="text-brand-orange">Experience</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Home</Link>
            <Link href="#story" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Story</Link>
            <Link href="/events" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Events</Link>
            <Link href="/gallery" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Gallery</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/events" className="interactive hidden md:block px-6 py-2 bg-brand-orange text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg">
              Get Tickets
            </Link>
            <button 
              className="interactive md:hidden p-2 rounded-full text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - rendered OUTSIDE nav to avoid overflow clipping */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[105] bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading font-black uppercase text-white hover:text-brand-orange transition-colors">Home</Link>
            <Link href="#story" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading font-black uppercase text-white hover:text-brand-orange transition-colors">Story</Link>
            <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading font-black uppercase text-white hover:text-brand-orange transition-colors">Events</Link>
            <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading font-black uppercase text-white hover:text-brand-orange transition-colors">Gallery</Link>
            <Link 
              href="/events"
              onClick={() => setIsMobileMenuOpen(false)} 
              className="mt-6 px-8 py-4 bg-brand-orange text-white rounded-full font-bold uppercase text-lg hover:bg-orange-600 transition-colors shadow-xl inline-block"
            >
              Get Tickets
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
