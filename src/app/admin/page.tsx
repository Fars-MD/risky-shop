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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
      <h1 className="text-2xl font-bold text-white mb-6">Panel Admin</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-light rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-slate-400">Total Transaksi</div>
          </div>
          <div className="glass-light rounded-xl p-4 border border-amber-500/30">
            <div className="text-2xl font-bold text-amber-400">{stats.pending}</div>
            <div className="text-sm text-slate-400">Menunggu</div>
          </div>
          <div className="glass-light rounded-xl p-4 border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">{stats.success}</div>
            <div className="text-sm text-slate-400">Berhasil</div>
          </div>
          <div className="glass-light rounded-xl p-4 border border-red-500/30">
            <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
            <div className="text-sm text-slate-400">Gagal</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AdminCard
          title="Banner"
          desc="Kelola banner promosi"
          href="/admin/banners"
          icon="/images/payments/qris.svg"
        />
        <AdminCard
          title="Voucher"
          desc="Kelola kode voucher"
          href="/admin/vouchers"
          icon="/images/misc/murah.svg"
        />
        <AdminCard
          title="Transaksi"
          desc="Lihat semua transaksi"
          href="/admin/transactions"
          icon="/images/payments/bank.svg"
        />
        <AdminCard title="Produk" desc="Kelola produk" href="/admin/products" icon="/images/misc/cepat.svg" />
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
      className="glass-light rounded-2xl p-6 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
    >
      <img src={icon} alt={title} className="w-14 h-14 mb-3 rounded-xl object-cover" />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </Link>
  );
}
