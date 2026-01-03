"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@dumplingbois.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+60 12-345 6789"
              required
            />
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Delivery Address</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Jason" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Tan" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Dumpling Lane" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Kuala Lumpur" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">Postcode</Label>
              <Input id="zip" placeholder="50000" required />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm">
          ⚠️ Payment integration coming soon. You won't be charged yet.
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
