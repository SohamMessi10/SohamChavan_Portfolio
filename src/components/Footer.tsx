import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-8 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex gap-4">
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
          </li>
          {site.social.github && (
            <li>
              <a href={site.social.github} className="transition-colors hover:text-foreground">
                GitHub
              </a>
            </li>
          )}
          {site.social.linkedin && (
            <li>
              <a href={site.social.linkedin} className="transition-colors hover:text-foreground">
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
