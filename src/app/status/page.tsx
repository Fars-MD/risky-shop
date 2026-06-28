"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

const statusMap: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: "Menunggu Pembayaran", color: "text-amber-600 bg-amber-50 border-amber-200", icon: "⏳" },
  processing: { label: "Sedang Diproses", color: "text-blue-600 bg-blue-50 border-blue-200", icon: "🔄" },
  success: { label: "Berhasil", color: "text-green-600 bg-green-50 border-green-200", icon: "✅" },
  failed: { label: "Gagal", color: "text-red-600 bg-red-50 border-red-200", icon: "❌" },
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
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Cek Status Pesanan</h1>
      <p className="text-gray-500 mb-6">Masukkan nomor transaksi untuk cek status</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={trx}
            onChange={(e) => setTrx(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && checkStatus()}
            placeholder="RS-XXXXXXXXXX"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
          />
          <button
            onClick={checkStatus}
            disabled={loading || !trx.trim()}
            className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 disabled:bg-gray-300 transition-colors"
          >
            {loading ? "..." : "Cari"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {data && st && (
          <div className="mt-4 space-y-4">
            <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${st.color}`}>
              <span className="text-2xl">{st.icon}</span>
              <div>
                <div className="font-bold">{st.label}</div>
                <div className="text-sm opacity-80">{data.transactionNumber}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Produk</span>
                <span className="font-medium">{data.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nominal</span>
                <span className="font-medium">{data.nominal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Metode Bayar</span>
                <span className="font-medium capitalize">{data.paymentChannel}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span>
                <span className="text-indigo-600">{formatCurrency(data.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
