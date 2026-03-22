"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useCart } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart, total } =
    useCart();

  const tax = Math.round(total * 0.05);
  const deliveryFee = items.length > 0 ? 50 : 0;
  const grandTotal = total + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="mb-6 text-2xl font-semibold text-foreground">
              Your Cart
            </h1>

            {items.length > 0 ? (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm"
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-card-foreground">
                          {item.name}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-card-foreground">
                        {formatCurrency(item.price)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-muted transition-colors hover:bg-border"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[24px] text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-muted transition-colors hover:bg-border"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/50" />
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
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:w-80">
              <div className="sticky top-6 rounded-xl bg-card p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 text-card-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>

                  <hr className="my-2 border-border" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/payment"
                  className="mt-6 block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Proceed to Payment
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
