'use client';

import { TrendingUp, Flame, Star } from 'lucide-react';
import Link from 'next/link';

export default function TrendingGames() {
  const trendingGames = [
    {
      id: 1,
      name: 'Mobile Legends',
      icon: '⚔️',
      currentPrice: 'Rp 127.5K',
      originalPrice: 'Rp 150K',
      discount: '-15%',
      trending: '+25%',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Free Fire',
      icon: '🔥',
      currentPrice: 'Rp 74.25K',
      originalPrice: 'Rp 99K',
      discount: '-25%',
      trending: '+18%',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'PUBG Mobile',
      icon: '🎮',
      currentPrice: 'Rp 150K',
      originalPrice: 'Rp 200K',
      discount: '-25%',
      trending: '+32%',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Genshin Impact',
      icon: '✨',
      currentPrice: 'Rp 245K',
      originalPrice: 'Rp 300K',
      discount: '-18%',
      trending: '+15%',
      rating: 4.9,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-8 h-8 text-orange-400" />
          <h2 className="text-3xl font-bold text-white">Game Trending Saat Ini</h2>
        </div>
        <p className="text-slate-400">Game yang paling banyak di-top up minggu ini</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingGames.map((game) => (
          <Link key={game.id} href={`/top-up/${game.name.toLowerCase().replace(' ', '-')}`}>
            <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              {/* Badge */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <span className="px-2 py-1 bg-red-500/80 text-white text-xs font-bold rounded">
                  {game.discount}
                </span>
                <span className="px-2 py-1 bg-green-500/80 text-white text-xs font-bold rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {game.trending}
                </span>
              </div>

              {/* Game Icon */}
              <div className="p-6 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {game.icon}
                </div>

                {/* Game Info */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {game.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-semibold">{game.rating}</span>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <p className="text-slate-400 line-through text-xs mb-1">
                    {game.originalPrice}
                  </p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {game.currentPrice}
                  </p>
                </div>

                {/* CTA Button */}
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all group-hover:translate-y-[-2px]">
                  Top Up Sekarang
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
