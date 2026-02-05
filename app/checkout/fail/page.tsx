"use client";

import { motion } from "framer-motion";
import { XCircle, Home, Phone, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutFailurePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white pt-12 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Failure Header */}
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
            className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
          >
            <XCircle className="w-12 h-12 text-red-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Failed 😔
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            We couldn't process your payment.
          </p>
          <p className="text-sm text-gray-500">
            Please try again or contact support if the issue persists.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What happened?
              </h2>
              <p className="text-gray-600 mb-4">
                The payment transaction was not successful or was cancelled. No
                charges were made to your account.
              </p>
              <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm">
                Common reasons:
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Insufficient funds</li>
                  <li>Bank declined the transaction</li>
                  <li>Connection timed out</li>
                  <li>Cancelled by user</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you continue to experience issues, please contact our support
                team.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-red-600" />
                  <a
                    href="https://api.whatsapp.com/send/?phone=600108227137&text&type=phone_number"
                    target="_blank"
                    className="hover:text-red-500 transition-colors underline"
                  >
                    WhatsApp us for support
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              <Link href="/checkout" className="block">
                <Button className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg border-gray-200 hover:bg-gray-50 text-gray-900 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
