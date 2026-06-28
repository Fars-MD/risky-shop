'use client';

import { Star, ThumbsUp } from 'lucide-react';

export default function GameReviews({ gameName = "Mobile Legends" }) {
  const reviews = [
    {
      author: "Ahmad Rizki",
      rating: 5,
      date: "2 hari lalu",
      title: "Transaksi cepat dan aman!",
      text: "Ini pertama kali saya menggunakan UniPin dan sangat puas. Diamond langsung masuk, tidak ada masalah. Recommended!",
      helpful: 234,
      verified: true,
    },
    {
      author: "Siti Nurhaliza",
      rating: 5,
      date: "1 minggu lalu",
      title: "Support yang responsif",
      text: "Awalnya ada masalah dengan transaksi, tapi CS UniPin sangat cepat membantu. Masalah selesai dalam 10 menit.",
      helpful: 189,
      verified: true,
    },
    {
      author: "Budi Santoso",
      rating: 4,
      date: "2 minggu lalu",
      title: "Harga kompetitif",
      text: "Harganya lebih murah dibanding platform lain. Cashback juga lumayan. Puas dengan layanannya.",
      helpful: 156,
      verified: true,
    },
    {
      author: "Rina Wijaya",
      rating: 5,
      date: "3 minggu lalu",
      title: "Promo yang menguntungkan",
      text: "Setiap kali top-up selalu ada bonus atau cashback. Value for money banget!",
      helpful: 142,
      verified: true,
    },
  ];

  const stats = {
    average: 4.9,
    total: 12450,
    distribution: {
      5: 85,
      4: 10,
      3: 3,
      2: 1,
      1: 1,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">⭐ Ulasan Pengguna</h2>
        <p className="text-slate-400">Dari {stats.total.toLocaleString('id-ID')} pengguna yang puas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Rating Summary */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-white">{stats.average}</span>
              <span className="text-slate-400">/5.0</span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Berdasarkan {stats.total.toLocaleString('id-ID')} ulasan
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {Object.entries(stats.distribution)
              .reverse()
              .map(([rating, percent]) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 w-8">{rating}★</span>
                  <div className="flex-1 bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-8 text-right">{percent}%</span>
                </div>
              ))}
          </div>
        </div>

        {/* Write Review */}
        <div className="lg:col-span-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">📝 Tulis Ulasan</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} className="p-2 hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-slate-400 hover:text-yellow-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <textarea
                placeholder="Bagikan pengalaman Anda..."
                className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none resize-none"
                rows={3}
              />
            </div>
            <button className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
              Kirim Ulasan
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                      ✓ Terverifikasi
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="text-white font-bold mb-2">{review.title}</h4>
            <p className="text-slate-300 mb-3 leading-relaxed">{review.text}</p>

            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Berguna ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
