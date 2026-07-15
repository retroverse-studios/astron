import type { ContentSet } from '../overrides.js';
import { SHIPPED_CONTENT } from '../overrides.js';
import { pirate } from './pirate.js';
import { bard } from './bard.js';
import { robot } from './robot.js';
import { noir } from './noir.js';
import { bubble } from './bubble.js';
import { professor } from './professor.js';
import { politician } from './politician.js';
import { grandma } from './grandma.js';
import { sportscaster } from './sportscaster.js';
import { dj } from './dj.js';

export type NarratorId =
  | 'plain'
  | 'pirate'
  | 'bard'
  | 'robot'
  | 'noir'
  | 'bubble'
  | 'professor'
  | 'politician'
  | 'grandma'
  | 'sportscaster'
  | 'dj';

/**
 * Shipped narrator content sets — complete alternative wordings of the
 * reading text, selectable offline. Entry-for-entry the same meaning as the
 * plain set; the honesty rules bind in every voice. (The AI mode's VOICES
 * are the live cousins of these.)
 */
export const NARRATORS: Record<NarratorId, { label: string; content: ContentSet }> = {
  plain: { label: 'plain — the shipped text', content: SHIPPED_CONTENT },
  pirate: { label: '🏴‍☠️ Pirate captain', content: pirate },
  bard: { label: '🎭 Shakespearean player', content: bard },
  bubble: { label: '✨ Bubblegum bestie', content: bubble },
  professor: { label: '📚 Emeritus professor', content: professor },
  politician: { label: '🎤 Campaigning politician', content: politician },
  noir: { label: '🌧 Noir detective', content: noir },
  grandma: { label: '🍪 Loving grandmother', content: grandma },
  sportscaster: { label: '📣 Sports commentator', content: sportscaster },
  robot: { label: '🤖 Extremely literal robot', content: robot },
  dj: { label: '📻 Late-night cosmic DJ', content: dj },
};

export const NARRATOR_IDS = Object.keys(NARRATORS) as NarratorId[];

/** The note that must accompany readings rendered in a narrator voice. */
export function narratorNote(id: NarratorId): string | undefined {
  if (id === 'plain') return undefined;
  return `Narrated by the ${NARRATORS[id].label} set — the wording is in character, the claims (and the honesty rules) are identical to the plain text.`;
}
