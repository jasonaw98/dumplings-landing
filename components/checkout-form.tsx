"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from "@/lib/cart-context";

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {items, totalPrice} = useCart();
  const simpleItems = items.map(item => `${item.name} x ${item.quantity}`);

  async function submitReceipt(formData: FormData) {
    const res = await fetch("/api/receipt/telegram", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      alert("Order placed successfully! (This is a demo)");
    }, 2000);
  };

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
              className="ring-transparent border-neutral-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+60 12-345 6789"
              required
              className="ring-transparent border-neutral-300"
            />
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4 text-neutral-600">
        <h3 className="text-xl font-bold text-gray-900">Delivery Address</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <input type="hidden" name="totalPrice" value={totalPrice} />
              <input type="hidden" name="items" value={simpleItems.join("\n")} />
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jason"
                required
                type="text"
                className="ring-transparent border-neutral-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Tan"
                required
                type="text"
                className="ring-transparent border-neutral-300"
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
              className="ring-transparent border-neutral-300"
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
                className="ring-transparent border-neutral-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">Postcode</Label>
              <Input
                id="zip"
                name="zip"
                placeholder="50000"
                required
                className="ring-transparent border-neutral-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Payment</h3>
        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm">
          ⚠️ Payment integration coming soon. You won't be charged yet.
        </div>
        <div className="grid gap-2">
          <Label htmlFor="receipt" className="text-neutral-600">
            Upload Receipt
          </Label>
          <Input
            id="receipt"
            type="file"
            name="receipt"
            accept="image/*,.pdf"
            required
            className="ring-transparent cursor-pointer border-neutral-300 text-neutral-600 file:mr-4 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-colors"
          />
          <p className="text-xs text-neutral-500">
            Please upload your payment receipt (Image or PDF)
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}
