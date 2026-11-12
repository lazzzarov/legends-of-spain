/**
 * The content contract for every legend.
 *
 * Kept free of `astro:content` so Vitest can validate content files directly.
 * The rules here are the project's credibility guarantees: a build fails when a
 * fact has no source, a reference points nowhere, or an AI image is used as a portrait.
 */
import { z } from 'astro/zod';

export const VERIFICATION = ['verified', 'disputed', 'legend', 'dramatization'] as const;
export const REVIEW_STATUS = ['placeholder', 'draft', 'sourced', 'reviewed', 'published'] as const;
export const CATEGORIES = ['exploration', 'naval', 'land', 'knowledge'] as const;
export const VALUES = [
  'resilience',
  'courage',
  'determination',
  'ingenuity',
  'perseverance',
  'exploration',
  'ambition',
  'leadership',
  'sacrifice',
  'overcoming-adversity',
  'attempting-the-impossible',
  'curiosity',
] as const;
export const CHAPTER_KEYS = ['beginning', 'challenge', 'odds', 'moment', 'legacy'] as const;
export const MEDIA_KINDS = [
  'historical',
  'original-illustration',
  'ai-generated',
  'photograph',
] as const;

const id = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'ids are lowercase-kebab-case');
const sourceIds = z.array(id);
const requiredSourceIds = sourceIds.min(1, 'at least one source is required');

export const histDateSchema = z.object({
  year: z.number().int(),
  month: z.number().int().min(1).max(12).optional(),
  day: z.number().int().min(1).max(31).optional(),
  approx: z.boolean().default(false),
  display: z.string().optional(),
});

/** The one event that places a legend on the timeline (taken from "The Defining Moment"). */
export const keyEventSchema = z.object({
  year: z.number().int(),
  label: z.string().min(1).max(60),
  sources: requiredSourceIds,
});

export const sourceSchema = z.object({
  id,
  title: z.string().min(1),
  author: z.string().optional(),
  institution: z.string().optional(),
  url: z.url().optional(),
  publisher: z.string().optional(),
  year: z.string().optional(),
  accessed: z.string().optional(),
  type: z.enum(['primary', 'academic', 'institutional', 'reference']),
  notes: z.string().optional(),
});

export const mediaSchema = z.object({
  id,
  /** Path under src/assets/legends/<slug>/. Omitted = not produced yet (renders a labelled placeholder). */
  file: z.string().optional(),
  alt: z.string().min(1),
  kind: z.enum(MEDIA_KINDS),
  title: z.string().min(1),
  creator: z.string().optional(),
  date: z.string().optional(),
  posthumous: z.boolean().default(false),
  institution: z.string().optional(),
  sourceUrl: z.url().optional(),
  license: z.string().min(1),
  attribution: z.string().min(1),
  notes: z.string().optional(),
});

export const chapterSchema = z.object({
  key: z.enum(CHAPTER_KEYS),
  title: z.string().min(1),
  body: z.string().min(1),
  more: z.string().optional(),
  image: id.optional(),
  sources: sourceIds.default([]),
  status: z.enum(VERIFICATION),
});

export const factSchema = z.object({
  value: z.string().min(1),
  unit: z.string().optional(),
  label: z.string().min(1),
  explanation: z.string().min(1),
  sources: requiredSourceIds,
  status: z.enum(VERIFICATION),
  icon: z.string().optional(),
});

export const mythSchema = z.object({
  claim: z.string().min(1),
  status: z.enum(VERIFICATION),
  explanation: z.string().min(1),
  sources: requiredSourceIds,
});

