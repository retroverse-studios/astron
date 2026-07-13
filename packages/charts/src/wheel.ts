import {
  norm360,
  type Aspect,
  type AspectName,
  type Body,
  type BodyPosition,
  type Chart,
} from "@astron/core";
import { angleForLongitude, polarPoint, spreadAngles, type Point } from "./layout.js";
import { DEFAULT_THEME, type WheelTheme } from "./theme.js";

const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const ELEMENT_KEYS = ["fire", "earth", "air", "water"] as const;

export const CHART_BODY_GLYPHS: Record<Body, string> = {
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

export interface WheelOptions {
  /** Rendered width/height in px; the drawing itself is a 640-unit viewBox. */
  size?: number;
  theme?: Partial<WheelTheme>;
  showAspects?: boolean;
  /**
   * Bi-wheel outer ring (e.g. transiting positions around a natal chart).
   * `aspects` here are cross-aspects whose `a` is an outer body and `b` a
   * chart body — drawn from ring to ring.
   */
  outer?: { positions: BodyPosition[]; aspects?: Aspect[] };
}

const C = 320; // center of the 640-unit viewBox
const R = {
  signOuter: 300,
  signInner: 262,
  tick1: 258,
  tick10: 252,
  cuspOuter: 248,
  cuspInner: 172,
  outerGlyph: 236,
  outerPointer: 254,
  glyph: 212,
  glyphBi: 198,
  degreeText: 192,
  degreeTextBi: 180,
  pointer: 246,
  aspectRing: 168,
  aspectEnd: 164,
  outerAspectEnd: 222,
  houseNumber: 156,
  angleLabel: 311,
};

function aspectColor(name: AspectName, theme: WheelTheme): string {
  if (name === "trine" || name === "sextile") return theme.aspectHarmonious;
  if (name === "square" || name === "opposition") return theme.aspectHard;
  if (name === "conjunction") return theme.aspectNeutral;
  return theme.aspectMinor;
}

const fmt = (n: number): string => (Math.round(n * 100) / 100).toString();

function line(p1: Point, p2: Point, stroke: string, width: number, opacity = 1): string {
  return `<line x1="${fmt(p1.x)}" y1="${fmt(p1.y)}" x2="${fmt(p2.x)}" y2="${fmt(p2.y)}" stroke="${stroke}" stroke-width="${width}"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`;
}

function text(
  p: Point,
  content: string,
  fill: string,
  fontSize: number,
  extra = "",
): string {
  return `<text x="${fmt(p.x)}" y="${fmt(p.y)}" fill="${fill}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central"${extra}>${content}</text>`;
}

function circle(r: number, stroke: string, width: number): string {
  return `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
}

/** Annulus sector between two screen angles (counterclockwise from a1 to a2). */
function sector(a1: number, a2: number, rIn: number, rOut: number, fill: string, opacity: number): string {
  const p1 = polarPoint(C, C, rIn, a1);
  const p2 = polarPoint(C, C, rOut, a1);
  const p3 = polarPoint(C, C, rOut, a2);
  const p4 = polarPoint(C, C, rIn, a2);
  return (
    `<path d="M ${fmt(p1.x)} ${fmt(p1.y)} L ${fmt(p2.x)} ${fmt(p2.y)} ` +
    `A ${rOut} ${rOut} 0 0 0 ${fmt(p3.x)} ${fmt(p3.y)} L ${fmt(p4.x)} ${fmt(p4.y)} ` +
    `A ${rIn} ${rIn} 0 0 1 ${fmt(p1.x)} ${fmt(p1.y)} Z" fill="${fill}" opacity="${opacity}"/>`
  );
}

function renderBodies(
  positions: BodyPosition[],
  rotation: number,
  theme: WheelTheme,
  ring: { glyph: number; degreeText?: number; pointerFrom: number; pointerTo: number },
  color: string,
): string[] {
  const parts: string[] = [];
  const trueAngles = positions.map((p) => angleForLongitude(p.longitude, rotation));
  const glyphAngles = spreadAngles(trueAngles, 8);
  positions.forEach((p, i) => {
    const trueA = trueAngles[i]!;
    const glyphA = glyphAngles[i]!;
    parts.push(
      line(
        polarPoint(C, C, ring.pointerFrom, trueA),
        polarPoint(C, C, ring.pointerTo, trueA),
        color,
        1.4,
      ),
    );
    parts.push(text(polarPoint(C, C, ring.glyph, glyphA), CHART_BODY_GLYPHS[p.body], color, 21));
    if (p.retrograde) {
      parts.push(text(polarPoint(C, C, ring.glyph - 14, glyphA + 3.5), "℞", theme.planetText, 9));
    }
    if (ring.degreeText !== undefined) {
      const deg = Math.floor(p.signDegree);
      const min = Math.floor((p.signDegree - deg) * 60);
      parts.push(
        text(
          polarPoint(C, C, ring.degreeText, glyphA),
          `${deg}°${String(min).padStart(2, "0")}′`,
          theme.planetText,
          10,
        ),
      );
    }
  });
  return parts;
}

/**
 * Render a chart as a self-contained SVG string (no external fonts or
 * scripts — glyphs are plain Unicode). Works for natal/event wheels, and
 * as a bi-wheel when `options.outer` carries a second set of positions.
 */
