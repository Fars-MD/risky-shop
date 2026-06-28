import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTransactionNumber } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productType,
      productSlug,
      productName,
      nominal,
      price,
      voucherCode,
      discount,
      total,
      paymentMethod,
      paymentChannel,
      customerData,
    } = body;

    if (!total || !paymentMethod || !paymentChannel) {
      return Response.json(
        { message: "Data transaksi tidak lengkap" },
        { status: 400 }
      );
    }

    if (productType === "game" && !customerData?.userId) {
      return Response.json({ message: "User ID diperlukan" }, { status: 400 });
    }
    if (productType === "pulsa" && (!customerData?.phone || !customerData?.operator)) {
      return Response.json({ message: "Nomor HP dan operator diperlukan" }, { status: 400 });
    }
    if (productType === "token" && !customerData?.customerId) {
      return Response.json({ message: "ID Pelanggan diperlukan" }, { status: 400 });
    }

    // Find or create product
    let product = await prisma.product.findFirst({
      where: {
        name: productName,
        category: { slug: productType === "game" ? productSlug : productType },
      },
    });

    if (!product) {
      // Create category if needed
      let category = await prisma.category.findFirst({
        where: { slug: productType === "game" ? "top-up" : productType },
      });

      if (!category) {
        const catName =
          productType === "game" ? "Top Up Game" : productType === "pulsa" ? "Pulsa" : "Token PLN";
        category = await prisma.category.create({
          data: {
            name: catName,
            slug: productType === "game" ? "top-up" : productType,
            icon: productType === "game" ? "🎮" : productType === "pulsa" ? "📱" : "⚡",
            type: productType,
          },
        });
      }

      product = await prisma.product.create({
        data: {
          categoryId: category.id,
          name: productName,
          price,
          description: `${productName} ${nominal}`,
        },
      });
    }

    // Handle voucher usage
    let voucherId: number | null = null;
    let finalDiscount = discount || 0;

    if (voucherCode && discount > 0) {
      const voucher = await prisma.voucher.findUnique({ where: { code: voucherCode } });
      if (voucher) {
        voucherId = voucher.id;
        await prisma.voucher.update({
          where: { id: voucher.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const transactionNumber = generateTransactionNumber();

    const transaction = await prisma.transaction.create({
      data: {
        transactionNumber,
        productId: product.id,
        customerData: JSON.stringify(customerData),
        nominal,
        price,
        voucherId,
        discount: finalDiscount,
        total,
        paymentMethod,
        paymentChannel,
        status: "pending",
        paymentUrl: "",
      },
    });

    return Response.json(
      {
        transactionNumber: transaction.transactionNumber,
        total: transaction.total,
        paymentMethod: transaction.paymentMethod,
        paymentChannel: transaction.paymentChannel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ message: "Gagal memproses pesanan" }, { status: 500 });
  }
}
