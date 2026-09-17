export const education = {
  school: "The Pennsylvania State University",
  degree: "B.S. in Computational Data Science, Minor in Finance",
  gpa: "3.8 / 4.0",
  graduation: "December 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Machine Learning",
    "Financial Analytics & Modeling",
    "Probability & Statistics",
  ],
  organizations: [
    "Nittany AI Alliance",
    "Nittany Data Labs",
    "Engineering Lead Society",
    "Consulting Training Program",
    "THON",
  ],
};

export type Experience = {
  organization: string;
  role: string;
  stack: string[];
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    organization: "Penn State University — Dept. of Information Sciences & Biochemistry",
    role: "Undergraduate Student Researcher",
    stack: ["Python", "LLM", "NLP", "PubMed API", "PostgreSQL"],
    dates: "Feb 2026 – Present",
    bullets: [
      "Build an LLM-based pipeline to extract and classify database accessions from biomedical manuscripts via the PubMed API",
      "Design NLP-based linkage logic between ReDU and NCBI SRA, cutting manual curation effort for multi-omics research",
      "Resolve inconsistent sample identifiers across manuscripts and databases to enable reliable cross-database matching",
    ],
  },
  {
    organization: "Nittany Data Labs",
    role: "Data Analytics Project Lead",
    stack: ["Python", "SQL", "Pandas", "NumPy", "EDA", "Jupyter"],
    dates: "Sept 2025 – Present",
    bullets: [
      "Translate 20,000+ financial records into actionable data problems using SQL to surface spending trends and risk indicators",
      "Execute EDA & anomaly detection with Pandas and NumPy, identifying behavioral patterns and anomalies for financial decisions",
      "Synthesize findings into Jupyter-based executive summaries, improving reporting clarity and decision-making for leadership",
    ],
  },
  {
    organization: "Atlas Analytics",
    role: "Data Science Analyst",
    stack: ["PyTorch", "Python", "SQL", "Pandas", "Power BI"],
    dates: "Jan 2026 – Mar 2026",
    bullets: [
      "Engineered transformer-based time series models in PyTorch, improving multi-horizon demand forecast accuracy by 10%",
      "Profiled and refactored the PyTorch inference pipeline, adding automated benchmarking that cut latency by 5%",
      "Built and deployed SQL-backed BI dashboards with scheduled data refreshes, removing 6 hours/week of manual reporting",
    ],
  },
  {
    organization: "Nimbus Analytics Labs",
    role: "Operations Analytics Lead",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    dates: "Aug 2025 – Dec 2025",
    bullets: [
      "Built a Python data pipeline to process 10,000+ customer and financial records, surfacing behavioral and retention patterns",
      "Engineered a reusable feature-preprocessing module that cut dimensionality by 30% and reduced model training time by 35%",
      "Trained and deployed supervised ML classifiers to score churn risk and segment customers into behavioral cohorts",
    ],
  },
];

export const skills = {
  languages: ["Python", "SQL", "Java", "R", "HTML/CSS", "JavaScript", "Bash"],
  frameworks: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "Django", "Flask", "Streamlit", "Node.js"],
  tools: ["Git", "Docker", "AWS", "Excel", "Jupyter", "Power BI", "PyTest", "Apache Derby", "PostgreSQL", "PubMed API", "JDBC"],
  certifications: ["SAP Certified – SAP Generative AI Developer"],
};
