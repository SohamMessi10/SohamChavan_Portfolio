import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <a
          href={site.resumeUrl}
          download
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Download PDF
        </a>
      </div>
      <object
        data={site.resumeUrl}
        type="application/pdf"
        className="h-[80vh] w-full rounded-lg border border-black/10 dark:border-white/15"
      >
        <p className="p-4 text-zinc-600 dark:text-zinc-400">
          Your browser can&apos;t display the embedded PDF.{" "}
          <a href={site.resumeUrl} className="underline">
            Download the resume
          </a>{" "}
          instead.
        </p>
      </object>
    </section>
  );
}
