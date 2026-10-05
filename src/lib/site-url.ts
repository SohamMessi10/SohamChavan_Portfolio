export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    // metadataBase, canonical URLs and the sitemap all build on this value, so
    // fail with a clear message instead of an "Invalid URL" deep in the build.
    if (!isHttpUrl(explicit)) {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL such as "https://example.com" (got "${explicit}").`,
      );
    }
    return explicit.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
