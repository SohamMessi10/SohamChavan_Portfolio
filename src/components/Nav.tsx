import Link from "next/link";
import { site } from "@/content/site";
import { ScrollProgress } from "./ScrollProgress";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4">
        <Link href="/" className="font-mono text-sm uppercase tracking-widest">
          {site.name}
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <ul className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest text-muted">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-border pl-6 font-mono text-xs uppercase tracking-widest text-muted">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-3 py-1.5 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
