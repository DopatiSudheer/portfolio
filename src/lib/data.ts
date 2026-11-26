// Single source of truth. Everything here comes from the résumé (Dopati_Sudheer_Kumar_Backend.pdf).
export const PROFILE = {
  name: "Dopati Sudheer Kumar", first: "Sudheer", initials: "DSK",
  role: "Java Backend Developer",
  email: "dopatisudheerkumar14@gmail.com", phone: "+91 6369035232", phoneHref: "tel:+916369035232",
  location: "Hyderabad, India",
  linkedin: "https://linkedin.com/in/dopati-sudheer-kumar",
  github: "https://www.github.com/DopatiSudheer",
  resume: "/resume.pdf",
  resumeSummary:
    "Java Backend Developer with practical internship experience building secure REST APIs using Spring Boot, Spring Data JPA, and MySQL. Well-versed in core Java OOP principles, IoC architecture, relational schema normalization, and stateless Spring Security with JWT. Skilled in containerizing backend stacks via Docker, applying AI steering specifications and markdown skill files to accelerate development, and conducting endpoint verification using Postman alongside Swagger UI documentation.",
  languages: "English (Professional), Telugu (Native), Tamil (Conversational)",
};
export const NAV = [
  { id: "about", label: "About" }, { id: "skills", label: "Skills" }, { id: "work", label: "Work" },
  { id: "certifications", label: "Certifications" }, { id: "experience", label: "Experience" }, { id: "achievements", label: "Achievements" }, { id: "contact", label: "Contact" },
];
export const SKILL_GROUPS = [
  {
    family: "Java & Spring",
    items: [
      { name: "Java", symbol: "Jv", description: "Core language with OOP principles", logo: "java", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
      { name: "Spring Boot", symbol: "Sb", description: "REST API development framework", logo: "spring", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
      { name: "Python", symbol: "Py", description: "Scripting and automation", logo: "python", usedIn: [] },
      { name: "Spring Security", symbol: "Ss", description: "Authentication and authorization", logo: "spring", usedIn: ["Job Portal RESTful Backend"] },
      { name: "Spring Data JPA", symbol: "Jp", description: "ORM and data access layer", logo: "spring", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
      { name: "Hibernate", symbol: "Hb", description: "Object-relational mapping", logo: "hibernate", usedIn: [] },
      { name: "REST APIs", symbol: "Rs", description: "HTTP endpoint design and documentation", logo: "restapi", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
    ],
  },
  {
    family: "Frontend",
    items: [
      { name: "HTML", symbol: "Ht", description: "Semantic markup and structure", logo: "html", usedIn: [] },
      { name: "CSS", symbol: "Cs", description: "Styling and responsive layouts", logo: "css", usedIn: [] },
      { name: "JavaScript", symbol: "Js", description: "Client-side interactivity", logo: "javascript", usedIn: [] },
    ],
  },
  {
    family: "Database",
    items: [
      { name: "MySQL", symbol: "My", description: "Relational database management", logo: "mysql", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
      { name: "SQL", symbol: "Sq", description: "Query language and optimization", logo: "sql", usedIn: [] },
      { name: "H2 Database", symbol: "H2", description: "In-memory testing database", logo: "h2database", usedIn: [] },
    ],
  },
  {
    family: "Tools",
    items: [
      { name: "Docker", symbol: "Dk", description: "Container orchestration", logo: "docker", usedIn: ["Job Portal RESTful Backend"] },
      { name: "Docker Compose", symbol: "Dc", description: "Multi-container coordination", logo: "docker", usedIn: [] },
      { name: "Git", symbol: "Gt", description: "Version control system", logo: "git", usedIn: [] },
      { name: "Maven", symbol: "Mv", description: "Build automation tool", logo: "maven", usedIn: [] },
      { name: "IntelliJ IDEA", symbol: "Ij", description: "Java development IDE", logo: "intellij", usedIn: [] },
      { name: "Eclipse", symbol: "Ec", description: "Integrated development environment", logo: "eclipse", usedIn: [] },
      { name: "VS Code", symbol: "Vc", description: "Lightweight code editor", logo: "vscode", usedIn: [] },
      { name: "Postman", symbol: "Pm", description: "API testing and documentation", logo: "postman", usedIn: ["Hospital Management System", "Job Portal RESTful Backend"] },
    ],
  },
  {
    family: "Core Concepts",
    items: [
      { name: "OOP", symbol: "Oo", description: "Object-oriented programming", logo: "oop", usedIn: [] },
      { name: "Multithreading", symbol: "Mt", description: "Concurrent programming", logo: "multithreading", usedIn: [] },
      { name: "Exceptions", symbol: "Ex", description: "Error handling mechanisms", logo: "exceptions", usedIn: [] },
      { name: "Collections", symbol: "Co", description: "Data structure frameworks", logo: "collections", usedIn: [] },
    ],
  },
  {
    family: "AI Tools",
    items: [
      { name: "Kiro", symbol: "Ki", description: "Spec-driven development assistant", logo: "kiro", usedIn: [] },
      { name: "Amazon Q Developer", symbol: "Aq", description: "AWS AI coding assistant", logo: "amazonq", usedIn: [] },
      { name: "ChatGPT", symbol: "Cg", description: "OpenAI language model", logo: "chatgpt", usedIn: [] },
      { name: "Claude", symbol: "Cl", description: "Anthropic AI assistant", logo: "claude", usedIn: [] },
      { name: "Gemini AI", symbol: "Gm", description: "Google's multimodal AI", logo: "gemini", usedIn: [] },
    ],
  },
];
export const EXPERIENCE = [
  { id: "hms", period: "Jan 2026 – Apr 2026", title: "Hospital Management System", place: "Backend Project · Academic",
    points: [
      "Architected secure Spring Boot REST APIs across 2 primary service controllers coordinating 3 distinct workflows: patient appointment booking, medical history records tracking, and administrative management portals.",
      "Implemented standardized JSON payloads with semantic HTTP status codes, custom exceptions, DTO mapping to decouple domain entities from API layers, and CORS policies with request validation.",
      "Designed 6 normalized MySQL tables with cascading foreign keys enforcing referential integrity, verified all endpoints with Postman test collections.",
    ] },
  { id: "jobportal", period: "May 2026 – Sep 2026", title: "Job Portal RESTful Backend", place: "Backend Project · Academic",
    points: [
      "Built modular REST endpoints across a 3-tier Controller-Service-Repository pattern with stateless authentication using Spring Security and JWT custom filter pipelines.",
      "Implemented Role-Based Access Control for 3 user roles, BCrypt password hashing, Jakarta Validation, and global exception handling with N+1 query optimization using tuned JOIN FETCH.",
      "Containerized backend and database services via Docker Compose with persistent volume mounts, documented API contracts in Swagger UI, and created Postman regression collections.",
    ] },
  { id: "next", period: "NEXT", title: "Your team?", place: "Open to relocation.",
    isNext: true, points: [] },
];
export const EDUCATION = [
  { id: "btech", period: "OCT-2022 to APR-2026", title: "B.Tech, Computer Science and Engineering", place: "Sri Venkateswara College of Engineering and Technology, Chittoor", detail: "CGPA 8.01 / 10.0", achievements: ["Microprocessor and Interfacing (NPTEL) - 62.0%", "Human Computer Interaction (NPTEL) - 80.0%"], gradYear: "2026" },
];
export const PROJECTS = [
  { id: "hms", index: "01", title: "Hospital Management System", kicker: "PERSONAL PROJECT · JAN 2026 – APR 2026", period: "Jan 2026 – Apr 2026",
    description: "Backend healthcare modules coordinating 3 distinct workflows: scheduled patient appointment booking, clinical medical history records tracking, and departmental administrative management portals.",
    features: ["Role-Based Access Control (RBAC) securing endpoints and workflows across Admin, Doctor, and Patient portals", "Secure Spring Boot REST APIs across 2 primary service controllers", "Standardized JSON payloads with semantic HTTP status codes and custom exceptions", "DTO mapping to decouple domain entities from API layers", "CORS policies and request validation to protect sensitive clinical data", "6 normalized MySQL tables with cascading foreign keys managing user roles, appointments, and medical history"],
    tech: ["Java", "Spring Boot", "JPA", "SQL", "Postman"], github: null as string | null, live: "https://hospital-management-frontend-xi.vercel.app", liveLabel: "Live",
    workflow: [
      { label: "SCHEMA", desc: "SCHEMA" },
      { label: "REQUEST", desc: "Client → REST API" },
      { label: "DTO", desc: "Entity ↔ DTO mapping" },
      { label: "SERVICE", desc: "Services · Endpoints · Logic" },
      { label: "API", desc: "Controller → Service → Repo" },
      { label: "JPA", desc: "Spring Data JPA → MySQL" },
    ]
  },
  { id: "jobportal", index: "02", title: "Job Portal RESTful Backend", kicker: "PERSONAL PROJECT · MAY 2026 – SEP 2026", period: "May 2026 – Sep 2026",
    description: "Modular REST endpoints across a 3-tier Controller-Service-Repository pattern, with containerized backend and database services orchestrated via Docker Compose and persistent volume mounts.",
    features: ["Stateless auth with Spring Security and JWT, custom filter pipelines", "Role-Based Access Control for 3 user roles", "BCrypt hashing, Jakarta Validation, global exception handling", "Bidirectional mappings; N+1 fixed with tuned JOIN FETCH", "API contracts documented in Swagger UI", "Postman regression collections and logging diagnostics"],
    tech: ["Java", "Spring Boot", "JPA", "MySQL", "Docker", "JWT"], github: null as string | null, live: "https://sk-jobportal.vercel.app", liveLabel: "Live",
    workflow: [
      { label: "SCHEMA", desc: "SCHEMA" },
      { label: "JWT", desc: "Token-validation filter" },
      { label: "DTO", desc: "Entity ↔ DTO mapping" },
      { label: "RBAC", desc: "Role-based access (3 roles)" },
      { label: "API", desc: "Controller → Service → Repo" },
      { label: "DOCKER", desc: "Docker Compose orchestration" },
    ]
  },
];
export const CERTIFICATIONS = [
  { title: "Microprocessor and Interfacing", issuer: "NPTEL", grade: "Elite", score: "62.0%", duration: "Jan-2025" },
  { title: "Human Computer Interaction", issuer: "NPTEL", grade: "Elite + Silver", score: "80.0%", duration: "Jan-2026" },
];
export const ACHIEVEMENTS = [
  { label: "GeeksforGeeks", caption: "Algorithmic problems solved in Java and Python", detail: "Institute Rank 26", value: 120, suffix: "+", logo: null as string | null },
  { label: "Microprocessor and Interfacing", caption: "NPTEL Online Course", detail: "Elite Grade · 62.0%", value: null as number | null, suffix: "", logo: null as string | null },
  { label: "Human Computer Interaction", caption: "NPTEL Online Course", detail: "Elite + Silver Grade · 80.0%", value: null as number | null, suffix: "", logo: null as string | null },
  { label: "Volleyball", caption: "District Champion, Siddhartha Inter-Collegiate Sports Meet", detail: "Sports honours", value: null as number | null, suffix: "", logo: null as string | null },
];
