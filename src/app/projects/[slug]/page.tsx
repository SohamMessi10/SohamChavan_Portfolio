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
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">{project.dates}</p>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{project.summary}</p>

      <div>
        <h2 className="font-medium">Problem</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{project.problem}</p>
      </div>

      <div>
        <h2 className="font-medium">Role</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{project.role}</p>
      </div>

      <div>
        <h2 className="font-medium">Stack</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.outcomes && project.outcomes.length > 0 && (
        <div>
          <h2 className="font-medium">Outcomes</h2>
          <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
