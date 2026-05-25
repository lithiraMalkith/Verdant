"use client";
import { useState } from "react";
import { properties } from "@/lib/data";

const types = ["All", "Villa", "Apartment", "Penthouse", "Cottage", "Estate"] as const;

export default function PropertiesPage() {
  const [filter, setFilter] = useState<(typeof types)[number]>("All");
  const list = filter === "All" ? properties : properties.filter(p => p.type === filter);

  return (
    <main className="pt-32 pb-24 px-6 md:px-14 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-4">The collection</div>
          <h1 className="font-display text-6xl md:text-7xl text-forest-950">Properties</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border transition-colors ${
                filter === t
                  ? "bg-forest-900 text-white border-forest-900"
                  : "border-forest-200 text-forest-700 hover:border-forest-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {list.map(p => (
          <article key={p.id} id={p.id} className="group">
            <div className="relative overflow-hidden bg-forest-50 aspect-[5/4] mb-5">
              <img src={p.image} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-forest-800">
                {p.type}
              </div>
              <div className="absolute bottom-4 right-4 bg-forest-900 text-white px-3 py-1 text-xs tabular-nums">
                ${(p.price/1_000_000).toFixed(2)}M
              </div>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="font-display text-3xl text-forest-950">{p.title}</h2>
              <span className="text-sm text-forest-600">{p.location}</span>
            </div>
            <p className="text-sm text-forest-700 leading-relaxed mb-3">{p.description}</p>
            <div className="flex gap-6 text-xs tracking-[0.15em] uppercase text-forest-600">
              <span>{p.beds} beds</span>
              <span>{p.baths} baths</span>
              <span>{p.area.toLocaleString()} sqft</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
