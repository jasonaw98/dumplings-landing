"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutResultContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "fail" | "error">("loading");

  useEffect(() => {
    const orderNumber = searchParams.get("order_number");
    if (!orderNumber) {
      setStatus("fail");
      window.location.replace("/checkout/fail");
      return;
    }

    const checkStatus = (attempt = 0) => {
      const maxAttempts = 4;
      const delayMs = 1500;

      fetch(`/api/payments/status?order_number=${encodeURIComponent(orderNumber)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.paid) {
            setStatus("success");
            window.location.replace(`/checkout/success?order_number=${encodeURIComponent(orderNumber)}`);
            return;
          }
          if (attempt < maxAttempts - 1) {
            setTimeout(() => checkStatus(attempt + 1), delayMs);
          } else {
            setStatus("fail");
            window.location.replace("/checkout/fail");
          }
        })
        .catch(() => {
          if (attempt < maxAttempts - 1) {
            setTimeout(() => checkStatus(attempt + 1), delayMs);
          } else {
            setStatus("error");
            setTimeout(() => window.location.replace("/checkout/fail"), 2000);
          }
        });
    };

    checkStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Verifying your payment...</p>
          </>
        )}
        {status === "error" && (
          <p className="text-gray-600">Could not verify payment. Redirecting...</p>
        )}
      </div>
    </div>
  );
}

function ResultFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<ResultFallback />}>
      <CheckoutResultContent />
    </Suspense>
  );
}
