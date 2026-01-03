import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/order-summary";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500">
            Completing your order with Dumpling Bois
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <CheckoutForm />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
