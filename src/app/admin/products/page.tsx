"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  active: boolean;
  popular: boolean;
  category: { name: string };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8"><div className="animate-pulse space-y-4" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Produk</h1>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-gray-900">{p.name}</div>
              <div className="text-sm text-gray-500">{p.category?.name} | {formatCurrency(p.price)}</div>
            </div>
            <div className="flex gap-2 text-xs">
              {p.popular && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Populer</span>}
              <span className={`px-2 py-1 rounded ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {p.active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </div>
        ))}
        {products.length === 0 && <div className="text-center py-12 text-gray-400">Belum ada produk</div>}
      </div>
    </div>
  );
}
