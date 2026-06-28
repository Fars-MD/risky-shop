"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { paymentMethods, formatCurrency, type Nominal } from "@/lib/utils";
import ParticleButton from "@/components/ParticleButton";

interface Operator {
  id: string;
  name: string;
  icon: string;
}

interface Game {
  slug: string;
  name: string;
  icon: string;
}

interface CheckoutFormProps {
  productType: "game" | "pulsa" | "token";
  productSlug: string;
  productName: string;
  nominals: Nominal[];
  operators?: Operator[];
  game?: Game;
}

export default function CheckoutForm({
  productType,
  productSlug,
  productName,
  nominals,
  operators,
}: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [phone, setPhone] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [operator, setOperator] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<Nominal | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentChannel, setPaymentChannel] = useState("");

  const totalPrice = selectedNominal
    ? Math.max(0, selectedNominal.price - voucherDiscount)
    : 0;

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    if (!selectedNominal) {
      setVoucherMsg("Pilih nominal terlebih dahulu");
      return;
    }
    setVoucherMsg("");
    try {
      const res = await fetch(
        `/api/vouchers?code=${voucherCode}&price=${selectedNominal.price}`
      );
      const data = await res.json();
      if (data.valid) {
        setVoucherDiscount(data.discount);
        setVoucherMsg(`Diskon: ${formatCurrency(data.discount)}`);
      } else {
        setVoucherDiscount(0);
        setVoucherMsg(data.message || "Voucher tidak valid");
      }
    } catch {
      setVoucherMsg("Gagal memverifikasi voucher");
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit()) return;
    setError("");
    setLoading(true);

    try {
      const customerData: Record<string, string> = {};
      if (productType === "game") {
        customerData.userId = userId;
        if (zoneId) customerData.zoneId = zoneId;
      } else if (productType === "pulsa") {
        customerData.phone = phone;
        customerData.operator = operator;
      } else if (productType === "token") {
        customerData.customerId = customerId;
      }

      const body = {
        productType,
        productSlug,
        productName,
        nominal: selectedNominal!.label,
        price: selectedNominal!.price,
        voucherCode: voucherCode.trim() || undefined,
        discount: voucherDiscount,
        total: totalPrice,
        paymentMethod,
        paymentChannel,
        customerData,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Terjadi kesalahan");
        setLoading(false);
        return;
      }

      router.push(`/checkout?trx=${data.transactionNumber}`);
    } catch {
      setError("Gagal memproses pesanan");
      setLoading(false);
    }
  };

  const canSubmit = () => {
    if (productType === "game")
      return userId.trim() !== "" && selectedNominal !== null && paymentMethod !== "";
    if (productType === "pulsa")
      return phone.trim() !== "" && operator !== "" && selectedNominal !== null && paymentMethod !== "";
    if (productType === "token")
      return customerId.trim() !== "" && selectedNominal !== null && paymentMethod !== "";
    return false;
  };

  const isDataValid = () => {
    if (productType === "game") return userId.trim() !== "";
    if (productType === "pulsa") return phone.trim() !== "" && operator !== "";
    if (productType === "token") return customerId.trim() !== "";
    return false;
  };

  const getDisplayName = (nom: Nominal) => {
    const cat = nom.category || "diamond";
    if (cat === "pass" || cat === "bundle") return nom.label;
    return nom.label;
  };

  const getBonusText = (nom: Nominal) => {
    if (nom.category === "pass") return "";
    if (nom.category === "bundle") return nom.bonus || "";
    const match = nom.label.match(/\((.+)\)/);
    return match ? match[1] : (nom.bonus || "");
  };

  const getPriceLabel = (nom: Nominal) => {
    return `Dari ${formatCurrency(nom.price)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {/* === DATA PELANGGAN === */}
      <div className="glass rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-base text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Data Pelanggan
        </h2>

        {productType === "game" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">Masukkan User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="contoh: 12345678(1234)"
                className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-base transition-all"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Untuk mengetahui User ID Anda, silakan klik menu profile dibagian kiri atas pada menu utama game. User ID akan terlihat dibagian bawah Nama Karakter Game Anda.
              </p>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">
                Zone ID <span className="text-slate-500 font-normal">(opsional, khusus MLBB & HOK)</span>
              </label>
              <input
                type="text"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                placeholder="contoh: 1234"
                className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-base transition-all"
              />
            </div>
            {userId.trim() && (
              <div className="flex items-center gap-2 text-sm text-cyan-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ID Server tersedia
              </div>
            )}
          </div>
        )}

        {productType === "pulsa" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2 font-medium">Pilih Operator</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {operators?.map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setOperator(op.id)}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-all duration-200 ${
                      operator === op.id
                        ? "border-cyan-400 bg-cyan-500/15 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                        : "border-slate-700 hover:border-slate-500 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    <img src={op.icon} alt={op.name} className="w-7 h-7 mx-auto mb-1" />
                    {op.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">Nomor HP</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-base transition-all"
              />
            </div>
          </div>
        )}

        {productType === "token" && (
          <div>
            <label className="block text-sm text-slate-300 mb-1.5 font-medium">ID Pelanggan PLN</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Masukkan ID Pelanggan PLN"
              className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-base transition-all"
            />
            <p className="text-xs text-slate-500 mt-1.5">Contoh: 123456789012</p>
          </div>
        )}
      </div>

      {/* === PILIH NOMINAL === */}
      {isDataValid() && (
        <div className="mb-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Pilih Nominal Top Up
          </h2>

          {(() => {
            const groups: Record<string, { label: string; nominals: Nominal[] }> = {};
            for (const nom of nominals) {
              const cat = nom.category || "diamond";
              if (!groups[cat]) {
                const labels: Record<string, string> = {
                  diamond: productType === "game" ? "Diamond" : productType === "pulsa" ? "Pulsa" : "Token",
                  pass: "Pass Premium",
                  bundle: "Limited Bundle",
                };
                groups[cat] = { label: labels[cat] || cat, nominals: [] };
              }
              groups[cat].nominals.push(nom);
            }
            return Object.entries(groups).map(([cat, group]) => (
              <div key={cat}>
                <h3 className="font-semibold text-sm text-slate-300 uppercase tracking-wider mb-3">{group.label}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {group.nominals.map((nom) => {
                    const isSelected = selectedNominal?.label === nom.label;
                    const hasDiscount = nom.originalPrice && nom.originalPrice > nom.price;
                    const discountPct = hasDiscount
                      ? Math.round((1 - nom.price / nom.originalPrice!) * 100)
                      : 0;

                    const isPass = nom.category === "pass";
                    const isBundle = nom.category === "bundle";

                    return (
                      <button
                        key={nom.label}
                        type="button"
                        onClick={() => {
                          setSelectedNominal(nom);
                          setVoucherDiscount(0);
                          setVoucherMsg("");
                        }}
                        className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          isPass
                            ? "bg-slate-800/40 border-violet-500/40 hover:border-violet-400"
                            : isBundle
                              ? "bg-slate-800/40 border-emerald-500/40 hover:border-emerald-400"
                              : "bg-slate-800/40 border-slate-700 hover:border-slate-500"
                        } ${
                          isSelected
                            ? isPass
                              ? "!border-violet-400 bg-violet-500/15 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                              : isBundle
                                ? "!border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                                : "!border-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : ""
                        }`}
                      >
                        {nom.popular && (
                          <span className="absolute -top-2.5 right-2 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white">
                            Best Seller
                          </span>
                        )}
                        {(isPass || isBundle) && nom.bonus && (
                          <span className="text-[10px] text-slate-400 mb-0.5">{nom.bonus}</span>
                        )}
                        <span className="text-sm font-semibold text-white text-center leading-tight mb-2">
                          {getDisplayName(nom)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {hasDiscount ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="text-slate-500 line-through">{formatCurrency(nom.originalPrice!)}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                isPass ? "bg-violet-500/20 text-violet-300" : isBundle ? "bg-emerald-500/20 text-emerald-300" : "bg-cyan-500/20 text-cyan-300"
                              }`}>
                                -{discountPct}%
                              </span>
                            </span>
                          ) : (
                            getPriceLabel(nom)
                          )}
                        </span>
                        <span className={`text-sm font-bold ${
                          isPass ? "text-violet-300" : isBundle ? "text-emerald-300" : "text-cyan-400"
                        }`}>
                          {hasDiscount ? formatCurrency(nom.price) : getPriceLabel(nom)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
      )}

      {/* === VOUCHER === */}
      {isDataValid() && selectedNominal && (
        <div className="mb-8">
          <div className="glass rounded-xl p-5">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Voucher Promo <span className="text-slate-500 font-normal">(opsional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="Masukkan kode voucher"
                className="flex-1 px-4 py-2.5 bg-slate-900/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-sm"
              />
              <button
                onClick={handleApplyVoucher}
                className="px-5 py-2.5 border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/5 font-medium rounded-lg transition-all duration-300 text-sm"
              >
                Pakai
              </button>
            </div>
            {voucherMsg && (
              <p className={`text-sm mt-1.5 ${voucherDiscount > 0 ? "text-cyan-400" : "text-red-400"}`}>
                {voucherMsg}
              </p>
            )}
          </div>
        </div>
      )}

      {/* === PEMBAYARAN === */}
      {isDataValid() && selectedNominal && (
        <div className="mb-8">
          <div className="glass rounded-xl p-5">
            <h2 className="font-semibold text-base text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pilih Pembayaran
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <div key={method.id}>
                  {method.channels.map((ch) => {
                    const isSelected = paymentMethod === method.id && paymentChannel === ch.id;
                    return (
                      <button
                        key={`${method.id}-${ch.id}`}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(method.id);
                          setPaymentChannel(ch.id);
                        }}
                        className={`w-full p-3 rounded-xl border text-center transition-all duration-200 ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                            : "border-slate-700 hover:border-slate-500 bg-slate-900/40"
                        }`}
                      >
                        <img src={method.icon} alt={method.name} className="w-8 h-8 mx-auto mb-1" />
                        <span className={`text-xs font-medium ${isSelected ? "text-cyan-300" : "text-slate-400"}`}>
                          {ch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === RINGKASAN + BAYAR === */}
      {isDataValid() && selectedNominal && (
        <div className="glass rounded-xl p-5 mb-8">
          <h3 className="font-semibold text-white text-base mb-3">Ringkasan Pesanan</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center justify-between text-slate-300">
              <span>Item</span>
              <span className="text-white font-medium">{selectedNominal.label}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Harga</span>
              <span>{formatCurrency(selectedNominal.price)}</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-cyan-400">
                <span>Diskon Voucher</span>
                <span>-{formatCurrency(voucherDiscount)}</span>
              </div>
            )}
            {productType === "game" && userId && (
              <div className="flex justify-between text-slate-400 text-xs">
                <span>User ID</span>
                <span>{userId}{zoneId ? ` (${zoneId})` : ""}</span>
              </div>
            )}
            {productType === "pulsa" && phone && operator && (
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Nomor</span>
                <span>{phone} ({operator.toUpperCase()})</span>
              </div>
            )}
            {productType === "token" && customerId && (
              <div className="flex justify-between text-slate-400 text-xs">
                <span>ID Pelanggan</span>
                <span>{customerId}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-700">
              <span className="text-white">Total</span>
              <span className="text-cyan-400">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
          <ParticleButton
            onClick={handleSubmit}
            disabled={!canSubmit() || loading}
            className="w-full py-3.5 text-base"
          >
            {loading ? "Memproses..." : `Bayar ${formatCurrency(totalPrice)}`}
          </ParticleButton>
        </div>
      )}
    </div>
  );
}
