import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const events = [
  { id: 1, title: "Origin", date: "April 12, 2026", location: "Nairobi", description: "The genesis of Mataha Experience. Where it all begins — raw, unfiltered African energy.", img: "/logo.jpg" },
  { id: 2, title: "The Pulse", date: "May 25, 2026", location: "Mombasa", description: "Feel the coastal rhythm. A fusion of Swahili beats and modern sound that moves your soul.", img: "/logo.jpg" },
  { id: 3, title: "Echoes", date: "July 10, 2026", location: "Kisumu", description: "Where lakeside vibes meet legendary performances. An echo that never fades.", img: "/logo.jpg" },
  { id: 4, title: "Awakening", date: "Sept 05, 2026", location: "Naivasha", description: "The grand finale. An awakening of all senses under the Rift Valley stars.", img: "/logo.jpg" },
];

export default function EventsPage() {
  return (
    <main className="relative bg-brand-dark min-h-screen selection:bg-brand-orange selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-white">
          Upcoming <span className="text-brand-orange">Experiences</span>
        </h1>
        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg">
          Immerse yourself in the rhythm of African culture across Kenya.
        </p>
      </section>

      {/* Events List */}
      <section className="px-6 pb-32 max-w-6xl mx-auto space-y-12">
        {events.map((event, i) => (
          <div
            key={event.id}
            className={`group flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
          >
            <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={event.img} alt={event.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">
                {event.date} // {event.location}
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white leading-tight">
                {event.title}
              </h2>
              <p className="text-white/60 text-lg max-w-md mx-auto md:mx-0">
                {event.description}
              </p>
              <Link
                href="#"
                className="inline-block px-8 py-3 bg-brand-orange text-white rounded-full font-bold uppercase hover:bg-orange-600 transition-colors shadow-xl mt-4"
              >
                Get Tickets
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
