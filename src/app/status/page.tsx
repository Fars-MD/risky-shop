"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

const statusMap: Record<string, { label: string; color: string; image: string }> = {
  pending: { label: "Menunggu Pembayaran", color: "text-amber-400 border-amber-500/30 bg-amber-500/10", image: "/images/payments/qris.svg" },
  processing: { label: "Sedang Diproses", color: "text-blue-400 border-blue-500/30 bg-blue-500/10", image: "/images/misc/cepat.svg" },
  success: { label: "Berhasil", color: "text-green-400 border-green-500/30 bg-green-500/10", image: "/images/misc/aman.svg" },
  failed: { label: "Gagal", color: "text-red-400 border-red-500/30 bg-red-500/10", image: "/images/misc/murah.svg" },
};

export default function StatusPage() {
  const [trx, setTrx] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkStatus = async () => {
    if (!trx.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`/api/transactions?trx=${trx.trim()}`);
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Transaksi tidak ditemukan");
      }
      const d = await res.json();
      setData(d);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const st = data ? statusMap[data.status] || statusMap.pending : null;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8 relative z-10">
      <h1 className="text-2xl font-bold text-white mb-2">Cek Status Pesanan</h1>
      <p className="text-slate-400 mb-6">Masukkan nomor transaksi untuk cek status</p>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={trx}
            onChange={(e) => setTrx(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && checkStatus()}
            placeholder="RS-XXXXXXXXXX"
            className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-slate-200 placeholder-slate-500"
          />
          <button
            onClick={checkStatus}
            disabled={loading || !trx.trim()}
            className="px-5 py-2.5 border border-cyan-400/40 text-cyan-300 rounded-lg font-medium hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? "..." : "Cari"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {data && st && (
          <div className="mt-4 space-y-4">
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${st.color}`}>
              <img src={st.image} alt={st.label} className="w-12 h-12" />
              <div>
                <div className="font-bold text-white">{st.label}</div>
                <div className="text-sm text-slate-400">{data.transactionNumber}</div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Produk</span>
                <span className="font-medium text-slate-200">{data.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nominal</span>
                <span className="font-medium text-slate-200">{data.nominal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode Bayar</span>
                <span className="font-medium capitalize text-slate-200">{data.paymentChannel}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-slate-700 pt-2">
                <span className="text-slate-200">Total</span>
                <span className="text-cyan-400">{formatCurrency(data.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
