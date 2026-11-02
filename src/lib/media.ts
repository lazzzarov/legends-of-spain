import type { ImageMetadata } from 'astro';

// Every raster image under src/assets/legends/<slug>/ is optimised at build time by astro:assets.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/legends/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** Resolve a legend's media `file` to optimisable image metadata, or undefined if not produced yet. */
export function resolveImage(slug: string, file: string | undefined): ImageMetadata | undefined {
  if (!file) return undefined;
  const key = `/src/assets/legends/${slug}/${file}`;
  const found = images[key];
  if (!found) throw new Error(`Media file not found: ${key}`);
  return found.default;
}

/** Initials for engraving-plate placeholders: capitalised words only ("Blas de Lezo" → "BL"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /^\p{Lu}/u.test(w))
    .map((w) => w[0])
    .join('')
    .slice(0, 3);
}
