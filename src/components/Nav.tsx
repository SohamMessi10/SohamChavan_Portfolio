import Link from "next/link";
import { site } from "@/content/site";
import { ScrollProgress } from "./ScrollProgress";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm uppercase tracking-widest">
          {site.name}
        </Link>
        <ul className="flex gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ScrollProgress />
    </header>
  );
}
