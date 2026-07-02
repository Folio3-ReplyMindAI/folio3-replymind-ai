"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useScrollNav } from "@/src/hooks/useScrollNav";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";
import { navLinks } from "@/src/lib/data/nav";
import { MenuIcon, CloseIcon } from "@/src/components/icons";

export function Navbar() {
  const scrolled = useScrollNav();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-[background,box-shadow,border-color] duration-200"
        style={{
          background: scrolled ? "rgba(255,255,255,.7)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(140%)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : undefined,
          boxShadow: scrolled ? "0 1px 3px rgba(14,19,32,.08)" : "none",
          borderBottom: scrolled ? "1px solid rgba(221,217,196,.6)" : "1px solid transparent",
          transform: entered ? "translateY(0)" : "translateY(-100%)",
          opacity: entered ? 1 : 0,
          transition: reduced
            ? "background .2s ease, box-shadow .2s ease, border-color .2s ease"
            : "background .2s ease, box-shadow .2s ease, border-color .2s ease, transform .55s cubic-bezier(.22,1,.36,1), opacity .55s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-6">
          <a
            href="#top"
            className="bg-gradient-brand bg-clip-text font-display text-[22px] font-bold tracking-[-0.02em] text-transparent no-underline"
          >
            ReplyMind
          </a>

          <div className="flex items-center gap-[30px] max-[620px]:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 max-[620px]:hidden">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary no-underline transition-colors hover:text-text-primary"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-[14px] bg-gradient-brand px-5 py-[11px] text-sm font-semibold text-white no-underline shadow-[0_8px_24px_rgba(30,34,148,.28)] transition-transform hover:-translate-y-px"
            >
              Start Free
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="hidden cursor-pointer border-none bg-transparent p-2 text-text-primary max-[620px]:inline-flex"
          >
            <MenuIcon width={26} height={26} strokeWidth="1.8" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-white/85 p-6 backdrop-blur-[20px] backdrop-saturate-[1.4]">
          <div className="flex h-[52px] items-center justify-between">
            <span className="bg-gradient-brand bg-clip-text font-display text-[22px] font-bold text-transparent">
              ReplyMind
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer border-none bg-transparent p-2 text-text-primary"
            >
              <CloseIcon width={26} height={26} strokeWidth="1.8" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3.5 font-display text-2xl font-semibold text-text-primary no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-auto rounded-[14px] border border-border p-4 text-center text-base font-semibold text-text-primary no-underline"
          >
            Log in
          </Link>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-3 rounded-[14px] bg-gradient-brand p-4 text-center text-base font-semibold text-white no-underline"
          >
            Start Free
          </Link>
        </div>
      )}
    </>
  );
}
