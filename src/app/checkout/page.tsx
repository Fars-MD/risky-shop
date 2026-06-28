"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const trx = searchParams.get("trx");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trx) {
      fetch(`/api/transactions?trx=${trx}`)
        .then((r) => r.json())
        .then(setData)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [trx]);

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center relative z-10">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-400 mt-4">Memuat data transaksi...</p>
      </div>
    );
  }

  if (!trx || !data) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center relative z-10">
        <img src="/images/payments/va.svg" alt="No data" className="w-20 h-20 mx-auto mb-4 opacity-60" />
        <h1 className="text-2xl font-bold text-white mb-2">Tidak ada transaksi</h1>
        <p className="text-slate-400 mb-6">Silakan lakukan transaksi terlebih dahulu</p>
        <Link href="/" className="inline-block border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 px-6 py-3 rounded-xl font-semibold">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8 relative z-10">
      <div className="glass rounded-2xl p-6 text-center">
        <img src="/images/misc/aman.svg" alt="Success" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Pesanan Dibuat!</h1>
        <p className="text-slate-400 mb-6">Silakan selesaikan pembayaran</p>

        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">No. Transaksi</span>
            <span className="font-mono font-bold text-cyan-300">{data.transactionNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Produk</span>
            <span className="font-medium text-slate-200">{data.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nominal</span>
            <span className="font-medium text-slate-200">{data.nominal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Pembayaran</span>
            <span className="font-medium capitalize text-slate-200">{data.paymentMethod} - {data.paymentChannel}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-slate-700 pt-2">
            <span className="text-slate-200">Total</span>
            <span className="text-cyan-400">{formatCurrency(data.total)}</span>
          </div>
        </div>

        {data.paymentUrl && (
          <a
            href={data.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-3 rounded-xl font-semibold transition-all duration-300 mb-3"
          >
            Bayar Sekarang
          </a>
        )}

        <p className="text-xs text-slate-500">
          Simpan nomor transaksi untuk cek status pesanan
        </p>
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/status?trx=${trx}`}
          className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Cek Status Pesanan &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto px-4 py-12 text-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
