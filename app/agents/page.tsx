import { agents } from "@/lib/data";
export const metadata = { title: "Agents — Verdant Estates" };

export default function AgentsPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-14 max-w-7xl mx-auto">
      <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-4">The people</div>
      <h1 className="font-display text-6xl md:text-7xl text-forest-950 mb-16">Our Agents</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {agents.map(a => (
          <div key={a.name} className="group">
            <div className="aspect-[3/4] overflow-hidden bg-forest-50 mb-4">
              <img src={a.photo} alt={a.name}
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <h3 className="font-display text-2xl text-forest-950">{a.name}</h3>
            <div className="text-sm text-forest-700">{a.title}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-forest-500 mt-1">{a.region}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
