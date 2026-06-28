'use client';

import { User, Settings, LogOut, Gift, TrendingUp } from 'lucide-react';

export default function UniPinUserProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* User Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang! 👋</h1>
              <p className="text-slate-400 mb-4">Bergabung dengan jutaan gamer di seluruh dunia</p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
                  Edit Profile
                </button>
                <button className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-right">
            <div className="text-4xl font-bold text-cyan-400 mb-1">2.5M</div>
            <p className="text-slate-400 text-sm">UC Points</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-400">Total Bonus</span>
          </div>
          <p className="text-2xl font-bold text-white">Rp 450K</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-slate-400">Transaksi</span>
          </div>
          <p className="text-2xl font-bold text-white">125</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-slate-400">⭐</span>
            <span className="text-slate-400">Member Tier</span>
          </div>
          <p className="text-2xl font-bold text-white">Gold</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-slate-400">📅</span>
            <span className="text-slate-400">Bergabung</span>
          </div>
          <p className="text-2xl font-bold text-white">2 Tahun</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">📊 Transaksi Terbaru</h2>
        <div className="space-y-3">
          {[
            { game: 'Mobile Legends', amount: 'Rp 150.000', date: 'Hari ini', status: 'Sukses' },
            { game: 'Free Fire', amount: 'Rp 99.000', date: 'Kemarin', status: 'Sukses' },
            { game: 'Genshin Impact', amount: 'Rp 245.000', date: '2 hari lalu', status: 'Sukses' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
              <div>
                <p className="text-white font-semibold">{tx.game}</p>
                <p className="text-slate-400 text-sm">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{tx.amount}</p>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
