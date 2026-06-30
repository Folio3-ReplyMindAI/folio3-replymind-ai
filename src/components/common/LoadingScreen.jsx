"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const INFLATE_TEXT = "ReplyMind";

const PHASES = [
  {
    label: "Initializing",
    copy: "Preparing your unified AI message workspace.",
  },
  {
    label: "Aligning",
    copy: "Connecting your channels, context, and priorities.",
  },
  {
    label: "Launching",
    copy: "Your new inbox experience is almost ready.",
  },
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let completeTimer;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          completeTimer = window.setTimeout(() => onComplete?.(), 220);
          return 100;
        }

        return Math.min(current + 2, 100);
      });
    }, 32);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const activePhase = progress < 35 ? PHASES[0] : progress < 70 ? PHASES[1] : PHASES[2];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] grid min-h-svh place-items-center overflow-hidden bg-[#f8faf3] px-6 text-[#191c18]"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{
        clipPath: "inset(0% 0% 100% 0%)",
        transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="absolute inset-0 loader-field" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(84,129,90,0.15),transparent)]" />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 h-[2px] origin-center bg-accent shadow-[0_0_28px_rgba(84,129,90,0.7)]"
        initial={{ opacity: 0, scaleX: 0.72 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ y: "-100vh", opacity: [1, 1, 0] }}
        transition={{
          duration: 1.05,
          ease: [0.76, 0, 0.24, 1],
          opacity: { duration: 0.92, times: [0, 0.78, 1] },
        }}
      />
      <motion.div
        className="absolute h-[340px] w-[340px] rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [0.88, 1.15, 0.88], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ y: -92, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative loader-logo-stage">
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-accent text-accent-on shadow-[0_24px_70px_rgba(84,129,90,0.3)]"
            animate={{ rotate: [-2, 2, -2], scale: [1, 1.04, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-px rounded-[1.65rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_48%,rgba(84,129,90,0.2))]" />
            <span className="relative material-symbols-outlined msym-fill text-[44px] text-accent-on">psychology</span>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-accent/50"
            animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-accent/30"
            animate={{ scale: [1, 1.95], opacity: [0.25, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.35 }}
          />
        </div>

        <h1 className="mt-9 flex gap-[0.04em] font-display text-[44px] font-bold leading-none tracking-normal md:text-[68px]">
          {INFLATE_TEXT.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === "M" ? <span className="text-accent">M</span> : char}
            </span>
          ))}
        </h1>

        <p className="mt-4 max-w-xs text-center text-sm leading-6 text-text-secondary">
          {activePhase.copy}
        </p>

        <div className="relative mt-10 h-[3px] w-60 max-w-full overflow-hidden rounded-full bg-border/50">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_22px_rgba(84,129,90,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
          <div className="absolute inset-0 loader-shimmer" />
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-text-muted">
          {activePhase.label} {progress}%
        </p>
      </motion.div>
    </motion.div>
  );
}
