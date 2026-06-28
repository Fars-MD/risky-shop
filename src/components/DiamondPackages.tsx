'use client';

import { Nominal } from '@/lib/utils';
import { Star, Zap, Gift } from 'lucide-react';

interface DiamondPackagesProps {
  nominals: Nominal[];
  selectedNominal: Nominal | null;
  onSelect: (nominal: Nominal) => void;
  productName: string;
}

export default function DiamondPackages({
  nominals,
  selectedNominal,
  onSelect,
  productName,
}: DiamondPackagesProps) {
  const groupedNominals = nominals.reduce(
    (acc, nom) => {
      const category = nom.category || 'diamond';
      if (!acc[category]) acc[category] = [];
      acc[category].push(nom);
      return acc;
    },
    {} as Record<string, Nominal[]>
  );

  const categoryOrder = ['diamond', 'pass', 'bundle'];
  const categoryLabels: Record<string, string> = {
    diamond: '💎 Paket Diamond',
    pass: '🎟️ Pass Premium',
    bundle: '🎁 Limited Bundle',
  };

  return (
    <div className="space-y-8">
      {categoryOrder.map(
        (category) =>
          groupedNominals[category] && (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-white">
                  {categoryLabels[category] || category}
                </h3>
                {category === 'diamond' && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {groupedNominals[category].map((nominal) => {
                  const isSelected = selectedNominal?.label === nominal.label;
                  const discount =
                    nominal.originalPrice &&
                    nominal.price < nominal.originalPrice
                      ? Math.round(
                          ((nominal.originalPrice - nominal.price) /
                            nominal.originalPrice) *
                            100
                        )
                      : 0;

                  return (
                    <button
                      key={nominal.label}
                      onClick={() => onSelect(nominal)}
                      className={`relative group overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800/80'
                      }`}
                    >
                      {discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discount}%
                        </div>
                      )}

                      {nominal.popular && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                          <Star className="w-3 h-3" /> Hemat
                        </div>
                      )}

                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">
                          {nominal.label.split('(')[0].trim()}
                        </div>

                        {nominal.bonus && (
                          <div className="text-xs text-slate-400 mb-2 flex items-center justify-center gap-1">
                            <Gift className="w-3 h-3 text-green-400" />
                            {nominal.bonus}
                          </div>
                        )}

                        <div className="space-y-1 mb-3">
                          {nominal.originalPrice && (
                            <div className="text-slate-400 line-through text-xs">
                              Rp {nominal.originalPrice.toLocaleString('id-ID')}
                            </div>
                          )}
                          <div className="text-lg font-bold text-white">
                            Rp{nominal.price.toLocaleString('id-ID')}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center justify-center gap-1 text-cyan-400 text-sm font-semibold">
                            <Zap className="w-4 h-4" /> Dipilih
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
}
