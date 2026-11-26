"use client";
import { PROFILE } from "@/lib/data";
import { useState, useRef, useEffect } from "react";

interface LetterSpan {
  char: string;
  index: number;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [hopClass, setHopClass] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const heading = "Let'sbuildsomethingtogether.";
  const email = PROFILE.email;
  const phone = PROFILE.phone;
  const phoneHref = PROFILE.phoneHref;
  const linkedin = PROFILE.linkedin;
  const github = PROFILE.github;

  // Build letter spans
  const buildLetters = (): LetterSpan[] => {
    let index = 0;
    return heading.split("").map((char) => ({
      char,
      index: index++,
    }));
  };

  const letters = buildLetters();

  const handleLetterMouseEnter = (index: number) => {
    setHopClass(index);
  };

  const handleLetterAnimationEnd = () => {
    setHopClass(null);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Entrance animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    const elements = containerRef.current?.querySelectorAll(
      ".entrance-item"
    );
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <section
        ref={containerRef}
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div className="contact-wrap">
          {/* Section tag */}
          <div className="entrance-item section-tag-group" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="section-tag">07 — CONTACT</div>
          </div>

          {/* Heading with letter-hop */}
          <div className="entrance-item heading-group" style={{ "--i": 1 } as React.CSSProperties}>
            <h2 id="contact-heading" className="contact-heading">
              <span className="heading-line">
                {letters.slice(0, 10).map((l, idx) => (
                  <span
                    key={idx}
                    ref={(el) => {
                      lettersRef.current[idx] = el;
                    }}
                    className={`letter ${hopClass === idx ? "hop" : ""}`}
                    onMouseEnter={() => handleLetterMouseEnter(idx)}
                    onAnimationEnd={handleLetterAnimationEnd}
                  >
                    {l.char}
                  </span>
                ))}
              </span>
              <span className="heading-line">
                {letters.slice(10, 19).map((l, idx) => (
                  <span
                    key={idx + 10}
                    ref={(el) => {
                      lettersRef.current[idx + 10] = el;
                    }}
                    className={`letter ${hopClass === idx + 10 ? "hop" : ""}`}
                    onMouseEnter={() => handleLetterMouseEnter(idx + 10)}
                    onAnimationEnd={handleLetterAnimationEnd}
                  >
                    {l.char}
                  </span>
                ))}
                <span className="heading-accent">
                  {letters.slice(19).map((l, idx) => (
                    <span
                      key={idx + 19}
                      ref={(el) => {
                        lettersRef.current[idx + 19] = el;
                      }}
                      className={`letter ${hopClass === idx + 19 ? "hop" : ""}`}
                      onMouseEnter={() => handleLetterMouseEnter(idx + 19)}
                      onAnimationEnd={handleLetterAnimationEnd}
                    >
                      {l.char}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
          </div>

          {/* Email row with copy and badge */}
          <div className="entrance-item email-row" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="email-section">
              <a href={`mailto:${email}`} className="contact-email">
                {email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="copy-chip"
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Say hello badge */}
            <a href={`mailto:${email}`} className="say-hello-badge">
              <svg width="80" height="80" viewBox="0 0 96 96">
                <defs>
                  <path
                    id="circlePath"
                    d="M 48, 48 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    fill="none"
                  />
                </defs>
                <text className="circle-text">
                  <textPath href="#circlePath" startOffset="0%" textAnchor="start">
                    SAY HELLO · SAY HELLO · SAY HELLO ·
                  </textPath>
                </text>
                <text className="circle-arrow" x="48" y="48" textAnchor="middle" dy="0.3em">
                  ↗
                </text>
              </svg>
            </a>
          </div>

          {/* Action pills */}
          <div className="entrance-item pills-group" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={`tel:${phoneHref}`} className="action-pill phone-pill">
              {phone}
            </a>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-pill ghost-pill"
              >
                GitHub ↗
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action-pill ghost-pill"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="footer-wrap">
          <div className="footer-left">
            © {currentYear} Sudheer Dopati
          </div>
          <div className="footer-center">
            <a href="#top" onClick={handleScrollToTop} className="back-to-top">
              Back to top ↑
            </a>
          </div>
          <div className="footer-right">
            Designed and built by Sudheer
          </div>
        </div>
      </footer>

      <style>{`
        .contact {
          background: #f4f2ee;
          padding: clamp(96px, 14vh, 160px) clamp(18px, 4vw, 64px) clamp(48px, 8vh, 96px);
        }

        .contact-wrap {
          max-width: 1320px;
          margin: 0 auto;
        }

        /* Entrance animation */
        .entrance-item {
          opacity: 0;
          transform: translateY(24px);
          animation: entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--i, 0) * 80ms);
        }

        @keyframes entrance {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .entrance-item.is-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Section tag */
        .section-tag-group {
          margin-bottom: 16px;
        }

        .section-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #999;
          text-transform: uppercase;
          margin: 0;
        }

        /* Heading */
        .heading-group {
          margin-bottom: 40px;
        }

        .contact-heading {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(52px, 9.2vw, 84px);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 0.98;
          color: #0d0d0d;
          margin: 0;
        }

        .heading-line {
          display: block;
        }

        .letter {
          display: inline-block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          cursor: pointer;
        }

        @keyframes hop {
          0% {
            transform: translateY(0) scale(1);
          }
          35% {
            transform: translateY(-0.16em) scale(1.12);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .letter.hop {
          animation: hop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .heading-accent {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-weight: 400;
          color: #77756f;
        }

        /* Email row */
        .email-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
          margin-bottom: 24px;
        }

        .email-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-email {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(24px, 3.5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0d0d0d;
          text-decoration: none;
          outline: 2px solid transparent;
          outline-offset: 2px;
          transition: color 0.3s ease;
        }

        .contact-email:focus {
          outline-color: #0d0d0d;
        }

        .contact-email:hover {
          color: #666;
        }

        /* Copy button */
        .copy-chip {
          height: 32px;
          padding: 0 12px;
          border: 1.5px solid #0d0d0d;
          border-radius: 16px;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #0d0d0d;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: 2px solid transparent;
          outline-offset: 2px;
          white-space: nowrap;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .copy-chip:focus {
          outline-color: #0d0d0d;
        }

        .copy-chip:hover {
          background: #0d0d0d;
          color: white;
        }

        /* Say hello badge */
        .say-hello-badge {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: 2px solid transparent;
          outline-offset: 2px;
          transition: outline-color 0.3s ease;
          flex-shrink: 0;
        }

        .say-hello-badge:focus {
          outline-color: #0d0d0d;
        }

        .say-hello-badge svg {
          width: 100%;
          height: 100%;
          animation: spin 18s linear infinite;
        }

        .say-hello-badge:hover svg {
          animation-play-state: paused;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .circle-text {
          font-family: "JetBrains Mono", monospace;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          fill: #0d0d0d;
          text-transform: uppercase;
        }

        .circle-arrow {
          font-size: 18px;
          fill: #0d0d0d;
        }

        /* Action pills */
        .pills-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .action-pill {
          height: 40px;
          padding: 0 14px;
          border-radius: 20px;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .action-pill:focus {
          outline-color: #0d0d0d;
        }

        .phone-pill {
          background: #0d0d0d;
          color: white;
          border: 1.5px solid #0d0d0d;
        }

        .phone-pill:hover {
          background: #333;
          border-color: #333;
        }

        .ghost-pill {
          background: white;
          color: #0d0d0d;
          border: 1.5px solid #0d0d0d;
        }

        .ghost-pill:hover {
          background: #0d0d0d;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 13, 13, 0.16);
        }

        /* Footer */
        .contact-footer {
          border-top: 1px solid #d0ccc7;
          padding: 24px clamp(18px, 4vw, 64px);
          background: #f4f2ee;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          color: #999;
        }

        .footer-wrap {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 20px;
          align-items: center;
          text-align: center;
        }

        .footer-left {
          text-align: left;
        }

        .footer-right {
          text-align: right;
        }

        .back-to-top {
          color: #0d0d0d;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .back-to-top:focus {
          outline-color: #0d0d0d;
        }

        .back-to-top:hover {
          color: #666;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .letter {
            cursor: auto;
          }

          .letter.hop {
            animation: none;
          }

          .say-hello-badge svg {
            animation: none;
          }

          .entrance-item {
            animation: none;
            opacity: 1;
            transform: none;
          }

          * {
            transition: none !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .email-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .email-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .contact-email {
            font-size: clamp(20px, 3vw, 32px);
          }

          .say-hello-badge {
            width: 80px;
            height: 80px;
            margin: 0 auto;
          }

          .pills-group {
            margin-top: 16px;
          }

          .footer-wrap {
            grid-template-columns: 1fr;
            gap: 12px;
            text-align: center;
          }

          .footer-left,
          .footer-right {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
