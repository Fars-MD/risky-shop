import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingOrbs from "@/components/FloatingOrbs";

export const metadata: Metadata = {
  title: "Risky Shop - Top Up Game, Pulsa & Token PLN",
  description:
    "Risky Shop menyediakan layanan top up game, pulsa semua operator, dan token listrik PLN. Cepat, aman, dan tanpa ribet!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
        <ParticleBackground />
        <FloatingOrbs />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
