import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/15">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex gap-4">
          <li>
            <a href={`mailto:${site.email}`} className="hover:underline">
              Email
            </a>
          </li>
          {site.social.github && (
            <li>
              <a href={site.social.github} className="hover:underline">
                GitHub
              </a>
            </li>
          )}
          {site.social.linkedin && (
            <li>
              <a href={site.social.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
