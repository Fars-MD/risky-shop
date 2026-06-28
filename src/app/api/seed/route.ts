import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const existingCategories = await prisma.category.count();
    if (existingCategories > 0) {
      return Response.json({ message: "Database sudah terisi" });
    }

    // Create categories
    const topUpCat = await prisma.category.create({
      data: { name: "Top Up Game", slug: "top-up", icon: "🎮", type: "game", sort: 1 },
    });
    await prisma.category.create({
      data: { name: "Pulsa", slug: "pulsa", icon: "📱", type: "pulsa", sort: 2 },
    });
    await prisma.category.create({
      data: { name: "Token PLN", slug: "token", icon: "⚡", type: "token", sort: 3 },
    });

    // Create game subcategories as products
    const gameData = [
      { name: "Mobile Legends", slug: "mobile-legends", icon: "🎮", popular: true },
      { name: "Free Fire", slug: "free-fire", icon: "🔥", popular: true },
      { name: "PUBG Mobile", slug: "pubg-mobile", icon: "🔫", popular: true },
      { name: "Honor of Kings", slug: "honor-of-kings", icon: "👑", popular: false },
      { name: "Valorant", slug: "valorant", icon: "⚔️", popular: true },
      { name: "Genshin Impact", slug: "genshin-impact", icon: "⭐", popular: true },
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

      // Also create as category for itemized views
      await prisma.category.create({
        data: {
          name: g.name,
          slug: g.slug,
          icon: g.icon,
          type: "game",
          sort: i + 10,
        },
      });
    }

    // Create banners
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

    // Create vouchers
    await prisma.voucher.create({
      data: {
        code: "RISKY10",
        type: "percent",
        value: 10,
        minTransaction: 0,
        maxUses: 0,
        active: true,
      },
    });
    await prisma.voucher.create({
      data: {
        code: "GAMER5",
        type: "fixed",
        value: 5000,
        minTransaction: 50000,
        maxUses: 100,
        active: true,
      },
    });
    await prisma.voucher.create({
      data: {
        code: "PULSA2K",
        type: "fixed",
        value: 2000,
        minTransaction: 20000,
        maxUses: 50,
        active: true,
      },
    });

    return Response.json({ message: "Database berhasil diisi data awal" });
  } catch (error) {
    console.error("Seed error:", error);
    return Response.json({ message: "Gagal mengisi data awal" }, { status: 500 });
  }
}
