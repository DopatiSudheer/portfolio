"use client";
import { useState, useEffect } from "react";
import { PROJECTS } from "@/lib/data";

const TECH_LOGOS: { [key: string]: string } = {
  "Java": "☕",
  "Spring Boot": "🍃",
  "JPA": "📊",
  "MySQL": "🗄️",
  "Docker": "🐳",
  "JWT": "🔑",
  "Postman": "📮",
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveProject((p) => (p - 1 + PROJECTS.length) % PROJECTS.length);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveProject((p) => (p + 1) % PROJECTS.length);
    }
  };

  const isOpen = (idx: number) => idx === activeProject;

  return (
    <section id="work" className="projects" aria-label="Selected work">
      <div className="wrap">
        <div className="projects-header">
          <h2 className="projects-label">03 — SELECTED WORK</h2>
          <h3 className="projects-title">
            Things I've <span className="projects-subtitle">built.</span>
          </h3>
          <div className="projects-divider" />
        </div>

        <div className="gallery-container">
          <div className="panels-row" role="tablist">
            {PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                className={`panel ${isOpen(idx) ? "open" : "closed"}`}
                role="tab"
                aria-selected={isOpen(idx)}
                aria-expanded={isOpen(idx)}
                aria-controls={`panel-${project.id}`}
                onMouseEnter={() => setActiveProject(idx)}
                onClick={() => setActiveProject(idx)}
                onKeyDown={handleKeyDown}
              >
                {isOpen(idx) ? (
                  <OpenPanel project={project} reducedMotion={reducedMotion} />
                ) : (
                  <ClosedPanel project={project} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .projects {
          padding: 120px 20px;
          background: #f4f2ee;
          margin-bottom: 200px;
          padding-bottom: 120px;
        }

        .wrap {
          max-width: 100%;
          margin: 0 auto;
        }

        .projects-header {
          margin-bottom: 60px;
        }

        .projects-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #999;
          margin: 0 0 16px 0;
        }

        .projects-title {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0d0d0d;
          margin: 0;
        }

        .projects-subtitle {
          font-style: italic;
          font-weight: 400;
          color: #666;
          font-family: "Instrument Serif", serif;
        }

        .projects-divider {
          width: 100%;
          height: 1px;
          background: #999;
          margin-top: 20px;
        }

        .gallery-container {
          width: 100%;
          overflow: visible;
        }

        .panels-row {
          display: flex;
          gap: 16px;
          height: auto;
          min-height: min(90svh, 760px);
        }

        .panel {
          display: flex;
          flex: 1;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          border-radius: 34px;
          background: white;
          border: 1px solid rgba(13, 13, 13, 0.1);
          box-shadow: 0 24px 60px -34px rgba(13, 13, 13, 0.25);
          overflow: hidden;
          min-width: 0;
          transition: flex 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          position: relative;
        }

        .panel:focus-visible {
          outline: 2px solid #000;
          outline-offset: 2px;
        }

        .panel.open {
          flex: 8;
        }

        .panel.closed {
          flex: 1;
          cursor: pointer;
        }

        @media (prefers-reduced-motion: reduce) {
          .panel {
            transition: none;
          }
        }

        @media (max-width: 820px) {
          .panels-row {
            flex-direction: column;
            height: auto;
            gap: 12px;
          }

          .panel {
            border-radius: 28px;
            height: 72px;
            flex: none;
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .panel.open {
            grid-template-rows: 1fr;
            height: auto;
          }

          .panel-content {
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  live: string | null;
  liveLabel: string;
}

function ClosedPanel({ project }: { project: Project }) {
  return (
    <div className="spine">
      <div className="spine-number">{project.index}</div>
      <div className="spine-title">{project.title}</div>
      <div className="spine-plus">+</div>

      <style>{`
        .spine {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 16px;
          position: relative;
          text-align: center;
        }

        .spine-number {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          flex-shrink: 0;
        }

        .spine-title {
          font-family: "Inter Tight", sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #0d0d0d;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: -0.02em;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spine-plus {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(13, 13, 13, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: #0d0d0d;
          flex-shrink: 0;
          background: white;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spine:hover .spine-plus {
          transform: rotate(90deg);
        }

        @media (max-width: 820px) {
          .spine {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
          }

          .spine-number {
            order: 1;
          }

          .spine-title {
            order: 2;
            writing-mode: horizontal-tb;
            transform: none;
            flex: 1;
            margin: 0 20px;
            text-align: left;
            font-size: 16px;
          }

          .spine-plus {
            order: 3;
          }
        }
      `}</style>
    </div>
  );
}

function OpenPanel({
  project,
  reducedMotion,
}: {
  project: Project;
  reducedMotion: boolean;
}) {
  return (
    <div className="open-panel">
      <div className="open-panel-left">
        <div className="kicker">{project.kicker}</div>
        <h3 className="open-title">{project.title}</h3>
        <p className="open-description">{project.description}</p>

        <div className="features-grid">
          {project.features.slice(0, 6).map((feature, idx) => (
            <div key={idx} className="feature-cell">
              {feature}
            </div>
          ))}
        </div>

        <div className="tech-chips">
          {project.tech.map((tech) => (
            <div key={tech} className="tech-chip">
              <span className="tech-logo">{TECH_LOGOS[tech] || "⚙️"}</span>
              <span className="tech-label">{tech}</span>
            </div>
          ))}
        </div>

        <div className="button-group">
          {project.github && (
            <a href={project.github} className="btn btn-primary">
              View on GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} className="btn btn-ghost">
              Live ↗
            </a>
          )}
        </div>
      </div>

      <div className="open-panel-right">
        <IllustrativeUI project={project} />
      </div>

      <style>{`
        .open-panel {
          display: flex;
          width: 100%;
          height: 100%;
          gap: 40px;
          animation: fadeIn 0.35s ease-out 0.2s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .open-panel-left {
          display: flex;
          flex-direction: column;
          padding: 34px;
          min-width: 0;
          flex: 1;
          overflow-y: auto;
        }

        .kicker {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #999;
          margin: 0 0 20px 0;
        }

        .open-title {
          font-family: "Inter Tight", sans-serif;
          font-size: 58px;
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1;
          color: #0d0d0d;
          margin: 0 0 20px 0;
        }

        .open-description {
          font-size: 17px;
          line-height: 1.55;
          color: #3a3a3a;
          max-width: 620px;
          margin: 0 0 30px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 30px 0;
          border-top: 1px solid rgba(13, 13, 13, 0.1);
        }

        .feature-cell {
          padding: 14px 15px;
          border-bottom: 1px solid rgba(13, 13, 13, 0.1);
          border-right: 1px solid rgba(13, 13, 13, 0.1);
          font-size: 15px;
          line-height: 1.4;
          color: #3a3a3a;
        }

        .feature-cell:nth-child(even) {
          border-right: none;
        }

        .feature-cell:nth-child(5),
        .feature-cell:nth-child(6) {
          border-bottom: none;
        }

        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 30px 0;
        }

        .tech-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid rgba(13, 13, 13, 0.1);
          border-radius: 20px;
          font-size: 14px;
          background: white;
          color: #0d0d0d;
        }

        .tech-logo {
          font-size: 16px;
        }

        .tech-label {
          font-weight: 500;
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-top: auto;
          padding-top: 20px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 24px;
          border: 1px solid rgba(13, 13, 13, 0.1);
          border-radius: 8px;
          font-family: "Inter Tight", sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-primary {
          background: #0d0d0d;
          color: white;
          border: 1px solid #0d0d0d;
        }

        .btn-primary:hover {
          background: white;
          color: #0d0d0d;
        }

        .btn-ghost {
          background: white;
          color: #0d0d0d;
          border: 1px solid #0d0d0d;
        }

        .btn-ghost:hover {
          background: #0d0d0d;
          color: white;
        }

        .open-panel-right {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        @media (max-width: 820px) {
          .open-panel {
            flex-direction: column;
            gap: 20px;
          }

          .open-panel-left {
            min-width: auto;
            padding: 20px;
            overflow-y: auto;
            max-height: 100%;
          }

          .open-title {
            font-size: 28px;
          }

          .open-description {
            font-size: 14px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .feature-cell {
            border-right: none !important;
          }

          .open-panel-right {
            padding: 0 20px 20px;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}

function IllustrativeUI({ project }: { project: Project }) {
  const mockRows = [
    { tag: "REQUEST", text: "Client → REST API" },
    { tag: "DTO", text: "Entity ↔ DTO mapping" },
    { tag: "SERVICE", text: "Services · Endpoints · Logic" },
    { tag: "API", text: "Controller → Service → Repo" },
    { tag: "JPA", text: "Spring Data JPA → MySQL" },
  ];

  if (project.id === "jobportal") {
    mockRows[0] = { tag: "JWT", text: "Token-validation filter" };
    mockRows[2] = { tag: "RBAC", text: "Role-based access (3 roles)" };
    mockRows[4] = { tag: "DOCKER", text: "Docker Compose orchestration" };
  }

  return (
    <div className="illustrative-ui">
      <div className="ui-header">
        <div className="ui-tab">Schema</div>
        <div className="ui-tab">Flow</div>
        <div className="ui-tab">Docs</div>
      </div>

      <div className="ui-content">
        {mockRows.map((row, idx) => (
          <div key={idx} className="ui-row">
            <span className="ui-tag">{row.tag}</span>
            <span className="ui-text">{row.text}</span>
            {idx < mockRows.length - 1 && <div className="ui-arrow">↓</div>}
          </div>
        ))}
      </div>

      <div className="ui-footer">ILLUSTRATIVE UI</div>

      <style>{`
        .illustrative-ui {
          display: flex;
          flex-direction: column;
          background: #f4f2ee;
          border: 1px solid rgba(13, 13, 13, 0.08);
          border-radius: 28px;
          padding: 20px;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .ui-header {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .ui-tab {
          padding: 6px 12px;
          border-radius: 6px;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          text-transform: uppercase;
          background: #e9e6e0;
          color: #666;
        }

        .ui-tab:first-child {
          background: #0d0d0d;
          color: white;
        }

        .ui-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ui-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border: 1px solid rgba(13, 13, 13, 0.08);
          border-radius: 14px;
          padding: 12px;
          font-size: 13px;
          line-height: 1.4;
          position: relative;
        }

        .ui-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          text-transform: uppercase;
          background: #0d0d0d;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          flex-shrink: 0;
          letter-spacing: 0.05em;
        }

        .ui-text {
          color: #3a3a3a;
          flex: 1;
        }

        .ui-arrow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: #ccc;
        }

        .ui-footer {
          margin-top: 16px;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #999;
          text-align: right;
        }

        @media (max-width: 820px) {
          .illustrative-ui {
            border-radius: 20px;
            padding: 16px;
          }

          .ui-content {
            gap: 8px;
          }

          .ui-row {
            padding: 10px;
            font-size: 12px;
          }

          .ui-arrow {
            bottom: -16px;
          }
        }
      `}</style>
    </div>
  );
}
