"use client";

import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Badge } from "./ui/badge";
import DropdownHeroUi from "./ui/DropdownMenu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartData } = useContext(CartContext);
  const session = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0 text-2xl font-semibold text-white sm:text-3xl">
            <span className="text-teal-600">P</span>rime<span className="text-teal-600">P</span>ick
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-2 text-white">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="rounded-xl px-5 py-2 transition-colors duration-200 hover:bg-gray-700"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center space-x-6 md:flex shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex cursor-pointer items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>

            <Link href="/wishlist" className="transition-opacity hover:opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Link>

            <div className="flex gap-2">
              {session.status === "authenticated" && (
                <span className="text-white">Hi {session.data?.user.name}</span>
              )}
              <DropdownHeroUi />
            </div>

            <div className="relative">
              <Link href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0Z"
                  />
                </svg>

                {(cartData?.numOfCartItems ?? 0) > 0 ? (
                  <Badge className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full bg-teal-600 px-1 font-mono tabular-nums">
                    {cartData?.numOfCartItems}
                  </Badge>
                ) : null}
              </Link>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex cursor-pointer items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white transition-colors hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          className={`${isMobileMenuOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 md:hidden`}
        >
          <div className="rounded-2xl border border-white/10 bg-gray-900/95 p-4 text-white shadow-lg">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-gray-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="transition-opacity hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Link>

                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="relative transition-opacity hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0Z"
                    />
                  </svg>

                  {(cartData?.numOfCartItems ?? 0) > 0 ? (
                    <Badge className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full bg-teal-600 px-1 font-mono tabular-nums">
                      {cartData?.numOfCartItems}
                    </Badge>
                  ) : null}
                </Link>
              </div>

              <DropdownHeroUi />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
