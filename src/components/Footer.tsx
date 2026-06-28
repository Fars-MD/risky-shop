import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-900/30 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/25">
                RS
              </div>
              <span className="font-bold text-xl text-white">
                Risky <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Platform top up game, pulsa, dan token listrik termurah, tercepat, dan terpercaya.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/top-up" className="hover:text-cyan-400 transition-colors">Top Up Game</Link></li>
              <li><Link href="/pulsa" className="hover:text-cyan-400 transition-colors">Pulsa</Link></li>
              <li><Link href="/token-pln" className="hover:text-cyan-400 transition-colors">Token PLN</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/status" className="hover:text-cyan-400 transition-colors">Cek Status</Link></li>
              <li><Link href="/promo" className="hover:text-cyan-400 transition-colors">Promo</Link></li>
              <li><Link href="/bantuan" className="hover:text-cyan-400 transition-colors">Bantuan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp: 0812-3456-7890</li>
              <li>Email: support@riskyshop.com</li>
              <li>Jam Operasional: 24 Jam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} Risky Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
