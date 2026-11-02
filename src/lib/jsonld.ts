import type { Legend } from './schema';
import { joinBase } from './paths';

const BASE = '/legends-of-spain/';
const SITE_NAME = 'Legends of Spain';

/** ISO 8601 partial date ("1487", "1526-08-04") for schema.org birthDate/deathDate. */
export function isoDate(d: { year: number; month?: number; day?: number }): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  if (d.month && d.day) return `${d.year}-${pad(d.month)}-${pad(d.day)}`;
  if (d.month) return `${d.year}-${pad(d.month)}`;
  return String(d.year);
}

/** schema.org Article about a Person, for a legend's story page. */
export function legendJsonLd(slug: string, legend: Legend, site: URL) {
  const url = new URL(joinBase(BASE, `legends/${slug}/`), site).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: legend.name.display,
    description: legend.seo?.description ?? legend.tagline,
    url,
    image: new URL(joinBase(BASE, `og/${slug}.png`), site).href,
    inLanguage: 'en',
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: new URL(BASE, site).href },
    about: {
      '@type': 'Person',
      name: legend.name.full ?? legend.name.display,
      ...(legend.name.aka.length > 0 && { alternateName: legend.name.aka }),
      birthDate: isoDate(legend.dates.born),
      deathDate: isoDate(legend.dates.died),
      birthPlace: { '@type': 'Place', name: `${legend.origin.place}, ${legend.origin.region}` },
      jobTitle: legend.role,
    },
  };
}

/** schema.org WebSite, for the home page. */
export function siteJsonLd(site: URL, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: new URL(BASE, site).href,
    description,
    inLanguage: 'en',
  };
}
