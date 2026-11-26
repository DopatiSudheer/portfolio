"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";

const css = `
.work-section {
  padding: 60px 20px;
  background: #f4f2ee;
}

.work-wrap {
  max-width: 1320px;
  margin: 0 auto;
}

.work-header {
  margin-bottom: 60px;
}

.work-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #999;
  margin: 0 0 16px 0;
}

.work-title {
  font-family: "Inter Tight", sans-serif;
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  color: #0d0d0d;
  margin: 0;
}

.work-subtitle {
  font-style: italic;
  font-weight: 400;
  color: #666;
  font-family: "Instrument Serif", serif;
}

.work-divider {
  width: 100%;
  height: 1px;
  background: #999;
  margin-top: 20px;
}

.gallery {
  display: flex;
  gap: 12px;
  height: min(92svh, 800px);
}

.panel {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  border-radius: 28px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: flex-grow 0.9s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s;
  text-align: left;
  display: block;
  border: none;
  padding: 0;
}

.panel.open {
  flex-grow: 8;
  cursor: default;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1), 0 40px 80px -40px rgba(0,0,0,0.25);
}

.spine {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 26px 0;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel.open .spine {
  opacity: 0;
  pointer-events: none;
}

.spine-index {
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #999;
}

.spine-title {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  white-space: nowrap;
}

.spine-plus {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1);
  display: grid;
  place-items: center;
  font-size: 20px;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s;
}

.panel:hover .spine-plus {
  transform: rotate(90deg);
  background: #0d0d0d;
  color: #fff;
}

.body {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 28px;
  padding: clamp(20px, 2.4vw, 32px);
  min-width: min(880px, 100%);
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.panel.open .body {
  opacity: 1;
  transform: none;
  pointer-events: auto;
  transition-delay: 0.25s;
}

.body-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}

.body-left::-webkit-scrollbar {
  display: none;
}

.kick {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #999;
}

.body-title {
  font-size: clamp(28px, 3.2vw, 46px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  margin: 0;
}

.body-desc {
  font-size: 14.5px;
  line-height: 1.55;
  color: #3a3a3a;
  margin: 0;
}

.features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.features-list li {
  font-size: 13px;
  padding: 6px 0;
  border-top: 1px solid rgba(13,13,13,0.1);
  text-wrap: balance;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1);
  font-size: 12px;
}

.links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  text-decoration: none;
  transition: transform 0.3s, background 0.3s, color 0.3s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #0d0d0d;
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: #222;
}

.btn-ghost {
  background: transparent;
  color: #0d0d0d;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.3);
}

.btn-ghost:hover {
  background: rgba(13,13,13,0.05);
}

.workflow {
  border-radius: 20px;
  background: #f4f2ee;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1);
  padding: 18px;
  position: relative;
  overflow: hidden;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.panel.open .workflow {
  clip-path: inset(0 0 0 0);
}

.workflow-header {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.workflow-header span {
  padding: 2px 8px;
  background: transparent;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
}

.workflow-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,0.1);
  font-size: 12px;
}

.workflow-label {
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  font-size: 10.5px;
  background: #0d0d0d;
  color: #fff;
  border-radius: 6px;
  padding: 2px 7px;
  min-width: 60px;
  text-align: center;
}

.workflow-desc {
  flex: 1;
  font-size: 12px;
  color: #333;
}

.arrow {
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 1;
  padding: 2px 0;
}

.workflow-label {
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  font-size: 10.5px;
  background: #0d0d0d;
  color: #fff;
  border-radius: 6px;
  padding: 2px 7px;
}

.workflow small {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  position: absolute;
  right: 14px;
  bottom: 10px;
}

@media (max-width: 860px) {
  .gallery {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }

  .panel {
    flex: none;
    height: 76px;
    transition: height 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .panel.open {
    height: auto;
    min-height: 76px;
  }

  .spine {
    flex-direction: row;
    padding: 0 22px;
  }

  .spine-title {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 18px;
    flex: 1;
    margin-left: 14px;
  }

  .body {
    position: relative;
    grid-template-columns: 1fr;
    min-width: 0;
    display: none;
    padding-top: 84px;
  }

  .panel.open .body {
    display: grid;
  }

  .panel.open .spine {
    opacity: 1;
    pointer-events: none;
    height: 76px;
    inset: 0 0 auto 0;
  }

  .workflow {
    min-height: 240px;
  }
}
`;

export default function Projects() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="work" className="work-section" aria-label="Selected work">
      <style>{css}</style>
      <div className="work-wrap">
        <div className="work-header">
          <h2 className="work-label">03 — SELECTED WORK</h2>
          <h3 className="work-title">
            Things I've <span className="work-subtitle">built.</span>
          </h3>
          <div className="work-divider" />
        </div>

        <div className="gallery">
          {PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              className={`panel ${idx === openIdx ? "open" : ""}`}
              onMouseEnter={() => setOpenIdx(idx)}
              onClick={() => setOpenIdx(idx)}
              onFocus={() => setOpenIdx(idx)}
              tabIndex={0}
              aria-label={`${project.title}${idx === openIdx ? "" : " — click to open"}`}
              aria-expanded={idx === openIdx}
            >
              <div className="spine" aria-hidden="true">
                <span className="spine-index">{project.index}</span>
                <span className="spine-title">{project.title}</span>
                <span className="spine-plus">+</span>
              </div>

              <div className="body">
                <div className="body-left">
                  <p className="kick">{project.kicker}</p>
                  <h3 className="body-title">{project.title}</h3>
                  <p className="body-desc">{project.description}</p>
                  <ul className="features-list">
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="tech-chips">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                      >
                        {project.liveLabel} ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="workflow">
                  <div className="workflow-header">
                    <span>SCHEMA</span>
                    <span>FLOW</span>
                    <span>DOCS</span>
                  </div>
                  {project.workflow?.map((step, i) => (
                    <div key={i}>
                      <div className="workflow-row">
                        <span className="workflow-label">{step.label}</span>
                        <span className="workflow-desc">{step.desc}</span>
                      </div>
                      {i < (project.workflow?.length || 0) - 1 && (
                        <div className="arrow">↓</div>
                      )}
                    </div>
                  ))}
                  <small>Illustrative</small>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
