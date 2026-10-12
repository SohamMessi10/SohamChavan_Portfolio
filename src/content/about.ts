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
    organization: "AI4 Research Lab",
    role: "Undergraduate Research Assistant",
    stack: ["Python", "LLM", "NLP", "PubMed API", "PostgreSQL"],
    dates: "Feb 2026 – Present",
    bullets: [
      "Build an LLM-based pipeline via the PubMed API to process database accessions from 10,000+ biomedical manuscripts",
      "Design NLP-based linkage logic between ReDU and NCBI SRA, cutting manual curation effort for multi-omics research",
      "Resolve inconsistent sample identifiers across manuscripts and databases to enable reliable cross-database matching",
    ],
  },
  {
    organization: "Nittany Data Labs",
    role: "Data Analytics Project Lead",
    stack: ["Python", "SQL", "Pandas", "NumPy", "EDA", "Jupyter"],
    dates: "Aug 2025 – Present",
    bullets: [
      "Queried and analyzed 20,000+ financial records in SQL, identifying 8 spending tracks and 4 risk indicators for clients",
      "Performed EDA and anomaly detection in Pandas and NumPy, flagging 600 high-risk transactions for review",
      "Presented Jupyter-based findings and visualizations across 4 review cycles and a final presentation to project leadership",
    ],
  },
  {
    organization: "Caterpillar",
    role: "Software Engineer Intern",
    stack: ["PyTorch", "Docker", "Kubernetes", "MLOps"],
    dates: "May 2026 – Aug 2026",
    bullets: [
      "Built a PyTorch time series forecasting model on 1M+ supply-chain records, improving forecast accuracy by 12%",
      "Deployed scalable batched inference for 520 SKUs on Docker and Kubernetes, reducing runtime to 2.85 minutes",
      "Engineered an MLOps retraining pipeline with 4-week shadow validation and metric gates for 20 Angular dashboards",
    ],
  },
  {
    organization: "Atlas Analytics",
    role: "Data Analytics Intern",
    stack: ["Scikit-learn", "PyTorch", "SQL"],
    dates: "Aug 2026 – Dec 2026",
    bullets: [
      "Trained a Scikit-learn classification model to predict customer churn, achieving 88% accuracy and 0.86 F1-score",
      "Reduced model inference latency by ~5% through PyTorch pipeline refactoring and performance benchmarking",
      "Developed SQL-backed dashboards with automated schedule refreshes, saving ~6 hours/week in manual reporting",
    ],
  },
];

export const skills = {
  languages: ["C++", "C", "Python", "Java", "SQL", "TypeScript", "Bash", "R"],
  frameworks: ["Scikit-learn", "PyTorch", "React", "Flask", "Streamlit", "Node.js", "Pydantic"],
  tools: ["Git", "Docker", "AWS", "Excel", "Jupyter", "Power BI", "PyTest", "Apache Derby", "PostgreSQL"],
  certifications: ["SAP Certified – SAP Generative AI Developer", "Columbia+ AI for Business"],
};

export type ToolkitCategory = {
  label: string;
  items: string[];
};

export const toolkit: ToolkitCategory[] = [
  { label: "Languages", items: skills.languages },
  { label: "Frameworks", items: skills.frameworks },
  { label: "Tools & Infra", items: skills.tools },
  { label: "Certifications", items: skills.certifications },
];