export function renderWheel(chart: Chart, options: WheelOptions = {}): string {
  const theme: WheelTheme = { ...DEFAULT_THEME, ...options.theme };
  const size = options.size ?? 640;
  const showAspects = options.showAspects ?? true;
  const rotation = chart.houses?.ascendant ?? 0;
  const parts: string[] = [];

  if (theme.background !== "none") {
    parts.push(`<rect width="640" height="640" fill="${theme.background}"/>`);
  }

  // Sign band: tinted sectors, boundaries, glyphs.
  for (let i = 0; i < 12; i++) {
    const a1 = angleForLongitude(i * 30, rotation);
    const elementColor = theme[ELEMENT_KEYS[i % 4]!];
    parts.push(sector(a1, a1 + 30, R.signInner, R.signOuter, elementColor, theme.signFillOpacity));
    parts.push(
      line(polarPoint(C, C, R.signInner, a1), polarPoint(C, C, R.signOuter, a1), theme.ring, 1),
    );
    const mid = angleForLongitude(i * 30 + 15, rotation);
    parts.push(text(polarPoint(C, C, (R.signInner + R.signOuter) / 2, mid), SIGN_GLYPHS[i]!, elementColor, 24));
  }
  parts.push(circle(R.signOuter, theme.ring, 1.5));
  parts.push(circle(R.signInner, theme.ring, 1.5));

  // Degree ticks.
  for (let d = 0; d < 360; d += 1) {
    const a = angleForLongitude(d, rotation);
    const inner = d % 10 === 0 ? R.tick10 : d % 5 === 0 ? (R.tick1 + R.tick10) / 2 : R.tick1;
    parts.push(line(polarPoint(C, C, R.signInner, a), polarPoint(C, C, inner, a), theme.tick, d % 10 === 0 ? 1 : 0.5));
  }

  // Houses.
  if (chart.houses) {
    const cusps = chart.houses.cusps;
    for (let i = 0; i < 12; i++) {
      const a = angleForLongitude(cusps[i]!, rotation);
      const isAxis = i === 0 || i === 3 || i === 6 || i === 9;
      parts.push(
        line(
          polarPoint(C, C, R.cuspInner, a),
          polarPoint(C, C, R.cuspOuter, a),
          isAxis ? theme.angleLine : theme.houseLine,
          isAxis ? 2.2 : 1,
        ),
      );
      const mid = a + norm360(angleForLongitude(cusps[(i + 1) % 12]!, rotation) - a) / 2;
      parts.push(text(polarPoint(C, C, R.houseNumber, mid), String(i + 1), theme.houseNumber, 11));
    }
    for (const [lon, label] of [
      [chart.houses.ascendant, "ASC"],
      [chart.houses.midheaven, "MC"],
    ] as const) {
      parts.push(text(polarPoint(C, C, R.angleLabel, angleForLongitude(lon, rotation)), label, theme.angleText, 12, ' font-weight="bold"'));
    }
  }

  parts.push(circle(R.cuspInner, theme.ring, 1));
  parts.push(circle(R.aspectRing, theme.ring, 1));

  // Aspect lines inside the inner circle.
  if (showAspects) {
    const at = new Map(chart.positions.map((p) => [p.body, angleForLongitude(p.longitude, rotation)]));
    for (const a of chart.aspects) {
      const a1 = at.get(a.a);
      const a2 = at.get(a.b);
      if (a1 === undefined || a2 === undefined) continue;
      parts.push(
        line(polarPoint(C, C, R.aspectEnd, a1), polarPoint(C, C, R.aspectEnd, a2), aspectColor(a.name, theme), a.orb < 1.5 ? 1.6 : 1, 0.85),
      );
    }
  }

  // Bodies (inner ring sits tighter when an outer ring is present).
  const biwheel = !!options.outer;
  parts.push(
    ...renderBodies(chart.positions, rotation, theme, {
      glyph: biwheel ? R.glyphBi : R.glyph,
      degreeText: biwheel ? R.degreeTextBi : R.degreeText,
      pointerFrom: R.cuspOuter,
      pointerTo: R.pointer,
    }, theme.planetGlyph),
  );

  if (options.outer) {
    parts.push(
      ...renderBodies(options.outer.positions, rotation, theme, {
        glyph: R.outerGlyph,
        pointerFrom: R.signInner,
        pointerTo: R.outerPointer,
      }, theme.outerGlyph),
    );
    if (showAspects && options.outer.aspects) {
      const outerAt = new Map(options.outer.positions.map((p) => [p.body, angleForLongitude(p.longitude, rotation)]));
      const innerAt = new Map(chart.positions.map((p) => [p.body, angleForLongitude(p.longitude, rotation)]));
      // Only tight cross-aspects get lines — drawing all of them turns a
      // bi-wheel into spaghetti; the full list belongs in a table.
      for (const a of options.outer.aspects.filter((x) => x.orb <= 1.5)) {
        const a1 = outerAt.get(a.a);
        const a2 = innerAt.get(a.b);
        if (a1 === undefined || a2 === undefined) continue;
        parts.push(
          line(polarPoint(C, C, R.outerAspectEnd, a1), polarPoint(C, C, R.aspectEnd, a2), aspectColor(a.name, theme), 1, 0.45),
        );
      }
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 640 640" ` +
    `font-family="'Noto Sans Symbols', 'Segoe UI Symbol', 'Apple Symbols', sans-serif">` +
    parts.join("") +
    `</svg>`
  );
}
