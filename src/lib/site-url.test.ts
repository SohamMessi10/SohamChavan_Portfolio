import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "./site-url";

describe("getSiteUrl", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", undefined);
  });

  it("prefers NEXT_PUBLIC_SITE_URL and drops a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "example.vercel.app");
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("falls back to the Vercel production hostname over https", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "example.vercel.app");
    expect(getSiteUrl()).toBe("https://example.vercel.app");
  });

  it("falls back to localhost when nothing is configured", () => {
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });
});
