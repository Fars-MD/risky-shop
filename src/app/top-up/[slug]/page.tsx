import { gameProducts, nominalMap, paymentMethods } from "@/lib/utils";
import { notFound } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
          <img src={game.icon} alt={game.name} className="w-10 h-10" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">{game.name}</h1>
        <p className="text-slate-400 text-sm mt-1">{game.description}</p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {paymentMethods.map((m) => (
            <span key={m.id} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              {m.name}
            </span>
          ))}
        </div>
      </div>

      <CheckoutForm
        productType="game"
        productSlug={slug}
        productName={game.name}
        nominals={nominals}
        game={game}
      />
    </div>
  );
}
