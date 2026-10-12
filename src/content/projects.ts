export type Project = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  dates?: string;
  outcomes?: string[];
};

export const projects: Project[] = [
  {
    slug: "finsight",
    name: "FinSight",
    summary: "A real-time financial data API and dashboard for market data and anomaly detection.",
    problem:
      "Give users reliable real-time access to market data and automatically flag unusual price activity.",
    role: "Built the data platform and trained the anomaly-detection model.",
    stack: ["Python", "REST API", "Scikit-learn"],
    outcomes: [
      "Built a real-time data platform to ingest, store, and serve market data via REST APIs for 500+ stock tickers",
      "Trained a Scikit-learn classifier to flag unusual price moves, ~25% more accurate than a z-score baseline",
    ],
  },
  {
    slug: "ledger-life",
    name: "Ledger Life",
    summary: "A full-stack Java application for tracking income, expenses, and budgets.",
    problem:
      "Give users a structured way to track income and expenses across budgeting categories with automated reporting.",
    role: "Developed the application end-to-end, including the data layer.",
    stack: ["Java", "SQL", "Apache Derby", "DAO Architecture"],
    dates: "Oct 2025 – Jan 2026",
    outcomes: [
      "Developed a full-stack Java application to track income, expenses, and 10+ budgeting categories",
      "Designed relational schemas and DAO architecture supporting 1,000+ transactions and monthly summaries",
    ],
  },
  {
    slug: "classqueue",
    name: "ClassQueue",
    summary: "A database-driven system simulating course enrollment, waitlists, and admin workflows.",
    problem:
      "Manage course enrollment, capacity limits, and waitlists reliably using transactional database operations.",
    role: "Engineered the database schema and enrollment/waitlist logic.",
    stack: ["PostgreSQL", "Database Design", "Apache Derby", "SQL"],
    dates: "Jan 2025 – May 2025",
    outcomes: [
      "Built a database-driven system simulating enrollment, waitlists, and administrative workflows",
      "Implemented enrollment caps, waitlist promotion, and role-based access using transactional SQL queries",
    ],
  },
];
