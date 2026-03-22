"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/lib/menu-data";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <p className="text-lg font-medium text-card-foreground">
          {formatCurrency(item.price)}
        </p>

        <div className="mt-2 flex h-10 items-center justify-center">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-muted px-2 py-1">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-card transition-colors hover:bg-border"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[24px] text-center font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-card transition-colors hover:bg-border"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
