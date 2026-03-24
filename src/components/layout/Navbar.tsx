"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-[100] px-6 py-4 transition-all duration-300 ${
        isScrolled ? "glass" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="interactive group flex items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/10 group-hover:border-brand-orange transition-colors duration-300 bg-white">
             <Image src="/logo.jpg" alt="Mataha Logo" fill className="object-cover" />
          </div>
          <span className="font-heading font-bold text-xl tracking-wide text-brand-dark dark:text-brand-light">MATAHA</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#story" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Story</Link>
          <Link href="#events" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Events</Link>
          <Link href="#gallery" className="interactive text-brand-dark dark:text-brand-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Gallery</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="interactive hidden md:block px-6 py-2 bg-brand-orange text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg">
            Get Tickets
          </button>
          <button className="interactive md:hidden p-2 rounded-full text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
