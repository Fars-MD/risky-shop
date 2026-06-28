"use client";

import { useEffect, useState } from "react";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  active: boolean;
  sort: number;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    active: true,
    sort: 0,
  });

  const loadBanners = async () => {
    setLoading(true);
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const resetForm = () => {
    setForm({ title: "", subtitle: "", image: "", link: "", active: true, sort: 0 });
    setEditing(null);
  };

  const openEdit = (banner: Banner) => {
    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      link: banner.link,
      active: banner.active,
      sort: banner.sort,
    });
    setEditing(banner);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch("/api/banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    resetForm();
    loadBanners();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus banner ini?")) return;
    await fetch(`/api/banners?id=${id}`, { method: "DELETE" });
    loadBanners();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Kelola Banner</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 border border-cyan-400/40 text-cyan-300 rounded-lg font-medium hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
        >
          + Tambah Banner
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 mb-6 space-y-4"
        >
          <h3 className="font-semibold text-lg text-white">{editing ? "Edit Banner" : "Tambah Banner"}</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Judul</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Subtitle</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL Gambar</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/banners/example.jpg"
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200 placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Link (opsional)</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-slate-200"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">Urutan</label>
              <input
                type="number"
                value={form.sort}
                onChange={(e) => setForm({ ...form, sort: parseInt(e.target.value) || 0 })}
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
            <button
              type="submit"
              className="px-6 py-2.5 border border-cyan-400/40 text-cyan-300 rounded-lg font-medium hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
            >
              {editing ? "Simpan" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-6 py-2.5 border border-slate-600 text-slate-400 rounded-lg font-medium hover:border-slate-500 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="glass-light rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="font-semibold text-white">{banner.title}</div>
              <div className="text-sm text-slate-400">{banner.subtitle}</div>
              <div className="text-xs text-slate-500 mt-1">
                Urutan: {banner.sort} | {banner.active ? "Aktif" : "Nonaktif"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(banner)}
                className="px-3 py-1.5 text-sm border border-cyan-400/30 text-cyan-300 rounded-lg hover:border-cyan-400 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="px-3 py-1.5 text-sm border border-red-400/30 text-red-400 rounded-lg hover:border-red-400 transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="text-center py-12 text-slate-500">Belum ada banner</div>
        )}
      </div>
    </div>
  );
}
