import { gameProducts, nominalMap, paymentMethods } from "@/lib/utils";
import { notFound } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import { Star, Zap, Shield, Clock } from "lucide-react";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gameProducts.find((g) => g.slug === slug);
  if (!game) notFound();

  const nominals = nominalMap[slug] || [];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Game Info */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-cyan-500/30 bg-slate-800">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Game Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{game.name}</h1>
              <p className="text-slate-400 text-lg mb-4">{game.description}</p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-slate-400">Pengiriman</p>
                    <p className="text-sm font-bold text-white">Instan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-slate-400">Keamanan</p>
                    <p className="text-sm font-bold text-white">Aman</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <Star className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-slate-400">Rating</p>
                    <p className="text-sm font-bold text-white">4.9/5</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400">Durasi</p>
                    <p className="text-sm font-bold text-white">24 Jam</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="text-xs text-slate-400 mb-2">Metode Pembayaran</p>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.slice(0, 6).map((method) => (
                    <span
                      key={method.id}
                      className="text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30"
                    >
                      {method.name}
                    </span>
                  ))}
                  {paymentMethods.length > 6 && (
                    <span className="text-xs text-slate-400 px-3 py-1">
                      +{paymentMethods.length - 6} lagi
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form - Left Side */}
          <div className="lg:col-span-2">
            <CheckoutForm
              productType="game"
              productSlug={slug}
              productName={game.name}
              nominals={nominals}
              game={game}
            />
          </div>

          {/* Info Panel - Right Side */}
          <div className="space-y-6">
            {/* Popular Packages */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">📦 Paket Populer</h3>
              <div className="space-y-2">
                {nominals.slice(0, 5).map((nominal) => (
                  <div
                    key={nominal.id}
                    className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="text-slate-300 text-sm">
                      {nominal.amount} {nominal.currency}
                    </span>
                    <span className="text-cyan-400 font-bold">
                      Rp {nominal.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Info */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-3">❓ FAQ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">Berapa lama pengiriman?</p>
                  <p className="text-slate-400">Biasanya instan, maksimal 5 menit</p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">Apakah aman?</p>
                  <p className="text-slate-400">100% aman dan terpercaya sejak 2015</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
