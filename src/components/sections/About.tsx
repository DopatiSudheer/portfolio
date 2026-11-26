"use client";
import { PROFILE } from "@/lib/data";
import DraggableBadgeInline from "@/components/DraggableBadgeInline";

export default function About() {
  return (
    <section id="about" className="about" aria-label="About">
      <div className="wrap">
        <div className="about-header">
          <h2 className="section-label">01 — ABOUT</h2>
        </div>

        <div className="about-container">
          {/* Left: Greeting and Bio */}
          <div className="about-left">
            <h1 className="about-greeting">
              Hi, I'm <br />
              <span className="name-italic">Sudheer.</span>
            </h1>
            <p className="about-bio">
              I'm a Java backend developer with practical internship experience building secure REST APIs using Spring Boot, Spring Data JPA, and MySQL. Well-versed in core Java OOP principles, IoC architecture, relational schema normalization, and stateless Spring Security with JWT.
            </p>
            <p className="about-bio">
              Skilled in containerizing backend stacks with Docker and documenting APIs with Swagger UI and Postman.
            </p>
            <div className="about-buttons">
              <a href={PROFILE.resume} download="Dopati_Sudheer_Kumar_Resume.pdf" className="btn-resume">Resume</a>
              {PROFILE.github && (
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-link">GitHub ↗</a>
              )}
              {PROFILE.linkedin && (
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-link">LinkedIn ↗</a>
              )}
            </div>
          </div>

          {/* Center: Draggable Badge */}
          <div className="about-center">
            <DraggableBadgeInline />
          </div>

          {/* Right: Quick Facts */}
          <div className="about-right">
            <div className="quick-facts">
              <h3 className="facts-title">QUICK FACTS</h3>
              
              <div className="fact-row">
                <span className="fact-label">LOCATION</span>
                <span className="fact-value">Hyderabad, India</span>
              </div>

              <div className="fact-row">
                <span className="fact-label">EDUCATION</span>
                <span className="fact-value">
                  B.Tech CSE, Sri Venkateswara College of Engineering and Technology · CGPA 8.01
                </span>
              </div>

              <div className="fact-row">
                <span className="fact-label">CURRENT</span>
                <span className="fact-value">
                  Fresher - Open to internships and entry-level positions
                </span>
              </div>

              <div className="fact-row">
                <span className="fact-label">EMAIL</span>
                <a href="mailto:dopatisudheerkumar14@gmail.com" className="fact-link">
                  dopatisudheerkumar14@gmail.com
                </a>
              </div>
            </div>

            <div className="about-quote">
              <p>"Backend engineer for enterprise software: data models, business rules, and secure APIs, built with spec-driven AI tooling."</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding: 60px 20px;
          background: #f4f2ee;
        }
        .about-header {
          margin-bottom: 60px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }
        .about-container {
          display: grid;
          grid-template-columns: 1fr 360px 1fr;
          gap: 40px;
          align-items: start;
        }
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .about-center {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: 600px;
        }
        .about-greeting {
          font-family: 'Inter Tight', sans-serif;
          font-size: clamp(42px, 5vw, 72px);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.1;
          margin: 0;
          color: #000;
        }
        .name-italic {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .about-bio {
          font-size: 14px;
          line-height: 1.7;
          color: #555;
          margin: 0;
        }
        .about-buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;
        }
        .btn-resume {
          display: inline-block;
          padding: 10px 18px;
          background: #000;
          color: #fff;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-resume:hover {
          background: #222;
        }
        .btn-link {
          display: inline-block;
          padding: 10px 18px;
          background: transparent;
          color: #000;
          border: 1px solid #000;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-link:hover {
          background: #f5f5f5;
        }
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .quick-facts {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
        }
        .facts-title {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          padding: 20px 24px;
          border-bottom: 1px solid #ddd;
        }
        .fact-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 20px;
          padding: 20px 24px;
          border-bottom: 1px solid #ddd;
          align-items: start;
        }
        .fact-row:last-child {
          border-bottom: none;
        }
        .fact-label {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .fact-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          line-height: 1.5;
        }
        .fact-link {
          font-size: 14px;
          color: #0066cc;
          text-decoration: underline;
          transition: color 0.3s;
        }
        .fact-link:hover {
          color: #004499;
        }
        .about-quote {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
          max-width: 40ch;
          padding: 0;
          background: transparent;
          border: none;
          text-align: left;
          margin-top: 32px;
        }
        .about-quote p {
          margin: 0;
        }

        @media (max-width: 1200px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-center {
            width: 100%;
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
