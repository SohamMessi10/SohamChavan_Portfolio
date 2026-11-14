export const projectCategories = ["Markets", "Data/ML", "Backend"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectFigure = {
  /** Path under /public, e.g. "/projects/pathforge/qmc-convergence.png". */
  src: string;
  alt: string;
  /** Intrinsic size in pixels, so the case-study page reserves the right space. */
  width: number;
  height: number;
  /** "contain" shows the whole image (wide charts); "cover" crops from the top (tall pages). */
  fit: "contain" | "cover";
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** When the repo was created (GitHub created_at, UTC). Projects are listed newest first. */
  date: string;
  /** One line, shown on the card. */
  tagline: string;
  /** 2–3 sentences: the problem, what it does, and why it's technically interesting. */
  description: string;
  category: ProjectCategory;
  stack: string[];
  /** Only numbers that appear in the repo's README or benchmark results. */
  results?: string[];
  repoUrl: string;
  /** Live demo or GitHub Pages URL, if one exists. */
  demoUrl?: string;
  /** Further demo links shown next to the main one, e.g. a second variant. */
  extraLinks?: { label: string; href: string }[];
  /** For team projects: the part I built. */
  role?: string;
  figure?: ProjectFigure;
  /** Set for shared repos owned by someone else, e.g. "Team project". */
  team?: string;
  /** Set for unfinished work, e.g. "In progress". */
  status?: string;
  /** Short badge text, e.g. "Hackathon winner (2 tracks)". */
  badge?: string;
};

const allProjects: Project[] = [
  // ── Markets ──────────────────────────────────────────────────────────────
  {
    slug: "pathforge",
    name: "PathForge",
    date: "2026-11-12T15:43:59Z",
    tagline:
      "A multithreaded C++20 Monte Carlo option pricer with pybind11 Python bindings, bit-identical for any thread count.",
    description:
      "Monte Carlo pricing parallelizes naturally, but naive multithreading makes results depend on thread scheduling and floating-point summation order. PathForge prices European, Asian, barrier and Heston options in C++20 behind a Python API, seeding each 16,384-path chunk from (seed, chunk) only and merging per-chunk statistics in chunk order, so every thread count gives the same bits. It adds antithetic and control variates and randomized Sobol QMC with a Brownian bridge, and every price is tested against a closed-form or semi-analytic reference in standard-error units.",
    category: "Markets",
    stack: ["C++20", "Python", "pybind11", "std::thread", "CMake", "pytest", "GitHub Actions"],
    results: [
      "50.5 M paths/s on one thread for a European call; 5.57× on 8 threads (3.83× on the 4 performance cores), bit-identical at every thread count (Apple M3, AppleClang 17, -O3)",
      "Antithetic + control variate cut the variance of an ATM call 28.8× (513× in the money) at the same path count",
      "Randomized Sobol QMC with a Brownian bridge: 107× lower RMSE than plain MC at 262,144 paths on a European call, 48× lower on a 64-step Asian",
      "On 8 threads, 3.42× faster than vectorized NumPy on a 10M-path European call (single-threaded it is slower, at 0.59×)",
      "340 tests with fixed seeds and tolerances in standard errors; CI on Ubuntu and macOS with AddressSanitizer + UBSan and ThreadSanitizer jobs",
    ],
    repoUrl: "https://github.com/SohamMessi10/PathForge",
    figure: {
      src: "/projects/pathforge/qmc-convergence.png",
      alt: "Log-log charts of RMSE against paths per estimate: randomized QMC with a Brownian bridge falls faster than plain Monte Carlo for a European call (slope −0.90 vs −0.43) and a 64-dimension geometric Asian call (−0.80 vs −0.49)",
      width: 1650,
      height: 675,
      fit: "contain",
      caption: "Convergence of plain MC and randomized QMC, 20 seeds per point (benchmarks/figures/qmc_convergence.png).",
    },
  },
  {
    slug: "vollens",
    name: "VolLens",
    date: "2026-11-12T01:14:33Z",
    tagline:
      "Arbitrage-checked implied-volatility surfaces: a synthetic Heston market, SVI calibration, and an interactive 3D report.",
    description:
      "Fitting each volatility smile with a flexible curve can match the quotes and still allow static arbitrage, and with real quotes you never know the true surface. VolLens prices a synthetic option market under Heston so every quote's true implied vol is known, inverts prices with a Newton solver that falls back to Brent, fits each expiry with raw SVI (constraints enforced by reparametrization, Lee's wing bound built in), and checks butterfly and calendar arbitrage on a 3,001-point grid. The output is an interactive Plotly report with a 3D surface, per-expiry smiles and the arbitrage findings.",
    category: "Markets",
    stack: ["Python", "NumPy", "SciPy", "Plotly", "pytest", "Hypothesis"],
    results: [
      "Implied-vol solver on 20,000 random cases: 19,625 solved (375 rejected as below double-precision resolution), max relative vol error 7.3e-10, 11.1 µs per inversion",
      "Heston FFT matches Lewis integration to within 1.5e-11 (max abs error / F) at every maturity from 0.05 to 10 years",
      "Clean market (84 quotes, 6 expiries): calibration in 1.00 s, arbitrage check in 0.001 s (Intel Xeon @ 2.30 GHz, 4 vCPU)",
      "Noisy markets: arbitrage-free inside the quoted range for 20 / 20 seeds, but only 3 / 20 on the full extrapolated grid, a documented limitation",
      "148 tests across 10 modules, with Hypothesis property tests run under 40 different seeds",
    ],
    repoUrl: "https://github.com/SohamMessi10/volatility-surface-lab",
    // GitHub Pages: index.html is the noisy market, clean.html the noise-free one.
    demoUrl: "https://sohammessi10.github.io/volatility-surface-lab/",
    extraLinks: [
      { label: "Clean-market demo", href: "https://sohammessi10.github.io/volatility-surface-lab/clean.html" },
    ],
    figure: {
      src: "/projects/vollens/surface-3d.png",
      alt: "3D implied-volatility surface over log-moneyness and expiry, with the market quotes plotted as points on it",
      width: 2136,
      height: 1122,
      fit: "contain",
      caption: "Fitted SVI surface with the market quotes (docs/img/surface-3d.png).",
    },
  },
  {
    slug: "streaming-risk-monitor",
    name: "Streaming Risk Monitor",
    date: "2026-11-11T04:16:24Z",
    tagline:
      "Rolling risk statistics over an out-of-order, late and duplicated price feed, with z-score alerts scored against ground truth.",
    description:
      "Real price feeds arrive out of order, late and duplicated, and the textbook running-variance formula loses all precision at large magnitudes. riskmon releases events in event-time order behind a watermark, keeps rolling per-symbol statistics with Welford updates plus periodic exact rebuilds, and alerts at |z| ≥ 5. Alerts are scored against jumps injected into a seeded synthetic feed, false-alert rates are checked against Student's t theory, and each run is written to a static, script-free HTML dashboard.",
    category: "Markets",
    stack: ["Python", "pytest", "Hypothesis", "Playwright", "GitHub Actions"],
    results: [
      "Default synthetic feed (2 symbols, 7,276 lines): 76 of 76 duplicates dropped, 19 of 20 injected jumps detected, 0 false alerts",
      "False alerts follow Student's t, not the normal tail: 178 at |z| ≥ 4.0 vs 168.0 expected (126.5 under a normal), over about 2 million jump-free returns",
      "Numerics check: the textbook variance formula returns −131.2 on values near 10⁹, where the true variance is 0.989",
      "About 145k events/s in memory and about 69k events/s replaying a 200,000-line file (2-vCPU cloud container, Python 3.13)",
      "183 tests, including Hypothesis streaming-vs-batch properties; 92 planted mutants",
    ],
    repoUrl: "https://github.com/SohamMessi10/streaming-risk-monitor",
    figure: {
      src: "/projects/streaming-risk-monitor/dashboard.png",
      alt: "The dashboard of a replay: headline counts, then per symbol a price chart with alerts marked and the rolling standard deviation under it",
      width: 1920,
      height: 2010,
      fit: "cover",
      caption: "Dashboard for the default synthetic feed (docs/images/dashboard.png).",
    },
  },
  {
    slug: "market-microstructure-playground",
    name: "Market Microstructure Playground",
    date: "2026-11-07T03:50:38Z",
    tagline:
      "A limit order book and matching engine built from scratch, with exact price-time priority and a step-through replay page.",
    description:
      "A matching engine is simple to describe and easy to get subtly wrong. This one stores each side of the book as FIFO price levels with a bisect-sorted best price, matches limit orders and cancels under price-time priority, and replays scripted order files into a self-contained HTML page you can step through. A deliberately simple reference engine is checked against the real one with Hypothesis differential and stateful tests, and the invariant checker has tests of its own: 23 deliberate corruptions it must catch.",
    category: "Markets",
    stack: ["Python", "pytest", "Hypothesis", "Playwright", "GitHub Actions"],
    results: [
      "188,000 – 209,000 events/s on a typical 200,000-event workload; 227,000 – 236,000 on a deep book of almost 20,000 price levels (single thread, CPython 3.13, Intel Xeon @ 2.30 GHz)",
      "6× (2,000 events) to 64× (20,000 events) faster than the reference engine",
      "195 tests (181 plus 14 browser tests) on Python 3.11–3.14 and in Chromium; more than 60 deliberate bugs used for mutation testing",
    ],
    repoUrl: "https://github.com/SohamMessi10/market-microstructure-playground",
    figure: {
      src: "/projects/market-microstructure-playground/replay-sweep.png",
      alt: "Order book replay at step 5 of 9: a buy of 10 at 102 sweeps the 101 queue, then reaches into 102, filling in 3 trades",
      width: 2400,
      height: 1440,
      fit: "cover",
      caption: "Step-through replay: a buy of 10 at 102 arrives (docs/screenshots/replay-sweep.png).",
    },
  },
  {
    slug: "finsight",
    name: "FinSight",
    date: "2026-09-15T08:05:31Z",
    tagline:
      "A market-data platform: FastAPI backend, PostgreSQL storage, a scikit-learn anomaly detector and a Streamlit dashboard, containerized with Docker.",
    description:
      "Unusual price behavior is usually spotted by someone eyeballing charts. FinSight ingests daily OHLCV data and 20/50/200-day moving averages for 500 ticker symbols into PostgreSQL, serves them through a FastAPI REST API, and flags anomalous days with a per-ticker IsolationForest on rolling z-scores of return, realized volatility and volume. The Streamlit dashboard reads only through the API, and ingestion falls back to seeded synthetic data when Yahoo Finance is unreachable.",
    category: "Markets",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "scikit-learn", "Streamlit", "Docker"],
    results: [
      "+63.5% F1 and +112.5% recall over a naive standard-deviation rule (F1 0.654 vs 0.400) on a labeled synthetic series with 30 injected anomalies",
      "Measured on synthetic data: ingests 500 tickers × 500 days in ~26 s; GET endpoints respond in ~7–14 ms; 14 tests",
    ],
    repoUrl: "https://github.com/SohamMessi10/FinSight_FinancialDataAPI-Dashboard",
  },

  // ── Data / ML ────────────────────────────────────────────────────────────
  {
    slug: "docket",
    name: "Docket",
    date: "2026-10-24T09:12:11Z",
    tagline:
      "A caseworker for F-1 students: finds money they're owed, proves every rule with the official clause, and follows up until it's fixed.",
    description:
      "Most F-1 students are exempt from Social Security and Medicare tax for their first 5 calendar years, yet employers often withhold it anyway, and few students know the Form 8843 and 20-hour work rules. Docket is a team of five Fetch.ai uAgents sharing state in Convex: they read a student's bank data and paystubs, flag problems with a pure-function rules engine, and show a flag only if Claude's quoted clause matches the stored official IRS or eCFR text. A caseworker agent then opens a refund case and follows up, including a payroll phone call through a Cartesia voice agent that needs the student's approval.",
    category: "Data/ML",
    stack: ["Python", "Fetch.ai uAgents", "ASI:One", "Convex", "Claude API", "Cartesia", "Capital One Nessie"],
    repoUrl: "https://github.com/AnushaAgarwal27/Docket",
    demoUrl: "https://docket-game.vercel.app/",
    team: "Team project",
    role: "All of the backend and part of the frontend.",
    badge: "Hackathon winner (2 tracks)",
  },
  {
    slug: "evidence-finder",
    name: "Evidence Finder",
    date: "2026-11-08T04:46:32Z",
    tagline:
      "Search a document collection and get ranked passages, each with an exact reference to its source document, section and lines.",
    description:
      "“Chat with your documents” demos rarely show where an answer came from, and almost never measure whether retrieval found the right material. Evidence Finder splits documents into passages mapped to exact source lines, ranks them with SQLite FTS5 BM25, LSA semantic search, or a hybrid of the two via weighted reciprocal rank fusion, and links every result to its lines. It ships with 712 Python PEPs as a demo corpus and is evaluated on held-out questions with a seeded split and bootstrap 95% confidence intervals.",
    category: "Data/ML",
    stack: ["Python", "SQLite FTS5", "scikit-learn", "NumPy", "FastAPI", "Hypothesis"],
    results: [
      "Hybrid search on 96 held-out questions: Recall@10 0.915 [0.858, 0.964] vs 0.852 for keyword search; questions with nothing relevant in the top 10 fell from 13 to 7",
      "Paraphrased questions: Recall@10 0.617 with keyword search, 0.779 with hybrid",
      "17,165 passages from 712 PEPs, ingested in about 5 seconds",
      "283 tests; 164 deliberate bugs used for mutation testing",
    ],
    repoUrl: "https://github.com/SohamMessi10/evidence-finder",
    figure: {
      src: "/projects/evidence-finder/search-hybrid.png",
      alt: "The search page: hybrid search answers a paraphrased question with PEP 3104, each result linking to its section and exact lines",
      width: 2200,
      height: 1800,
      fit: "cover",
      caption: "Hybrid search on a paraphrased question (docs/images/search-hybrid.png).",
    },
  },
  {
    slug: "inference-bench",
    name: "Inference Bench",
    date: "2026-11-07T19:41:17Z",
    tagline:
      "A benchmark for model servers that shows its working: throughput, latency percentiles and failures under controlled load.",
    description:
      "Serving benchmarks often report one throughput number without showing whether batching helps or what happens under overload. Inference Bench serves small scikit-learn digit classifiers through FastAPI, drives them with a closed-loop async load generator that records every request and checks every answer, and splits latency into queue wait, model time and the rest. The load generator measures its own event-loop lag and warns when the client, not the server, is the bottleneck.",
    category: "Data/ML",
    stack: ["Python", "FastAPI", "uvicorn", "asyncio", "scikit-learn", "NumPy", "Hypothesis"],
    results: [
      "Dynamic batching: −39% to −47% throughput at 1 client, +36% to +105% at 64 clients with median latency roughly halved (6 runs, 2-CPU Linux machine)",
      "Overload with a bounded queue (4 waiting): 91–92 requests/s answered in time, vs 0 with no limits, where 99% of the work reached nobody (synthetic 20 ms model, 16 clients)",
      "144 tests on Python 3.12–3.14; more than 60 deliberate bugs used for mutation testing",
    ],
    repoUrl: "https://github.com/SohamMessi10/inference-bench",
  },
  {
    slug: "evalrag",
    name: "EvalRAG",
    date: "2026-09-15T18:54:56Z",
    tagline: "Retrieval-augmented Q&A over the FastAPI documentation, built around an evaluation harness.",
    description:
      "Documentation search returns pages, not answers, and a general chatbot will confidently make things up. EvalRAG answers questions over 146 FastAPI docs (~105K words) with citations, comparing fixed-window against structure-aware chunking and BM25, vector and hybrid retrieval (RRF or weighted fusion, with optional reranking). Gold evidence is stored as exact document spans so both chunkings are scored fairly; answer-quality metrics are implemented but have not been run yet.",
    category: "Data/ML",
    stack: ["Python", "FastAPI", "Streamlit", "FAISS", "BM25", "spaCy", "Claude API"],
    results: [
      "Best retrieval configuration, BM25 over fixed-window chunks: Recall@5 0.7, MRR 0.689 on 35 questions",
      "964 fixed-window vs 1,295 structure-aware chunks; components that fell back (spaCy embeddings, lexical reranker) are labeled as fallbacks in the results",
      "40 tests",
    ],
    repoUrl: "https://github.com/SohamMessi10/Production_RAG_System",
  },
  {
    slug: "reproducible-experiment-runner",
    name: "Reproducible Experiment Runner",
    date: "2026-11-12T00:36:19Z",
    tagline: "Run an experiment from a config file and record what's needed to reproduce and compare it.",
    description:
      "A result you can't reproduce is hard to trust, and most runs don't record enough to try. exprun runs a task from a TOML config, saves a manifest with config and data hashes, seed, code version and environment, and can rerun a past run and judge whether it reproduced: identical, same metrics but different outputs, within tolerance, or different. Hashing is canonical (sorted keys, shortest round-trip floats), child processes run with PYTHONHASHSEED=0, and it refuses to judge a rerun when the data or code changed.",
    category: "Data/ML",
    stack: ["Python", "TOML", "Git", "scikit-learn", "Hypothesis"],
    results: [
      "Caught real nondeterminism: a random forest with n_jobs=2 gave identical metrics but different outputs in 8 of 8 reruns (at most 1–2 ULP apart); single-threaded runs reproduced 5 of 5",
      "A set-order-dependent task gave 4 and 5 distinct results across two batches of 10 direct runs, and 5 of 5 identical runs under exprun",
      "12-run sweep on 2 CPUs: 2 workers cut wall time from 15.0–15.4 s to 9.5–9.8 s, with byte-identical outputs",
    ],
    repoUrl: "https://github.com/SohamMessi10/reproducible-experiment-runner",
    status: "In progress",
  },

  // ── Backend / tools ──────────────────────────────────────────────────────
  {
    slug: "reliable-job-runner",
    name: "Reliable Job Runner",
    date: "2026-10-21T03:48:11Z",
    tagline: "A background job queue with retries, leases, fencing tokens and crash recovery, on SQLite.",
    description:
      "A job queue has to survive workers that crash, freeze or wake up late, and clients that retry their submissions. This one stores jobs in SQLite and delivers at least once, using leases and heartbeats to recover abandoned jobs, fencing tokens so a stale worker can never overwrite a newer attempt, exponential backoff with full jitter, and idempotency keys on its HTTP API. Every state change is one BEGIN IMMEDIATE transaction, tested with Hypothesis stateful tests, real multi-process races and kill -9.",
    category: "Backend",
    stack: ["Python", "SQLite", "FastAPI", "Hypothesis", "pytest"],
    results: [
      "Failure demo: after kill -9 mid-job, the 2000 ms lease recovered the job 1814 ms later and a second worker finished it on attempt 2",
      "833–914 no-op jobs/s with 1 worker; 69–71 jobs/s with 4 workers on jobs that wait 50 ms (2-CPU Linux workspace, Python 3.13)",
      "Found and fixed a server bug where about one request in 20–40 failed or stalled under 8 concurrent clients; 147 tests",
    ],
    repoUrl: "https://github.com/SohamMessi10/reliable-job-runner",
  },
  {
    slug: "splitledger",
    name: "SplitLedger",
    date: "2026-10-20T02:31:59Z",
    tagline:
      "A shared-expense tracker for a household: who paid, who it was for, and who owes whom, correct to the cent.",
    description:
      "Shared bills drift in spreadsheets: cents go missing on splits, floats mis-round money, edits overwrite history, and settling up takes too many payments. SplitLedger keeps every amount in integer cents, splits with the largest-remainder method so shares always sum to the total, derives balances by replaying an append-only ledger where corrections are reversals, and finds the fewest settle-up payments exactly for up to 12 members with dynamic programming over subsets. It runs as a local FastAPI app on one SQLite file, hardened against DNS rebinding, CSRF and CSV formula injection.",
    category: "Backend",
    stack: ["Python", "FastAPI", "SQLite", "Hypothesis", "pytest"],
    results: [
      "Balances over 10,000 entries in 80.8 ms; GET /api/balances in 74.4 ms (median of 7, 2-CPU Linux workspace, Python 3.13)",
      "Removing a redundant replay cut GET /api/balances at 10,000 entries from 160 ms to 74 ms",
      "Exact settlement checked against brute force for groups of up to 7; 268 tests",
    ],
    repoUrl: "https://github.com/SohamMessi10/splitledger",
    figure: {
      src: "/projects/splitledger/household.png",
      alt: "The household page: balances, suggested payments, forms, and history",
      width: 1200,
      height: 1382,
      fit: "cover",
      caption: "The household page (docs/screenshots/household.png).",
    },
  },
  {
    slug: "data-contract-inspector",
    name: "Data Contract Inspector",
    date: "2026-10-15T19:38:24Z",
    tagline:
      "A command-line tool that checks a CSV file against an agreed data contract before it enters an analysis or pipeline.",
    description:
      "Python silently accepts values like \"1_000\" or \" 5 \" as numbers, and a NaN slips through every < or > comparison, so bad rows reach analyses unnoticed. This tool checks a raw CSV against a JSON contract (columns, types, min/max, nulls, primary key) without coercion, so 1.0 is not an integer and bounds are compared as Decimal, and reports every violation with its line number without changing the data. Reports are deterministic JSON written atomically, with a distinct exit code for each kind of failure.",
    category: "Backend",
    stack: ["Python", "Standard library", "pytest", "GitHub Actions"],
    results: [
      "138 tests (pytest), including acceptance and golden-file tests; CI on Python 3.11–3.14 (Linux) and 3.13 (macOS)",
    ],
    repoUrl: "https://github.com/SohamMessi10/data-contract-inspector",
  },
];

/** Newest first. Dates are full ISO timestamps, so string order is time order. */
export const projects: Project[] = [...allProjects].sort((a, b) => b.date.localeCompare(a.date));
