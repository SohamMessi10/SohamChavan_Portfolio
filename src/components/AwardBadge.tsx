export function AwardBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-amber-200">
      <span aria-hidden="true">★</span>
      {label}
    </span>
  );
}
