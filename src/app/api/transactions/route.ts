import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const trx = searchParams.get("trx");
    const all = searchParams.get("all");

    if (all === "true") {
      const transactions = await prisma.transaction.findMany({
        include: { product: true },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return Response.json(
        transactions.map((t) => ({
          id: t.id,
          transactionNumber: t.transactionNumber,
          productName: t.product.name,
          nominal: t.nominal,
          price: t.price,
          discount: t.discount,
          total: t.total,
          paymentMethod: t.paymentMethod,
          paymentChannel: t.paymentChannel,
          status: t.status,
          createdAt: t.createdAt,
        }))
      );
    }

    if (!trx) {
      return Response.json({ message: "Nomor transaksi diperlukan" }, { status: 400 });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { transactionNumber: trx },
      include: { product: { include: { category: true } } },
    });

    if (!transaction) {
      return Response.json({ message: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    const customerData = JSON.parse(transaction.customerData);

    return Response.json({
      transactionNumber: transaction.transactionNumber,
      productName: transaction.product.name,
      nominal: transaction.nominal,
      price: transaction.price,
      discount: transaction.discount,
      total: transaction.total,
      paymentMethod: transaction.paymentMethod,
      paymentChannel: transaction.paymentChannel,
      status: transaction.status,
      customerData,
      createdAt: transaction.createdAt,
    });
  } catch {
    return Response.json({ message: "Gagal mengambil transaksi" }, { status: 500 });
  }
}
