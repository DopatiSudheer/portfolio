"use client";
import { useState, useEffect } from "react";

export default function LanyardAnimation() {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    // Gentle pendulum sway animation
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      const angle = Math.sin(time * 0.5) * 2; // 1–2° tilt
      setTilt(angle);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F3EE] p-8">
      <style>{`
        @keyframes textScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .lanyard-container {
          position: relative;
          width: 100px;
          height: 600px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .lanyard-strip {
          position: relative;
          width: 60px;
          height: 540px;
          background: #1a1a1a;
          border-radius: 2px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            inset -1px -1px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 3px rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transform-origin: top center;
          transition: transform 0.1s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lanyard-text-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .lanyard-text {
          position: absolute;
          font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: white;
          line-height: 1.4;
          text-align: center;
          white-space: nowrap;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          animation: textScroll 15s linear infinite;
        }

        .lanyard-cap {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 24px;
          background: linear-gradient(
            135deg,
            #c0c0c0 0%,
            #e8e8e8 25%,
            #ffffff 50%,
            #d4d4d4 75%,
            #a8a8a8 100%
          );
          border-radius: 12px;
          box-shadow: 
            inset -2px -2px 4px rgba(0, 0, 0, 0.2),
            inset 2px 2px 4px rgba(255, 255, 255, 0.4),
            0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .lanyard-cap::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 10%;
          width: 30%;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 1px;
        }

        .lanyard-ledge {
          position: absolute;
          bottom: 0;
          left: -100px;
          width: 300px;
          height: 24px;
          background: #1a1a1a;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="lanyard-container" style={{ transform: `perspective(1000px) rotateZ(${tilt}deg)` }}>
        <div className="lanyard-strip">
          <div className="lanyard-text-wrapper">
            <div className="lanyard-text">
              SUKUMAR DOPATI · JAVA BACKEND DEVELOPER · SUKUMAR DOPATI · JAVA BACKEND DEVELOPER · SUKUMAR DOPATI · JAVA BACKEND DEVELOPER ·
            </div>
          </div>
        </div>
        <div className="lanyard-cap" />
        <div className="lanyard-ledge" />
      </div>
    </div>
  );
}
