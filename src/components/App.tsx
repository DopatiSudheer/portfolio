"use client";
import { useEffect } from "react";
import { SmoothScroll } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

export default function App() {
  useEffect(() => { // global reveal observer: animates once
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    const scan = () => document.querySelectorAll(".rv:not(.is-in),.rv-mask:not(.is-in)").forEach((n) => io.observe(n));
    scan(); const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
