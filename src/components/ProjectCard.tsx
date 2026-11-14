import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { AwardBadge } from "./AwardBadge";

// The whole card links to the case study via a stretched link on the title
// (its ::after covers the card), so the GitHub/demo links can sit inside the
// card without nesting <a> elements.
export function ProjectCard({
  project,
  index,
  active = false,
}: {
  project: Project;
  index: number;
  /** Highlighted as the project currently shown in the explorer's preview. */
  active?: boolean;
}) {
  return (
    <article
      data-spotlight
      data-tilt
      data-active={active || undefined}
      className={`group relative isolate flex h-full flex-col overflow-hidden rounded-lg border bg-background/60 backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-accent hover:shadow-[0_0_40px_-8px_var(--accent)] focus-within:border-accent ${
        active
          ? "border-accent/70 bg-background/80 shadow-[0_0_44px_-14px_var(--accent)]"
          : "border-border"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-2 -top-6 -z-10 font-mono text-8xl font-bold transition-colors duration-300 group-hover:text-accent/10 ${
          active ? "text-accent/10" : "text-white/5"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* On large screens the explorer's side panel shows the figure instead. */}
      {project.figure && (
        <div className="relative aspect-video overflow-hidden border-b border-border bg-[#fbfbfa] lg:hidden">
          <Image
            src={project.figure.src}
            alt=""
            fill
            sizes="(min-width: 640px) 600px, 100vw"
            className={`opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${
              project.figure.fit === "contain" ? "object-contain" : "object-cover object-top"
            }`}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="text-accent">{project.category}</span>
          {project.team && <> · {project.team}</>}
          {project.status && <> · {project.status}</>}
        </p>
        {project.badge && <AwardBadge label={project.badge} />}
        <h3 className="text-xl font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {project.name}
          </Link>
        </h3>
        <p className="text-sm text-muted">{project.tagline}</p>
        {project.role && (
          <p className="text-sm text-foreground/90">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">My role · </span>
            {project.role.summary}
          </p>
        )}
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="pointer-events-none relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 font-mono text-xs uppercase tracking-widest">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-muted transition-colors hover:text-accent focus-visible:text-accent"
          >
            GitHub<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> repository for {project.name} (opens in a new tab)</span>
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-muted transition-colors hover:text-accent focus-visible:text-accent"
            >
              Live demo<span aria-hidden="true"> ↗</span>
              <span className="sr-only"> of {project.name} (opens in a new tab)</span>
            </a>
          )}
          <span aria-hidden="true" className="ml-auto inline-flex items-center gap-1 text-accent">
            Case study
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
