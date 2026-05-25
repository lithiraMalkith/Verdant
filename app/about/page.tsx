export const metadata = { title: "About — Verdant Estates" };

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-6">Our story</div>
      <h1 className="font-display text-6xl md:text-8xl text-forest-950 leading-[0.95] mb-12">
        Homes chosen<br />the way you'd<br />choose a friend.
      </h1>
      <div className="grid md:grid-cols-2 gap-12 text-forest-800 leading-relaxed">
        <p>
          Verdant Estates began as a quiet conversation between three friends — an architect, a
          gardener, and a writer — who believed real estate had forgotten how to listen. Today we
          curate a small, deliberate collection of homes across four continents.
        </p>
        <p>
          Every property in our book has been visited, walked, and slept in. We turn down more
          than we accept. The result is a portfolio that feels less like a marketplace and more
          like a personal recommendation.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-forest-100 pt-12">
        {[
          ["120+", "Homes curated"],
          ["28", "Countries"],
          ["12yr", "Avg. tenure"],
          ["1", "At a time"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="font-display text-4xl text-forest-700">{n}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-forest-600 mt-2">{l}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
