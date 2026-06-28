"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Menunggu", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  processing: { label: "Diproses", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  success: { label: "Berhasil", color: "text-green-400 bg-green-500/10 border-green-500/30" },
  failed: { label: "Gagal", color: "text-red-400 bg-red-500/10 border-red-500/30" },
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
    return <div className="max-w-5xl mx-auto px-4 py-8 relative z-10"><div className="animate-pulse space-y-4" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
      <h1 className="text-2xl font-bold text-white mb-6">Semua Transaksi</h1>

      <div className="space-y-3">
        {transactions.map((t) => {
          const st = statusMap[t.status] || statusMap.pending;
          return (
            <div key={t.id} className="glass-light rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-mono text-sm font-bold text-cyan-300">{t.transactionNumber}</div>
                  <div className="text-sm text-slate-400">{t.productName} - {t.nominal}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium border ${st.color}`}>{st.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 capitalize">{t.paymentChannel}</span>
                <span className="font-bold text-white">{formatCurrency(t.total)}</span>
              </div>
            </div>
          );
        })}
        {transactions.length === 0 && (
          <div className="text-center py-12 text-slate-500">Belum ada transaksi</div>
        )}
      </div>
    </div>
  );
}
