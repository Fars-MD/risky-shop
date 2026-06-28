import TrendingGames from "@/components/TrendingGames";

export const metadata = {
  title: "Game Trending | UniPin Top Up",
  description: "Lihat game-game yang paling trending dan banyak di-top up minggu ini",
};

export default function TrendingPage() {
  return (
    <main className="min-h-screen">
      <TrendingGames />
    </main>
  );
}
