import type { Metadata } from "next";
import { education, experience, skills } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Data Science · Machine Learning · AI
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted">
          I&apos;m a Computational Data Science student at Penn State, focused on data
          science, machine learning, and AI. My work spans building LLM-based pipelines for
          biomedical research, training predictive models on real-world financial and customer
          data, and engineering the data pipelines that feed them.
        </p>
        <p className="text-muted">
          I&apos;m currently a researcher in Penn State&apos;s Dept. of Information Sciences &amp;
          Biochemistry, building an LLM pipeline to extract and classify database accessions
          from biomedical manuscripts, and I lead data analytics projects at Nittany Data Labs.
          Recent work includes transformer-based time series forecasting, supervised ML models
          for churn and risk scoring, and SQL-backed reporting pipelines.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Education</h2>
        <div className="rounded-md border border-border p-5">
          <p className="font-medium">{education.school}</p>
          <p className="text-muted">{education.degree}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
            GPA: {education.gpa} · Graduation: {education.graduation}
          </p>
          <div className="mt-4 border-t border-border pt-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Relevant coursework
            </p>
            <p className="mt-1 text-sm text-muted">{education.coursework.join(", ")}</p>
          </div>
          <div className="mt-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Organizations
            </p>
            <p className="mt-1 text-sm text-muted">{education.organizations.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Where I&apos;ve worked
        </h2>
        <div className="flex flex-col gap-4">
          {experience.map((job) => (
            <div
              key={`${job.organization}-${job.role}`}
              className="rounded-md border border-border p-5"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-medium">
                  {job.role} · {job.organization}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {job.dates}
                </p>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-muted">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Skills</h2>
        <div className="grid gap-4 rounded-md border border-border p-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Languages
            </p>
            <p className="mt-1 text-sm text-muted">{skills.languages.join(", ")}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Frameworks
            </p>
            <p className="mt-1 text-sm text-muted">{skills.frameworks.join(", ")}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Tools</p>
            <p className="mt-1 text-sm text-muted">{skills.tools.join(", ")}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Certifications
            </p>
            <p className="mt-1 text-sm text-muted">{skills.certifications.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