export const videoSchema = z
  .object({
    status: z.enum(['planned', 'in-production', 'published']),
    provider: z.enum(['youtube', 'file']).optional(),
    src: z.string().optional(),
    poster: id.optional(),
    captions: z.string().optional(),
    transcript: z.string().optional(),
    description: z.string().min(1),
    durationSec: z.number().int().positive().optional(),
    aiGenerated: z.literal(true),
    tool: z.string().optional(),
  })
  .refine((v) => v.status !== 'published' || Boolean(v.provider && v.src && v.transcript), {
    message: 'a published video needs provider, src and transcript',
  })
  .refine((v) => v.provider !== 'youtube' || !v.src || /^[\w-]{11}$/.test(v.src), {
    message: 'for YouTube, src is the 11-character video id (not a URL)',
  })
  .refine((v) => v.provider !== 'file' || !v.src || !/^(https?:)?\/\//.test(v.src), {
    message: 'for file videos, src is a path under public/ (e.g. media/<slug>/video.mp4)',
  });

export const dialogueSchema = z
  .object({
    speaker: z.string().min(1),
    text: z.string().min(1),
    kind: z.enum(['quotation', 'dramatized']),
    source: id.optional(),
  })
  .refine((d) => d.kind !== 'quotation' || Boolean(d.source), {
    message: 'a quotation must cite a source; otherwise mark it dramatized',
  });

export const panelSchema = z.object({
  image: id.optional(),
  caption: z.string().min(1),
  context: z.string().optional(),
  note: z.string().optional(),
  dialogue: z.array(dialogueSchema).default([]),
  sources: sourceIds.default([]),
});

export const comicSchema = z.object({
  status: z.enum(REVIEW_STATUS),
  panels: z.array(panelSchema).min(1).max(8),
});

const momentSchema = z.object({ text: z.string().min(1), sources: requiredSourceIds });

export const movieSchema = z.object({
  title: z.string().min(1),
  premise: z.string().min(1),
  conflict: z.string().min(1),
  challenge: z.string().min(1),
  moments: z.tuple([momentSchema, momentSchema, momentSchema]),
  theme: z.string().min(1),
  poster: id.optional(),
});

/**
 * A short, silent AI-generated loop shown behind one chapter in story mode. `file` is a path
 * under public/ without extension: `<file>.webm`, `<file>.mp4` and `<file>.jpg` (poster) must exist.
 */
export const storyLoopSchema = z.object({
  chapter: z.enum(CHAPTER_KEYS),
  file: z.string().regex(/^media\/[a-z0-9-]+\/[a-z0-9-]+$/, 'a path like media/<slug>/<name>'),
  alt: z.string().min(1),
});

export const placeSchema = z.object({
  name: z.string().min(1),
  relation: z.string().min(1),
  location: z.string().min(1),
  url: z.url().optional(),
  sources: requiredSourceIds,
});

