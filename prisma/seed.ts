import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingCategories = await prisma.category.count();
  if (existingCategories > 0) {
    console.log("Database sudah terisi, melewatkan seed.");
    return;
  }

  const topUpCat = await prisma.category.create({
    data: { name: "Top Up Game", slug: "top-up", icon: "🎮", type: "game", sort: 1 },
  });
  await prisma.category.create({
    data: { name: "Pulsa", slug: "pulsa", icon: "📱", type: "pulsa", sort: 2 },
  });
  await prisma.category.create({
    data: { name: "Token PLN", slug: "token", icon: "⚡", type: "token", sort: 3 },
  });

  // Re-create game data (delete old, insert fresh)
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany({ where: { categoryId: topUpCat.id } });
  await prisma.category.deleteMany({ where: { type: "game", slug: { not: "top-up" } } });

  const gameData = [
    { name: "Mobile Legends", slug: "mobile-legends", popular: true },
    { name: "Free Fire", slug: "free-fire", popular: true },
    { name: "PUBG Mobile", slug: "pubg-mobile", popular: true },
    { name: "Honor of Kings", slug: "honor-of-kings", popular: false },
    { name: "Valorant", slug: "valorant", popular: true },
    { name: "Genshin Impact", slug: "genshin-impact", popular: true },
    { name: "Call of Duty Mobile", slug: "call-of-duty-mobile", popular: true },
    { name: "Blood Strike", slug: "blood-strike", popular: false },
    { name: "Honkai: Star Rail", slug: "honkai-star-rail", popular: true },
    { name: "Arena of Valor", slug: "arena-of-valor", popular: false },
    { name: "Wild Rift", slug: "wild-rift", popular: true },
    { name: "Zenless Zone Zero", slug: "zenless-zone-zero", popular: false },
    { name: "EA Sports FC Mobile", slug: "ea-sports-fc-mobile", popular: false },
    { name: "Magic Chess", slug: "magic-chess", popular: true },
    { name: "Free Fire MAX", slug: "free-fire-max", popular: true },
    { name: "League of Legends", slug: "league-of-legends", popular: true },
  ];

  for (let i = 0; i < gameData.length; i++) {
    const g = gameData[i];
    await prisma.product.create({
      data: {
        categoryId: topUpCat.id,
        name: g.name,
        description: `Top up ${g.name} murah dan cepat`,
        price: 50000,
        sort: i + 1,
        popular: g.popular,
      },
    });
    await prisma.category.create({
      data: { name: g.name, slug: g.slug, icon: "🎮", type: "game", sort: i + 10 },
    });
  }

  await prisma.banner.create({
    data: {
      title: "Top Up Game Murah & Cepat",
      subtitle: "Daftar game populer siap top up - proses instan, harga terbaik!",
      image: "/banners/game.jpg",
      sort: 1,
    },
  });
  await prisma.banner.create({
    data: {
      title: "Pulsa & Token PLN",
      subtitle: "Isi ulang pulsa dan token listrik tanpa ribet, 24 jam non-stop!",
      image: "/banners/pulsa.jpg",
      sort: 2,
    },
  });

  await prisma.voucher.createMany({
    data: [
      { code: "RISKY10", type: "percent", value: 10, minTransaction: 0, maxUses: 0, active: true },
      { code: "GAMER5", type: "fixed", value: 5000, minTransaction: 50000, maxUses: 100, active: true },
      { code: "PULSA2K", type: "fixed", value: 2000, minTransaction: 20000, maxUses: 50, active: true },
    ],
  });

  console.log("Database berhasil diisi data awal!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
