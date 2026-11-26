"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const sec = useRef<HTMLElement>(null), vid = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false), [blocked, setBlocked] = useState(false);
  const visible = useRef(true), want = useRef(true);

  const play = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !want.current ? true : false;
    v.play()
      .then(() => {
        setSound(!v.muted);
        setBlocked(false);
      })
      .catch(() => {
        v.muted = true;
        v.play().catch(() => {});
        setSound(false);
        setBlocked(true);
      });
  };

  useEffect(() => {
    const v = vid.current!;
    play(); // try with sound, fall back to muted

    const unlock = () => {
      want.current = true;
      if (v.muted && visible.current) {
        v.muted = false;
        v.play()
          .then(() => {
            setSound(true);
            setBlocked(false);
          })
          .catch(() => {});
      }
      cleanup();
    };

    const ev = ["pointerdown", "keydown", "touchend"] as const;
    const cleanup = () => ev.forEach((e) => removeEventListener(e, unlock));
    ev.forEach((e) => addEventListener(e, unlock, { once: true }));

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        visible.current ? v.play().catch(() => {}) : v.pause();
      },
      { threshold: [0, 0.35, 1] }
    );
    io.observe(sec.current!);

    return () => {
      io.disconnect();
      cleanup();
    };
    // eslint-disable-next-line
  }, []);

  const toggle = () => {
    const v = vid.current!;
    if (v.muted) {
      v.muted = false;
      want.current = true;
      v.play()
        .then(() => {
          setSound(true);
          setBlocked(false);
        })
        .catch(() => {});
    } else {
      v.muted = true;
      want.current = false;
      setSound(false);
    }
  };

  return (
    <section ref={sec} className="hero" aria-label="Introduction">
      <div className="ghost" aria-hidden>
        {PROFILE.first.toUpperCase()}
      </div>
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="h1">
            <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
              <span>{PROFILE.role.replace(/ Developer$/, "")}</span>
            </span>
            <span className="rv-mask" style={{ ["--i" as string]: 2 }}>
              <span>
                <em className="serif-it">Developer.</em>
              </span>
            </span>
          </h1>
          <div className="ctas rv" style={{ ["--i" as string]: 3 }}>
            <a
              className="btn btn-primary"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("work");
              }}
            >
              Explore work
            </a>
            <a
              className="btn btn-ghost"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("contact");
              }}
            >
              Let&apos;s talk
            </a>
            <a
              className="btn btn-ghost"
              href={PROFILE.resume}
              download="Dopati_Sudheer_Kumar_Resume.pdf"
            >
              Résumé ↓
            </a>
          </div>
        </div>
        <div className="stage-container">
          <div className="stage">
            <div className="ghost-video" aria-hidden>
              {PROFILE.first.toUpperCase()}
            </div>
            <video
              ref={vid}
              muted
              loop
              playsInline
              preload="auto"
              poster="/portrait-bust.webp"
              aria-label={`${PROFILE.first} introducing himself`}
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>
            <button
              className={`sound-pill ${blocked ? "ping" : ""}`}
              onClick={toggle}
              aria-pressed={sound}
            >
              {sound ? "Mute" : "Hear my intro"}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          padding-top: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ghost {
          display: none;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 90%;
          max-width: 1400px;
          gap: 40px;
        }

        .hero-left {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 400px;
        }

        .stage-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          position: relative;
          padding-bottom: 60px;
        }

        .stage {
          position: relative;
          flex: 0 0 auto;
          height: min(70svh, 900px);
          aspect-ratio: 768 / 960;
          max-width: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ghost-video {
          position: absolute;
          top: 50%;
          left: 35%;
          transform: translate(-50%, -50%);
          font-weight: 800;
          font-size: clamp(80px, 15vw, 220px);
          letter-spacing: -0.06em;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 3px rgba(13, 13, 13, 0.15);
          white-space: nowrap;
          user-select: none;
          z-index: 0;
          pointer-events: none;
        }

        .stage video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          display: block;
          position: relative;
          z-index: 1;
        }

        .sound-pill {
          position: absolute;
          bottom: -48px;
          left: 50%;
          transform: translateX(-50%);
          height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          background: #0d0d0d;
          border: none;
          color: white;
          font-family: "Inter Tight", sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          cursor: pointer;
          z-index: 2;
          box-shadow: 0 10px 24px -10px rgba(13, 13, 13, 0.4);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
          outline: none;
        }

        .sound-pill:hover {
          transform: translateX(-50%) scale(1.07);
        }

        .sound-pill:focus-visible {
          outline: 2px solid #0d0d0d;
          outline-offset: 3px;
        }

        .sound-pill.ping::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          box-shadow: 0 0 0 1.5px rgba(13, 13, 13, 0.35);
          animation: sound-ping 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          pointer-events: none;
        }

        @keyframes sound-ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            box-shadow: 0 0 0 1.5px rgba(13, 13, 13, 0);
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .h1 {
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.05;
          font-size: clamp(42px, 6vw, 84px);
          display: flex;
          flex-direction: column;
          gap: 0.1em;
          margin: 0;
        }

        .h1 .serif-it {
          font-size: 1em;
        }

        .ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sound-pill {
            transition: none;
          }

          .sound-pill.ping::before {
            animation: none;
          }
        }

        @media (max-width: 900px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
          }

          .hero-left {
            max-width: none;
            align-items: center;
          }

          .stage-container {
            flex-direction: column;
            gap: 20px;
          }

          .stage {
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
