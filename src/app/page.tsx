import Link from "next/link";
import { gameProducts, operators, paymentMethods } from "@/lib/utils";

const banners = [
  {
    title: "Top Up Game Murah & Cepat",
    subtitle: "Daftar game populer siap top up - proses instan, harga terbaik!",
    bg: "from-cyan-500 to-blue-600",
    cta: "Top Up Sekarang",
    ctaHref: "/top-up",
  },
  {
    title: "Pulsa & Token PLN",
    subtitle: "Isi ulang pulsa dan token listrik tanpa ribet, 24 jam non-stop!",
    bg: "from-sky-500 to-indigo-600",
    cta: "Beli Pulsa",
    ctaHref: "/pulsa",
  },
  {
    title: "Promo Spesial",
    subtitle: "Diskon hingga 10% dengan kode voucher RISKY10",
    bg: "from-blue-500 to-violet-600",
    cta: "Lihat Promo",
    ctaHref: "/promo",
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-cyan-500/10 animate-[fade-in-up_0.6s_ease-out] flex flex-col justify-between`}
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-sm sm:text-base text-white/80 mb-4">{banner.subtitle}</p>
                </div>
                <Link
                  href={banner.ctaHref}
                  className="inline-flex self-start items-center gap-2 border border-white/30 text-white/90 hover:bg-white/10 hover:border-white/50 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  {banner.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Layanan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CategoryCard
            icon="/images/games/mobile-legends.svg"
            title="Top Up Game"
            desc="ML, Free Fire, PUBG, COD, Valorant, Genshin, dan banyak lagi"
            href="/top-up"
            color="cyan"
          />
          <CategoryCard
            icon="/images/operators/telkomsel.svg"
            title="Pulsa"
            desc="Semua operator: Telkomsel, Indosat, XL, dll"
            href="/pulsa"
            color="sky"
          />
          <CategoryCard
            icon="/images/payments/va.svg"
            title="Token PLN"
            desc="Bayar token listrik dengan mudah"
            href="/token-pln"
            color="indigo"
          />
        </div>
      </section>

      {/* Game List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Top Up Game</h2>
          <Link
            href="/top-up"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {gameProducts.map((game, i) => (
            <Link
              key={game.slug}
              href={`/top-up/${game.slug}`}
              className="glass-light rounded-xl p-4 text-center hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 animate-[fade-in-up_0.5s_ease-out]"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
            >
              <img src={game.icon} alt={game.name} className="w-12 h-12 mx-auto mb-2 rounded-lg object-cover" />
              <h3 className="font-semibold text-sm text-slate-200">{game.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Pulsa Operators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Pulsa Semua Operator</h2>
          <Link
            href="/pulsa"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Beli Pulsa &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {operators.map((op, i) => (
            <Link
              key={op.id}
              href="/pulsa"
              className="glass-light rounded-xl p-4 text-center hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 animate-[fade-in-up_0.5s_ease-out]"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
            >
              <img src={op.icon} alt={op.name} className="w-10 h-10 mx-auto mb-1 rounded-lg object-cover" />
              <h3 className="font-semibold text-sm text-slate-300">{op.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Metode Pembayaran</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="glass-light rounded-xl p-4"
            >
              <img src={method.icon} alt={method.name} className="w-10 h-10 mb-2 rounded-lg object-cover" />
              <h3 className="font-semibold text-sm text-slate-200 mb-2">{method.name}</h3>
              <div className="flex flex-wrap gap-1">
                {method.channels.map((ch) => (
                  <span
                    key={ch.id}
                    className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded"
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
        <h2 className="text-2xl font-bold text-white mb-6">Mengapa Risky Shop?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "/images/misc/cepat.svg", title: "Proses Cepat", desc: "Pesanan diproses otomatis dalam hitungan detik" },
            { icon: "/images/misc/aman.svg", title: "Aman & Terpercaya", desc: "Transaksi aman dengan sistem terenkripsi" },
            { icon: "/images/misc/murah.svg", title: "Harga Termurah", desc: "Harga kompetitif dengan promo setiap hari" },
            { icon: "/images/misc/mudah.svg", title: "Tanpa Login", desc: "Checkout langsung tanpa perlu registrasi akun" },
          ].map((item, i) => (
            <div key={i} className="glass-light rounded-xl p-6 text-center animate-[fade-in-up_0.5s_ease-out]" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
              <img src={item.icon} alt={item.title} className="w-14 h-14 mx-auto mb-3 rounded-xl object-cover" />
              <h3 className="font-semibold text-slate-200 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voucher Promo */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Voucher Promo Spesial!</h2>
          <p className="text-slate-400 mb-6">
            Gunakan kode voucher untuk dapatkan diskon setiap pembelian
          </p>
          <div className="inline-block glass rounded-xl px-8 py-4 btn-glow">
            <span className="text-2xl sm:text-3xl font-mono font-bold tracking-widest gradient-text">
              RISKY10
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-3">Diskon 10% untuk setiap transaksi</p>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Hubungi Kami</h2>
        <p className="text-slate-400 mb-6">Ada pertanyaan? Hubungi kami melalui WhatsApp</p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
        >
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
    cyan: "border-cyan-500/30 hover:border-cyan-400",
    sky: "border-sky-500/30 hover:border-sky-400",
    indigo: "border-indigo-500/30 hover:border-indigo-400",
  };

  return (
    <Link
      href={href}
      className={`glass-light rounded-2xl p-6 border ${colors[color]} transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] animate-[fade-in-up_0.5s_ease-out]`}
    >
      <img src={icon} alt={title} className="w-14 h-14 mb-3 rounded-xl object-cover" />
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </Link>
  );
}
