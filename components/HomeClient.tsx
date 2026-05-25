"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import HeroCanvas from "@/components/HeroCanvas";
import { properties } from "@/lib/data";

export default function HomeClient() {
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headline.current!.querySelectorAll(".word"), {
        yPercent: 110, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.3,
      });
      gsap.from(sub.current, { y: 18, opacity: 0, duration: 1, ease: "power3.out", delay: 0.9 });
      gsap.from(meta.current!.children, { y: 12, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 1.1 });
      gsap.from(cards.current!.querySelectorAll(".feat-card"), {
        y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 1.3,
      });
    });
    return () => ctx.revert();
  }, []);

  const featured = properties.slice(0, 3);
  const headlineWords = ["Quiet", "luxury", "rooted", "in", "nature."];

  return (
    <main className="pt-20">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden border-b border-forest-100">
        <HeroCanvas />
        <div className="relative z-10 px-6 md:px-14 pt-16 md:pt-28 pb-16 max-w-7xl mx-auto">
          <div ref={meta} className="flex items-center gap-4 text-xs tracking-[0.3em] text-forest-700 uppercase mb-8">
            <span>Est. 2026</span>
            <span className="h-px w-10 bg-forest-300" />
            <span>Curated properties</span>
          </div>
          <h1
            ref={headline}
            className="font-display text-[15vw] sm:text-[10vw] md:text-[7.5rem] leading-[0.95] text-forest-950 max-w-5xl"
          >
            {headlineWords.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
                <span className="word inline-block">{w}</span>
              </span>
            ))}
          </h1>
          <p ref={sub} className="mt-10 max-w-xl text-base md:text-lg text-forest-800 leading-relaxed">
            Verdant Estates curates a quiet collection of homes — heritage cottages, lakeside villas,
            and skylit penthouses — each chosen for its sense of place.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="group inline-flex items-center gap-3 bg-forest-900 text-white px-7 py-4 text-sm tracking-wide hover:bg-forest-700 transition-colors"
            >
              Browse properties
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-forest-900 text-forest-900 px-7 py-4 text-sm tracking-wide hover:bg-forest-50 transition-colors"
            >
              Speak with an agent
            </Link>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="border-b border-forest-100 px-6 md:px-14 py-8 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_38s_linear_infinite] text-forest-700 text-sm tracking-[0.3em] uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Aspen", "Brooklyn", "Cotswolds", "Singapore", "Kandy", "Lake Como", "Reykjavík", "Kyoto"]
              .map((c, i) => <span key={`${k}-${i}`}>{c} · </span>)
          )}
        </div>
        <style jsx>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* FEATURED */}
      <section className="px-6 md:px-14 py-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-4">Selected this season</div>
            <h2 className="font-display text-5xl md:text-6xl text-forest-950">Featured Homes</h2>
          </div>
          <Link href="/properties" className="text-forest-700 hover:text-forest-500 text-sm underline underline-offset-4">
            View all properties
          </Link>
        </div>
        <div ref={cards} className="grid md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <Link key={p.id} href={`/properties#${p.id}`} className="feat-card group block">
              <div className="relative overflow-hidden bg-forest-50 aspect-[4/5] mb-5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-forest-800">
                  {p.type}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-forest-950">{p.title}</h3>
                  <div className="text-sm text-forest-600 mt-1">{p.location}</div>
                </div>
                <div className="font-display text-xl text-forest-700 tabular-nums">
                  ${(p.price / 1_000_000).toFixed(2)}M
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-forest-100 bg-forest-50">
        <div className="px-6 md:px-14 py-24 max-w-5xl mx-auto text-center">
          <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-6">Begin your search</div>
          <h2 className="font-display text-5xl md:text-7xl text-forest-950 leading-tight">
            A home should feel like a long, slow exhale.
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-forest-900 text-white px-7 py-4 text-sm tracking-wide hover:bg-forest-700 transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-forest-100 px-6 md:px-14 py-10 flex flex-wrap justify-between gap-4 text-xs text-forest-600">
      <span>© 2026 Verdant Estates · A demo project</span>
      <span>Crafted with Next.js · MongoDB · WebGL</span>
    </footer>
  );
}
