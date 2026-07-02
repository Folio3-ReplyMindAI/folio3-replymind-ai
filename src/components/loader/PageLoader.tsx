"use client";

import { useEffect, useState } from "react";
import { useAppReady } from "@/src/hooks/useAppReady";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

const EXIT_DURATION_MS = 750;

/**
 * Full-screen splash shown while the rest of the app mounts and settles
 * behind it (fonts, layout measurements like Hero's scaleJourney, etc. all
 * run normally underneath — they're just covered, not deferred). No
 * wordmark here on purpose — it's an abstract mark (a spinning brand-
 * gradient arc) rather than a text logo, so it reads as a loading screen
 * rather than a second "hero" moment.
 *
 * Exit is a single upward slide (curtain-style) once useAppReady() flips,
 * so the reveal is one smooth motion instead of a fade over a half-loaded
 * page — the whole point of gating on readiness first.
 */
export function PageLoader() {
  const ready = useAppReady();
  const reduced = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setExiting(true), reduced ? 0 : 260);
    return () => clearTimeout(t);
  }, [ready, reduced]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => setGone(true), reduced ? 0 : EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, reduced]);

  useEffect(() => {
    document.documentElement.style.overflow = gone ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
      style={{
        transform: exiting && !reduced ? "translateY(-100%)" : "translateY(0)",
        opacity: exiting && reduced ? 0 : 1,
        pointerEvents: exiting ? "none" : "auto",
        transition: reduced
          ? "opacity .25s ease"
          : `transform ${EXIT_DURATION_MS}ms cubic-bezier(.65,0,.35,1)`,
      }}
    >
      <svg
        width={84}
        height={84}
        viewBox="0 0 84 84"
        className={reduced ? undefined : "animate-spin"}
        style={{ animationDuration: "1.1s" }}
      >
        <defs>
          <linearGradient id="loaderGrad" x1="0" y1="0" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1e2294" />
            <stop offset="1" stopColor="#8b90de" />
          </linearGradient>
        </defs>
        <circle cx="42" cy="42" r="36" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
        <circle
          cx="42"
          cy="42"
          r="36"
          fill="none"
          stroke="url(#loaderGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="150 300"
        />
      </svg>

      <div className="mt-7 flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[.12em] text-text-on-dark-muted">
        Loading your inbox
        <span className="h-1 w-1 animate-rm-dot rounded-full bg-text-on-dark-muted" />
        <span className="h-1 w-1 animate-rm-dot rounded-full bg-text-on-dark-muted [animation-delay:.2s]" />
        <span className="h-1 w-1 animate-rm-dot rounded-full bg-text-on-dark-muted [animation-delay:.4s]" />
      </div>
    </div>
  );
}
