import type { AspectName, Body, Dignity, Sign } from "@astron/core";
import {
  ASPECT_LENSES,
  DIGNITY_NOTES,
  HOUSE_DOMAINS,
  PLANET_ARCHETYPES,
  SIGN_LENSES,
  type Lensed,
} from "./content.js";
import { FLUENT_PLACEMENTS } from "./fluent.js";

/** Everything readable is editable: the full content surface. */
export interface ContentSet {
  planetArchetypes: Record<Body, string>;
  signLenses: Record<Sign, Lensed>;
  /** Index 0 = house 1. */
  houseDomains: string[];
  aspectLenses: Record<AspectName, Lensed>;
  dignityNotes: Record<Dignity, string>;
  fluentPlacements: Record<Body, Record<Sign, string>>;
}

export const SHIPPED_CONTENT: ContentSet = {
  planetArchetypes: PLANET_ARCHETYPES,
  signLenses: SIGN_LENSES,
  houseDomains: HOUSE_DOMAINS,
  aspectLenses: ASPECT_LENSES,
  dignityNotes: DIGNITY_NOTES,
  fluentPlacements: FLUENT_PLACEMENTS,
};

/**
 * A sparse diff over the shipped text: only edited entries are stored, so
 * restoring the shipped wording is deleting a key. Serializable — this is
 * also the export/import file format.
 */
export interface ContentOverrides {
  version: 1;
  planetArchetypes?: Partial<Record<Body, string>>;
  signLenses?: Partial<Record<Sign, Partial<Lensed>>>;
  /** Keyed "1".."12". */
  houseDomains?: Record<string, string>;
  aspectLenses?: Partial<Record<AspectName, Partial<Lensed>>>;
  dignityNotes?: Partial<Record<Dignity, string>>;
  fluentPlacements?: Partial<Record<Body, Partial<Record<Sign, string>>>>;
}

export const EMPTY_OVERRIDES: ContentOverrides = { version: 1 };

/** Shipped text with the user's edits laid over it. */
export function mergeContent(overrides?: ContentOverrides): ContentSet {
  if (!overrides || countOverrides(overrides) === 0) return SHIPPED_CONTENT;
  const signLenses = { ...SHIPPED_CONTENT.signLenses };
  for (const [sign, patch] of Object.entries(overrides.signLenses ?? {})) {
    signLenses[sign as Sign] = { ...signLenses[sign as Sign], ...patch };
  }
  const aspectLenses = { ...SHIPPED_CONTENT.aspectLenses };
  for (const [aspect, patch] of Object.entries(overrides.aspectLenses ?? {})) {
    aspectLenses[aspect as AspectName] = { ...aspectLenses[aspect as AspectName], ...patch };
  }
  const houseDomains = [...SHIPPED_CONTENT.houseDomains];
  for (const [k, v] of Object.entries(overrides.houseDomains ?? {})) {
    const i = parseInt(k, 10) - 1;
    if (i >= 0 && i < 12) houseDomains[i] = v;
  }
  const fluentPlacements = { ...SHIPPED_CONTENT.fluentPlacements };
  for (const [body, patch] of Object.entries(overrides.fluentPlacements ?? {})) {
    fluentPlacements[body as Body] = { ...fluentPlacements[body as Body], ...patch } as Record<Sign, string>;
  }
  return {
    planetArchetypes: { ...SHIPPED_CONTENT.planetArchetypes, ...overrides.planetArchetypes },
    signLenses,
    houseDomains,
    aspectLenses,
    dignityNotes: { ...SHIPPED_CONTENT.dignityNotes, ...overrides.dignityNotes },
    fluentPlacements,
  };
}

/** How many individual passages the user has personalised. */
export function countOverrides(overrides?: ContentOverrides): number {
  if (!overrides) return 0;
  let n = 0;
  n += Object.keys(overrides.planetArchetypes ?? {}).length;
  n += Object.keys(overrides.dignityNotes ?? {}).length;
  n += Object.keys(overrides.houseDomains ?? {}).length;
  for (const patch of Object.values(overrides.signLenses ?? {})) n += Object.keys(patch).length;
  for (const patch of Object.values(overrides.aspectLenses ?? {})) n += Object.keys(patch).length;
  for (const patch of Object.values(overrides.fluentPlacements ?? {})) n += Object.keys(patch).length;
  return n;
}

/** The note that must accompany readings rendered with personalised text. */
export function overridesNote(overrides?: ContentOverrides): string | undefined {
  const n = countOverrides(overrides);
  if (!n) return undefined;
  return `${n} passage${n === 1 ? "" : "s"} of this text ${n === 1 ? "has" : "have"} been personalised by the chart's owner — this is their voice as much as the tradition's.`;
}

const SECTIONS = [
  "planetArchetypes",
  "signLenses",
  "houseDomains",
  "aspectLenses",
  "dignityNotes",
  "fluentPlacements",
] as const;

/**
 * Parse an exported overrides file, keeping only recognised sections and
 * string leaves — a hand-edited file can't smuggle in surprises.
 */
export function parseOverrides(json: string): ContentOverrides {
  const raw = JSON.parse(json) as Record<string, unknown>;
  if (raw["version"] !== 1) throw new Error("unsupported overrides version (expected 1)");
  const out: ContentOverrides = { version: 1 };
  for (const section of SECTIONS) {
    const value = raw[section];
    if (!value || typeof value !== "object") continue;
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === "string") clean[k] = v;
      else if (v && typeof v === "object") {
        const inner: Record<string, string> = {};
        for (const [ik, iv] of Object.entries(v)) {
          if (typeof iv === "string") inner[ik] = iv;
        }
        if (Object.keys(inner).length) clean[k] = inner;
      }
    }
    if (Object.keys(clean).length) (out as unknown as Record<string, unknown>)[section] = clean;
  }
  return out;
}
