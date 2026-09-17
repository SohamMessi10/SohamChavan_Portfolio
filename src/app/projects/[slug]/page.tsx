import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{project.dates}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{project.name}</h1>
      </div>
      <p className="text-muted">{project.summary}</p>

      <div className="rounded-md border border-border p-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Problem</h2>
        <p className="mt-2">{project.problem}</p>
      </div>

      <div className="rounded-md border border-border p-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Role</h2>
        <p className="mt-2">{project.role}</p>
      </div>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Stack</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.outcomes && project.outcomes.length > 0 && (
        <div className="rounded-md border border-border p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Outcomes</h2>
          <ul className="mt-2 list-disc pl-5 text-muted">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
