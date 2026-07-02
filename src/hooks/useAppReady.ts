"use client";

import { useEffect, useState } from "react";

const MIN_DURATION_MS = 1200;

/**
 * Gates the loading screen: becomes true once fonts + all page resources
 * have finished loading AND a minimum display duration has elapsed. The
 * minimum keeps the loader from flashing for a few ms on fast connections —
 * it reads as an intentional intro, not a stall — while still never
 * blocking longer than the page actually needs to become ready.
 */
export function useAppReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const start = Date.now();

    const fontsReady = "fonts" in document ? document.fonts.ready : Promise.resolve();
    const windowLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));

    Promise.all([fontsReady, windowLoaded]).then(() => {
      if (!mounted) return;
      const remaining = Math.max(0, MIN_DURATION_MS - (Date.now() - start));
      setTimeout(() => {
        if (mounted) setReady(true);
      }, remaining);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return ready;
}
