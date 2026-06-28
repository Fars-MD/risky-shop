import Link from "next/link";
import { gameProducts } from "@/lib/utils";

export default function TopUpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Up Game</h1>
      <p className="text-gray-500 mb-8">Pilih game favoritmu untuk top up</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gameProducts.map((game) => (
          <Link
            key={game.slug}
            href={`/top-up/${game.slug}`}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{game.icon}</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-500 transition-colors">
                  {game.name}
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-500">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
