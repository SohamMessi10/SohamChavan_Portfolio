"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { readonly label: string; readonly href: string };

/**
 * Section links that highlight whichever home-page section is mid-screen.
 * On phones the row scrolls sideways and keeps the highlighted link in view.
 */
export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = items
      .map((item) => document.getElementById(item.href.split("#")[1] ?? ""))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, items]);

  const activeId = pathname === "/" ? current : null;

  // Phones: keep the highlighted link visible in the sideways-scrolling row.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !activeId || scroller.scrollWidth <= scroller.clientWidth) return;
    const link = scroller.querySelector<HTMLElement>('[aria-current="location"]');
    if (!link) return;
    const box = scroller.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({
      left: rect.left - box.left - (box.width - rect.width) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [activeId]);

  return (
    <div
      ref={scrollerRef}
      className="scrollbar-none -mx-6 w-[calc(100%+3rem)] overflow-x-auto px-6 pb-2 sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0 sm:pb-0"
    >
      <ul className="flex gap-6 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted sm:flex-wrap">
        {items.map((item) => {
          const isActive = activeId !== null && item.href === `/#${activeId}`;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`relative transition-colors hover:text-foreground ${
                  isActive
                    ? "text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-accent after:shadow-[0_0_8px_var(--accent)]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
