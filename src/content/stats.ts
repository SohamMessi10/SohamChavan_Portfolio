export type Stat = {
  /** Exact figure from the project's README or results files. */
  value: number;
  /** Decimal places to show, so the count-up settles on the exact figure. */
  decimals: number;
  /** Text right after the number, e.g. "×" or "M paths/s". */
  unit?: string;
  label: string;
  /** Slug of the project in projects.ts the figure comes from. */
  projectSlug: string;
};

export const stats: Stat[] = [
  {
    value: 50.5,
    decimals: 1,
    unit: "M paths/s",
    label: "Monte Carlo pricing on one thread, bit-identical at any thread count",
    projectSlug: "pathforge",
  },
  {
    value: 11.1,
    decimals: 1,
    unit: "µs",
    // U+2011 (non-breaking hyphen) keeps "7.3e‑10" on one line.
    label: "per implied-vol inversion, max relative error 7.3e‑10",
    projectSlug: "vollens",
  },
  {
    value: 19,
    decimals: 0,
    unit: "of 20",
    label: "injected price jumps detected, with 0 false alerts",
    projectSlug: "streaming-risk-monitor",
  },
  {
    value: 64,
    decimals: 0,
    unit: "×",
    label: "faster than the reference matching engine at 20,000 events",
    projectSlug: "market-microstructure-playground",
  },
  {
    value: 0.915,
    decimals: 3,
    unit: "Recall@10",
    label: "for hybrid search on 96 held-out questions",
    projectSlug: "evidence-finder",
  },
  {
    value: 2,
    decimals: 0,
    unit: "prizes",
    label: "won at Cal Hacks 13.0 with Docket",
    projectSlug: "docket",
  },
];
