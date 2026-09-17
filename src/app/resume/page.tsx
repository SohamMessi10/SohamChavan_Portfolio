import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {/* TODO: replace with a real resume PDF/content once provided */}
        Resume coming soon.
      </p>
    </section>
  );
}
