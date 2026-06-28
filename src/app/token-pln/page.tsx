import { tokenNominals } from "@/lib/utils";
import CheckoutForm from "@/components/CheckoutForm";

export default function TokenPlnPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Token Listrik PLN</h1>
      <p className="text-gray-500 mb-8">Beli token listrik PLN dengan mudah dan cepat</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CheckoutForm
          productType="token"
          productSlug="token-pln"
          productName="Token PLN"
          nominals={tokenNominals}
        />
      </div>
    </div>
  );
}
