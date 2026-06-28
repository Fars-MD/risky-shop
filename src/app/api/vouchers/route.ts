import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const price = parseInt(searchParams.get("price") || "0");

    if (!code) {
      const vouchers = await prisma.voucher.findMany({ orderBy: { createdAt: "desc" } });
      return Response.json(vouchers);
    }

    const voucher = await prisma.voucher.findUnique({ where: { code } });

    if (!voucher) {
      return Response.json({ valid: false, message: "Kode voucher tidak ditemukan" });
    }

    if (!voucher.active) {
      return Response.json({ valid: false, message: "Kode voucher sudah tidak aktif" });
    }

    if (voucher.expiresAt && new Date() > voucher.expiresAt) {
      return Response.json({ valid: false, message: "Kode voucher sudah kadaluarsa" });
    }

    if (voucher.maxUses > 0 && voucher.usedCount >= voucher.maxUses) {
      return Response.json({ valid: false, message: "Kode voucher sudah habis digunakan" });
    }

    if (price < voucher.minTransaction) {
      return Response.json({
        valid: false,
        message: `Minimal transaksi ${voucher.minTransaction.toLocaleString("id-ID")}`,
      });
    }

    let discount = 0;
    if (voucher.type === "percent") {
      discount = Math.round((price * voucher.value) / 100);
    } else {
      discount = voucher.value;
    }

    return Response.json({
      valid: true,
      discount,
      type: voucher.type,
      value: voucher.value,
    });
  } catch {
    return Response.json({ message: "Gagal memproses voucher" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const voucher = await prisma.voucher.create({ data: body });
    return Response.json(voucher, { status: 201 });
  } catch {
    return Response.json({ message: "Gagal membuat voucher" }, { status: 500 });
  }
}
