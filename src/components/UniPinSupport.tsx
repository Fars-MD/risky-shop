'use client';

import { MessageCircle, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

export default function UniPinSupport() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">🆘 Dukungan Pelanggan</h1>
        <p className="text-lg text-slate-300">Tim support kami siap membantu Anda 24/7</p>
      </div>

      {/* Support Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <a href="#" className="group">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg transition-all">
            <MessageCircle className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">Live Chat</h3>
            <p className="text-slate-400 text-sm mb-4">Respons dalam hitungan menit</p>
            <span className="text-blue-400 font-semibold text-sm">Hubungi Sekarang →</span>
          </div>
        </a>

        <a href="#" className="group">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 hover:shadow-lg transition-all">
            <Phone className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">WhatsApp</h3>
            <p className="text-slate-400 text-sm mb-4">+62 859-5959-3535</p>
            <span className="text-green-400 font-semibold text-sm">Hubungi Sekarang →</span>
          </div>
        </a>

        <a href="#" className="group">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg transition-all">
            <Mail className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-slate-400 text-sm mb-4">support@unipin.com</p>
            <span className="text-purple-400 font-semibold text-sm">Kirim Email →</span>
          </div>
        </a>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
          <Clock className="w-8 h-8 text-yellow-400 mb-3" />
          <h3 className="text-white font-bold mb-2">Jam Operasional</h3>
          <p className="text-slate-400 text-sm mb-1">Senin - Jumat: 09:00 - 18:00</p>
          <p className="text-slate-400 text-sm">Sabtu - Minggu: 10:00 - 17:00</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">❓ Pertanyaan yang Sering Diajukan</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Berapa lama proses top-up?',
              a: 'Biasanya instan, maksimal 5 menit. Jika lebih lama, hubungi support kami.',
            },
            {
              q: 'Apakah top-up UniPin aman?',
              a: 'Ya, 100% aman. Kami telah melayani jutaan transaksi sejak 2015.',
            },
            {
              q: 'Bagaimana jika transaksi gagal?',
              a: 'Dana akan kembali otomatis ke rekening Anda dalam 24 jam.',
            },
            {
              q: 'Apa itu UC Points?',
              a: 'Poin loyalitas dari setiap transaksi yang bisa ditukar dengan voucher atau diskon.',
            },
          ].map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                <span className="text-white font-semibold">{item.q}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 text-slate-400">{item.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Status & Trust */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">✅ Status Sistem</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Server Utama</span>
              <span className="text-green-400 font-bold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Gateway Pembayaran</span>
              <span className="text-green-400 font-bold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Gateway</span>
              <span className="text-green-400 font-bold">Operational</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">🏆 Kepercayaan Pengguna</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Rating</span>
                <span className="text-white font-bold">4.9/5.0</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Dari 50K+ ulasan pengguna</p>
          </div>
        </div>
      </div>
    </div>
  );
}
