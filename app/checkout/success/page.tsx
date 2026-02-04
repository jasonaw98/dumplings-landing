"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Package, MapPin, Phone, Mail, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { CartItem } from "@/lib/cart-context";

interface OrderDetails {
  items: CartItem[];
  totalPrice: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  orderDate: string;
  orderNumber: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState(false);
  const { clearCart, isInitialized } = useCart();

  useEffect(() => {
    if (!isInitialized) return;

    const ref = searchParams.get("order_number");

    if (ref) {
      fetch(`/api/orders/by-number?order_number=${encodeURIComponent(ref)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((order) => {
          setOrderDetails({
            items: (order.items ?? []).map((item: { id: number; name: string; price: number; quantity: number; image?: string }) => ({
              ...item,
              image: item.image ?? "",
            })),
            totalPrice: Number(order.total_price),
            fullName: order.full_name,
            email: order.email,
            phone: order.phone ?? "",
            address: order.address,
            city: order.city,
            zip: order.zip,
            orderDate: order.created_at
              ? new Date(order.created_at).toLocaleDateString("en-MY", { dateStyle: "long" })
              : new Date().toLocaleDateString("en-MY", { dateStyle: "long" }),
            orderNumber: order.order_number,
          });
          clearCart();
        })
        .catch(() => setError(true));
      return;
    }

    // Fallback: sessionStorage (e.g. direct visit or old link)
    const savedOrder = sessionStorage.getItem("lastOrder");
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        setOrderDetails({
          ...parsed,
          fullName: parsed.fullName ?? parsed.firstName ?? "",
        });
        clearCart();
      } catch (e) {
        console.error("Failed to parse order details", e);
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams, clearCart, isInitialized]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">We couldn’t load this order.</p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white pt-12 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order, {orderDetails.fullName}!
          </p>
          <p className="text-sm text-gray-500">
            Order Number: <span className="font-semibold">{orderDetails.orderNumber}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary - Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>
              </div>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="relative w-16 h-16 shrink-0 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain scale-125"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </span>
                        <span className="font-bold text-orange-600">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-orange-600">
                    RM {orderDetails.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Information
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {orderDetails.fullName}
                  </p>
                  <p className="text-sm">{orderDetails.address}</p>
                  <p className="text-sm">
                    {orderDetails.city}, {orderDetails.zip}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <Phone className="w-4 h-4" />
                  <span>{orderDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{orderDetails.email}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Next Steps */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-200">1.</span>
                  <span>We've received your order and payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-200">2.</span>
                  <span>You'll receive a confirmation message soon</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-200">3.</span>
                  <span>Your dumplings will be prepared fresh!</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about your order, feel free to contact
                us.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <a
                    href="https://api.whatsapp.com/send/?phone=600108227137&text&type=phone_number"
                    target="_blank"
                  >
                    <span className="hover:text-orange-500 transition-colors underline">
                      WhatsApp us for support
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            <Link href="/" className="block">
              <Button className="w-full h-12 text-lg bg-gray-900 hover:bg-orange-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
