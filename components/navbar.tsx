"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function Navbar() {
  const { count } = useCart();

  return (
    <nav className="bg-secondary px-6 py-4 md:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-secondary-foreground">
          FoodCart
        </Link>
        <ul className="flex items-center gap-6 md:gap-8">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-secondary-foreground/90 transition-colors hover:text-accent"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              className="text-sm font-medium text-secondary-foreground/90 transition-colors hover:text-accent"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 text-sm font-medium text-secondary-foreground/90 transition-colors hover:text-accent"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
