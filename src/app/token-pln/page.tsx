import { tokenNominals, paymentMethods } from "@/lib/utils";
import CheckoutForm from "@/components/CheckoutForm";

export default function TokenPlnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Token PLN</h1>
        <p className="text-slate-400 text-sm mt-1">Beli token listrik PLN dengan mudah dan cepat</p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {paymentMethods.map((m) => (
            <span key={m.id} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              {m.name}
            </span>
          ))}
        </div>
      </div>

      <CheckoutForm
        productType="token"
        productSlug="token-pln"
        productName="Token PLN"
        nominals={tokenNominals}
      />
    </div>
  );
}
