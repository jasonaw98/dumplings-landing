"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CheckoutForm() {
  const { items, totalPrice } = useCart();
  const simpleItems = items.map((item) => `${item.name} x ${item.quantity}`);
  const router = useRouter();

  async function submitReceipt(formData: FormData) {
    const orderDetails = {
      items: items,
      totalPrice: totalPrice,
      firstName: formData.get("firstName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      address: formData.get("address")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      zip: formData.get("zip")?.toString() || "",
      orderDate: new Date().toISOString(),
    };
    sessionStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalPrice,
        mobile: orderDetails.phone,
        email: orderDetails.email,
        name: orderDetails.firstName,
        origin: window.location.origin,
      }),
    });

    const { paymentUrl } = await res.json();
    window.location.href = paymentUrl;

    // toast.promise(
    //   new Promise((resolve, reject) => {
    //     fetch("/api/sendMail", {
    //       method: "POST",
    //       body: formData,
    //     }).then(async (res) => {
    //       if (!res.ok) {
    //         throw new Error("Failed to send email");
    //       }
    //       resolve(res);
    //       router.push("/checkout/success");
    //     });
    //   }),
    //   {
    //     loading: "Sending Order...",
    //     success: "Order sent successfully",
    //     error: (err) => err.message || "Order failed",
    //   },
    // );
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
              placeholder="+60 12-345 6789"
              required
            />
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
              <Label htmlFor="firstName">Full Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
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

      {/* Referral code (optional) */}
      {/* <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Referral</h3>
        <div className="grid gap-2">
          <Label htmlFor="referralCode" className="text-neutral-600">
            Referral code <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="referralCode"
            name="referralCode"
            placeholder="e.g. FRIEND10"
            className="max-w-xs"
          />
        </div>
      </div> */}

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Payment</h3>
        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm">
          ⚠️ Payment integration coming soon. You won't be charged yet.
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
      >
        Place Order
      </Button>
    </form>
  );
}
