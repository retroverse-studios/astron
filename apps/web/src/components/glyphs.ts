import type { Body } from "@astron/core";

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
  meanNode: "North Node",
  chiron: "Chiron",
  meanLilith: "Lilith",
};

export const GLYPHS: Record<Body, string> = {
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

export const panel = "bg-crt-panel border border-crt-line rounded-lg";
export const input =
  "w-full bg-crt-bg border border-crt-line rounded px-3 py-2 text-crt-bright placeholder-crt-dim focus:border-crt-dim outline-none";
export const label = "text-xs text-crt-dim block mb-1";
export const button =
  "bg-crt-line/60 hover:bg-crt-line text-crt-bright rounded px-3 py-2 disabled:opacity-50";
export const buttonGhost =
  "bg-crt-line/25 hover:bg-crt-line/60 text-crt-text rounded px-3 py-2 disabled:opacity-40";
