import {
  dignities,
  type Aspect,
  type BodyPosition,
  type Chart,
  type RulershipScheme,
} from "@astron/core";
import { INTERPRETATION_DISCLAIMER, type Lensed } from "./content.js";
import { SHIPPED_CONTENT, type ContentSet } from "./overrides.js";

export * from "./content.js";
export * from "./fluent.js";
export * from "./overrides.js";
export * from "./ai.js";

export interface PlacementReading {
  position: BodyPosition;
  /** What the planet is. */
  archetype: string;
  /** The sign, through three lenses. */
  sign: Lensed;
  /** The house's domain, when houses exist. */
  house?: string;
  /** Essential dignity notes, if any apply. */
  dignityNotes: string[];
}

export interface AspectReading {
  aspect: Aspect;
  /** "the conscious will meets the needs underneath" */
  pairing: string;
  lenses: Lensed;
}

export interface ChartReading {
  placements: PlacementReading[];
  aspects: AspectReading[];
  disclaimer: string;
}

export function readPlacement(
  position: BodyPosition,
  scheme: RulershipScheme = "modern",
  content: ContentSet = SHIPPED_CONTENT,
): PlacementReading {
  return {
    position,
    archetype: content.planetArchetypes[position.body],
    sign: content.signLenses[position.sign],
    house: position.house ? content.houseDomains[position.house - 1] : undefined,
    dignityNotes: dignities(position.body, position.sign, scheme).map(
      (d) => content.dignityNotes[d],
    ),
  };
}

const firstClause = (s: string): string => s.split(" — ")[0]!;

export function readAspect(
  aspect: Aspect,
  content: ContentSet = SHIPPED_CONTENT,
): AspectReading {
  return {
    aspect,
    pairing: `${firstClause(content.planetArchetypes[aspect.a])} ${aspect.name === "opposition" ? "faces" : "meets"} ${firstClause(content.planetArchetypes[aspect.b])}`,
    lenses: content.aspectLenses[aspect.name],
  };
}

/**
 * A whole-chart reading: every placement and (by default only the tighter)
 * aspects, assembled from labelled parts. The disclaimer is part of the
 * reading, not an optional extra — renderers must show it. Pass a merged
 * ContentSet to read with the user's personalised text.
 */
export function readChart(
  chart: Chart,
  scheme: RulershipScheme = "modern",
  options: { maxAspectOrb?: number; content?: ContentSet } = {},
): ChartReading {
  const maxOrb = options.maxAspectOrb ?? 4;
  const content = options.content ?? SHIPPED_CONTENT;
  return {
    placements: chart.positions.map((p) => readPlacement(p, scheme, content)),
    aspects: chart.aspects.filter((a) => a.orb <= maxOrb).map((a) => readAspect(a, content)),
    disclaimer: INTERPRETATION_DISCLAIMER,
  };
}
