"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { MenuItemCard } from "@/components/menu-item-card";
import { useCart } from "@/lib/cart-store";
import { menuItems } from "@/lib/menu-data";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems;
    const query = searchQuery.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredItems.map((item) => item.category)));
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8">
        <h1 className="mb-6 text-center text-3xl font-semibold text-foreground">
          {"Today's Menu"}
        </h1>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-card py-3 pl-12 pr-4 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          categories.map((category) => (
            <section key={category} className="mb-10">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                {category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
              </div>
            </section>
          ))
        ) : (
          <p className="py-20 text-center text-lg text-muted-foreground">
            No items found matching your search.
          </p>
        )}
      </main>

      {/* Floating Cart Button */}
      {count > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Go to Cart</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-card text-sm font-bold text-primary">
            {count}
          </span>
        </Link>
      )}
    </div>
  );
}
