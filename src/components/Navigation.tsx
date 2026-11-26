"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget, lockScroll } from "@/lib/scroll";

const SECTION_IDS = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false), [active, setActive] = useState(""), [open, setOpen] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const bar = useRef<HTMLElement>(null), links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const on = () => { 
      setScrolled(scrollY > 40); 
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("--p", String(h > 0 ? scrollY / h : 0)); 
    };
    on(); 
    addEventListener("scroll", on, { passive: true }); 
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { 
      if (e.isIntersecting) {
        setActive(e.target.id);
      }
    }), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => { 
    const el = links.current[active]; 
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null); 
  }, [active, scrolled]);

  useEffect(() => { 
    lockScroll(open); 
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); 
    addEventListener("keydown", k); 
    return () => { 
      removeEventListener("keydown", k); 
      lockScroll(false); 
    }; 
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { 
    e.preventDefault(); 
    setOpen(false); 
    setTimeout(() => scrollToTarget(id), open ? 50 : 0); 
  };

  return (
    <header ref={bar} className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-bar" aria-hidden />
      <div className="nav-in">
        <a href="#top" onClick={go("top")} className="brand" aria-label={`${PROFILE.name}, back to top`}>
          <span className="mark">{PROFILE.initials}</span><span className="bname">{PROFILE.name}</span>
        </a>
        <nav aria-label="Primary" className="pill">
          {pill && <span className="ind" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} />}
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`} ref={(el) => { links.current[n.id] = el; }} onClick={go(n.id)} aria-current={active === n.id ? "true" : undefined} className={active === n.id ? "on" : ""}>{n.label}</a>)}
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </div>
      <div id="mobile-menu" className={`overlay ${open ? "open" : ""}`} aria-hidden={!open} inert={!open}>
        {NAV.map((n, i) => <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} style={{ ["--i" as string]: i }}><small>{String(i + 1).padStart(2, "0")}</small>{n.label}</a>)}
      </div>
      <style>{`
        .nav{position:fixed;inset:0 0 auto;z-index:50}
        .nav-bar{position:absolute;top:0;left:0;height:2px;width:100%;background:var(--ink);transform-origin:left;transform:scaleX(var(--p,0))}
        .nav-in{display:flex;align-items:center;justify-content:space-between;padding:18px var(--gutter)}
        .brand{display:flex;align-items:center;gap:12px;position:relative;z-index:61}
        .mark{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;font:600 12px var(--font-mono);box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .4s,color .4s,transform .8s var(--ease)}
        .scrolled .mark{background:var(--ink);color:#fff}.brand:hover .mark{transform:rotate(360deg)}
        .bname{font-weight:600;letter-spacing:-.02em;transition:opacity .4s}.scrolled .bname{opacity:0}
        .pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .4s,box-shadow .4s,backdrop-filter .4s}
        .scrolled .pill{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -12px rgba(0,0,0,.18)}
        .pill a{position:relative;z-index:1;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:500;transition:color .3s}
        .pill a.on{color:#fff}.ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease)}
        .menu-btn{display:none;height:42px;padding:0 20px;border-radius:999px;background:rgba(255,255,255,.8);box-shadow:inset 0 0 0 1px var(--line);font-weight:500;position:relative;z-index:61}
        .overlay{position:fixed;inset:0;background:var(--paper);display:flex;flex-direction:column;justify-content:center;gap:6px;padding:0 var(--gutter);clip-path:circle(0 at calc(100% - 60px) 40px);transition:clip-path .9s var(--ease);z-index:60}
        .overlay.open{clip-path:circle(150% at calc(100% - 60px) 40px)}
        .overlay a{font-size:clamp(44px,13vw,76px);font-weight:700;letter-spacing:-.045em;line-height:1.05;opacity:0;transform:translateY(30px);transition:opacity .6s,transform .8s var(--ease);transition-delay:calc(var(--i)*60ms + 250ms)}
        .overlay.open a{opacity:1;transform:none}.overlay small{font:400 12px var(--font-mono);color:var(--mute);margin-right:14px;vertical-align:top}
        @media(max-width:820px){.pill{display:none}.menu-btn{display:block}}
      `}</style>
    </header>
  );
}
