'use client';

import Link from "next/link";
import { gameProducts } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function TopUpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Semua Game", icon: "🎮" },
    { id: "popular", label: "Populer", icon: "⭐" },
    { id: "mobile", label: "Mobile", icon: "📱" },
    { id: "pc", label: "PC", icon: "🖥️" },
  ];

  const filteredGames = useMemo(() => {
    return gameProducts.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const exclusiveOffers = gameProducts.slice(0, 3).map((game) => ({
    ...game,
    discount: Math.floor(Math.random() * 30) + 10,
    originalPrice: 99900,
    discountedPrice: 99900 - Math.floor(Math.random() * 30000),
  }));

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎮 Top Up Instan
          </h1>
          <p className="text-lg text-slate-300">
            Pengalaman top-up tercepat dan terpercaya untuk game favorit Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Exclusive Offers Section */}
        {selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">✨ Penawaran Eksklusif</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exclusiveOffers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/top-up/${offer.slug}`}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-400/50 transition-all">
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      -{offer.discount}%
                    </div>
                    <img
                      src={offer.icon}
                      alt={offer.name}
                      className="w-16 h-16 rounded-lg mb-4"
                    />
                    <h3 className="text-white font-bold mb-2">{offer.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through text-sm">
                        Rp {offer.originalPrice.toLocaleString("id-ID")}
                      </span>
                      <span className="text-cyan-400 font-bold">
                        Rp {offer.discountedPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {selectedCategory === "all"
              ? "Semua Game"
              : categories.find((c) => c.id === selectedCategory)?.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <Link
                  key={game.slug}
                  href={`/top-up/${game.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={game.icon}
                      alt={game.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  </div>
                  <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-sm text-slate-400">{game.description}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-400">Tidak ada game yang ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
