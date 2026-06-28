"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { paymentMethods, formatCurrency } from "@/lib/utils";

interface Nominal {
  label: string;
  price: number;
  originalPrice?: number;
}

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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
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

  const canProceed = () => {
    if (productType === "game") return userId.trim() !== "" && selectedNominal !== null;
    if (productType === "pulsa") return phone.trim() !== "" && operator !== "" && selectedNominal !== null;
    if (productType === "token") return customerId.trim() !== "" && selectedNominal !== null;
    return false;
  };

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        {["Isi Data", "Pilih Nominal", "Pembayaran"].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1
                  ? "bg-green-500 text-white"
                  : step === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={step === i + 1 ? "text-indigo-600 font-medium" : "text-gray-500"}>
              {s}
            </span>
            {i < 2 && <span className="text-gray-300">—</span>}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {/* Step 1: Customer Data */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Data Pelanggan</h3>

          {productType === "game" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Masukkan User ID"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zone ID <span className="text-gray-400">(opsional)</span>
                </label>
                <input
                  type="text"
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  placeholder="Masukkan Zone ID jika ada"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {productType === "pulsa" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                <div className="grid grid-cols-3 gap-2">
                  {operators?.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id)}
                      className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                        operator === op.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-lg mb-1">{op.icon}</div>
                      {op.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {productType === "token" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Pelanggan</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Masukkan ID Pelanggan PLN"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          <button
            onClick={() => setStep(2)}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
              (productType === "game" && userId.trim()) ||
              (productType === "pulsa" && phone.trim() && operator) ||
              (productType === "token" && customerId.trim())
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={
              !(
                (productType === "game" && userId.trim()) ||
                (productType === "pulsa" && phone.trim() && operator) ||
                (productType === "token" && customerId.trim())
              )
            }
          >
            Lanjutkan
          </button>
        </div>
      )}

      {/* Step 2: Select Nominal + Voucher */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Pilih Nominal</h3>

          <div className="grid grid-cols-2 gap-3">
            {nominals.map((nom) => (
              <button
                key={nom.label}
                type="button"
                onClick={() => {
                  setSelectedNominal(nom);
                  setVoucherDiscount(0);
                  setVoucherMsg("");
                }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedNominal?.label === nom.label
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{nom.label}</div>
                <div className="text-sm text-gray-500">
                  {nom.originalPrice && nom.originalPrice > nom.price ? (
                    <span>
                      <span className="line-through text-gray-400 mr-1">
                        {formatCurrency(nom.originalPrice)}
                      </span>
                      <span className="text-green-600 font-medium">
                        {formatCurrency(nom.price)}
                      </span>
                    </span>
                  ) : (
                    formatCurrency(nom.price)
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voucher Promo <span className="text-gray-400">(opsional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="Masukkan kode voucher"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleApplyVoucher}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Pakai
              </button>
            </div>
            {voucherMsg && (
              <p
                className={`text-sm mt-1 ${
                  voucherDiscount > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {voucherMsg}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={() => setStep(3)}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-colors ${
                selectedNominal
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!selectedNominal}
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Metode Pembayaran</h3>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{method.icon}</span>
                  <span className="font-medium text-gray-700">{method.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {method.channels.map((ch) => (
                    <button
                      key={`${method.id}-${ch.id}`}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.id);
                        setPaymentChannel(ch.id);
                      }}
                      className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                        paymentMethod === method.id && paymentChannel === ch.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {ch.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Harga</span>
              <span className="font-medium">{selectedNominal ? formatCurrency(selectedNominal.price) : "-"}</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Diskon Voucher</span>
                <span>-{formatCurrency(voucherDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total</span>
              <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={handleSubmit}
              disabled={!paymentMethod || loading}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-colors ${
                paymentMethod && !loading
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Memproses..." : `Bayar ${formatCurrency(totalPrice)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
