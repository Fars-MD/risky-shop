import UniPinPromo from "@/components/UniPinPromo";

export const metadata = {
  title: "Promo & Penawaran Eksklusif | UniPin Top Up",
  description: "Dapatkan promo terbaru, cashback, dan penawaran eksklusif untuk setiap top-up game Anda",
};

export default function PromoPage() {
  return (
    <main className="min-h-screen">
      <UniPinPromo />
    </main>
  );
}
