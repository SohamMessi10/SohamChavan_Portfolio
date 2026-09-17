export type Project = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  dates: string;
  outcomes?: string[];
};

export const projects: Project[] = [
  {
    slug: "customer-risk-scoring",
    name: "Customer Risk Scoring Model",
    summary: "Supervised ML models to score churn probability from customer records.",
    problem:
      "Predict customer churn risk from a large behavioral dataset so it can be acted on before customers leave.",
    role: "Developed the models end-to-end: feature analysis, model training, and validation.",
    stack: ["Python", "Pandas", "NumPy", "EDA", "Scikit-learn"],
    dates: "Aug 2025 – Dec 2025",
    outcomes: [
      "Developed supervised ML models (Logistic Regression, Random Forest) to score churn probability from 10,000+ records",
      "Reduced feature space ~30% via correlation analysis and EDA; validated performance using ROC-AUC",
    ],
  },
  {
    slug: "stock-analyzer-application",
    name: "Stock Analyzer Application",
    summary: "A full-stack Java application for tracking income, expenses, and budgets.",
    problem:
      "Give users a structured way to track income and expenses across budgeting categories with automated reporting.",
    role: "Architected the application and its data layer.",
    stack: ["Java", "SQL", "Apache Derby", "OOP", "JDBC", "DAO Architecture"],
    dates: "Oct 2025 – Jan 2026",
    outcomes: [
      "Architected a full-stack Java application tracking income and expenses across 10+ budgeting categories with automated financial reporting",
      "Designed relational schemas and DAO architecture supporting 1,000+ transactions with automated monthly summaries",
    ],
  },
  {
    slug: "course-scheduling-enrollment-system",
    name: "Course Scheduling & Enrollment System",
    summary: "A database-driven enrollment system with waitlist management and admin workflows.",
    problem:
      "Manage course enrollment, capacity limits, and waitlists reliably using transactional database operations.",
    role: "Engineered the database schema and enrollment/waitlist logic.",
    stack: ["PostgreSQL", "Database Design", "Apache Derby", "SQL"],
    dates: "Jan 2025 – May 2025",
    outcomes: [
      "Engineered a database-driven enrollment system with waitlist management and administrative workflows using transactional SQL",
      "Implemented enrollment caps, automated waitlist promotion, and role-based access control to ensure system integrity",
    ],
  },
];
