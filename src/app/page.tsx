import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { awards } from "@/content/awards";
import { education, experience, toolkit } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { StatsStrip } from "@/components/StatsStrip";
import { DataStream } from "@/components/DataStream";

export default function Home() {
  return (
    <>
      {/* Hero + About, merged into one flowing intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-nebula" aria-hidden="true" />
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
              <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 animate-draw-underline" />
            </div>
          </div>

          <div className="w-fit rounded-md border border-border bg-black/40 px-4 py-3 font-mono text-lg animate-fade-up [animation-delay:150ms]">
            {site.tagline}
            <span className="ml-1 inline-block h-5 w-2 translate-y-0.5 bg-accent cursor-blink" />
          </div>

          <div id="about" className="mt-10 flex flex-col gap-8 scroll-mt-20">
            <Reveal className="flex flex-col gap-4">
              <p className="text-muted">
                I&apos;m a Computational Data Science student at Penn State, focused on data
                science, machine learning, and AI. My work spans building LLM-based pipelines for
                biomedical research, training predictive models on real-world financial and
                customer data, and engineering the data pipelines that feed them.
              </p>
              <p className="text-muted">
                I&apos;m currently a researcher in Penn State&apos;s Dept. of Information
                Sciences &amp; Biochemistry, building an LLM pipeline to extract and classify
                database accessions from biomedical manuscripts, and I lead data analytics
                projects at Nittany Data Labs. Recent work includes transformer-based time
                series forecasting, supervised ML models for churn and risk scoring, and
                SQL-backed reporting pipelines.
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                Graduating {education.graduation}
              </span>
              <span>{site.location}</span>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                Email
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Résumé
              </a>
            </Reveal>

            <Reveal delay={140} className="flex flex-col gap-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Education</h2>
              <div data-spotlight className="card-lit rounded-md border border-border bg-background/70 p-5 backdrop-blur-sm">
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
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative scroll-mt-20 overflow-hidden py-24">
        <DataStream />
        <div className="relative mx-auto flex max-w-3xl flex-col gap-4 px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent text-glow">Experience</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Where I&apos;ve worked</h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {experience.map((job, index) => (
              <Reveal key={`${job.organization}-${job.role}`} delay={index * 80}>
                <div data-spotlight className="card-lit rounded-md border border-border bg-background/70 p-5 backdrop-blur-sm">
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
      </section>

      {/* Projects */}
      {/* overflow-clip (not hidden) so the explorer's sticky preview panel still sticks */}
      <section id="projects" className="relative scroll-mt-20 overflow-clip py-24">
        <div className="absolute inset-0 bg-grid-drift" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent text-glow">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Newest first. Scroll the timeline and the preview follows along, or filter by area
              and open any project for the full case study.
            </p>
          </Reveal>
          <StatsStrip />
          <ProjectExplorer projects={projects} />
        </div>
      </section>

      {/* Hackathons & Awards */}
      <section id="awards" className="relative scroll-mt-20 py-24">
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent text-glow">Awards</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Hackathons &amp; Awards</h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {awards.map((award, index) => (
              <Reveal key={`${award.event}-${award.project}`} delay={index * 80}>
                <div data-spotlight className="card-lit rounded-md border border-border bg-background/70 p-5 backdrop-blur-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-medium">
                      {award.event} ·{" "}
                      <Link
                        href={`/projects/${award.projectSlug}`}
                        className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {award.project}
                      </Link>
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">
                      {award.dates}
                    </p>
                  </div>
                  <ul className="mt-4 flex flex-col gap-3">
                    {award.prizes.map((prize) => (
                      <li key={prize.name} className="flex items-start gap-3">
                        <span aria-hidden="true" className="text-amber-300">
                          ★
                        </span>
                        <span className="text-sm">
                          {prize.name}
                          <span className="block font-mono text-[11px] uppercase tracking-widest text-amber-200/90">
                            {prize.placement}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={award.devpostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-foreground"
                  >
                    View on Devpost<span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="relative scroll-mt-20 overflow-hidden py-24">
        <div className="absolute inset-0 bg-radar" aria-hidden="true" />
        <div className="absolute inset-0 bg-radar-sweep" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent text-glow">Toolkit</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">What I build with</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {toolkit.map((category, index) => (
              <Reveal key={category.label} delay={index * 80}>
                <div data-spotlight className="card-lit rounded-md border border-border bg-background/70 p-5 backdrop-blur-sm">
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
      <section id="contact" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent text-glow">Contact</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s talk.</h2>
            <p className="mt-4 max-w-lg text-muted">
              Open to internships and research collaborations in data science, ML, and AI. Reach
              out and I&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 block break-words bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-3xl font-bold text-transparent decoration-2 underline-offset-4 hover:underline sm:text-5xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 font-mono text-xs uppercase tracking-widest text-muted">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Résumé
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
