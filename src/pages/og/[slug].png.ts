import type { APIRoute, GetStaticPaths } from 'astro';
import { getLegends, type LegendEntry } from '../../lib/content';
import { lifespan } from '../../lib/legends';
import { renderOgImage } from '../../lib/og';

// One social-preview image per legend, plus "site" for the home and index pages.
export const getStaticPaths = (async () => {
  const legends = await getLegends();
  return [
    { params: { slug: 'site' }, props: { legend: undefined } },
    ...legends.map((legend) => ({ params: { slug: legend.id }, props: { legend } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ legend: LegendEntry | undefined }> = async ({ props }) => {
  const d = props.legend?.data;
  const png = await renderOgImage(
    d
      ? {
          eyebrow: 'Legends of Spain',
          title: d.name.display,
          subtitle: d.tagline,
          footer: `${d.role} · ${lifespan(d.dates)}`,
        }
      : {
          eyebrow: 'An illustrated chronicle',
          title: 'Legends of Spain',
          subtitle:
            'Legends worthy of a thousand films — told in two minutes, sourced to the archive.',
          footer: 'Explorers · Commanders · Pioneers',
        },
  );
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
