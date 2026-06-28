"use client";

import { useEffect, useState } from "react";

interface Voucher {
  id: number;
  code: string;
  type: string;
  value: number;
  minTransaction: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  active: boolean;
}

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    type: "percent",
    value: 0,
    minTransaction: 0,
    maxUses: 0,
    active: true,
  });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/vouchers");
    const data = await res.json();
    setVouchers(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({ code: "", type: "percent", value: 0, minTransaction: 0, maxUses: 0, active: true });
    load();
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8 relative z-10"><div className="animate-pulse space-y-4" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Kelola Voucher</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 border border-cyan-400/40 text-cyan-300 rounded-lg font-medium hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
        >
          + Tambah Voucher
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-lg text-white">Tambah Voucher</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Kode Voucher</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200 font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Tipe</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200"
              >
                <option value="percent">Persen (%)</option>
                <option value="fixed">Nominal (Rp)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nilai</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: parseInt(e.target.value) || 0 })}
                required
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Min. Transaksi</label>
              <input
                type="number"
                value={form.minTransaction}
                onChange={(e) => setForm({ ...form, minTransaction: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Max. Penggunaan</label>
              <input
                type="number"
                value={form.maxUses}
                onChange={(e) => setForm({ ...form, maxUses: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 text-cyan-500"
                />
                <span className="text-sm font-medium text-slate-300">Aktif</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 border border-cyan-400/40 text-cyan-300 rounded-lg font-medium hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
              Simpan
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-slate-600 text-slate-400 rounded-lg font-medium hover:border-slate-500 transition-colors">
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {vouchers.map((v) => (
          <div key={v.id} className="glass-light rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-mono font-bold gradient-text">{v.code}</div>
                <div className="text-sm text-slate-400">
                  {v.type === "percent" ? `${v.value}%` : `Rp${v.value.toLocaleString("id-ID")}`} | Min: Rp{v.minTransaction.toLocaleString("id-ID")} | {v.usedCount}/{v.maxUses || "∞"}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded border ${v.active ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-slate-700/50 text-slate-400 border-slate-600"}`}>
                {v.active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </div>
        ))}
        {vouchers.length === 0 && <div className="text-center py-12 text-slate-500">Belum ada voucher</div>}
      </div>
    </div>
  );
}
