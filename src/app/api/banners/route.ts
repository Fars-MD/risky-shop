import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { active: true },
      orderBy: { sort: "asc" },
    });
    return Response.json(banners);
  } catch {
    return Response.json({ message: "Gagal mengambil banner" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const banner = await prisma.banner.create({ data: body });
    return Response.json(banner, { status: 201 });
  } catch {
    return Response.json({ message: "Gagal membuat banner" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const banner = await prisma.banner.update({
      where: { id },
      data,
    });
    return Response.json(banner);
  } catch {
    return Response.json({ message: "Gagal mengupdate banner" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = parseInt(searchParams.get("id") || "");
    await prisma.banner.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ message: "Gagal menghapus banner" }, { status: 500 });
  }
}
