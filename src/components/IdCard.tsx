"use client";
import { PROFILE } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

interface IdCardProps {
  strapHeight?: number;
  rotationAngle?: number;
}

export default function IdCard({ strapHeight = 200, rotationAngle = 0 }: IdCardProps) {
  const lanyardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePrefersReducedMotion = () => {
      // Handle reduced motion preference
    };
    mediaQuery.addEventListener("change", updatePrefersReducedMotion);
    return () => mediaQuery.removeEventListener("change", updatePrefersReducedMotion);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (lanyardRef.current) {
      observer.observe(lanyardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const strapText = `DEVELOPER · ${PROFILE.name.toUpperCase()} · ${PROFILE.role.toUpperCase()} ·`;

  return (
    <div className="lanyard-container">
      <div
        ref={lanyardRef}
        className="lanyard"
        style={{
          animationPlayState: isVisible ? "running" : "paused",
          transform: `rotate(${rotationAngle}deg)`,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        {/* Strap */}
        <div className="strap">
          <div className="strap__text-track">
            {strapText} {strapText}
          </div>
        </div>

        {/* Metal Clip */}
        <div className="clip" />

        {/* Card */}
        <div className="card">
          {/* Top Band */}
          <div className="card__header">
            <div className="card__header-text">DEVELOPER ID</div>
          </div>

          {/* Content */}
          <div className="card__content">
            {/* Portrait */}
            <div className="card__portrait-frame">
              <img
                src="/portrait.jpg"
                alt="Developer ID Portrait"
                className="card__portrait"
              />
            </div>

            {/* Name */}
            <div className="card__name">{PROFILE.name}</div>

            {/* Role */}
            <div className="card__role">{PROFILE.role}</div>

            {/* Info Rows */}
            <div className="card__info-rows">
              <div className="card__info-row">
                <span className="card__info-label">DEPT.</span>
                <span className="card__info-value">Computer Science and Engineering</span>
              </div>
              <div className="card__info-row">
                <span className="card__info-label">VALID TILL</span>
                <span className="card__info-value">2026</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="card__barcode" />

            {/* Holographic Sticker */}
            <div className="card__hologram" />
          </div>
        </div>

        <style>{`
          .lanyard-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lanyard {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            transform-origin: 50% 0;
            will-change: transform;
            animation: sway 3.45s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
            animation-play-state: running;
          }

          @keyframes sway {
            from { transform: rotate(-4.8deg); }
            to { transform: rotate(4.8deg); }
          }

          .strap {
            width: 30px;
            height: 56px;
            background: #0d0d0d;
            border-radius: 0 0 3px 3px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .strap__text-track {
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.2em;
            color: #e9e6e0;
            white-space: nowrap;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            text-transform: uppercase;
            line-height: 1.2;
            will-change: transform;
            animation: strap-scroll 4.7s linear infinite;
            animation-play-state: inherit;
          }

          @keyframes strap-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .clip {
            width: 22px;
            height: 22px;
            background: linear-gradient(90deg, #8f8f8f 0%, #f4f4f4 28%, #ffffff 45%, #cfcfcf 70%, #8a8a8a 100%);
            border-radius: 0 0 6px 6px;
            margin-top: -2px;
            position: relative;
            box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.35);
          }

          .clip::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: rgba(255, 255, 255, 0.7);
          }

          .card {
            width: 300px;
            background: white;
            border-radius: 28px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 30px 60px -28px rgba(13, 13, 13, 0.3);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .card__header {
            background: #0d0d0d;
            color: white;
            padding: 12px 0;
            text-align: center;
            border-radius: 28px 28px 0 0;
          }

          .card__header-text {
            font-family: "JetBrains Mono", monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.3em;
            text-transform: uppercase;
          }

          .card__content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 20px;
            gap: 16px;
            position: relative;
          }

          .card__portrait-frame {
            width: 128px;
            height: 156px;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #d0d0d0;
            box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
            background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          }

          .card__portrait {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%);
          }

          .card__name {
            font-family: "Inter Tight", sans-serif;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.03em;
            color: #000;
            text-align: center;
            line-height: 1.2;
          }

          .card__role {
            font-size: 13px;
            color: #77756f;
            text-align: center;
            margin-top: -8px;
          }

          .card__info-rows {
            width: 100%;
            margin-top: 12px;
            border-top: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
          }

          .card__info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e8e8e8;
            font-size: 12.5px;
          }

          .card__info-row:last-child {
            border-bottom: none;
          }

          .card__info-label {
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.15em;
            color: #999;
            text-transform: uppercase;
          }

          .card__info-value {
            font-size: 12.5px;
            color: #333;
            text-align: right;
            max-width: 180px;
          }

          .card__barcode {
            position: absolute;
            bottom: 20px;
            left: 20px;
            width: 90px;
            height: 26px;
            background: repeating-linear-gradient(
              90deg,
              #000 0, #000 2px,
              transparent 2px, transparent 3px,
              #000 3px, #000 5px,
              transparent 5px, transparent 7px,
              #000 7px, #000 10px,
              transparent 10px, transparent 11px
            );
          }

          .card__hologram {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: conic-gradient(#dcdcdc 0deg, #8a8a8a 90deg, #f4f4f4 180deg, #9a9a9a 270deg, #dcdcdc 360deg);
            border: 1px solid #b0b0b0;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .card__hologram::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
            pointer-events: none;
          }

          @media (prefers-reduced-motion: reduce) {
            .lanyard {
              animation: none;
              transform: rotate(0);
            }

            .strap__text-track {
              animation: none;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            .card {
              width: 280px;
            }

            .card__name {
              font-size: 18px;
            }

            .strap {
              width: 24px;
              height: 48px;
            }

            .strap__text-track {
              font-size: 9px;
            }

            .clip {
              width: 18px;
              height: 18px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
