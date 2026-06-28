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
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-4">Memuat data transaksi...</p>
      </div>
    );
  }

  if (!trx || !data) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada transaksi</h1>
        <p className="text-gray-500 mb-6">Silakan lakukan transaksi terlebih dahulu</p>
        <Link href="/" className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Dibuat!</h1>
        <p className="text-gray-500 mb-6">Silakan selesaikan pembayaran</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">No. Transaksi</span>
            <span className="font-mono font-bold text-gray-900">{data.transactionNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Produk</span>
            <span className="font-medium">{data.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Nominal</span>
            <span className="font-medium">{data.nominal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pembayaran</span>
            <span className="font-medium capitalize">{data.paymentMethod} - {data.paymentChannel}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Total</span>
            <span className="text-indigo-600">{formatCurrency(data.total)}</span>
          </div>
        </div>

        {data.paymentUrl && (
          <a
            href={data.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors mb-3"
          >
            Bayar Sekarang
          </a>
        )}

        <p className="text-xs text-gray-400">
          Simpan nomor transaksi untuk cek status pesanan
        </p>
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/status?trx=${trx}`}
          className="text-indigo-500 hover:text-indigo-700 font-medium"
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
