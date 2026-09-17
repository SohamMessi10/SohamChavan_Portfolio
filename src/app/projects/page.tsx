import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted">Projects coming soon.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block rounded-md border border-border p-5 transition-colors hover:border-accent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-medium">{project.name}</h2>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {project.dates}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{project.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
