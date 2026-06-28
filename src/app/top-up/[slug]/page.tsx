import { gameProducts, nominalMap } from "@/lib/utils";
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-5xl">{game.icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{game.name}</h1>
          <p className="text-gray-500 text-sm">{game.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CheckoutForm
          productType="game"
          productSlug={slug}
          productName={game.name}
          nominals={nominals}
          game={game}
        />
      </div>
    </div>
  );
}