export const legendSchema = z
  .object({
    /** Position in the book (table of contents order). */
    order: z.number().int().positive(),
    name: z.object({
      display: z.string().min(1),
      full: z.string().optional(),
      aka: z.array(z.string()).default([]),
    }),
    dates: z.object({ born: histDateSchema, died: histDateSchema }),
    origin: z.object({
      place: z.string().min(1),
      region: z.string().min(1),
      coords: z.tuple([z.number(), z.number()]).optional(),
    }),
    role: z.string().min(1),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    centuries: z.array(z.number().int().min(15).max(19)).min(1),
    values: z.array(z.enum(VALUES)).min(1),
    tagline: z.string().min(1),
    hook: z.string().min(1),
    mainAchievement: z.string().min(1),
    keyEvent: keyEventSchema.optional(),
    portrait: id,
    chapters: z.array(chapterSchema).length(5),
    facts: z.array(factSchema).default([]),
    myths: z.array(mythSchema).default([]),
    otherSide: z.object({ body: z.string().min(1), sources: sourceIds.default([]) }),
    video: videoSchema.optional(),
    storyLoops: z.array(storyLoopSchema).default([]),
    comic: comicSchema.optional(),
    movie: movieSchema.optional(),
    places: z.array(placeSchema).default([]),
    related: z.array(id).default([]),
    seo: z
      .object({ title: z.string().optional(), description: z.string().max(160).optional() })
      .optional(),
    review: z.object({
      status: z.enum(REVIEW_STATUS),
      reviewedBy: z.string().optional(),
      reviewedAt: z.string().optional(),
    }),
    sources: z.array(sourceSchema).default([]),
    media: z.array(mediaSchema).min(1),
  })
  .superRefine((legend, ctx) => {
    const issue = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: 'custom', message, path });

    const sourceIdSet = new Set<string>();
    legend.sources.forEach((s, i) => {
      if (sourceIdSet.has(s.id)) issue(`duplicate source id "${s.id}"`, ['sources', i, 'id']);
      sourceIdSet.add(s.id);
    });
    const mediaById = new Map<string, z.infer<typeof mediaSchema>>();
    legend.media.forEach((m, i) => {
      if (mediaById.has(m.id)) issue(`duplicate media id "${m.id}"`, ['media', i, 'id']);
      mediaById.set(m.id, m);
    });

    const checkSources = (ids: string[], path: (string | number)[]) =>
      ids.forEach((sid, i) => {
        if (!sourceIdSet.has(sid)) issue(`unknown source "${sid}"`, [...path, i]);
      });
    const checkMedia = (mid: string | undefined, path: (string | number)[]) => {
      if (mid && !mediaById.has(mid)) issue(`unknown media "${mid}"`, path);
    };

    // Chapters must appear in story order.
    legend.chapters.forEach((c, i) => {
      if (c.key !== CHAPTER_KEYS[i])
        issue(`chapter ${i + 1} must be "${CHAPTER_KEYS[i]}"`, ['chapters', i, 'key']);
      checkSources(c.sources, ['chapters', i, 'sources']);
      checkMedia(c.image, ['chapters', i, 'image']);
    });
    if (legend.keyEvent) {
      checkSources(legend.keyEvent.sources, ['keyEvent', 'sources']);
      const { year } = legend.keyEvent;
      if (year < legend.dates.born.year || year > legend.dates.died.year)
        issue('the key event must fall within the legend’s lifetime', ['keyEvent', 'year']);
    }
    legend.facts.forEach((f, i) => checkSources(f.sources, ['facts', i, 'sources']));
    legend.myths.forEach((m, i) => checkSources(m.sources, ['myths', i, 'sources']));
    legend.places.forEach((p, i) => checkSources(p.sources, ['places', i, 'sources']));
    checkSources(legend.otherSide.sources, ['otherSide', 'sources']);
    legend.movie?.moments.forEach((m, i) =>
      checkSources(m.sources, ['movie', 'moments', i, 'sources']),
    );
    checkMedia(legend.movie?.poster, ['movie', 'poster']);
    checkMedia(legend.video?.poster, ['video', 'poster']);
    const loopChapters = new Set<string>();
    legend.storyLoops.forEach((l, i) => {
      if (loopChapters.has(l.chapter))
        issue(`more than one loop for chapter "${l.chapter}"`, ['storyLoops', i, 'chapter']);
      loopChapters.add(l.chapter);
    });
    legend.comic?.panels.forEach((p, i) => {
      checkMedia(p.image, ['comic', 'panels', i, 'image']);
      checkSources(p.sources, ['comic', 'panels', i, 'sources']);
      p.dialogue.forEach((d, j) => {
        if (d.source && !sourceIdSet.has(d.source))
          issue(`unknown source "${d.source}"`, ['comic', 'panels', i, 'dialogue', j, 'source']);
      });
    });

    // Never present an AI-generated image as a historical portrait.
    checkMedia(legend.portrait, ['portrait']);
    if (mediaById.get(legend.portrait)?.kind === 'ai-generated')
      issue('an AI-generated image cannot be used as the portrait', ['portrait']);
  });

export type Legend = z.infer<typeof legendSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type ReviewStatus = (typeof REVIEW_STATUS)[number];
