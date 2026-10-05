import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { generateMetadata } from "./page";

const props = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("project page metadata", () => {
  it.each(projects)("gives $slug its own share title, description and URL", async (project) => {
    const metadata = await generateMetadata(props(project.slug));

    expect(metadata.openGraph).toMatchObject({
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      siteName: site.name,
    });
  });

  it("returns no metadata for an unknown slug", async () => {
    expect(await generateMetadata(props("does-not-exist"))).toEqual({});
  });
});
