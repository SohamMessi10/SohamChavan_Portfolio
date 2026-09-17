import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-accent underline">
        Back home
      </Link>
    </section>
  );
}
