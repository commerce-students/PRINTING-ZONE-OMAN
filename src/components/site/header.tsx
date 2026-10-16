"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { nav, verified, whatsapp } from "@/lib/site";

export function Header({ cartCount }: { cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const shopPhone = verified.phones[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip — verified contact details only */}
      <div className="hidden bg-ink-950 text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="text-white/70">
            Muscat · Seeb · Al Maabilah North — commercial printing, publishing &amp; packaging
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${shopPhone.tel}`} className="text-white/85 hover:text-white">
              <span className="mono">{shopPhone.display}</span>
              <span className="ml-2 text-white/50">{shopPhone.label}</span>
            </a>
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div
        className={[
          "border-b bg-paper-50/95 backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-paper-50/85",
          scrolled ? "border-line shadow-[0_10px_30px_-24px_rgba(6,21,35,0.5)]" : "border-line/70",
        ].join(" ")}
      >
        <div className="container-page">
          <div
            className={[
              "flex items-center justify-between gap-4 transition-all duration-200",
              scrolled ? "h-16" : "h-20",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <Logo priority className="shrink-0" height={scrolled ? 38 : 44} />
            </div>

            {/* Desktop navigation with a Products mega menu */}
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  const hasMenu = "columns" in item && item.columns;
                  return (
                    <li
                      key={item.href}
                      className={hasMenu ? "group relative" : "relative"}
                    >
                      <Link
                        href={item.href}
                        aria-haspopup={hasMenu ? "true" : undefined}
                        className={[
                          "inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-semibold transition-colors",
                          active ? "text-ink-950" : "text-ink-700 hover:text-ink-950",
                        ].join(" ")}
                        style={active ? { textDecorationLine: "underline", textUnderlineOffset: "6px", textDecorationThickness: "2px", textDecorationColor: "var(--color-brand-green)" } : undefined}
                      >
                        {item.label}
                        {hasMenu ? (
                          <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-current opacity-60">
                            <path d="M6 8.5 1.5 4h9L6 8.5Z" />
                          </svg>
                        ) : null}
                      </Link>

                      {hasMenu ? (
                        <div className="pointer-events-none invisible absolute left-0 top-full z-50 w-[44rem] max-w-[calc(100vw-2rem)] pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                          <div className="card overflow-hidden shadow-[0_30px_60px_-30px_rgba(6,21,35,0.45)]">
                            <div className="grid grid-cols-3 gap-6 p-6">
                              {item.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="plate-label mb-3">{column.title}</p>
                                  <ul className="space-y-1">
                                    {column.links.map((link) => (
                                      <li key={link.href}>
                                        <Link
                                          href={link.href}
                                          className="block rounded-sm px-2 py-1.5 text-sm text-ink-800 transition-colors hover:bg-paper-100 hover:text-ink-950"
                                        >
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper-100 px-6 py-3">
                              <p className="text-sm text-ink-600">
                                Every product is quoted to your exact specification.
                              </p>
                              <div className="flex items-center gap-2">
                                <Link href="/products" className="btn btn-secondary btn-sm">
                                  Browse all products
                                </Link>
                                <Link href="/quote" className="btn btn-primary btn-sm">
                                  Request a quote
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                aria-expanded={searchOpen}
                aria-controls="header-search"
                className="btn btn-ghost h-11 w-11 p-0"
              >
                <span className="sr-only">Search products</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <path d="m13 13 4 4" strokeLinecap="round" />
                </svg>
              </button>

              <Link href="/cart" className="btn btn-ghost relative h-11 gap-2 px-3">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
                  <path d="M3 4h2l2 9h8l2-6H6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="16.5" r="1.25" />
                  <circle cx="15" cy="16.5" r="1.25" />
                </svg>
                <span className="sr-only">
                  Cart, {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "mono absolute -right-0.5 -top-0.5 min-w-5 rounded-full px-1 text-center text-[0.6875rem] font-semibold leading-5",
                    cartCount > 0 ? "bg-brand-green text-ink-950" : "bg-paper-300 text-ink-600",
                  ].join(" ")}
                >
                  {cartCount}
                </span>
              </Link>

              <Link href="/quote" className="btn btn-primary hidden md:inline-flex">
                Request a quote
              </Link>

              <MobileNav cartCount={cartCount} />
            </div>
          </div>
        </div>

        {/* Search panel */}
        {searchOpen ? (
          <div id="header-search" className="border-t border-line bg-paper-100 animate-fade-in">
            <div className="container-page py-4">
              <form action="/products" method="get" role="search" className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="header-search-input" className="sr-only">
                  Search products and services
                </label>
                <input
                  id="header-search-input"
                  name="q"
                  type="search"
                  autoFocus
                  placeholder="Search for business cards, banners, packaging…"
                  className="input flex-1"
                />
                <button type="submit" className="btn btn-primary">
                  Search catalogue
                </button>
              </form>
              <p className="hint mt-2">
                Popular: business cards · roll-up banners · folding cartons · printed cups
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="colorbar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </header>
  );
}
