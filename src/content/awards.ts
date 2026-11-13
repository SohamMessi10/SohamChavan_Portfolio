export type Prize = {
  /** Prize name exactly as listed on Devpost. */
  name: string;
  placement: string;
};

export type Award = {
  event: string;
  dates: string;
  project: string;
  /** Slug of the matching entry in projects.ts. */
  projectSlug: string;
  devpostUrl: string;
  prizes: Prize[];
};

export const awards: Award[] = [
  {
    event: "Cal Hacks 13.0",
    dates: "Oct 24–25, 2026",
    project: "Docket",
    projectSlug: "docket",
    devpostUrl: "https://devpost.com/software/docket-ezaum8",
    prizes: [
      { name: "[Fetch.ai] Best Use of Fetch.ai", placement: "Special mention" },
      { name: "[Mana] Best Use of Mana", placement: "Second place" },
    ],
  },
];
