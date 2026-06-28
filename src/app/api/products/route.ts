import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const products = await prisma.product.findMany({
        where: { category: { slug }, active: true },
        include: { category: true },
        orderBy: { sort: "asc" },
      });
      return Response.json(products);
    }

    const where: any = { active: true };
    if (category) {
      where.category = { slug: category };
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { sort: "asc" },
    });

    return Response.json(products);
  } catch (error) {
    return Response.json({ message: "Gagal mengambil produk" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });
    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Gagal membuat produk" }, { status: 500 });
  }
}
