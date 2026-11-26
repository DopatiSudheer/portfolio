"use client";
import { ACHIEVEMENTS } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

interface AchievementCard {
  label: string;
  caption: string;
  detail?: string;
  value?: number | null;
  suffix?: string;
  logo?: string;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [horizontalTravel, setHorizontalTravel] = useState(0);
  const [countedValues, setCountedValues] = useState<(number | null)[]>(
    ACHIEVEMENTS.map((a) => null)
  );
  const countAnimationRef = useRef<Map<number, number>>(new Map());
  const rafRef = useRef<number | undefined>(undefined);

  // Compute horizontal travel
  useEffect(() => {
    const computeTravel = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travel = Math.max(0, trackWidth - viewportWidth);
      setHorizontalTravel(travel);
    };

    computeTravel();
    window.addEventListener("resize", computeTravel);
    window.addEventListener("load", computeTravel);

    // Recompute when fonts load
    if ("fonts" in document) {
      (document.fonts as any).ready.then(computeTravel);
    }

    return () => {
      window.removeEventListener("resize", computeTravel);
      window.removeEventListener("load", computeTravel);
    };
  }, []);

  // Scroll listener with rAF throttling
  useEffect(() => {
    const handleScroll = () => {
      if (!rafRef.current && horizontalTravel > 0) {
        rafRef.current = requestAnimationFrame(() => {
          if (!sectionRef.current || horizontalTravel === 0) {
            rafRef.current = undefined;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, -rect.top / horizontalTravel));
          setProgress(p);

          // Find active card (closest to viewport centre)
          let closestIndex = 0;
          let closestDistance = Infinity;

          cardRefs.current.forEach((card, idx) => {
            if (!card) return;
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const viewportCenter = window.innerWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = idx;
            }
          });

          setActiveIndex(closestIndex);
          rafRef.current = undefined;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [horizontalTravel]);

  // Count-up animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const cardIdx = cardRefs.current.indexOf(entry.target as HTMLLIElement);
          if (cardIdx === -1) return;

          const achievement = ACHIEVEMENTS[cardIdx];
          if (!achievement.value || countAnimationRef.current.has(cardIdx)) return;

          const startTime = performance.now();
          const duration = 1400; // 1.4s
          const targetValue = achievement.value;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easedT = easeOutQuart(t);
            const currentValue = Math.round(targetValue * easedT);

            setCountedValues((prev) => {
              const newValues = [...prev];
              newValues[cardIdx] = currentValue;
              return newValues;
            });

            if (t < 1) {
              countAnimationRef.current.set(cardIdx, requestAnimationFrame(animate));
            } else {
              // Final value
              setCountedValues((prev) => {
                const newValues = [...prev];
                newValues[cardIdx] = targetValue;
                return newValues;
              });
              countAnimationRef.current.delete(cardIdx);
            }
          };

          countAnimationRef.current.set(cardIdx, requestAnimationFrame(animate));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
      countAnimationRef.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const sectionHeight = `calc(100svh + ${horizontalTravel}px)`;
  const trackTransform = `translate3d(${-progress * horizontalTravel}px, 0, 0)`;

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="achievements"
      style={{ height: sectionHeight }}
      aria-labelledby="achievements-heading"
    >
      <div className="sticky-wrapper">
        {/* Header */}
        <div className="achievements-header">
          <div className="header-left">
            <div className="section-label">06 — ACHIEVEMENTS</div>
            <h1 id="achievements-heading" className="achievements-title">
              Moments that{" "}
              <span className="achievements-accent">counted.</span>
            </h1>
          </div>

          {/* Progress line */}
          <div className="progress-line">
            <div
              className="progress-fill"
              style={{ transform: `scaleX(${progress})` }}
            ></div>
          </div>
        </div>

        {/* Track */}
        <div
          className="achievements-track"
          ref={trackRef}
          style={{ transform: trackTransform }}
        >
          <ul className="cards-list">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <li
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`card ${idx === activeIndex ? "active" : ""}`}
              >
                <div className="card-top">
                  <div className="card-logo">
                    {achievement.logo ? (
                      <img
                        src={`/logos/${achievement.logo}.png`}
                        alt={achievement.label}
                      />
                    ) : (
                      <div className="logo-placeholder">
                        {achievement.label.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="card-index">
                    {String(idx + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="card-bottom">
                  <div className="card-text">
                    <h3 className="card-title">{achievement.label}</h3>
                    <p className="card-caption">{achievement.caption}</p>
                    <p className="card-detail">{achievement.detail}</p>
                  </div>

                  {achievement.value ? (
                    <div className="card-number">
                      {countedValues[idx] ?? 0}
                      {achievement.suffix && (
                        <span className="card-suffix">{achievement.suffix}</span>
                      )}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {/* End of track */}
          <div className="track-end">and counting →</div>
        </div>
      </div>

      <style>{`
        .achievements {
          background: #f4f2ee;
          position: relative;
        }

        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .achievements-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--gutter, 40px);
          margin-bottom: 40px;
          gap: 40px;
        }

        .header-left {
          flex: 1;
        }

        .section-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .achievements-title {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(40px, 6vw, 88px);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.1;
          color: #0d0d0d;
          margin: 0;
        }

        .achievements-accent {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-weight: 400;
          color: #999;
        }

        .progress-line {
          width: 120px;
          height: 1px;
          background: #d0ccc7;
          position: relative;
          flex-shrink: 0;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0d0d0d;
          transform-origin: left;
          transform: scaleX(0);
        }

        .achievements-track {
          display: flex;
          gap: 20px;
          padding-left: var(--gutter, 40px);
          width: max-content;
          will-change: transform;
        }

        .cards-list {
          display: flex;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card {
          flex-shrink: 0;
          width: clamp(340px, 40vw, 540px);
          height: clamp(260px, 36vh, 310px);
          background: white;
          border-radius: 28px;
          border: 1px solid rgba(13, 13, 13, 0.08);
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(13, 13, 13, 0.08);
        }

        .card.active {
          transform: translateY(-12px);
          box-shadow: 0 40px 70px -30px rgba(13, 13, 13, 0.28);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .card-logo {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .card-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .logo-placeholder {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          color: #999;
          background: #f0ede8;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .card-index {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 600;
          color: #999;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }

        .card-text {
          flex: 1;
        }

        .card-title {
          font-family: "Inter Tight", sans-serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: #0d0d0d;
          margin: 0 0 4px 0;
        }

        .card-caption {
          font-size: 14px;
          color: #3a3a3a;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }

        .card-detail {
          font-size: 12.5px;
          color: #77756f;
          margin: 0;
        }

        .card-number {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(64px, 8vw, 112px);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 0.85;
          color: #0d0d0d;
          font-variant-numeric: tabular-nums;
        }

        .card-suffix {
          font-size: 0.6em;
          margin-left: 2px;
        }

        .track-end {
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-size: clamp(28px, 4vw, 36px);
          color: #999;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          margin-left: 60px;
          padding-right: 40px;
          flex-shrink: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .sticky-wrapper {
            position: static;
            height: auto;
          }

          .achievements-track {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            will-change: auto;
          }

          .card {
            scroll-snap-align: start;
            transition: none;
          }

          .card.active {
            transform: none;
          }
        }

        @media (max-width: 768px) {
          .achievements-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .achievements-track {
            padding-left: 20px;
          }

          .track-end {
            margin-left: 20px;
          }
        }
      `}</style>
    </section>
  );
}
