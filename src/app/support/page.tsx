import UniPinSupport from "@/components/UniPinSupport";

export const metadata = {
  title: "Dukungan Pelanggan | UniPin Top Up",
  description: "Hubungi tim support kami yang siap membantu 24/7 untuk semua pertanyaan Anda",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <UniPinSupport />
    </main>
  );
}
