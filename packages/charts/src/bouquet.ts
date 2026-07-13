import type { BouquetItem, BouquetProfile } from "@astron/core";
import { CHART_BODY_GLYPHS } from "./wheel.js";
import { DEFAULT_THEME, type WheelTheme } from "./theme.js";

export interface BouquetOptions {
  size?: number;
  theme?: Partial<WheelTheme>;
}

const W = 420; // viewBox
const WRAP = { x: 210, y: 372 };

/** Deterministic jitter in [0,1) — layouts must not change between renders. */
const jitter = (i: number, salt: number): number =>
  (((i + 1) * 7919 + salt * 104729) % 997) / 997;

interface Tip {
  x: number;
  y: number;
  angle: number;
  length: number;
}

function stemTip(index: number, count: number, item: BouquetItem): Tip {
  const t = count === 1 ? 0.5 : index / (count - 1);
  const angle = (-56 + 112 * t + (jitter(index, 1) - 0.5) * 10) * (Math.PI / 180);
  const base = item.kind === "thorn" ? 140 : 165;
  const length = base + jitter(index, 2) * 85 + item.weight * 30;
  return {
    x: WRAP.x + length * Math.sin(angle),
    y: WRAP.y - length * Math.cos(angle),
    angle,
    length,
  };
}

const fmt = (n: number): string => (Math.round(n * 10) / 10).toString();

function stemPath(tip: Tip, stroke: string): string {
  const bend = (jitter(Math.round(tip.length), 3) - 0.5) * 40;
  const cx = (WRAP.x + tip.x) / 2 + bend;
  const cy = (WRAP.y + tip.y) / 2;
  return `<path d="M ${WRAP.x} ${WRAP.y} Q ${fmt(cx)} ${fmt(cy)} ${fmt(tip.x)} ${fmt(tip.y)}" fill="none" stroke="${stroke}" stroke-width="1.6"/>`;
}

/**
 * Render a synastry bouquet as a self-contained SVG. Blooms are flowing
 * inter-aspects, thorns frictional ones, buds conjunctions; size follows
 * the profile's weights. The caller must surface profile.disclaimer next
 * to the image — the picture is a mood, not a measurement.
 */
export function renderBouquet(profile: BouquetProfile, options: BouquetOptions = {}): string {
  const theme: WheelTheme = { ...DEFAULT_THEME, ...options.theme };
  const size = options.size ?? W;
  const petalColors = [theme.fire, theme.water, theme.air, theme.earth];
  const parts: string[] = [];

  if (theme.background !== "none") {
    parts.push(`<rect width="${W}" height="${W + 60}" fill="${theme.background}"/>`);
  }

  // Deterministic shuffle so kinds mingle across the fan instead of banding.
  const items = profile.items
    .map((item, i) => ({ item, key: jitter(i, 5) }))
    .sort((a, b) => a.key - b.key)
    .map((x) => x.item);

  items.forEach((item, i) => {
    const tip = stemTip(i, items.length, item);
    const title = `<title>${CHART_BODY_GLYPHS[item.aspect.a]} ${item.aspect.name} ${CHART_BODY_GLYPHS[item.aspect.b]} · orb ${item.aspect.orb.toFixed(1)}°</title>`;
    const group: string[] = [stemPath(tip, theme.ring)];

    if (item.kind === "bloom") {
      const r = 5 + 9 * item.weight;
      const color = petalColors[i % petalColors.length]!;
      for (let p = 0; p < 6; p++) {
        const pa = (p / 6) * 2 * Math.PI + jitter(i, 4) * 0.5;
        group.push(
          `<circle cx="${fmt(tip.x + r * Math.cos(pa))}" cy="${fmt(tip.y + r * Math.sin(pa))}" r="${fmt(r * 0.72)}" fill="${color}" opacity="0.82"/>`,
        );
      }
      group.push(`<circle cx="${fmt(tip.x)}" cy="${fmt(tip.y)}" r="${fmt(r * 0.55)}" fill="${theme.planetGlyph}"/>`);
    } else if (item.kind === "bud") {
      const r = 4 + 4 * item.weight;
      group.push(
        `<ellipse cx="${fmt(tip.x)}" cy="${fmt(tip.y)}" rx="${fmt(r)}" ry="${fmt(r * 1.6)}" fill="${theme.earth}" opacity="0.9" transform="rotate(${fmt((tip.angle * 180) / Math.PI)} ${fmt(tip.x)} ${fmt(tip.y)})"/>`,
        `<circle cx="${fmt(tip.x)}" cy="${fmt(tip.y + r)}" r="${fmt(r * 0.5)}" fill="${theme.ring}"/>`,
      );
    } else {
      // thorn: barbs along the stem and a point at the tip
      for (const frac of [0.55, 0.75]) {
        const bx = WRAP.x + (tip.x - WRAP.x) * frac;
        const by = WRAP.y + (tip.y - WRAP.y) * frac;
        const side = frac === 0.55 ? 1 : -1;
        const barbLen = 6 + 6 * item.weight;
        group.push(
          `<line x1="${fmt(bx)}" y1="${fmt(by)}" x2="${fmt(bx + side * barbLen * Math.cos(tip.angle))}" y2="${fmt(by + side * barbLen * Math.sin(tip.angle) - barbLen * 0.6)}" stroke="${theme.aspectHard}" stroke-width="1.8"/>`,
        );
      }
      group.push(`<circle cx="${fmt(tip.x)}" cy="${fmt(tip.y)}" r="${fmt(2 + 2 * item.weight)}" fill="${theme.aspectHard}"/>`);
    }
    parts.push(`<g>${title}${group.join("")}</g>`);
  });

  // Ribbon wrap.
  parts.push(
    `<path d="M ${WRAP.x - 26} ${WRAP.y + 2} L ${WRAP.x} ${WRAP.y - 8} L ${WRAP.x + 26} ${WRAP.y + 2} L ${WRAP.x} ${WRAP.y + 12} Z" fill="${theme.outerGlyph}" opacity="0.9"/>`,
    `<circle cx="${WRAP.x}" cy="${WRAP.y + 2}" r="5" fill="${theme.background === "none" ? "#000" : theme.background}" stroke="${theme.outerGlyph}" stroke-width="1.5"/>`,
    `<line x1="${WRAP.x - 8}" y1="${WRAP.y + 12}" x2="${WRAP.x - 14}" y2="${WRAP.y + 34}" stroke="${theme.outerGlyph}" stroke-width="2"/>`,
    `<line x1="${WRAP.x + 8}" y1="${WRAP.y + 12}" x2="${WRAP.x + 14}" y2="${WRAP.y + 34}" stroke="${theme.outerGlyph}" stroke-width="2"/>`,
  );

  const caption = profile.items.length
    ? [
        profile.blooms && `${profile.blooms} bloom${profile.blooms === 1 ? "" : "s"}`,
        profile.thorns && `${profile.thorns} thorn${profile.thorns === 1 ? "" : "s"}`,
        profile.buds && `${profile.buds} bud${profile.buds === 1 ? "" : "s"}`,
      ]
        .filter(Boolean)
        .join(" · ")
    : "no aspects within orb — an empty vase, which is also information";
  parts.push(
    `<text x="${W / 2}" y="${W + 34}" fill="${theme.angleText}" font-size="15" text-anchor="middle" letter-spacing="1">${caption}</text>`,
  );

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${fmt((size * (W + 60)) / W)}" viewBox="0 0 ${W} ${W + 60}" ` +
    `font-family="'Noto Sans Symbols', 'Segoe UI Symbol', 'Apple Symbols', sans-serif">` +
    parts.join("") +
    `</svg>`
  );
}
