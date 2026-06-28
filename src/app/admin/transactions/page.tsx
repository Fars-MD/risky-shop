"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Menunggu", color: "text-amber-600 bg-amber-50" },
  processing: { label: "Diproses", color: "text-blue-600 bg-blue-50" },
  success: { label: "Berhasil", color: "text-green-600 bg-green-50" },
  failed: { label: "Gagal", color: "text-red-600 bg-red-50" },
};

interface Transaction {
  id: number;
  transactionNumber: string;
  productName: string;
  nominal: string;
  total: number;
  paymentMethod: string;
  paymentChannel: string;
  status: string;
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/transactions?all=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTransactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-8"><div className="animate-pulse space-y-4" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Semua Transaksi</h1>

      <div className="space-y-3">
        {transactions.map((t) => {
          const st = statusMap[t.status] || statusMap.pending;
          return (
            <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-mono text-sm font-bold text-gray-900">{t.transactionNumber}</div>
                  <div className="text-sm text-gray-600">{t.productName} - {t.nominal}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${st.color}`}>{st.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 capitalize">{t.paymentChannel}</span>
                <span className="font-bold text-gray-900">{formatCurrency(t.total)}</span>
              </div>
            </div>
          );
        })}
        {transactions.length === 0 && (
          <div className="text-center py-12 text-gray-400">Belum ada transaksi</div>
        )}
      </div>
    </div>
  );
}
