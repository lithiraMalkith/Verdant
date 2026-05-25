"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 6);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 450);
      }
    }, 140);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-all duration-700 ${
        done ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100"
      }`}
    >
      <div className="leaf-rotate mb-8">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C7 6 4 10 4 14a8 8 0 0016 0c0-4-3-8-8-12z" stroke="#2e6a47" strokeWidth="1.2" />
          <path d="M12 6v14" stroke="#2e6a47" strokeWidth="1" />
        </svg>
      </div>
      <div className="font-display text-3xl text-forest-900 mb-6">Verdant Estates</div>
      <div className="w-56 h-px bg-forest-100 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-forest-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 text-xs tabular-nums text-forest-600">{progress.toString().padStart(3, "0")}</div>
    </div>
  );
}
