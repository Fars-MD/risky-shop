export default function BantuanPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <h1 className="text-2xl font-bold text-white mb-2">Bantuan</h1>
      <p className="text-slate-400 mb-8">Pertanyaan yang sering diajukan</p>

      <div className="space-y-4">
        {faq.map((item, i) => (
          <details key={i} className="glass-light rounded-xl">
            <summary className="px-6 py-4 font-medium text-slate-200 cursor-pointer hover:text-cyan-400 transition-colors">
              {item.q}
            </summary>
            <div className="px-6 pb-4 text-sm text-slate-400">{item.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

const faq = [
  {
    q: "Apakah perlu daftar akun untuk membeli?",
    a: "Tidak perlu! Risky Shop memungkinkan Anda melakukan transaksi tanpa harus membuat akun terlebih dahulu. Cukup isi data yang diperlukan dan selesaikan pembayaran.",
  },
  {
    q: "Bagaimana cara cek status pesanan?",
    a: "Anda bisa mengecek status pesanan melalui halaman Cek Status dengan memasukkan nomor transaksi yang didapat setelah checkout.",
  },
  {
    q: "Berapa lama proses top up game?",
    a: "Proses top up biasanya berlangsung 1-5 menit setelah pembayaran dikonfirmasi. Beberapa game mungkin membutuhkan waktu lebih lama tergantung penyedia layanan.",
  },
  {
    q: "Pembayaran apa saja yang didukung?",
    a: "Kami mendukung QRIS, Transfer Bank (BCA, BRI, BNI, Mandiri), Virtual Account, DANA, OVO, GoPay, dan ShopeePay.",
  },
  {
    q: "Bagaimana jika pembayaran sudah terbayar tapi pesanan belum diproses?",
    a: "Silakan hubungi kami melalui WhatsApp atau email dengan menyertakan nomor transaksi untuk kami bantu proses lebih lanjut.",
  },
  {
    q: "Apakah ada promo atau diskon?",
    a: "Ya! Kami menyediakan berbagai kode voucher yang bisa digunakan untuk mendapatkan diskon. Cek halaman Promo untuk info lebih lanjut.",
  },
];
