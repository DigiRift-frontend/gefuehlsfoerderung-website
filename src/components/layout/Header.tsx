"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Über Ewelina", href: "/ueber-ewelina" },
  { name: "Kontakt", href: "/kontakt" },
];

const quizLink = { name: "Kostenloser Test", href: "/quiz" };

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen, mounted } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-lavender/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl text-lavender-dark leading-none">
                Gefühlsförderung
              </span>
              <span className="text-[10px] sm:text-xs text-charcoal-lighter tracking-wider uppercase">
                von Ewelina Gawlik
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal-light hover:text-lavender-dark transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={quizLink.href}
              className="inline-flex items-center gap-1.5 bg-lavender text-white hover:bg-lavender-dark px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {quizLink.name}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Suchen"
              className="p-2 text-charcoal-light hover:text-lavender-dark transition-colors rounded-full hover:bg-lavender/10"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-charcoal-light hover:text-lavender-dark transition-colors rounded-full hover:bg-lavender/10"
              aria-label="Warenkorb"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sage text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-charcoal-light hover:text-lavender-dark transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menü"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-charcoal hover:bg-lavender/10 rounded-2xl transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={quizLink.href}
              className="mx-4 mt-2 flex items-center justify-center gap-1.5 bg-lavender text-white hover:bg-lavender-dark px-4 py-3 rounded-2xl text-sm font-semibold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {quizLink.name}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
