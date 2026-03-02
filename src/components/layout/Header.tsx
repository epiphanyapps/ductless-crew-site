"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-[var(--color-navy)] flex items-center justify-center">
              <span className="text-white font-bold text-xl">DC</span>
            </div>
            <span className="text-xl font-bold text-[var(--color-navy)]">
              Ductless Crew
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-[var(--color-navy)] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:929-543-5995"
              className="text-[var(--color-navy)] font-semibold"
            >
              929-543-5995
            </a>
            <Link
              href="/contact"
              className="bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Request a Service
            </Link>
          </div>

          {/* Mobile: Phone + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:929-543-5995"
              className="p-2 text-[var(--color-orange)]"
              aria-label="Call us"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-[var(--color-navy)] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:929-543-5995"
                className="text-[var(--color-navy)] font-semibold"
              >
                929-543-5995
              </a>
              <Link
                href="/contact"
                className="bg-[var(--color-orange)] text-white px-5 py-2.5 rounded-lg font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Service
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
