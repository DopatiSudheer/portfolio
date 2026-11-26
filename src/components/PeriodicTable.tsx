"use client";
import { useState, useRef, useEffect } from "react";

export interface Tile {
  symbol: string;
  name: string;
  family: string;
  usedIn?: string[];
  logo?: string;
}

interface PeriodicTableProps {
  tiles: Tile[];
  logoGlows?: Record<string, string>;
  conceptIcons?: Record<string, (props: any) => React.ReactNode>;
}

const DEFAULT_LOGO_GLOWS: Record<string, string> = {
  java: "#f89917",
  spring: "#6db33f",
  python: "#3776ab",
  html: "#e34c26",
  css: "#563d7c",
  javascript: "#f7df1e",
  mysql: "#00758f",
  sql: "#336791",
  h2database: "#3f6ea6",
  docker: "#2496ed",
  git: "#f1502f",
  maven: "#aa215e",
  intellij: "#0078d7",
  eclipse: "#2c2255",
  vscode: "#007acc",
  postman: "#ff6c37",
  kiro: "#6366f1",
  aws: "#ff9900",
  chatgpt: "#10a37f",
  anthropic: "#d97706",
  google: "#4285f4",
  restapi: "#4CAF50",
  hibernate: "#59666c",
  springdatajpa: "#6db33f",
  springsecurity: "#6db33f",
  dockercompose: "#2496ed",
  oop: "#FF6B6B",
  multithreading: "#4ECDC4",
  exceptions: "#FFE66D",
  collections: "#95E1D3",
  amazonq: "#FF9900",
  claude: "#FF6B6B",
  gemini: "#4285F4",
};

