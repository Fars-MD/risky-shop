import Link from "next/link";
import { gameProducts, operators, paymentMethods } from "@/lib/utils";

const banners = [
  {
    title: "Top Up Game Murah & Cepat",
    subtitle: "Daftar game populer siap top up - proses instan, harga terbaik!",
    bg: "from-indigo-500 to-purple-600",
  },
  {
    title: "Pulsa & Token PLN",
    subtitle: "Isi ulang pulsa dan token listrik tanpa ribet, 24 jam non-stop!",
    bg: "from-emerald-500 to-teal-600",
  },
  {
    title: "Promo Spesial",
    subtitle: "Diskon hingga 10% dengan kode voucher RISKY10",
    bg: "from-amber-500 to-orange-600",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-6 sm:p-8 text-white`}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{banner.title}</h2>
                <p className="text-sm sm:text-base text-white/80">{banner.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Layanan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CategoryCard
            icon="🎮"
            title="Top Up Game"
            desc="Mobile Legends, Free Fire, PUBG, dan lainnya"
            href="/top-up"
            color="indigo"
          />
          <CategoryCard
            icon="📱"
            title="Pulsa"
            desc="Semua operator: Telkomsel, Indosat, XL, dll"
            href="/pulsa"
            color="emerald"
          />
          <CategoryCard
            icon="⚡"
            title="Token PLN"
            desc="Bayar token listrik dengan mudah"
            href="/token-pln"
            color="amber"
          />
        </div>
      </section>

      {/* Game List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Up Game</h2>
          <Link
            href="/top-up"
            className="text-sm font-medium text-indigo-500 hover:text-indigo-700"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {gameProducts.map((game) => (
            <Link
              key={game.slug}
              href={`/top-up/${game.slug}`}
              className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{game.icon}</div>
              <h3 className="font-semibold text-sm text-gray-900">{game.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Pulsa Operators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pulsa Semua Operator</h2>
          <Link
            href="/pulsa"
            className="text-sm font-medium text-indigo-500 hover:text-indigo-700"
          >
            Beli Pulsa &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {operators.map((op) => (
            <Link
              key={op.id}
              href="/pulsa"
              className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">{op.icon}</div>
              <h3 className="font-semibold text-sm text-gray-900">{op.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="text-2xl mb-2">{method.icon}</div>
              <h3 className="font-semibold text-sm text-gray-900 mb-2">{method.name}</h3>
              <div className="flex flex-wrap gap-1">
                {method.channels.map((ch) => (
                  <span
                    key={ch.id}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {ch.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Layanan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mengapa Risky Shop?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "⚡", title: "Proses Cepat", desc: "Pesanan diproses otomatis dalam hitungan detik" },
            { icon: "🔒", title: "Aman & Terpercaya", desc: "Transaksi aman dengan sistem terenkripsi" },
            { icon: "💰", title: "Harga Termurah", desc: "Harga kompetitif dengan promo setiap hari" },
            { icon: "📱", title: "Tanpa Login", desc: "Checkout langsung tanpa perlu registrasi akun" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voucher Promo */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Voucher Promo Spesial!</h2>
          <p className="text-white/80 mb-6">
            Gunakan kode voucher untuk dapatkan diskon setiap pembelian
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
            <span className="text-2xl sm:text-3xl font-mono font-bold tracking-widest">
              RISKY10
            </span>
          </div>
          <p className="text-sm text-white/70 mt-3">Diskon 10% untuk setiap transaksi</p>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
        <p className="text-gray-500 mb-6">Ada pertanyaan? Hubungi kami melalui WhatsApp</p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <span>💬</span>
          Chat WhatsApp
        </a>
      </section>
    </div>
  );
}

function CategoryCard({
  icon,
  title,
  desc,
  href,
  color,
}: {
  icon: string;
  title: string;
  desc: string;
  href: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    indigo: "from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-400",
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-400",
    amber: "from-amber-50 to-amber-100 border-amber-200 hover:border-amber-400",
  };

  return (
    <Link
      href={href}
      className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-6 border-2 transition-all hover:shadow-lg`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </Link>
  );
}
