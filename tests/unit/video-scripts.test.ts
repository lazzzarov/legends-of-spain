import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const root = join(import.meta.dirname, '../..');
const slugs = readdirSync(join(root, 'production')).filter((slug) =>
  existsSync(join(root, 'production', slug, 'video-script.md')),
);

/** Rows of the "## Beats" table as arrays of trimmed cells. */
function beats(markdown: string): string[][] {
  const section = markdown.split(/^## Beats$/m)[1]?.split(/^## /m)[0] ?? '';
  return section
    .split('\n')
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim()),
    );
}

describe('video scripts', () => {
  it('finds at least one script', () => {
    expect(slugs.length).toBeGreaterThan(0);
  });

  for (const slug of slugs) {
    describe(slug, () => {
      const script = readFileSync(join(root, 'production', slug, 'video-script.md'), 'utf8');
      const legend = parse(
        readFileSync(join(root, 'src/content/legends', `${slug}.yaml`), 'utf8'),
      ) as { sources: { id: string }[] };
      const known = new Set(legend.sources.map((s) => s.id));
      const rows = beats(script);

      it('has seven beats', () => {
        expect(rows).toHaveLength(7);
      });

      it('cites a known source for every voiceover line', () => {
        for (const [n, , , voiceover, sources] of rows) {
          expect(voiceover, `beat ${n} voiceover`).toBeTruthy();
          const ids = [...(sources ?? '').matchAll(/`([^`]+)`/g)].map((m) => m[1]!);
          expect(ids.length, `beat ${n} has no source`).toBeGreaterThan(0);
          for (const id of ids) expect(known.has(id), `beat ${n}: unknown source ${id}`).toBe(true);
        }
      });

      it('keeps the voiceover to a one-minute read', () => {
        const words = rows.flatMap((r) => (r[3] ?? '').split(/\s+/).filter(Boolean)).length;
        expect(words).toBeGreaterThanOrEqual(100);
        expect(words).toBeLessThanOrEqual(165);
      });

      it('carries the AI disclosure and never scripts dialogue', () => {
        expect(script).toContain('AI-generated historical dramatization');
        for (const r of rows) expect(r[3]).not.toMatch(/[“"]/);
      });
    });
  }
});
