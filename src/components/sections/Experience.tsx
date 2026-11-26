"use client";
import { EXPERIENCE, EDUCATION } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const element = timelineRef.current;
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top;
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress: fills from top to bottom, capped at 100%
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
      setProgress(Math.min(1, scrollProgress * 1.1)); // Slightly boost to reach 100% before bottom
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="experience" aria-label="Experience">
      <div className="wrap">
        <div className="experience-header">
          <h2 className="section-label">05 — EDUCATION & EXPERIENCE</h2>
          <h1 className="experience-title">
            The road <span className="experience-italic">so far.</span>
          </h1>
        </div>

        <div className="timeline" ref={timelineRef} style={{ "--timeline-progress": `${progress * 100}%` } as React.CSSProperties}>
          {/* Education */}
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-period">{edu.period}</div>
                <h3 className="timeline-title">{edu.title}</h3>
                <p className="timeline-place">{edu.place}</p>
                {edu.detail && <p className="timeline-detail">{edu.detail}</p>}
                {edu.achievements && (
                  <ul className="timeline-achievements">
                    {edu.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          {/* Experience */}
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className={`timeline-item ${exp.isNext ? 'timeline-next' : ''}`}>
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-period">{exp.period}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-place">{exp.place}</p>
                {!exp.isNext && exp.points && (
                  <ul className="timeline-points">
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience {
          padding: 120px 20px;
          background: #f4f2ee;
        }
        .experience-header {
          margin-bottom: 80px;
        }
        .section-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #999;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }
        .experience-title {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(50px, 9vw, 84px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #0d0d0d;
          margin: 0;
        }
        .experience-italic {
          font-style: italic;
          font-weight: 400;
        }
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 40px;
          top: 20px;
          bottom: auto;
          width: 1px;
          height: calc(100% - 80px);
          background: linear-gradient(to bottom, #0d0d0d 0%, #0d0d0d var(--timeline-progress, 0%), #d0ccc7 var(--timeline-progress, 0%), #d0ccc7 100%);
          z-index: 0;
        }
        .timeline-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          padding: 32px 0;
          position: relative;
          z-index: 1;
          align-items: start;
        }
        .timeline-item.timeline-next {
          padding: 32px 0;
        }
        .timeline-item.timeline-next .timeline-content {
          border: 1px dashed #d0ccc7;
          border-radius: 12px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.5);
        }
        .timeline-item.timeline-next .timeline-period {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          color: #999;
          margin-bottom: 12px;
        }
        .timeline-item.timeline-next .timeline-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        .timeline-item.timeline-next .timeline-place {
          color: #888;
          font-weight: 400;
        }
        .timeline-marker {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          background: #0d0d0d;
          border-radius: 50%;
          border: 3px solid #f4f2ee;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 0 1px #d0ccc7;
        }
        .timeline-line {
          position: absolute;
          width: 1px;
          height: 100%;
          background: transparent;
        }
        .timeline-period {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .timeline-content {
          padding: 0;
        }
        .timeline-title {
          font-family: "Inter Tight", sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #0d0d0d;
          line-height: 1.3;
        }
        .timeline-place {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0 0 12px 0;
          font-weight: 500;
          line-height: 1.5;
        }
        .timeline-detail {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #999;
          margin: 0;
          font-weight: 500;
        }
        .timeline-achievements {
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
        }
        .timeline-achievements li {
          font-family: "Inter", sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: #777;
          margin-bottom: 6px;
          padding-left: 16px;
          position: relative;
        }
        .timeline-achievements li:last-child {
          margin-bottom: 0;
        }
        .timeline-achievements li::before {
          content: "◆";
          position: absolute;
          left: 0;
          color: #999;
          font-size: 6px;
        }
        .timeline-points {
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
        }
        .timeline-points li {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 8px;
          padding-left: 16px;
          position: relative;
        }
        .timeline-points li:last-child {
          margin-bottom: 0;
        }
        .timeline-points li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #999;
        }
        @media (max-width: 768px) {
          .experience {
            padding: 80px 20px;
          }
          .experience-title {
            font-size: clamp(36px, 7vw, 60px);
          }
          .timeline::before {
            left: 6px;
          }
          .timeline-item {
            grid-template-columns: 40px 1fr;
            gap: 20px;
          }
          .timeline-dot {
            width: 10px;
            height: 10px;
            border-width: 2px;
          }
        }
      `}</style>
    </section>
  );
}