export default function PeriodicTable({
  tiles,
  logoGlows = DEFAULT_LOGO_GLOWS,
  conceptIcons,
}: PeriodicTableProps) {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(
    tiles.length > 0 ? tiles[0] : null
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [reducedMotion, setReducedMotion] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Extract unique families
  const families = Array.from(
    new Map(tiles.map((t) => [t.family, t.family])).values()
  );
  const filterOptions = ["All", ...families];

  // Add position indices to tiles
  const tilesWithPosition = tiles.map((tile, idx) => ({
    ...tile,
    index: idx + 1,
    row: Math.floor(idx / 8),
    col: idx % 8,
  }));

  // Filter tiles
  const isVisible = (tile: Tile): boolean => {
    if (activeFilter === "All") return true;
    return tile.family === activeFilter;
  };

  // Setup intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Setup prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const getLogoGlow = (tile: Tile): string => {
    if (tile.logo && tile.logo in logoGlows) {
      return logoGlows[tile.logo];
    }
    return "#0d0d0d";
  };

  return (
    <section className="periodic-table" aria-label="Periodic Table">
      <div className="periodic-table__wrap">
        <div className="periodic-table__header">
          <h2 className="periodic-table__label">02 — SKILLS</h2>
          <h3 className="periodic-table__title">
            The periodic table of my <span className="periodic-table__subtitle">stack.</span>
          </h3>
          <div className="periodic-table__divider-line" />
        </div>

        <div className="periodic-table__filters">
          {filterOptions.map((family) => (
            <button
              key={family}
              className={`periodic-table__chip ${
                activeFilter === family
                  ? "periodic-table__chip--active"
                  : "periodic-table__chip--inactive"
              }`}
              onClick={() => setActiveFilter(family)}
              aria-pressed={activeFilter === family}
              type="button"
            >
              {family}
            </button>
          ))}
        </div>

        <div className="periodic-table__layout">
          <div ref={gridRef} className="periodic-table__grid">
            {tilesWithPosition.map((tile, idx) => (
              <button
                key={`${tile.name}-${idx}`}
                className={`periodic-table__tile ${
                  isVisible(tile)
                    ? "periodic-table__tile--visible"
                    : "periodic-table__tile--dimmed"
                } ${
                  animateIn && !reducedMotion
                    ? "periodic-table__tile--animate-in"
                    : ""
                }`}
                style={
                  animateIn && !reducedMotion
                    ? {
                        transitionDelay: `${(tile.row + tile.col) * 40}ms`,
                      }
                    : {}
                }
                onMouseEnter={() => setSelectedTile(tile)}
                onFocus={() => setSelectedTile(tile)}
                type="button"
                aria-label={`${tile.name}, ${tile.family}`}
                tabIndex={0}
              >
                <div className="periodic-table__tile-number">
                  {String(tile.index).padStart(2, "0")}
                </div>
                <div className="periodic-table__tile-symbol">{tile.symbol}</div>
                <div className="periodic-table__tile-name">{tile.name}</div>
                <div className="periodic-table__tile-family">{tile.family}</div>
              </button>
            ))}
          </div>

          <aside
            className="periodic-table__inspector"
            aria-live="polite"
            aria-label="Tile details"
          >
            {selectedTile && (
              <div className="periodic-table__inspector-content">
                <div className="periodic-table__logo-wrapper">
                  {selectedTile.logo ? (
                    <>
                      <div
                        className="periodic-table__logo-glow"
                        style={{
                          background: `radial-gradient(circle, ${getLogoGlow(
                            selectedTile
                          )}40, transparent 70%)`,
                        }}
                      />
                      <img
                        src={`/logos/${selectedTile.logo}.png`}
                        alt={selectedTile.name}
                        className="periodic-table__logo"
                      />
                    </>
                  ) : conceptIcons && conceptIcons[selectedTile.name] ? (
                    conceptIcons[selectedTile.name]({})
                  ) : null}
                </div>
                <h4 className="periodic-table__inspector-name">
                  {selectedTile.name}
                </h4>
                <p className="periodic-table__inspector-family">
                  {selectedTile.family}
                </p>
                <p className="periodic-table__inspector-label">USED IN</p>
                {selectedTile.usedIn && selectedTile.usedIn.length > 0 ? (
                  <p className="periodic-table__inspector-projects">
                    {selectedTile.usedIn.join(", ")}
                  </p>
                ) : (
                  <p className="periodic-table__inspector-projects">
                    Listed in technical skills.
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>

      <style>{`
        .periodic-table {
          padding: 80px 20px 120px;
          background: #f4f2ee;
        }

        .periodic-table__wrap {
          max-width: 100%;
          margin: 0 auto;
          width: 100%;
          overflow: hidden;
        }

        .periodic-table__header {
          margin-bottom: 60px;
        }

        .periodic-table__label {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #999;
          margin: 0 0 16px 0;
        }

        .periodic-table__title {
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0d0d0d;
          margin: 0;
        }

        .periodic-table__subtitle {
          font-style: italic;
          font-weight: 400;
          color: #666;
        }

        .periodic-table__divider-line {
          width: 100%;
          height: 1px;
          background: #999;
          margin-top: 20px;
        }

        .periodic-table__filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .periodic-table__chip {
          font-family: "Inter Tight", sans-serif;
          height: 44px;
          padding: 0 18px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 24px;
          cursor: pointer;
          border: 1px solid;
          transition: all 0.3s ease;
          background: white;
          color: #0d0d0d;
        }

        .periodic-table__chip--inactive {
          border-color: rgba(13, 13, 13, 0.1);
          background: white;
          color: #0d0d0d;
        }

        .periodic-table__chip--inactive:hover {
          border-color: rgba(13, 13, 13, 0.2);
        }

        .periodic-table__chip--active {
          background: #0d0d0d;
          color: white;
          border-color: #0d0d0d;
        }

        .periodic-table__layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 60px;
          align-items: start;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .periodic-table__grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
          overflow: hidden;
        }

        .periodic-table__tile {
          width: 100%;
          max-width: 132px;
          aspect-ratio: 1 / 1;
          background: white;
          border: 1px solid rgba(13, 13, 13, 0.08);
          border-radius: 18px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          font-family: "Inter Tight", sans-serif;
          cursor: pointer;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(0);
        }

        .periodic-table__tile:focus-visible {
          outline: 2px solid #0d0d0d;
          outline-offset: -2px;
        }

        .periodic-table__tile--animate-in {
          opacity: 0;
          transform: translateY(16px);
          animation: periodic-table-wave-reveal 0.6s ease-out forwards;
        }

        @keyframes periodic-table-wave-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .periodic-table__tile--animate-in {
            animation: none;
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0 !important;
          }
        }

        .periodic-table__tile--visible {
          background: white;
          opacity: 1;
          transform: translateY(0);
        }

        .periodic-table__tile--visible:hover,
        .periodic-table__tile--visible:focus-visible {
          border: 1.5px solid #0d0d0d;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .periodic-table__tile--dimmed {
          background: transparent;
          border: 1px solid rgba(119, 117, 111, 0.2);
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s ease;
        }

        .periodic-table__tile--dimmed:hover {
          border: 1px solid rgba(119, 117, 111, 0.4);
        }

        .periodic-table__tile--dimmed .periodic-table__tile-number,
        .periodic-table__tile--dimmed .periodic-table__tile-symbol,
        .periodic-table__tile--dimmed .periodic-table__tile-name,
        .periodic-table__tile--dimmed .periodic-table__tile-family {
          opacity: 0.35;
          transition: opacity 0.5s ease;
        }

        .periodic-table__tile-number {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0;
          color: #a9a6a0;
          line-height: 1;
        }

        .periodic-table__tile-symbol {
          font-family: "Inter Tight", sans-serif;
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0d0d0d;
          line-height: 1;
          margin: 4px 0;
        }

        .periodic-table__tile-name {
          font-family: "Inter Tight", sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          color: #3a3a3a;
          line-height: 1.2;
          word-break: break-word;
          text-align: left;
          max-height: 26px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .periodic-table__tile-family {
          font-family: "JetBrains Mono", monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #77756f;
          margin-top: auto;
        }

        .periodic-table__inspector {
          position: sticky;
          top: 120px;
          width: 380px;
          background: white;
          border: 1px solid rgba(13, 13, 13, 0.08);
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          height: fit-content;
        }

        .periodic-table__inspector-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          text-align: center;
        }

        .periodic-table__inspector-content > * {
          padding: 10px 0;
        }

        .periodic-table__inspector-content > .periodic-table__divider {
          padding: 0;
          margin: 8px 0;
        }

        .periodic-table__logo-wrapper {
          position: relative;
          width: 190px;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .periodic-table__logo-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          filter: blur(40px);
          z-index: 0;
        }

        .periodic-table__logo {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: periodic-table-logo-pop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes periodic-table-logo-pop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.04);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .periodic-table__logo {
            animation: none;
            opacity: 1;
            transform: scale(1);
          }
        }

        .periodic-table__inspector-name {
          font-family: "Inter Tight", sans-serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0d0d0d;
          margin: 0;
          line-height: 1.2;
        }

        .periodic-table__inspector-family {
          font-family: "JetBrains Mono", monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #77756f;
          margin: 0;
        }

        .periodic-table__divider {
          width: 100%;
          height: 1px;
          background: #0d0d0d;
          margin: 0;
        }

        .periodic-table__inspector-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #77756f;
          margin: 0;
        }

        .periodic-table__inspector-projects {
          font-family: "Inter", sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #0d0d0d;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 1200px) {
          .periodic-table__layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .periodic-table__inspector {
            position: static;
            width: 100%;
            max-width: 400px;
            margin: 60px auto 0;
          }

          .periodic-table__grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .periodic-table__grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
          }

          .periodic-table__tile {
            padding: 8px;
          }

          .periodic-table__tile-symbol {
            font-size: 28px;
          }

          .periodic-table__tile-name {
            font-size: 11px;
          }

          .periodic-table__chip {
            height: 40px;
            padding: 0 16px;
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .periodic-table__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .periodic-table__title {
            font-size: 32px;
          }

          .periodic-table__inspector-name {
            font-size: 28px;
          }

          .periodic-table__inspector {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
