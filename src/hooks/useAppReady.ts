"use client";

import { useEffect, useState } from "react";

const MIN_DURATION_MS = 7000;

/**
 * Gates the loading screen: becomes true once fonts + all page resources
 * have finished loading AND a minimum display duration has elapsed. The
 * minimum is intentionally long (~7s, within the requested 5-10s range) so
 * the whole landing page — Hero's layout measurements, images, fonts — has
 * time to fully settle behind it before it's revealed, rather than just
 * covering the bare minimum flash of an unstyled page.
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
