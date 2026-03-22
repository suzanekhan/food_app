"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function PaymentPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const tax = Math.round(total * 0.05);
  const deliveryFee = items.length > 0 ? 50 : 0;
  const grandTotal = total + tax + deliveryFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    router.push("/success");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted px-4">
        <div className="text-center">
          <p className="mb-4 text-lg text-muted-foreground">
            Your cart is empty
          </p>
          <Link
            href="/menu"
            className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted px-4 py-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row">
        {/* Order Summary */}
        <div className="flex-1 rounded-2xl bg-card p-8 shadow-lg">
          <Link
            href="/cart"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h2 className="mb-6 text-xl font-semibold text-card-foreground">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-card-foreground"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4 border-border" />

          <div className="flex flex-col gap-2 text-card-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
          </div>

          <hr className="my-4 border-border" />

          <div className="flex justify-between text-xl font-semibold text-card-foreground">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="flex-1 rounded-2xl bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-card-foreground">
            Payment
          </h2>

          <div className="mb-6 flex items-center gap-3 rounded-lg bg-muted p-4">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
            <span className="text-muted-foreground">
              Secure payment processing
            </span>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full rounded-lg bg-primary py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
          >
            {isProcessing
              ? "Processing..."
              : `Pay ${formatCurrency(grandTotal)}`}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            This is a demo payment. No real charges will be made.
          </p>
        </div>
      </div>
    </div>
  );
}
