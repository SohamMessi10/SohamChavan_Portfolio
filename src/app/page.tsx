import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { education, experience, toolkit } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6 py-32">
          <div className="animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Data Science · Machine Learning · AI
            </p>

            <div className="relative mt-4 w-fit">
              <div
                className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-full bg-accent/25 blur-3xl"
                aria-hidden="true"
              />
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                <span className="[text-shadow:0_0_36px_var(--accent)]">Soham Chavan</span>
              </h1>
              <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 animate-draw-underline" />
            </div>
          </div>

          <div className="w-fit rounded-md border border-border bg-black/40 px-4 py-3 font-mono text-lg animate-fade-up [animation-delay:150ms]">
            {site.tagline}
            <span className="ml-1 inline-block h-5 w-2 translate-y-0.5 bg-accent cursor-blink" />
          </div>

          <div className="flex gap-4 pt-4 animate-fade-up [animation-delay:300ms]">
            <a
              href="#projects"
              className="rounded-md bg-foreground px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-background"
            >
              View projects
            </a>
            <a
              href="#about"
              className="rounded-md border border-border px-5 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
            >
              About me
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative scroll-mt-20 overflow-hidden border-t border-border py-20">
        <div className="absolute inset-0 bg-grid-drift" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 100}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-border py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-16 px-6">
          <Reveal className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Data Science · Machine Learning · AI
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <p className="text-muted">
              I&apos;m a Computational Data Science student at Penn State, focused on data
              science, machine learning, and AI. My work spans building LLM-based pipelines for
              biomedical research, training predictive models on real-world financial and customer
              data, and engineering the data pipelines that feed them.
            </p>
            <p className="text-muted">
              I&apos;m currently a researcher in Penn State&apos;s Dept. of Information Sciences
              &amp; Biochemistry, building an LLM pipeline to extract and classify database
              accessions from biomedical manuscripts, and I lead data analytics projects at
              Nittany Data Labs. Recent work includes transformer-based time series forecasting,
              supervised ML models for churn and risk scoring, and SQL-backed reporting pipelines.
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Education</h3>
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
          </Reveal>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Where I&apos;ve worked
            </h3>
            <div className="flex flex-col gap-4">
              {experience.map((job, index) => (
                <Reveal key={`${job.organization}-${job.role}`} delay={index * 80}>
                  <div className="rounded-md border border-border p-5">
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section
        id="toolkit"
        className="relative scroll-mt-20 overflow-hidden border-t border-border py-20"
      >
        <div className="absolute inset-0 bg-radar" aria-hidden="true" />
        <div className="absolute inset-0 bg-radar-sweep" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Toolkit</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">What I build with</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {toolkit.map((category, index) => (
              <Reveal key={category.label} delay={index * 80}>
                <div className="rounded-md border border-border bg-background/70 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {category.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{category.items.join(", ")}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-border bg-accent text-black">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest">Contact</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s talk.</h2>
          <p className="mt-4 max-w-lg text-black/70">
            Open to internships and research collaborations in data science, ML, and AI. Reach
            out and I&apos;ll get back to you.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 block break-words text-3xl font-bold underline decoration-2 underline-offset-4 sm:text-5xl"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-black/20 pt-6 font-mono text-xs uppercase tracking-widest">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Résumé
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
