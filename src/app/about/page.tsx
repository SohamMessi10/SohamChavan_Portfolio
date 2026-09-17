import type { Metadata } from "next";
import { education, experience, skills } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          I&apos;m a Computational Data Science student at Penn State, focused on data
          science, machine learning, and AI. My work spans building LLM-based pipelines for
          biomedical research, training predictive models on real-world financial and customer
          data, and engineering the data pipelines that feed them.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          I&apos;m currently a researcher in Penn State&apos;s Dept. of Information Sciences &amp;
          Biochemistry, building an LLM pipeline to extract and classify database accessions
          from biomedical manuscripts, and I lead data analytics projects at Nittany Data Labs.
          Recent work includes transformer-based time series forecasting, supervised ML models
          for churn and risk scoring, and SQL-backed reporting pipelines.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <div>
          <p className="font-medium">{education.school}</p>
          <p className="text-zinc-600 dark:text-zinc-400">{education.degree}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            GPA: {education.gpa} · Graduation: {education.graduation}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Relevant coursework</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {education.coursework.join(", ")}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Organizations</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {education.organizations.join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        {experience.map((job) => (
          <div key={`${job.organization}-${job.role}`} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-medium">
                {job.role} · {job.organization}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">{job.dates}</p>
            </div>
            <ul className="list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">{job.stack.join(", ")}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Languages</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{skills.languages.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Frameworks</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{skills.frameworks.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Tools</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{skills.tools.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Certifications</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {skills.certifications.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
