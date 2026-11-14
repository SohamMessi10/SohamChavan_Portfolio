import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { awards } from "@/content/awards";
import { AwardBadge } from "@/components/AwardBadge";
import { formatMonth } from "@/lib/dates";

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
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const externalLinkClass =
  "inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const award = awards.find((a) => a.projectSlug === project.slug);

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <Link
        href="/#projects"
        className="w-fit font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
      >
        ← Back to projects
      </Link>

      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {formatMonth(project.date)} · <span className="text-accent">{project.category}</span>
          {project.team && <> · {project.team}</>}
          {project.status && <> · {project.status}</>}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
        {project.badge && <AwardBadge label={project.badge} />}
        <p className="text-lg text-muted">{project.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
          GitHub repo<span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            Live demo<span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {project.extraLinks?.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            {link.label}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
        {award && (
          <a href={award.devpostUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            Devpost<span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>

      {project.figure && (
        <figure className="overflow-hidden rounded-md border border-border bg-[#fbfbfa]">
          <Image
            src={project.figure.src}
            alt={project.figure.alt}
            width={project.figure.width}
            height={project.figure.height}
            sizes="(min-width: 768px) 720px, 100vw"
            preload
            className="h-auto w-full"
          />
          {project.figure.caption && (
            <figcaption className="border-t border-border bg-background px-4 py-2 text-xs text-muted">
              {project.figure.caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="rounded-md border border-border p-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Overview</h2>
        <p className="mt-2">{project.description}</p>
      </div>

      {project.role && (
        <div className="rounded-md border border-accent/30 bg-accent/5 p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent">My role</h2>
          <p className="mt-2">{project.role.detail}</p>
        </div>
      )}

      {project.results && project.results.length > 0 && (
        <div className="rounded-md border border-border p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Key results</h2>
          <ul className="mt-2 list-disc pl-5 text-muted">
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      )}

      {award && (
        <div className="rounded-md border border-amber-300/30 bg-amber-300/5 p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-200">
            {award.event} · {award.dates}
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {award.prizes.map((prize) => (
              <li key={prize.name} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-amber-300">
                  ★
                </span>
                <span>
                  {prize.name}
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-amber-200/90">
                    {prize.placement}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

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
    </section>
  );
}
