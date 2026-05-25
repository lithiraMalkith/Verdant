import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PageLoader from "@/components/PageLoader";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Verdant Estates — Curated Real Estate",
  description: "A boutique real estate experience. Browse properties, meet agents, and find your next home.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-forest-950 font-sans">
        <PageLoader />
        <Sidebar />
        {children}
        <Toaster position="top-center" toastOptions={{ style: { borderRadius: 0, border: "1px solid #214431", background: "#fff", color: "#0d1f15" } }} />
      </body>
    </html>
  );
}
