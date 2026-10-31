import type { Body } from "./types.js";

/** Canonical display glyph per body — one table for CLI, web and wheels. */
export const BODY_GLYPHS: Record<Body, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
  trueNode: "☊",
  meanNode: "☊",
  chiron: "⚷",
  meanLilith: "⚸",
};

/** Canonical display name per body. */
export const BODY_NAMES: Record<Body, string> = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluto",
  trueNode: "North Node",
  meanNode: "North Node (mean)",
  chiron: "Chiron",
  meanLilith: "Lilith (mean)",
};
