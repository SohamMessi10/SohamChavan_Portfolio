# Soham Chavan — Portfolio

Personal portfolio site built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — lint the codebase
- `npm run typecheck` — type-check the codebase

## Environment variables

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the
site's public origin (used for canonical URLs, sitemap, robots.txt, Open
Graph, and JSON-LD). Falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then
`http://localhost:3000`.

## Content

Site metadata lives in `src/content/site.ts` and project case studies in
`src/content/projects.ts`. Both currently contain placeholders pending real
content.
