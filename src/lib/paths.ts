/**
 * Base-path-safe URLs. The site lives under /legends-of-spain/ on GitHub Pages,
 * so internal links and public assets must never be written as bare "/…" paths.
 */
export function joinBase(base: string, path = ''): string {
  const b = base.endsWith('/') ? base : `${base}/`;
  const p = path.replace(/^\/+/, '');
  return `${b}${p}`;
}

/** Prefix a site path with the configured base: withBase('legends/elcano/') → '/legends-of-spain/legends/elcano/'. */
export const withBase = (path = ''): string => joinBase(import.meta.env.BASE_URL, path);

export const legendPath = (slug: string): string => withBase(`legends/${slug}/`);
