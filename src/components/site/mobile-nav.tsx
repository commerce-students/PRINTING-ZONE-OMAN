"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, verified, whatsapp } from "@/lib/site";

/**
 * Mobile navigation: a full-height panel with large touch targets, accordion
 * product groups, quick contact actions and a search entry point.
 * Escape closes it, background scroll is locked while open, and focus moves
 * into the panel on open and back to the trigger on close.
 */
export function MobileNav({ cartCount }: { cartCount: number }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Products");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const shopPhone = verified.phones[0];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-ghost h-11 w-11 p-0 xl:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Open menu</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M3 5.5h14M3 10h14M3 14.5h14" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div
            className="absolute inset-0 bg-ink-950/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(24rem,92vw)] flex-col bg-paper-50 shadow-2xl animate-fade-in"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="plate-label">Menu</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="btn btn-ghost h-11 w-11 p-0"
              >
                <span className="sr-only">Close menu</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                  <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="block rounded-sm px-2 py-3 text-base font-semibold text-ink-900 hover:bg-paper-200">
                    Home
                  </Link>
                </li>
                {nav.map((item) => {
                  const hasMenu = "columns" in item && item.columns;
                  if (!hasMenu) {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-sm px-2 py-3 text-base font-semibold text-ink-900 hover:bg-paper-200"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const isExpanded = expanded === item.label;
                  return (
                    <li key={item.href} className="rounded-sm">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className="flex-1 rounded-sm px-2 py-3 text-base font-semibold text-ink-900 hover:bg-paper-200"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : item.label)}
                          aria-expanded={isExpanded}
                          className="btn btn-ghost h-11 w-11 p-0"
                        >
                          <span className="sr-only">
                            {isExpanded ? "Hide" : "Show"} {item.label} categories
                          </span>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 12 12"
                            className={`h-3 w-3 fill-current transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          >
                            <path d="M6 8.5 1.5 4h9L6 8.5Z" />
                          </svg>
                        </button>
                      </div>
                      {isExpanded ? (
                        <div className="mb-2 ml-2 border-l border-line pl-3">
                          {item.columns.map((column) => (
                            <div key={column.title} className="py-2">
                              <p className="plate-label mb-1">{column.title}</p>
                              <ul>
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="block rounded-sm px-2 py-2 text-sm text-ink-700 hover:bg-paper-200 hover:text-ink-950"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <form action="/products" method="get" role="search" className="mt-4">
                <label htmlFor="mobile-search" className="label mb-1 block">
                  Search the catalogue
                </label>
                <div className="flex gap-2">
                  <input
                    id="mobile-search"
                    name="q"
                    type="search"
                    placeholder="e.g. flyers"
                    className="input"
                  />
                  <button type="submit" className="btn btn-primary">
                    Go
                  </button>
                </div>
              </form>
            </nav>

            <div className="border-t border-line bg-paper-100 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <Link href="/quote" className="btn btn-primary btn-sm flex-1">
                  Request a quote
                </Link>
                <Link href="/cart" className="btn btn-secondary btn-sm flex-1">
                  Cart ({cartCount})
                </Link>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <a href={`tel:${shopPhone.tel}`} className="block text-ink-800">
                  Call the shop · <span className="mono">{shopPhone.display}</span>
                </a>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-ink-800"
                >
                  Message on WhatsApp
                </a>
              </div>
              <p className="plate-label mt-3">Printing Zone Oman · Seeb, Muscat</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
