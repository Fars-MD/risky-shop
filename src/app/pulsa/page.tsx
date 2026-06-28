import { operators, pulsaNominals } from "@/lib/utils";
import CheckoutForm from "@/components/CheckoutForm";

export default function PulsaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pulsa Semua Operator</h1>
      <p className="text-gray-500 mb-8">Isi ulang pulsa semua operator dengan harga termurah</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CheckoutForm
          productType="pulsa"
          productSlug="pulsa"
          productName="Pulsa"
          nominals={pulsaNominals}
          operators={operators}
        />
      </div>
    </div>
  );
}
