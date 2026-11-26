"use client";
import { useEffect } from "react";
import Lenis from "lenis";
let lenis: Lenis | null = null;
export function scrollToTarget(id: string) {
  const el = id === "top" ? null : document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) lenis.scrollTo(el ?? 0, { offset: -8, duration: reduce ? 0 : 1.3 });
  else (el ?? document.body).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
export const lockScroll = (on: boolean) => { on ? lenis?.stop() : lenis?.start(); document.documentElement.style.overflow = on ? "hidden" : ""; };
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = requestAnimationFrame(function loop(t) { lenis?.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}
