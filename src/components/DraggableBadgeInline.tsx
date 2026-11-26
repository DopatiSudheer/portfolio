"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function DraggableBadgeInline() {
  const [isFlipped, setIsFlipped] = useState(false);
  const dragRef = useRef({ start: { x: 0, y: 0 }, lastPos: { x: 0, y: 0 }, a: 0, v: 0, last: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const swingRef = useRef<HTMLDivElement>(null);

  // Pendulum physics simulation
  useEffect(() => {
    let raf = 0;
    const s = dragRef.current;
    const t0 = performance.now();

    const loop = (t: number) => {
      if (isDragging) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const idle = Math.sin((t - t0) / 1100) * 1.6;
      s.v += -0.028 * (s.a - idle);
      s.v *= 0.965;
      s.a = Math.max(-20, Math.min(20, s.a + s.v));
      setRotation(s.a);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current.start = { x: e.clientX, y: e.clientY };
    dragRef.current.lastPos = { x: position.x, y: position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const s = dragRef.current;
    const x = e.clientX;
    if (s.last) {
      s.v += Math.max(-30, Math.min(30, x - s.last)) * 0.035;
    }
    s.last = x;
  };

  const handleMouseLeave = () => {
    dragRef.current.last = 0;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const text = "SUDHEER KUMAR DOPATI · JAVA BACKEND DEVELOPER · ".repeat(8);

  return (
    <div
      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes strap {
          from { transform: translate(-50%, 0); }
          to { transform: translate(-50%, -50%); }
        }

        .swing {
          transform-origin: 50% 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }

        .strap {
          width: 30px;
          height: 160px;
          background: #000;
          overflow: hidden;
          position: relative;
          border-radius: 0 0 3px 3px;
        }

        .strap span {
          position: absolute;
          left: 50%;
          top: 0;
          writing-mode: vertical-rl;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          transform: translateX(-50%);
          animation: strap 14s linear infinite;
          padding-top: 100%;
        }

        .clip {
          width: 18px;
          height: 34px;
          margin-top: -4px;
          border-radius: 5px 5px 9px 9px;
          background: linear-gradient(90deg, #c9c9c9, #f2f2f2 45%, #9a9a9a);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
          position: relative;
          z-index: 2;
        }

        .idc {
          width: 300px;
          height: 404px;
          perspective: 1200px;
          margin-top: -10px;
          cursor: pointer;
          outline-offset: 6px;
        }

        .idi {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .idi.on {
          transform: rotateY(180deg);
        }

        .face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0.1px);
          border-radius: 24px;
          background: #fff;
          box-shadow: inset 0 0 0 1px #e0e0e0, 0 40px 80px -30px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .back {
          transform: rotateY(180deg) translateZ(0.1px);
          padding: 26px 24px;
          gap: 10px;
        }

        .front,
        .back {
          transition: visibility 0s linear 0.45s;
        }

        .idi.on .front {
          visibility: hidden;
        }

        .idi:not(.on) .back {
          visibility: hidden;
        }

        .band {
          background: #000;
          color: #fff;
          height: 44px;
          display: grid;
          place-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
        }

        .ph {
          width: 128px;
          height: 156px;
          margin: 18px auto 12px;
          border-radius: 20px;
          padding: 3px;
          background: linear-gradient(160deg, #e9e9e9, #8a8a8a);
          position: relative;
          flex: none;
          overflow: hidden;
        }

        .ph img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 20%;
          border-radius: 17px;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .idc:hover .ph img {
          transform: scale(1.06);
        }

        .nm {
          text-align: center;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.03em;
        }

        .rl {
          text-align: center;
          color: #999;
          font-size: 12.5px;
          margin-top: 2px;
        }

        .rows {
          margin: 12px 22px 0;
          display: grid;
          gap: 3px;
        }

        .rows div {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          padding: 3px 0;
          border-top: 1px solid #e0e0e0;
        }

        .rows b {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 400;
          color: #999;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 10px;
        }

        .bot {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 22px 18px;
        }

        .bcode {
          display: flex;
          align-items: flex-end;
          gap: 1.5px;
          height: 34px;
        }

        .bcode i {
          display: block;
          background: #000;
        }

        .holo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: conic-gradient(#eee, #999, #f7f7f7, #777, #ddd, #aaa, #eee);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18);
        }

        .back h3 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          font-weight: 400;
        }

        .back li {
          font-size: 13.5px;
          line-height: 1.4;
          list-style: none;
          padding: 8px 0;
          border-top: 1px solid #e0e0e0;
        }

        .back ul {
          margin: 0;
          padding: 0;
        }

        .sig {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: 28px;
          margin-top: auto;
        }

        .found {
          font-size: 11px;
          color: #999;
          overflow-wrap: anywhere;
        }
      `}</style>

      <div className="swing" ref={swingRef} style={{ transform: `rotate(${rotation}deg)` }} onMouseDown={handleMouseDown}>
        <div className="strap" aria-hidden="true">
          <span>{text}</span>
        </div>
        <div className="clip" aria-hidden="true" />
        <div
          className="idc"
          tabIndex={0}
          role="button"
          aria-pressed={isFlipped}
          aria-label="Developer ID card. Press to flip."
          onClick={toggleFlip}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFlip();
            }
          }}
        >
          <div className={`idi ${isFlipped ? "on" : ""}`}>
            {/* Front side */}
            <div className="face front">
              <div className="band">ID</div>
              <p className="nm" style={{ marginTop: "24px" }}>Sudheer Kumar Dopati</p>
              <p className="rl">Java Backend Developer (Fresher)</p>
              <div className="rows">
                <div>
                  <b>B.Tech Start</b>
                  <span>Oct 2022</span>
                </div>
                <div>
                  <b>B.Tech End</b>
                  <span>Apr 2026</span>
                </div>
              </div>
              <div className="bot">
                <div className="bcode" aria-hidden="true">
                  {[1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1].map((w, i) => (
                    <i key={i} style={{ width: w * 1.6, height: i % 5 === 0 ? "100%" : "82%", backgroundColor: "#000" }} />
                  ))}
                </div>
                <div className="holo" aria-hidden="true" />
              </div>
            </div>

            {/* Back side */}
            <div className="face back">
              <h3>What I am</h3>
              <ul>
                <li>B.Tech CSE · CGPA 8.01 / 10</li>
                <li>Hospital Management Project</li>
                <li>JobPortal Project</li>
                <li style={{ paddingBottom: "0" }}>NPTEL Certificates
                  <ul style={{ marginTop: "4px", paddingLeft: "12px", fontSize: "12px", lineHeight: "1.3" }}>
                    <li style={{ borderTop: "none", paddingTop: "2px", paddingBottom: "2px" }}>Microprocessor & Interfacing - 62.0% Elite</li>
                    <li style={{ borderTop: "none", paddingTop: "2px", paddingBottom: "2px" }}>Human Computer Interaction - 80.0% Elite+Silver</li>
                  </ul>
                </li>
              </ul>
              <p className="sig" style={{ fontSize: "20px" }}>Sudheer Kumar Dopati</p>
              <p className="found">If found, say hello · dopatisudheerkumar@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
