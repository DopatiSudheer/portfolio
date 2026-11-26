"use client";
import { useEffect, useRef, useState, RefObject } from "react";
export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function useInView<T extends Element>(opts: IntersectionObserverInit = { threshold: 0.2 }, once = true): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null); const [on, set] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); if (once) io.disconnect(); } else if (!once) set(false); }, opts);
    io.observe(el); return () => io.disconnect(); // eslint-disable-next-line
  }, []);
  return [ref, on];
}
/** 0..1 progress of an element through the viewport (top hits 70% → bottom hits 50%). */
export function useScrollProgress<T extends HTMLElement>(): [RefObject<T | null>, number] {
  const ref = useRef<T>(null); const [p, setP] = useState(0);
  useEffect(() => { let raf = 0;
    const tick = () => { raf = 0; const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(), vh = innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.7 - r.top) / (r.height + vh * 0.2)))); };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    on(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return [ref, p];
}
