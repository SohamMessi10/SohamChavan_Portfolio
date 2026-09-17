import Link from "next/link";
import { site } from "@/content/site";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{site.name}</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{site.tagline}</p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          View projects
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium dark:border-white/15"
        >
          About me
        </Link>
      </div>
    </section>
  );
}
