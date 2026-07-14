import {
  dignities,
  type Aspect,
  type BodyPosition,
  type Chart,
  type RulershipScheme,
} from "@astron/core";
import {
  ASPECT_LENSES,
  DIGNITY_NOTES,
  HOUSE_DOMAINS,
  INTERPRETATION_DISCLAIMER,
  PLANET_ARCHETYPES,
  SIGN_LENSES,
  type Lensed,
} from "./content.js";

export * from "./content.js";

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
): PlacementReading {
  return {
    position,
    archetype: PLANET_ARCHETYPES[position.body],
    sign: SIGN_LENSES[position.sign],
    house: position.house ? HOUSE_DOMAINS[position.house - 1] : undefined,
    dignityNotes: dignities(position.body, position.sign, scheme).map(
      (d) => DIGNITY_NOTES[d],
    ),
  };
}

const firstClause = (s: string): string => s.split(" — ")[0]!;

export function readAspect(aspect: Aspect): AspectReading {
  return {
    aspect,
    pairing: `${firstClause(PLANET_ARCHETYPES[aspect.a])} ${aspect.name === "opposition" ? "faces" : "meets"} ${firstClause(PLANET_ARCHETYPES[aspect.b])}`,
    lenses: ASPECT_LENSES[aspect.name],
  };
}

/**
 * A whole-chart reading: every placement and (by default only the tighter)
 * aspects, assembled from labelled parts. The disclaimer is part of the
 * reading, not an optional extra — renderers must show it.
 */
export function readChart(
  chart: Chart,
  scheme: RulershipScheme = "modern",
  options: { maxAspectOrb?: number } = {},
): ChartReading {
  const maxOrb = options.maxAspectOrb ?? 4;
  return {
    placements: chart.positions.map((p) => readPlacement(p, scheme)),
    aspects: chart.aspects.filter((a) => a.orb <= maxOrb).map(readAspect),
    disclaimer: INTERPRETATION_DISCLAIMER,
  };
}
