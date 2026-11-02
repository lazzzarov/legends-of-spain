/**
 * English UI labels. Content text lives in the legend files; only interface
 * wording lives here, so a second language can be added by adding a sibling file.
 */
import type { CATEGORIES, CHAPTER_KEYS, MEDIA_KINDS, VALUES, VERIFICATION } from '../lib/schema';

type LabelMap<T extends readonly string[]> = Record<T[number], string>;

export const CATEGORY_LABEL: LabelMap<typeof CATEGORIES> = {
  exploration: 'Exploration',
  naval: 'Naval',
  land: 'Land',
  knowledge: 'Knowledge & science',
};

export const VALUE_LABEL: LabelMap<typeof VALUES> = {
  resilience: 'Resilience',
  courage: 'Courage',
  determination: 'Determination',
  ingenuity: 'Ingenuity',
  perseverance: 'Perseverance',
  exploration: 'Exploration',
  ambition: 'Ambition',
  leadership: 'Leadership',
  sacrifice: 'Sacrifice',
  'overcoming-adversity': 'Overcoming adversity',
  'attempting-the-impossible': 'Attempting the impossible',
  curiosity: 'Curiosity',
};

export const VERIFICATION_LABEL: LabelMap<typeof VERIFICATION> = {
  verified: 'Verified',
  disputed: 'Disputed',
  legend: 'Legend',
  dramatization: 'Dramatization',
};

export const VERIFICATION_HELP: LabelMap<typeof VERIFICATION> = {
  verified: 'Supported by primary sources or scholarly consensus.',
  disputed: 'Sources or historians disagree.',
  legend: 'A popular story the documentary record does not support.',
  dramatization: 'Creative interpretation, not a documented event.',
};

export const MEDIA_KIND_LABEL: LabelMap<typeof MEDIA_KINDS> = {
  historical: 'Historical artwork',
  'original-illustration': 'Original illustration',
  'ai-generated': 'AI-generated illustration',
  photograph: 'Photograph',
};

export const CHAPTER_NUMERAL: LabelMap<typeof CHAPTER_KEYS> = {
  beginning: 'I',
  challenge: 'II',
  odds: 'III',
  moment: 'IV',
  legacy: 'V',
};

/** [16] → "16th century"; [15, 16] → "15th–16th century". */
export function centuryLabel(centuries: number[]): string {
  const first = Math.min(...centuries);
  const last = Math.max(...centuries);
  return first === last ? `${first}th century` : `${first}th–${last}th century`;
}
