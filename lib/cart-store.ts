"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
}

let cartStore: CartStore = { items: [] };
let listeners: Set<() => void> = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getCartSnapshot(): CartItem[] {
  return cartStore.items;
}

export function subscribeToCart(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const existing = cartStore.items.find((i) => i.id === item.id);
  if (existing) {
    cartStore = {
      items: cartStore.items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    };
  } else {
    cartStore = {
      items: [...cartStore.items, { ...item, quantity: 1 }],
    };
  }
  emitChange();
}

export function removeFromCart(id: number) {
  cartStore = {
    items: cartStore.items.filter((i) => i.id !== id),
  };
  emitChange();
}

export function increaseQuantity(id: number) {
  cartStore = {
    items: cartStore.items.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ),
  };
  emitChange();
}

export function decreaseQuantity(id: number) {
  const item = cartStore.items.find((i) => i.id === id);
  if (item && item.quantity <= 1) {
    removeFromCart(id);
  } else {
    cartStore = {
      items: cartStore.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      ),
    };
    emitChange();
  }
}

export function clearCart() {
  cartStore = { items: [] };
  emitChange();
}

export function getCartTotal(): number {
  return cartStore.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function getCartCount(): number {
  return cartStore.items.reduce((count, item) => count + item.quantity, 0);
}

export function useCart() {
  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => []
  );

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total: items.reduce((t, i) => t + i.price * i.quantity, 0),
    count: items.reduce((c, i) => c + i.quantity, 0),
  };
}
