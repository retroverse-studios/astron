import {
  SHIPPED_CONTENT,
  type ContentSet,
  type NarratorId,
} from "@astron/interpret";

export type { NarratorId };

/** Labels mirror @astron/interpret's NARRATORS — keep in sync. The content
 * sets themselves are lazy-loaded per selection so the initial bundle does
 * not carry all ten narrator libraries. */
export const NARRATOR_LABELS: Record<NarratorId, string> = {
  plain: "plain — the shipped text",
  pirate: "🏴‍☠️ Pirate captain",
  bard: "🎭 Shakespearean player",
  bubble: "✨ Bubblegum bestie",
  professor: "📚 Emeritus professor",
  politician: "🎤 Campaigning politician",
  noir: "🌧 Noir detective",
  grandma: "🍪 Loving grandmother",
  sportscaster: "📣 Sports commentator",
  robot: "🤖 Extremely literal robot",
  dj: "📻 Late-night cosmic DJ",
};

const LOADERS: Record<
  Exclude<NarratorId, "plain">,
  () => Promise<ContentSet>
> = {
  pirate: async () =>
    (await import("@astron/interpret/narrators/pirate")).pirate,
  bard: async () => (await import("@astron/interpret/narrators/bard")).bard,
  bubble: async () =>
    (await import("@astron/interpret/narrators/bubble")).bubble,
  professor: async () =>
    (await import("@astron/interpret/narrators/professor")).professor,
  politician: async () =>
    (await import("@astron/interpret/narrators/politician")).politician,
  noir: async () => (await import("@astron/interpret/narrators/noir")).noir,
  grandma: async () =>
    (await import("@astron/interpret/narrators/grandma")).grandma,
  sportscaster: async () =>
    (await import("@astron/interpret/narrators/sportscaster")).sportscaster,
  robot: async () => (await import("@astron/interpret/narrators/robot")).robot,
  dj: async () => (await import("@astron/interpret/narrators/dj")).dj,
};

export interface LoadedNarrator {
  id: NarratorId;
  label: string;
  content: ContentSet;
}

export const PLAIN_NARRATOR: LoadedNarrator = {
  id: "plain",
  label: NARRATOR_LABELS.plain,
  content: SHIPPED_CONTENT,
};

export async function loadNarrator(id: NarratorId): Promise<LoadedNarrator> {
  if (id === "plain") return PLAIN_NARRATOR;
  return { id, label: NARRATOR_LABELS[id], content: await LOADERS[id]() };
}

/** The note that must accompany readings rendered in a narrator voice. */
export function narratorNoteText(id: NarratorId): string | undefined {
  if (id === "plain") return undefined;
  return `Narrated by the ${NARRATOR_LABELS[id]} set — the wording is in character, the claims (and the honesty rules) are identical to the plain text.`;
}
