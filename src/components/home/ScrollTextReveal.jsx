"use client";
import { useEffect, useRef } from "react";

const PHRASES = ["we listen", "we imagine", "we create", "beautiful things"];
const LARGE_SCALE = 3.2;   // entering phrase starts this big
const SMALL_SCALE = 0.62;  // previous phrases shrink to this
const TRAVEL = 600;        // px of internal scroll before section releases

export default function ScrollTextReveal({
  phrases = PHRASES,
  height = "100vh",
  background = "#f0eeeb",
  textColor = "#0d0d0d",
  dropCount = 38,
  onComplete,
}) {
  const outerRef = useRef(null);
  const canvasRef = useRef(null);
  const phraseRefs = useRef([]);
  const scrollState = useRef({ current: 0, target: 0 });
  const completedRef = useRef(false);
  const N = phrases.length;

  /* ── canvas water drops ─────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const outer = outerRef.current;
    if (!canvas || !outer) return;
    const ctx = canvas.getContext("2d");

    function resize() { canvas.width = outer.offsetWidth; canvas.height = outer.offsetHeight; }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(outer);

    const rand = (a, b) => a + Math.random() * (b - a);
    class Drop {
      constructor(init) { this.reset(init); }
      reset(init) {
        this.x = rand(0.05, 0.95); this.y = init ? rand(0, 1) : -0.05;
        this.r = rand(3, 18); this.vy = rand(0.0003, 0.0009); this.vx = rand(-0.0001, 0.0001);
        this.alpha = rand(0.2, 0.65); this.wb = rand(0, Math.PI * 2); this.ws = rand(0.01, 0.04);
        this.s = Math.random() < 0.3 ? "ring" : Math.random() < 0.5 ? "drop" : "oval";
      }
      update() {
        this.y += this.vy; this.x += this.vx + Math.sin(this.wb) * 0.0001; this.wb += this.ws;
        if (this.y > 1.08) this.reset(false);
      }
      draw() {
        const cw = canvas.width, ch = canvas.height, px = this.x * cw, py = this.y * ch;
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.strokeStyle = "rgba(84,129,90,0.3)"; ctx.lineWidth = 1.1;
        ctx.fillStyle = "rgba(84,129,90,0.08)";
        if (this.s === "ring") {
          ctx.beginPath(); ctx.arc(px, py, this.r, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(px + this.r * 0.25, py + this.r * 0.25, this.r * 0.17, this.r * 0.11, -0.5, 0, Math.PI * 2); ctx.stroke();
        } else if (this.s === "drop") {
          ctx.beginPath(); ctx.arc(px, py, this.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(px + this.r * 0.2, py - this.r * 0.2, this.r * 0.24, this.r * 0.14, -0.7, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.38)"; ctx.fill();
          const tl = this.r * rand(1.2, 2.4);
          ctx.beginPath(); ctx.moveTo(px, py + this.r); ctx.lineTo(px + this.r * 0.12, py + this.r + tl * 0.5); ctx.lineTo(px, py + this.r + tl);
          ctx.lineWidth = 0.8; ctx.stroke();
        } else {
          ctx.beginPath(); ctx.ellipse(px, py, this.r * 0.55, this.r, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
        ctx.restore();
      }
    }

    const drops = Array.from({ length: dropCount }, (_, i) => new Drop(true));
    let rafId;
    function tick() { ctx.clearRect(0, 0, canvas.width, canvas.height); drops.forEach(d => { d.update(); d.draw(); }); rafId = requestAnimationFrame(tick); }
    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [dropCount]);

  /* ── scroll + phrase animation ──────────────────────────── */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const s = scrollState.current;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function lerp(a, b, t) { return a + (b - a) * t; }

    function getBase() { return Math.max(28, Math.min(80, outer.offsetWidth * 0.075)); }

    function applyPhrases(progress) {
      const base = getBase();
      phraseRefs.current.forEach((el, i) => {
        if (!el) return;
        const slotStart = i / N;
        const slotEnd = (i + 1) / N;
        const lt = clamp((progress - slotStart) / (slotEnd - slotStart), 0, 1);

        // Not entered yet
        if (progress < slotStart) {
          el.style.opacity = "0";
          el.style.transform = `scale(${LARGE_SCALE}) translateY(20px)`;
          el.style.fontSize = base + "px";
          el.style.maxHeight = "0px";
          el.style.margin = "0";
          return;
        }

        // Entering: lt 0 → 0.5 = scale from LARGE→1
        const enterT = clamp(lt / 0.5, 0, 1);
        const eEnter = ease(enterT);
        let scale = lerp(LARGE_SCALE, 1, eEnter);
        let opacity = Math.min(1, enterT * 2);

        // Shrinking: when a later phrase starts entering, shrink this one
        if (i < N - 1) {
          const nextSlotStart = (i + 1) / N;
          const shrinkT = clamp((progress - nextSlotStart) / ((1 / N) * 0.5), 0, 1);
          if (shrinkT > 0) scale = lerp(1, SMALL_SCALE, ease(shrinkT));
        }

        el.style.opacity = String(opacity);
        el.style.transform = `scale(${scale})`;
        el.style.fontSize = base + "px";
        el.style.maxHeight = "1.2em";
        el.style.margin = i < N - 1 ? "0 0 4px 0" : "0";
      });
    }

    function onWheel(e) {
      e.preventDefault();
      s.target = clamp(s.target + e.deltaY * 0.65, 0, TRAVEL);
    }
    let ty0 = 0;
    function onTS(e) { ty0 = e.touches[0].clientY; }
    function onTM(e) {
      const dy = ty0 - e.touches[0].clientY;
      ty0 = e.touches[0].clientY;
      s.target = clamp(s.target + dy, 0, TRAVEL);
    }

    outer.addEventListener("wheel", onWheel, { passive: false });
    outer.addEventListener("touchstart", onTS, { passive: true });
    outer.addEventListener("touchmove", onTM, { passive: true });

    let rafId;
    function tick() {
      s.current += (s.target - s.current) * 0.09;
      const prog = clamp(s.current / TRAVEL, 0, 1);
      applyPhrases(prog);
      if (prog >= 1 && !completedRef.current) { completedRef.current = true; onComplete?.(); }
      if (prog < 1) completedRef.current = false;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      outer.removeEventListener("wheel", onWheel);
      outer.removeEventListener("touchstart", onTS);
      outer.removeEventListener("touchmove", onTM);
    };
  }, [N, onComplete]);

  return (
    <section
      ref={outerRef}
      style={{
        position: "relative",
        width: "100%",
        height,
        background,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Water drop canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Stacking phrases */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 24px",
        }}
      >
        {phrases.map((phrase, i) => (
          <span
            key={phrase}
            ref={el => (phraseRefs.current[i] = el)}
            style={{
              display: "block",
              fontWeight: 900,
              color: textColor,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              textAlign: "center",
              transformOrigin: "center center",
              willChange: "transform, opacity",
              whiteSpace: "nowrap",
              fontFamily: "'Climate Crisis', sans-serif",
              opacity: 0,
              transform: `scale(${LARGE_SCALE}) translateY(20px)`,
              maxHeight: 0,
              overflow: "visible",
            }}
          >
            {phrase}
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--color-text-muted, #727970)", display: "flex", alignItems: "center", gap: 6,
        }}
      >
        scroll
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1L4 6L7 1" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}