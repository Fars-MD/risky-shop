import Link from "next/link";
import { gameProducts } from "@/lib/utils";

export default function TopUpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <h1 className="text-3xl font-bold text-white mb-2">Top Up Game</h1>
      <p className="text-slate-400 mb-8">Pilih game favorit untuk top up</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gameProducts.map((game) => (
          <Link
            key={game.slug}
            href={`/top-up/${game.slug}`}
            className="glass-light rounded-2xl p-6 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={game.icon} alt={game.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {game.name}
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-400">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
