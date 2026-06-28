import UniPinUserProfile from "@/components/UniPinUserProfile";

export const metadata = {
  title: "Profil Saya | UniPin Top Up",
  description: "Kelola profil Anda, lihat riwayat transaksi, dan kumpulkan UC Points",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <UniPinUserProfile />
    </main>
  );
}
