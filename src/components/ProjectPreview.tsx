"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { awards } from "@/content/awards";
import { formatMonth } from "@/lib/dates";
import { AwardBadge } from "./AwardBadge";

const MAX_RESULTS = 3;

const externalLinkClass =
  "inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function repoPath(url: string) {
  return url.replace(/^https?:\/\//, "");
}

/**
 * The explorer's side panel. Every project figure is stacked in the visual
 * area and cross-faded, so switching projects never waits on a download.
 */
export function ProjectPreview({
  project,
  figureProjects,
}: {
  project: Project;
  /** All projects that have a figure, rendered as stacked layers. */
  figureProjects: Project[];
}) {
  const award = awards.find((a) => a.projectSlug === project.slug);
  const results = project.results?.slice(0, MAX_RESULTS) ?? [];

  return (
    <div
      data-spotlight
      className="flex max-h-[calc(100vh_-_7rem)] flex-col overflow-hidden rounded-lg border border-border bg-background/80 shadow-[0_0_70px_-35px_var(--accent)] backdrop-blur-md"
    >
      {/* Window chrome */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted">{repoPath(project.repoUrl)}</span>
      </div>

      {/* Visual: stacked figures, or a title card for projects without one */}
      <div className="relative aspect-video shrink-0 overflow-hidden border-b border-border">
        {figureProjects.map((p) =>
          p.figure ? (
            <div
              key={p.slug}
              aria-hidden={p.slug !== project.slug}
              className={`preview-layer absolute inset-0 bg-[#fbfbfa] transition-opacity duration-500 ${
                p.slug === project.slug ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={p.figure.src}
                alt={p.slug === project.slug ? p.figure.alt : ""}
                fill
                sizes="(min-width: 1024px) 560px, 1px"
                className={p.figure.fit === "contain" ? "object-contain p-2" : "object-cover object-top"}
              />
            </div>
          ) : null,
        )}
        <div
          aria-hidden={Boolean(project.figure)}
          className={`preview-layer absolute inset-0 flex flex-col justify-center gap-3 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.14),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.16),transparent_60%)] bg-black/60 px-8 font-mono transition-opacity duration-500 ${
            project.figure ? "opacity-0" : "opacity-100"
          }`}
        >
          {!project.figure && (
            <>
              <p className="text-2xl text-foreground [text-shadow:0_0_24px_var(--accent)]">
                <span className="text-accent"># </span>
                {project.name}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {project.tagline}
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent cursor-blink" />
              </p>
            </>
          )}
        </div>
      </div>

      {/* Details; re-keyed so each switch plays a short enter animation */}
      <div key={project.slug} className="animate-panel-in flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {formatMonth(project.date)} · <span className="text-accent">{project.category}</span>
          {project.team && <> · {project.team}</>}
          {project.status && <> · {project.status}</>}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
          {project.badge && <AwardBadge label={project.badge} />}
        </div>
        {project.role && (
          <p className="-mt-1 text-sm text-foreground/90">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">My role · </span>
            {project.role}
          </p>
        )}

        {results.length > 0 ? (
          <ul className="flex flex-col gap-2.5">
            {results.map((result) => (
              <li key={result} className="flex gap-3 text-sm text-muted">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="line-clamp-6 text-sm text-muted">{project.description}</p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 rounded border border-accent/60 bg-accent/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Case study<span aria-hidden="true">→</span>
            <span className="sr-only">: {project.name}</span>
          </Link>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            GitHub<span aria-hidden="true">↗</span>
            <span className="sr-only">repository for {project.name} (opens in a new tab)</span>
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              Live demo<span aria-hidden="true">↗</span>
              <span className="sr-only">of {project.name} (opens in a new tab)</span>
            </a>
          )}
          {project.extraLinks?.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              {link.label}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">for {project.name} (opens in a new tab)</span>
            </a>
          ))}
          {award && (
            <a href={award.devpostUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              Devpost<span aria-hidden="true">↗</span>
              <span className="sr-only">page for {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
