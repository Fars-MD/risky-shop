import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                RS
              </div>
              <span className="font-bold text-xl text-white">
                Risky <span className="text-indigo-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Platform top up game, pulsa, dan token listrik termurah, tercepat, dan terpercaya.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/top-up" className="hover:text-indigo-400 transition-colors">Top Up Game</Link></li>
              <li><Link href="/pulsa" className="hover:text-indigo-400 transition-colors">Pulsa</Link></li>
              <li><Link href="/token-pln" className="hover:text-indigo-400 transition-colors">Token PLN</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/status" className="hover:text-indigo-400 transition-colors">Cek Status</Link></li>
              <li><Link href="/promo" className="hover:text-indigo-400 transition-colors">Promo</Link></li>
              <li><Link href="/bantuan" className="hover:text-indigo-400 transition-colors">Bantuan</Link></li>
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

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Risky Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
