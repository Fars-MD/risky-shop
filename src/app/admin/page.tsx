"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/transactions?all=true")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setStats({
            total: d.length,
            pending: d.filter((t: any) => t.status === "pending").length,
            success: d.filter((t: any) => t.status === "success").length,
            failed: d.filter((t: any) => t.status === "failed").length,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Panel Admin</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Transaksi</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            <div className="text-sm text-gray-500">Menunggu</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
            <div className="text-sm text-gray-500">Berhasil</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-200">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-sm text-gray-500">Gagal</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AdminCard
          title="Banner"
          desc="Kelola banner promosi"
          href="/admin/banners"
          icon="🖼️"
        />
        <AdminCard
          title="Voucher"
          desc="Kelola kode voucher"
          href="/admin/vouchers"
          icon="🏷️"
        />
        <AdminCard
          title="Transaksi"
          desc="Lihat semua transaksi"
          href="/admin/transactions"
          icon="📋"
        />
        <AdminCard title="Produk" desc="Kelola produk" href="/admin/products" icon="📦" />
      </div>
    </div>
  );
}

function AdminCard({
  title,
  desc,
  href,
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  );
}
