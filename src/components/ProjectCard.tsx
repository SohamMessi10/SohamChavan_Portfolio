import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-border bg-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-[0_0_40px_-8px_var(--accent)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 font-mono text-8xl font-bold text-white/5 transition-colors duration-300 group-hover:text-accent/10"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {project.dates}
        </span>
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="text-sm text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <span className="mt-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-accent">
          View case study
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
