export type Project = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  outcomes?: string[];
  links?: {
    repo?: string;
    demo?: string;
  };
};

// TODO: add real projects here once confirmed. Left empty intentionally —
// no placeholder/fabricated project data.
export const projects: Project[] = [];
