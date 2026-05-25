"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 bg-white/70 backdrop-blur-md border-b border-forest-100">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-forest-500" />
          <span className="font-display text-2xl tracking-tight text-forest-900">Verdant</span>
        </Link>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="group flex flex-col gap-1.5 p-2"
        >
          <span className="block h-px w-7 bg-forest-900 transition-all group-hover:w-5" />
          <span className="block h-px w-5 bg-forest-900 transition-all group-hover:w-7" />
          <span className="block h-px w-7 bg-forest-900 transition-all group-hover:w-4" />
        </button>
      </header>

      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-forest-950/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[88%] sm:w-[420px] bg-white border-r border-forest-100 transform transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-forest-100">
          <span className="font-display text-xl text-forest-900">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-forest-900 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <nav className="px-8 py-10 flex flex-col gap-1">
          {links.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={`group flex items-baseline justify-between py-4 border-b border-forest-100 transition-all duration-700 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <span className={`font-display text-4xl md:text-5xl ${active ? "text-forest-500" : "text-forest-900"} transition-colors group-hover:text-forest-500`}>
                  {l.label}
                </span>
                <span className="text-xs text-forest-400 tabular-nums">0{i + 1}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-8 left-8 right-8 text-xs text-forest-600 flex justify-between">
          <span>© 2026 Verdant Estates</span>
          <Link href="/admin/login" className="hover:text-forest-500">Admin →</Link>
        </div>
      </aside>
    </>
  );
}
