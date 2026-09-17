import Link from "next/link";
import { site } from "@/content/site";
import { Starfield } from "@/components/Starfield";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <Starfield />
      <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6 py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Data Science · Machine Learning · AI
        </p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Soham <span className="text-accent [text-shadow:0_0_24px_var(--accent)]">Chavan</span>
        </h1>
        <div className="w-fit rounded-md border border-border bg-black/40 px-4 py-3 font-mono text-lg">
          {site.tagline}
          <span className="ml-1 inline-block h-5 w-2 translate-y-0.5 bg-accent cursor-blink" />
        </div>
        <div className="flex gap-4 pt-4">
          <Link
            href="/projects"
            className="rounded-md bg-foreground px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-background"
          >
            View projects
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-border px-5 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
          >
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}
