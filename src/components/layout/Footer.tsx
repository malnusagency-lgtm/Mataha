import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center text-center md:text-left">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase leading-tight">
            Feel the <span className="text-brand-orange">Rhythm.</span>
          </h2>
          <p className="text-white/70 max-w-sm mx-auto md:mx-0 text-lg">
            This is not an event. This is an experience. Join us and immerse yourself in the Mataha culture.
          </p>
          <Link href="/events" className="interactive inline-block px-8 py-4 bg-transparent border border-brand-orange text-brand-orange rounded-full text-lg font-medium hover:bg-brand-orange hover:text-white transition-all duration-300">
            View Events
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-end justify-between h-full gap-12">
           <div className="relative w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-xl bg-white">
             <Image src="/logo.jpg" alt="Mataha Logo" fill className="object-cover" />
           </div>
           
           <div className="flex items-center gap-6">
            <Link href="https://www.instagram.com/mataha_experience" target="_blank" className="interactive group">
              <FaInstagram className="w-7 h-7 text-[#E1306C] hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="#" className="interactive group">
              <FaXTwitter className="w-7 h-7 text-white hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="#" className="interactive group">
              <FaTiktok className="w-7 h-7 text-[#00f2ea] hover:scale-110 transition-transform duration-300" />
            </Link>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Mataha Experience. All rights reserved.</p>
        <p>Crafted for the culture.</p>
      </div>
    </footer>
  );
}
