import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">Projects coming soon.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block rounded-lg border border-black/10 p-4 hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
              >
                <h2 className="font-medium">{project.name}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
