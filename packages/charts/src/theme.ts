export interface WheelTheme {
  /** Chart background. Use "none" for transparent. */
  background: string;
  ring: string;
  tick: string;
  fire: string;
  earth: string;
  air: string;
  water: string;
  /** Opacity of the sign-band element tint. */
  signFillOpacity: number;
  planetGlyph: string;
  planetText: string;
  outerGlyph: string;
  houseLine: string;
  houseNumber: string;
  angleLine: string;
  angleText: string;
  aspectHarmonious: string;
  aspectHard: string;
  aspectNeutral: string;
  aspectMinor: string;
}

/** Phosphor-CRT default, at home next to NUMERON. */
export const DEFAULT_THEME: WheelTheme = {
  background: "#0a0f0b",
  ring: "#3f6f4a",
  tick: "#2c4f35",
  fire: "#ff9e64",
  earth: "#a3be8c",
  air: "#7dcfff",
  water: "#bb9af7",
  signFillOpacity: 0.08,
  planetGlyph: "#d8f3dc",
  planetText: "#74a684",
  outerGlyph: "#e8c47a",
  houseLine: "#2c4f35",
  houseNumber: "#4f7f5c",
  angleLine: "#74c69d",
  angleText: "#95d5b2",
  aspectHarmonious: "#5fb381",
  aspectHard: "#e06c75",
  aspectNeutral: "#8a919e",
  aspectMinor: "#5a6472",
};

/** Ink-on-paper theme for PDF/print export. */
export const LIGHT_THEME: WheelTheme = {
  background: "#faf7f0",
  ring: "#3a3630",
  tick: "#8a8378",
  fire: "#b0413e",
  earth: "#5f7145",
  air: "#3d6a8f",
  water: "#5b4a8a",
  signFillOpacity: 0.07,
  planetGlyph: "#221f1a",
  planetText: "#6b6459",
  outerGlyph: "#8a5a1f",
  houseLine: "#c9c2b4",
  houseNumber: "#8a8378",
  angleLine: "#221f1a",
  angleText: "#221f1a",
  aspectHarmonious: "#4a7d5f",
  aspectHard: "#b0413e",
  aspectNeutral: "#7a7468",
  aspectMinor: "#b5aea1",
};
