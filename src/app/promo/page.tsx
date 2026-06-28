"use client";

export default function PromoPage() {
  const vouchers = [
    {
      code: "RISKY10",
      desc: "Diskon 10% untuk semua transaksi",
      min: "Rp0",
      expiry: "31 Des 2026",
    },
    {
      code: "GAMER5",
      desc: "Diskon Rp5.000 untuk top up game minimal Rp50.000",
      min: "Rp50.000",
      expiry: "31 Des 2026",
    },
    {
      code: "PULSA2K",
      desc: "Diskon Rp2.000 untuk pembelian pulsa minimal Rp20.000",
      min: "Rp20.000",
      expiry: "31 Des 2026",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Promo & Voucher</h1>
      <p className="text-gray-500 mb-8">Gunakan kode voucher untuk dapatkan diskon spesial</p>

      <div className="space-y-4">
        {vouchers.map((v) => (
          <div
            key={v.code}
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1">
              <div className="text-lg font-mono font-bold text-indigo-600 tracking-widest mb-1">
                {v.code}
              </div>
              <p className="text-sm text-gray-600 mb-1">{v.desc}</p>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>Min. Transaksi: {v.min}</span>
                <span>Berlaku s/d: {v.expiry}</span>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(v.code);
                alert("Kode voucher disalin!");
              }}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium text-sm hover:bg-indigo-100 transition-colors whitespace-nowrap"
            >
              Salin Kode
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
