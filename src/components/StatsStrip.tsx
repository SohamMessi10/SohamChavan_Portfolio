import Link from "next/link";
import { stats } from "@/content/stats";
import { projects } from "@/content/projects";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

function projectName(slug: string) {
  return projects.find((p) => p.slug === slug)?.name ?? slug;
}

export function StatsStrip() {
  return (
    <Reveal className="mt-10">
      <h3 className="sr-only">Highlights</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const name = projectName(stat.projectSlug);
          return (
            <li key={`${stat.projectSlug}-${stat.label}`}>
              <Link
                href={`/projects/${stat.projectSlug}`}
                data-spotlight
                className="group flex h-full flex-col gap-2 rounded-lg border border-border bg-background/70 p-4 backdrop-blur-sm transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
              >
                <span className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-3xl font-semibold tracking-tight text-foreground [text-shadow:0_0_24px_rgba(34,211,238,0.35)] sm:text-4xl">
                    <CountUp value={stat.value} decimals={stat.decimals} />
                  </span>
                  {stat.unit && (
                    // Not uppercased: CSS would turn "µs" into "ΜS", which reads as milliseconds.
                    <span className="font-mono text-sm tracking-wide text-accent">
                      {stat.unit}
                    </span>
                  )}
                </span>
                <span className="text-xs text-muted sm:text-sm">{stat.label}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-1 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-accent">
                  {name}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
