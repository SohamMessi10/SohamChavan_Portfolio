# Soham Chavan — Portfolio

Personal portfolio site for Soham Chavan, a Computational Data Science student
at Penn State. It gives recruiters and collaborators one place to see his
education, experience, projects and skills, and to download his résumé.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## What it does

- **Home page** (`/`): a single scrolling page with an intro and education,
  experience, selected projects, a toolkit of languages and tools, and contact
  links.
- **Project case studies** (`/projects/<slug>`): one page per project with the
  problem, role, stack and outcomes, generated from a single content file.
- **Résumé download**: the PDF in `public/resume/` is linked from the nav, the
  intro and the contact section.
- **Search and sharing metadata**: page titles, canonical URLs, Open Graph and
  Twitter tags for every page (each project gets its own link preview), a
  generated `sitemap.xml` and `robots.txt`, and a schema.org `Person` JSON-LD
  block.
- **Security headers**: a Content Security Policy, HSTS, `X-Frame-Options`,
  `Referrer-Policy` and related headers are set in `next.config.ts`.
- **Motion and no-JS fallbacks**: scroll-in effects and the canvas backgrounds
  stop animating when the visitor's OS asks for reduced motion, and all
  content stays visible with JavaScript disabled.

Every route is prerendered to static HTML at build time, so the site needs no
database or server-side data fetching.

## Tech stack and why

| Tool | Why it's used |
| --- | --- |
| Next.js 16 (App Router) | Static prerendering for fast pages. Its Metadata API generates titles, social tags, the sitemap and robots.txt from the same content files. |
| TypeScript | Content is typed (`Project`, `Experience`), so a missing field fails the type check instead of rendering a blank section. |
| Tailwind CSS v4 | Styles live next to the markup and compile to plain CSS with no runtime. |
| Canvas 2D | Draws the animated backgrounds without an animation library. |
| Vitest | Fast TypeScript-native tests that reuse the project's `@/` import alias. |
| ESLint (`eslint-config-next`) | Next.js, React Hooks and Core Web Vitals lint rules. |
| GitHub Actions | Runs lint, type check, tests and a production build on every push and pull request. |

## Getting started

Requirements: Node.js 20.9 or newer on an LTS line (20, 22 or 24; CI uses 22) and npm.

```bash
git clone https://github.com/SohamMessi10/SohamChavan_Portfolio.git
cd SohamChavan_Portfolio
npm ci
cp .env.example .env.local   # optional for local development
npm run dev
```

Then open <http://localhost:3000>.

To check a production build locally:

```bash
npm run build
npm run start
```

The build downloads the Geist fonts through `next/font/google`, so it needs
network access.

### Environment variables

`NEXT_PUBLIC_SITE_URL` is the site's public origin, for example
`https://example.com`. It is used for canonical URLs, the sitemap,
robots.txt, Open Graph tags and JSON-LD. It must be an absolute `http(s)` URL;
anything else fails with an error that names the variable. If it is
unset, the site falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL` (set
automatically on Vercel), then to `http://localhost:3000`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm test` | Run the Vitest suite once (use `npx vitest` for watch mode) |

## Project structure

```text
src/
  app/
    layout.tsx           Root layout: fonts, site metadata, JSON-LD, nav and footer
    page.tsx             Home page sections
    projects/[slug]/     Statically generated case-study pages (+ metadata tests)
    sitemap.ts           sitemap.xml built from the project list
    robots.ts            robots.txt
    globals.css          Theme colors, animations and reduced-motion rules
  components/            Nav, Footer, ProjectCard, Reveal (scroll-in), canvas backgrounds
  content/
    site.ts              Name, tagline, contact links, nav items
    about.ts             Education, experience and skills
    projects.ts          Project case studies
  lib/site-url.ts        Resolves and validates the public site URL
public/resume/           Résumé PDF
.github/workflows/ci.yml CI pipeline
```

## Example: adding a project

All page copy lives in `src/content/`. To add a case study, append an entry to
`src/content/projects.ts` (the values below are placeholders):

```ts
{
  slug: "example-project",           // becomes /projects/example-project
  name: "Example Project",
  summary: "One-line description shown on the project card.",
  problem: "The problem the project addresses.",
  role: "What you built or were responsible for.",
  stack: ["Python", "Pandas"],
  dates: "Jan 2026 – Mar 2026",
  outcomes: ["Optional bullet points shown on the case-study page"],
},
```

Then run `npm test`. With no other changes, the new project:

- appears as a card in the Projects section of the home page,
- gets a prerendered page at `/projects/example-project`,
- is listed in `sitemap.xml`, and
- gets its own link-preview title, description and URL.

The tests reject duplicate or non-URL-safe slugs and empty fields.

## Tests and CI

`npm test` covers:

- **Content integrity**: unique, URL-safe project slugs; every field a case
  study renders is filled in; the linked résumé file exists; social links are
  absolute `https` URLs.
- **Site URL config**: environment precedence, trailing-slash handling, and
  rejection of values such as `example.com` or `localhost:3000`.
- **Project metadata**: each project page's Open Graph title, description and
  URL; unknown slugs produce no metadata.

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint, the type check, the tests
and a production build.

## Known limitations

- There are no browser-level (end-to-end) tests. Rendering, including the
  reduced-motion and no-JavaScript fallbacks, has been checked manually with
  Playwright but is not covered in CI.
- On narrow screens the sticky header wraps onto several lines (about 157px
  tall at 375px width), and jumping to a section can leave its heading under
  the header.
- Project case studies don't link to source code or live demos yet.
- There is no social preview image, so link previews are text-only.
- The site copy and the résumé PDF are maintained separately and need to be
  updated together.
- Deployment isn't configured in this repository. Any host that can run
  `npm run build` and `npm run start` (or Vercel) works.

## Next steps

- A compact mobile navigation that keeps section headings visible.
- Repository and demo links on each case study.
- An Open Graph image for link previews.
- Playwright smoke tests in CI, including reduced-motion rendering.
