"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from "@/lib/cart-context";
import { getReferralCode, clearStoredReferralCode } from "@/lib/referral";
import { toast } from "sonner";

export function CheckoutForm() {
  const { items, totalPrice, finalTotalPrice, shippingFee } = useCart();
  const simpleItems = items.map((item) => `${item.name} x ${item.quantity}`);
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setReferralCode(getReferralCode() ?? "");
  }, []);

  async function submitReceipt(formData: FormData) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitOrder(formData);
      toast.success("Redirecting to payment...");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitOrder(formData: FormData) {
    const orderDetails = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      address: formData.get("address")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      zip: formData.get("zip")?.toString() || "",
      orderDate: new Date().toISOString(),
    };
    sessionStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    const refToSend = (formData.get("referralCode")?.toString() ?? referralCode)?.trim() || undefined;

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalTotalPrice,
        mobile: orderDetails.phone,
        email: orderDetails.email,
        name: orderDetails.fullName,
        origin: window.location.origin,
        address: orderDetails.address,
        city: orderDetails.city,
        zip: orderDetails.zip,
        items: items,
        shippingFee: shippingFee,
        totalPrice: finalTotalPrice,
        referralCode: refToSend ?? null,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error ?? "Failed to create payment");
    }

    const { paymentUrl } = await res.json();
    clearStoredReferralCode();
    window.location.href = paymentUrl;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        submitReceipt(fd);
      }}
      className="space-y-8"
    >
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
        <div className="grid gap-4 text-neutral-600">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="hello@dumplingbois.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+60122345678 or 60122345678"
              required
              pattern="^\+?60\d{8,10}$"
              title="Please enter a valid Malaysian phone number with country code, e.g. +60122345678 or 60122345678"
            />
            <p className="text-xs text-gray-500">
              Format: +60122345678 or 60122345678
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4 text-neutral-600">
        <h3 className="text-xl font-bold text-gray-900">Delivery Address</h3>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <input type="hidden" name="totalPrice" value={totalPrice} />
              <input
                type="hidden"
                name="items"
                value={simpleItems.join("\n")}
              />
              <input
                type="hidden"
                name="itemsJson"
                value={JSON.stringify(items)}
              />
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                type="text"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Dumpling Lane"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Kuala Lumpur"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">Postcode</Label>
              <Input id="zip" name="zip" placeholder="50000" required />
            </div>
          </div>
        </div>
      </div>

      {/* Referral code: prefilled from link (?ref=CODE) or stored from earlier visit */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Referral</h3>
        <div className="grid gap-2">
          <Label htmlFor="referralCode" className="text-neutral-600">
            Referral code{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="referralCode"
            name="referralCode"
            placeholder="e.g. FRIEND10"
            className="max-w-xs"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
      >
        {isSubmitting ? "Redirecting to payment…" : "Place Order"}
      </Button>
    </form>
  );
}
