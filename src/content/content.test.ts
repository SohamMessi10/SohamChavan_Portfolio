import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { site } from "./site";

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it.each(projects)("$slug fills every field its case study renders", (project) => {
    for (const text of [project.name, project.summary, project.problem, project.role, project.dates]) {
      expect(text.trim()).not.toBe("");
    }
    expect(project.stack.length).toBeGreaterThan(0);
  });
});

describe("site", () => {
  it("links to a résumé that exists in public/", () => {
    expect(existsSync(new URL(`../../public${site.resumeUrl}`, import.meta.url))).toBe(true);
  });

  it("uses absolute https URLs for social profiles", () => {
    for (const url of Object.values(site.social)) {
      expect(new URL(url).protocol).toBe("https:");
    }
  });
});
