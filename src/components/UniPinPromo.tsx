'use client';

import { Zap, Gift, Star, TrendingUp } from 'lucide-react';

export default function UniPinPromo() {
  const promos = [
    {
      id: 1,
      title: '💰 Cashback 10% ShopeePay',
      description: 'Setiap top-up menggunakan ShopeePay dapatkan cashback',
      discount: '10%',
      min: 'Min Rp 50K',
      color: 'from-red-500/20 to-pink-500/20',
      border: 'border-red-500/30',
    },
    {
      id: 2,
      title: '🎁 Bonus 50% First Time',
      description: 'Member baru dapatkan bonus langsung',
      discount: '50%',
      min: 'Max Rp 100K',
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30',
    },
    {
      id: 3,
      title: '⭐ Flash Sale Setiap Jam 12',
      description: 'Penawaran terbatas setiap tengah hari',
      discount: 'Up to 70%',
      min: 'Berbeda-beda',
      color: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/30',
    },
    {
      id: 4,
      title: '🏆 Referral Bonus',
      description: 'Ajak teman dapat Rp 25.000/referral',
      discount: 'Rp 25K',
      min: 'Per teman',
      color: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">🎉 Promo & Penawaran Eksklusif</h1>
        <p className="text-lg text-slate-300">Dapatkan keuntungan maksimal setiap kali top-up</p>
      </div>

      {/* Featured Promo */}
      <div className="relative mb-12 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 md:p-12 flex items-center justify-between">
          <div className="flex-1">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-bold mb-4">
              🔥 PROMO UTAMA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Hemat s.d. Rp 500.000
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Gunakan kode promo UNIPIN2026 untuk setiap pembelian pertama Anda
            </p>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-white/90 transition-colors">
              Pakai Promo
            </button>
          </div>
          <div className="hidden md:block text-6xl">🎊</div>
        </div>
      </div>

      {/* Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={`bg-gradient-to-br ${promo.color} border ${promo.border} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-bold text-white mb-3">
                {promo.discount}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">
                {promo.title}
              </h3>
            </div>
            <p className="text-slate-200 text-sm mb-4">{promo.description}</p>
            <p className="text-xs text-slate-300">{promo.min}</p>
          </div>
        ))}
      </div>

      {/* Loyalty Program */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8">💎 Program Loyalitas UniPin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: 'Silver', points: '0 - 1000', benefits: ['Cashback 2%', 'Bonus setiap transaksi'] },
            { tier: 'Gold', points: '1001 - 5000', benefits: ['Cashback 5%', 'Priority support', 'Akses promo eksklusif'] },
            { tier: 'Platinum', points: '5000+', benefits: ['Cashback 10%', 'VIP support 24/7', 'Birthday bonus'] },
          ].map((tier) => (
            <div key={tier.tier} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">{tier.tier}</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">{tier.points} points</p>
              <ul className="space-y-2">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Limited Time Offers */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">⏰ Penawaran Terbatas</h2>
        <div className="space-y-4">
          {[
            { game: 'Mobile Legends', old: 'Rp 150K', new: 'Rp 127.5K', time: 'Berakhir dalam 2 jam' },
            { game: 'Free Fire', old: 'Rp 99K', new: 'Rp 74.25K', time: 'Berakhir dalam 4 jam' },
            { game: 'PUBG Mobile', old: 'Rp 200K', new: 'Rp 150K', time: 'Berakhir dalam 6 jam' },
          ].map((offer) => (
            <div key={offer.game} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div>
                <p className="text-white font-bold">{offer.game}</p>
                <p className="text-xs text-cyan-400">{offer.time}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 line-through text-sm">{offer.old}</p>
                <p className="text-lg font-bold text-green-400">{offer.new}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
