"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AuthCardProps {
  /** Which side the colored/illustration panel sits on. "signup" = left, "login" = right — mirrors the reference layout. */
  side: "left" | "right";
  eyebrow: string;
  heading: string;
  subtext: string;
  illustrationSrc: string;
  illustrationAlt: string;
  children: ReactNode;
}

// Coordinates here are local to the colored panel's own box (which is
// already 45% of the card width) — so "100" means "flush with the panel's
// own edge" (i.e. the real 45% line on the card), not "100% of the card".
// Using anything less than 100 as the base was the earlier bug: it drew the
// curve well inside the panel, so the panel's own box (and anything
// positioned relative to its edge, like the illustration's bleed) no
// longer lined up with where the color actually stopped.
// Base sits flush at 100, and bulges out to 108 (a modest 8% of the panel's
// width past its own edge) near the top (y=30) — one smooth arc, not a
// symmetric double-bulge ("curly bracket"). Keep this bulge subtle — much
// more than ~8-10% and the peak reaches far enough right to paint over the
// form panel's own input fields.
const WAVE_LEFT = "M0,0 H100 C102,5 108,15 108,30 C108,45 100,75 100,100 H0 Z";
const WAVE_RIGHT = "M100,0 H0 C-2,5 -8,15 -8,30 C-8,45 0,75 0,100 H100 Z";

/**
 * Two-panel auth card: a solid brand-gradient panel (welcome copy, an
 * illustration) curves into a plain surface panel holding the form.
 * The curve is one SVG path stretched to fill the card (`preserveAspectRatio="none"`,
 * same technique as the decorative SVGs elsewhere in this codebase) rather
 * than a CSS clip-path, so it stays a smooth wave at any card size. The SVG
 * needs `overflow: visible` — the wave's peak (118 / -18) intentionally
 * draws past the panel's own box, and SVG clips to its own viewport by
 * default.
 *
 * The heading block sits near the top of the panel (not vertically
 * centered) and the illustration is pinned to the panel's bottom corner
 * with margin, fully inside the color — independent of each other, so
 * they don't compete for the same vertical space.
 *
 * The colored panel gets `isolate` (creates its own stacking context) so its
 * `-z-10` wave/gradient background layers stay scoped to this panel — without
 * it, an unscoped negative z-index can bubble up to whatever ancestor
 * happens to be the nearest real stacking context (often the page root),
 * which is a common cause of a decorative background silently rendering
 * behind unrelated content instead of just behind its own siblings.
 *
 * Both panels slide in from their own outer edge (colored panel from
 * whichever side it sits on, form panel from the opposite side) with a
 * fade + blur, on mount — no scroll trigger, just a `requestAnimationFrame`
 * flip like Hero/Navbar's own entrance. Since /login and /signup are
 * separate routes, navigating between them unmounts one AuthCard and
 * mounts the other fresh, so this same entrance plays again — that's what
 * gives the blur/slide transition between the two pages instead of an
 * instant swap.
 */
export function AuthCard({ side, eyebrow, heading, subtext, illustrationSrc, illustrationAlt, children }: AuthCardProps) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  const fromColorSide = side === "left" ? -40 : 40;
  const fromFormSide = -fromColorSide;
  const enterStyle = (fromX: number, delayMs = 0): React.CSSProperties => ({
    transform: entered ? "translateX(0)" : `translateX(${fromX}px)`,
    opacity: entered ? 1 : 0,
    filter: entered ? "blur(0px)" : "blur(6px)",
    transition: reduced
      ? undefined
      : `transform .5s cubic-bezier(.22,1,.36,1) ${delayMs}ms, opacity .5s ease ${delayMs}ms, filter .5s ease ${delayMs}ms`,
  });

  return (
    <div className="relative mx-auto min-h-[600px] w-full max-w-[980px] overflow-hidden rounded-[32px] bg-surface shadow-[0_30px_70px_rgba(14,19,32,.16)] max-[760px]:min-h-0">
      {/* Colored panel + its wave background, absolutely laid over one half */}
      <div
        style={enterStyle(fromColorSide)}
        className={`absolute inset-y-0 isolate flex w-full flex-col items-center justify-start px-10 pb-12 pt-14 text-center text-white max-[760px]:relative max-[760px]:inset-auto max-[760px]:w-full max-[760px]:px-8 max-[760px]:py-10 min-[761px]:w-[45%] ${
          side === "left" ? "min-[761px]:left-0" : "min-[761px]:right-0"
        }`}
      >
        <svg
          className="absolute inset-0 -z-10 min-[761px]:block max-[760px]:hidden"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`authGrad-${side}`} x1="0" y1="0" x2="100" y2="100">
              <stop offset="0" stopColor="#1e2294" />
              <stop offset="1" stopColor="#4a52c9" />
            </linearGradient>
          </defs>
          <path d={side === "left" ? WAVE_LEFT : WAVE_RIGHT} fill={`url(#authGrad-${side})`} />
        </svg>
        <div className="absolute inset-0 -z-10 bg-gradient-brand min-[761px]:hidden" />

        <div className="max-w-[280px]">
          <span className="text-xs font-medium uppercase tracking-[.12em] text-white/70">{eyebrow}</span>
          <h1 className="m-0 mt-3 font-display text-[32px] font-semibold leading-[1.2]">{heading}</h1>
          <p className="m-0 mt-3 text-sm leading-relaxed text-white/75">{subtext}</p>
        </div>

        {/* Centered horizontally under the heading text, pinned near the panel's bottom, fully inside the color. */}
        <div className="max-[760px]:relative max-[760px]:mx-auto max-[760px]:mt-8 max-[760px]:w-[280px] min-[761px]:absolute min-[761px]:bottom-8 min-[761px]:left-1/2 min-[761px]:w-[320px] min-[761px]:-translate-x-1/2">
          <Image
            src={illustrationSrc}
            alt={illustrationAlt}
            width={320}
            height={262}
            className="h-auto w-full drop-shadow-[0_16px_30px_rgba(14,19,32,.25)]"
            priority
          />
        </div>
      </div>

      {/* Form panel */}
      <div
        style={enterStyle(fromFormSide, 80)}
        className={`relative flex w-full flex-col justify-center px-10 py-12 max-[760px]:static max-[760px]:w-full max-[760px]:px-8 max-[760px]:py-10 min-[761px]:absolute min-[761px]:inset-y-0 min-[761px]:w-[55%] ${
          side === "left" ? "min-[761px]:right-0" : "min-[761px]:left-0"
        }`}
      >
        <div className="mx-auto w-full max-w-[300px]">{children}</div>
      </div>
    </div>
  );
}
