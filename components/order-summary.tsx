"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";

export function OrderSummary() {
  const { items, totalPrice } = useCart();
  const shipping = 5.0; // Flat rate shipping for now
  const finalTotal = totalPrice + shipping;

  return (
    <div className="bg-gray-50 p-8 rounded-3xl sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 bg-white rounded-xl shrink-0 overflow-hidden text-clip">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain scale-120"
              />
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-lg">
                x{item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm">
                RM {item.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right font-medium text-gray-900">
              RM {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="space-y-3 pt-6 border-t border-gray-200 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>RM {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>RM {shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
          <span>Total</span>
          <span className="text-orange-600">RM {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
