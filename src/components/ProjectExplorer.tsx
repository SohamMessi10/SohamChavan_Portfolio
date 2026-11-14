"use client";

import { useEffect, useMemo, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { formatMonth } from "@/lib/dates";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectPreview } from "./ProjectPreview";
import { Reveal } from "./Reveal";

type Filter = "All" | ProjectCategory;

/**
 * A date-ordered timeline of project cards. The card crossing the middle of
 * the viewport becomes "active" (as do cards you point at or tab into), and on
 * large screens a sticky panel beside the timeline previews it. On phones the
 * panel is hidden and each card shows its own figure.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const reducedMotion = usePrefersReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );
  const figureProjects = useMemo(() => projects.filter((p) => p.figure), [projects]);
  const active = visible.find((p) => p.slug === activeSlug) ?? visible[0];

  const countFor = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
  const filters = (["All", ...projectCategories] as Filter[]).filter((f) => countFor(f) > 0);

  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef({ x: -1, y: -1 });

  // Scroll-driven: whichever card crosses the middle band of the viewport.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug;
          if (entry.isIntersecting && slug) setActiveSlug(slug);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    list.querySelectorAll<HTMLElement>("[data-slug]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [visible]);

  // Fill the timeline rail down to the active card's dot.
  const activeKey = active?.slug;
  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    const list = listRef.current;
    if (!rail || !fill || !list) return;

    function update() {
      if (!rail || !fill || !list) return;
      const dot = list.querySelector<HTMLElement>(`[data-slug="${activeKey}"] [data-dot]`);
      if (!dot) return;
      const railTop = rail.getBoundingClientRect().top;
      const dotRect = dot.getBoundingClientRect();
      fill.style.height = `${Math.max(0, dotRect.top + dotRect.height / 2 - railTop)}px`;
    }

    update();
    const resize = new ResizeObserver(update);
    resize.observe(list);
    return () => resize.disconnect();
  }, [activeKey, visible]);

  function activateOnPointer(slug: string, event: PointerEvent) {
    if (event.pointerType === "touch") return;
    // Ignore the synthetic events some browsers fire after scrolling, where
    // the pointer hasn't actually moved.
    const { clientX: x, clientY: y } = event;
    if (x === lastPointer.current.x && y === lastPointer.current.y) return;
    lastPointer.current = { x, y };
    if (slug !== activeSlug) setActiveSlug(slug);
  }

  function activateOnFocus(slug: string, event: FocusEvent<HTMLLIElement>) {
    setActiveSlug(slug);
    // Keyboard users: bring the focused card to the middle of the screen, where
    // the scroll-driven highlight expects it, so the two never disagree.
    if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) {
      event.currentTarget.scrollIntoView({ block: "center", behavior: reducedMotion ? "auto" : "smooth" });
    }
  }

  return (
    <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* Bottom padding on large screens lets the last card reach mid-screen
          while the preview panel is still pinned, instead of sliding away. */}
      <div className="lg:pb-[max(0px,calc(38rem_-_50vh))]">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const selected = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f)}
                className={`rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {f} <span className="opacity-60">{countFor(f)}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} ${filter === "All" ? "" : `${filter} `}project${visible.length === 1 ? "" : "s"}`}
        </p>

        <div ref={railRef} className="relative mt-8">
          {/* Timeline rail and its progress fill (decorative) */}
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 hidden w-px bg-border sm:block" />
          <div
            ref={fillRef}
            aria-hidden="true"
            className="timeline-fill absolute left-[7px] top-0 hidden w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_10px_var(--accent)] transition-[height] duration-500 ease-out sm:block"
            style={{ height: 0 }}
          />

          <ol ref={listRef} className="flex flex-col gap-6 sm:pl-8">
            {visible.map((project, index) => {
              const month = formatMonth(project.date);
              const newMonth = index === 0 || month !== formatMonth(visible[index - 1].date);
              const isActive = project.slug === active?.slug;
              return (
                <li
                  key={project.slug}
                  data-slug={project.slug}
                  onPointerMove={(event) => activateOnPointer(project.slug, event)}
                  onFocus={(event) => activateOnFocus(project.slug, event)}
                >
                  {newMonth && (
                    <p className="relative mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-1/2 hidden h-[15px] w-[15px] -translate-y-1/2 rounded-full border border-border bg-background sm:block"
                      />
                      {month}
                    </p>
                  )}
                  <div className="relative">
                    <span
                      data-dot
                      aria-hidden="true"
                      className={`absolute -left-[29px] top-8 hidden h-[9px] w-[9px] rounded-full transition-all duration-300 sm:block ${
                        isActive
                          ? "scale-150 bg-accent shadow-[0_0_12px_var(--accent)]"
                          : "bg-border"
                      }`}
                    />
                    <Reveal>
                      <ProjectCard project={project} index={index} active={isActive} />
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <aside aria-label="Project preview" className="hidden lg:block">
        <div className="sticky top-24">
          {active && <ProjectPreview project={active} figureProjects={figureProjects} />}
        </div>
      </aside>
    </div>
  );
}
