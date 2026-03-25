"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const allImages = [
  { id: 1, src: "/gallery/1.jpg", alt: "Mataha crowd energy" },
  { id: 2, src: "/gallery/2.jpg", alt: "Live DJ performance" },
  { id: 3, src: "/gallery/3.jpg", alt: "Festival vibes and dancing" },
  { id: 4, src: "/gallery/4.jpg", alt: "African cultural celebration" },
  { id: 5, src: "/gallery/5.jpg", alt: "Dance floor moments" },
  { id: 6, src: "/gallery/6.jpg", alt: "Night life atmosphere" },
  { id: 7, src: "/gallery/7.jpg", alt: "Stage performance" },
  { id: 8, src: "/gallery/8.jpg", alt: "Crowd vibes" },
  { id: 9, src: "/gallery/9.jpg", alt: "Cultural showcase" },
  { id: 10, src: "/gallery/10.jpg", alt: "Mataha experience moments" },
];

type ViewMode = "grid" | "masonry" | "carousel";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  return (
    <main className="relative bg-brand-dark min-h-screen selection:bg-brand-orange selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-white">
          Visual <span className="text-brand-orange">Echoes</span>
        </h1>
        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg">
          Relive the energy, the rhythm, and the unforgettable moments of Mataha Experience.
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {(["masonry", "grid", "carousel"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-5 py-2 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                viewMode === mode
                  ? "bg-brand-orange text-white shadow-lg"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Content */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        {/* Masonry View */}
        {viewMode === "masonry" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {allImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : i % 3 === 1 ? 500 : 650}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-medium text-sm">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {allImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-medium text-xs truncate">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Carousel View */}
        {viewMode === "carousel" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedImage(allImages[carouselIndex].src)}
                >
                  <Image src={allImages[carouselIndex].src} alt={allImages[carouselIndex].alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white font-heading font-bold text-xl">{allImages[carouselIndex].alt}</p>
                    <p className="text-white/60 text-sm mt-1">{carouselIndex + 1} / {allImages.length}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={() => setCarouselIndex((p) => (p === 0 ? allImages.length - 1 : p - 1))}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors text-xl font-bold"
              >
                ←
              </button>
              <div className="flex gap-2">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === carouselIndex ? "bg-brand-orange w-8" : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCarouselIndex((p) => (p === allImages.length - 1 ? 0 : p + 1))}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors text-xl font-bold"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white font-bold uppercase tracking-widest text-sm hover:text-brand-orange transition-colors z-10">
              [ Close ]
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-lg overflow-hidden shadow-2xl"
            >
              <Image src={selectedImage} alt="Fullscreen View" fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
