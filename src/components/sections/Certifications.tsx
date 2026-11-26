"use client";
import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="certifications" aria-label="Certifications">
      <div className="wrap">
        <div className="certifications-container">
          <div className="certifications-left">
            <h2 className="certifications-label">04 — CERTIFICATIONS</h2>
            <h3 className="certifications-title">
              Always <span className="certifications-subtitle">learning.</span>
            </h3>
          </div>

          <div className="certifications-right">
            <div className="certifications-list">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="cert-item">
                  <div className="cert-number">{String(idx + 1).padStart(2, "0")}</div>
                  <div className="cert-content">
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">
                      {cert.issuer} · {cert.duration}
                    </p>
                    {cert.score && (
                      <p className="cert-score">{cert.score}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .certifications {
          padding: 80px 20px 120px 20px;
          background: white;
        }

        .wrap {
          max-width: 100%;
          margin: 0 auto;
        }

        .certifications-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .certifications-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .certifications-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #999;
          margin: 0;
        }

        .certifications-title {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(50px, 9vw, 84px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0d0d0d;
          margin: 0;
        }

        .certifications-subtitle {
          font-style: italic;
          font-weight: 400;
          color: #999;
          font-family: "Instrument Serif", serif;
        }

        .certifications-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .certifications-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }

        .cert-item {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 20px;
          padding: 24px;
          border-bottom: 1px solid #eee;
          align-items: start;
          transition: all 0.3s ease;
          cursor: pointer;
          background: white;
          position: relative;
          overflow: hidden;
        }

        .cert-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0d0d0d;
          z-index: 0;
          transition: left 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-item:hover::before {
          left: 0;
        }

        .cert-item:hover .cert-number {
          color: white;
        }

        .cert-item:hover .cert-title {
          color: white;
        }

        .cert-item:hover .cert-issuer {
          color: #ccc;
        }

        .cert-item:hover .cert-score {
          color: #ccc;
        }

        .cert-item:last-child {
          border-bottom: none;
        }

        .cert-number {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding-top: 2px;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 10;
        }

        .cert-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 10;
        }

        .cert-title {
          font-family: "Inter Tight", sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #0d0d0d;
          margin: 0;
          line-height: 1.3;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-issuer {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #999;
          margin: 0;
          line-height: 1.5;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-score {
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #666;
          margin: 0;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 1024px) {
          .certifications-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .certifications {
            padding: 60px 20px 100px 20px;
          }

          .certifications-title {
            font-size: 40px;
          }

          .certifications-container {
            gap: 40px;
          }

          .cert-item {
            grid-template-columns: 30px 1fr;
            gap: 16px;
            padding: 20px 0;
          }

          .cert-title {
            font-size: 14px;
          }

          .cert-issuer {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
