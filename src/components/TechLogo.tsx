"use client";

const BRAND: Record<string, string> = {
  Java: "java",
  "Spring Boot": "spring",
  "Spring Web": "spring",
  "Spring Data JPA": "spring",
  Hibernate: "hibernate",
  "Spring Security": "spring",
  "Spring AOP": "spring",
  MySQL: "mysql",
  "H2 Database": "h2database",
  "IntelliJ IDEA": "intellij",
  Docker: "docker",
  "Docker Compose": "docker",
  Git: "git",
  GitHub: "github",
  Maven: "maven",
  Postman: "postman",
  "Swagger UI": "swagger",
  SQL: "sql",
  "Kiro AI": "kiro",
  Codex: "openai",
  Gemini: "google",
  Claude: "anthropic",
  "Amazon Q Developer": "aws",
};

const ICONS: Record<string, string> = {
  "Relational Schema Design": "database",
  "JPA Auditing": "log",
  "Transaction Management": "transaction",
  "REST Docs": "docs",
};

export function isBrand(name: string): boolean {
  return name in BRAND;
}

export function isConcept(name: string): boolean {
  return name in ICONS;
}

interface TechLogoProps {
  name: string;
  className?: string;
}

export function TechLogo({ name, className = "w-32 h-32" }: TechLogoProps) {
  const brandKey = BRAND[name];
  const iconKey = ICONS[name];

  if (brandKey) {
    return (
      <img
        src={`/logos/${brandKey}.svg`}
        alt={name}
        className={`${className} object-contain`}
      />
    );
  }

  if (iconKey) {
    return <ConceptIcon icon={iconKey} className={className} />;
  }

  // Fallback
  return <div className={`${className} bg-gray-200 rounded flex items-center justify-center text-gray-400`}>?</div>;
}

function ConceptIcon({ icon, className }: { icon: string; className: string }) {
  const svgClass = `${className} stroke-black stroke-1.5 fill-none`;

  switch (icon) {
    case "database":
      return (
        <svg viewBox="0 0 100 100" className={svgClass}>
          <ellipse cx="50" cy="20" rx="30" ry="15" />
          <path d="M 20 20 L 20 80 Q 50 95 80 80 L 80 20" />
          <ellipse cx="50" cy="80" rx="30" ry="15" />
          <path d="M 20 45 Q 50 55 80 45" />
        </svg>
      );
    case "log":
      return (
        <svg viewBox="0 0 100 100" className={svgClass}>
          <rect x="15" y="15" width="70" height="70" rx="5" />
          <line x1="25" y1="30" x2="75" y2="30" />
          <line x1="25" y1="45" x2="75" y2="45" />
          <line x1="25" y1="60" x2="60" y2="60" />
          <line x1="25" y1="75" x2="50" y2="75" />
        </svg>
      );
    case "transaction":
      return (
        <svg viewBox="0 0 100 100" className={svgClass}>
          <circle cx="50" cy="50" r="35" />
          <circle cx="30" cy="35" r="12" />
          <circle cx="70" cy="65" r="12" />
          <path d="M 40 30 L 60 70" strokeDasharray="5,5" />
        </svg>
      );
    case "docs":
      return (
        <svg viewBox="0 0 100 100" className={svgClass}>
          <rect x="20" y="15" width="60" height="70" rx="5" />
          <line x1="30" y1="30" x2="70" y2="30" />
          <line x1="30" y1="45" x2="70" y2="45" />
          <line x1="30" y1="60" x2="55" y2="60" />
        </svg>
      );
    default:
      return <div className={className} />;
  }
}
