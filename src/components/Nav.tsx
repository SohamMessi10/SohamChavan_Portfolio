import Link from "next/link";
import { site } from "@/content/site";
import { ScrollProgress } from "./ScrollProgress";
import { NavLinks } from "./NavLinks";

const resumeClass =
  "rounded border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 sm:py-4">
        <Link href="/" className="font-mono text-sm uppercase tracking-widest">
          {site.name}
        </Link>
        {/* Phones: the résumé stays in the top row and the section links
            scroll sideways underneath, so the sticky header stays two rows. */}
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${resumeClass} sm:hidden`}
        >
          Resume
        </a>
        <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 sm:w-auto">
          <NavLinks items={site.nav} />
          <div className="hidden items-center gap-4 border-l border-border pl-6 font-mono text-xs uppercase tracking-widest text-muted sm:flex">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
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
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className={resumeClass}>
              Resume
            </a>
          </div>
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
