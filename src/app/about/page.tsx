import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {/* TODO: replace with real bio once provided */}
        {site.description}
      </p>
    </section>
  );
}
