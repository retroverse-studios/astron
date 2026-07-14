import { LIGHT_THEME, renderWheel } from "@astron/charts";
import {
  dignities,
  formatLongitude,
  isDayChart,
  partOfFortune,
  partOfSpirit,
  type Chart,
  type RulershipScheme,
  type StarContact,
} from "@astron/core";
import { readChart } from "@astron/interpret";

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const BODY_LABELS: Record<string, string> = {
  sun: "Sun ☉", moon: "Moon ☽", mercury: "Mercury ☿", venus: "Venus ♀",
  mars: "Mars ♂", jupiter: "Jupiter ♃", saturn: "Saturn ♄", uranus: "Uranus ♅",
  neptune: "Neptune ♆", pluto: "Pluto ♇", trueNode: "North Node ☊",
  meanNode: "North Node ☊", chiron: "Chiron ⚷", meanLilith: "Lilith ⚸",
  asc: "Ascendant", mc: "Midheaven",
};

/**
 * A self-contained printable HTML report (print it to PDF from any
 * browser): ink-on-paper wheel, tables, the assembled reading with its
 * parts labelled, and every disclaimer that must travel with them.
 */
export function renderReport(
  chart: Chart,
  meta: { title: string; subtitle: string },
  scheme: RulershipScheme,
  starContacts: StarContact[],
): string {
  const reading = readChart(chart, scheme);
  const pof = partOfFortune(chart);
  const pos = partOfSpirit(chart);
  const sun = chart.positions.find((p) => p.body === "sun");
  const sect =
    chart.houses && sun
      ? isDayChart(sun.longitude, chart.houses.ascendant)
        ? "day chart"
        : "night chart"
      : undefined;

  const placementRows = chart.positions
    .map(
      (p) => `<tr>
        <td>${BODY_LABELS[p.body]}</td>
        <td>${formatLongitude(p.longitude)}</td>
        <td>${p.house ? `house ${p.house}` : ""}</td>
        <td>${p.retrograde ? "℞" : ""}</td>
        <td>${dignities(p.body, p.sign, scheme).join(", ")}</td>
      </tr>`,
    )
    .join("");

  const aspectRows = chart.aspects
    .map(
      (a) => `<tr>
        <td>${BODY_LABELS[a.a]}</td><td>${a.name}</td><td>${BODY_LABELS[a.b]}</td>
        <td>orb ${a.orb.toFixed(1)}°</td>
      </tr>`,
    )
    .join("");

  const readingBlocks = reading.placements
    .map(
      (r) => `<div class="placement">
        <h3>${BODY_LABELS[r.position.body]} in ${r.position.sign}${r.position.house ? `, house ${r.position.house}` : ""}</h3>
        <p class="part"><span>the planet</span>${esc(r.archetype)}</p>
        <p class="part"><span>light</span>${esc(r.sign.light)}</p>
        <p class="part"><span>truth</span>${esc(r.sign.truth)}</p>
        <p class="part"><span>shadow</span>${esc(r.sign.shadow)}</p>
        ${r.house ? `<p class="part"><span>the house</span>${esc(r.house)}</p>` : ""}
        ${r.dignityNotes.map((d) => `<p class="part"><span>dignity</span>${esc(d)}</p>`).join("")}
      </div>`,
    )
    .join("");

  const aspectReadingBlocks = reading.aspects
    .map(
      (r) => `<div class="placement">
        <h3>${BODY_LABELS[r.aspect.a]} ${r.aspect.name} ${BODY_LABELS[r.aspect.b]} <small>(orb ${r.aspect.orb.toFixed(1)}°)</small></h3>
        <p class="part"><span>pairing</span>${esc(r.pairing)}</p>
        <p class="part"><span>light</span>${esc(r.lenses.light)}</p>
        <p class="part"><span>truth</span>${esc(r.lenses.truth)}</p>
        <p class="part"><span>shadow</span>${esc(r.lenses.shadow)}</p>
      </div>`,
    )
    .join("");

  const starRows = starContacts
    .map(
      (c) =>
        `<tr><td>${esc(c.star)}</td><td>${formatLongitude(c.starLongitude)}</td><td>conjunct ${BODY_LABELS[c.point]}</td><td>orb ${c.orb.toFixed(2)}°</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(meta.title)}</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; color: #221f1a; background: #faf7f0;
         max-width: 46rem; margin: 2rem auto; padding: 0 1.5rem; line-height: 1.55; }
  header { text-align: center; margin-bottom: 1.5rem; }
  h1 { letter-spacing: 0.35em; font-weight: normal; margin-bottom: 0.2rem; }
  h2 { letter-spacing: 0.2em; font-size: 0.85rem; border-bottom: 1px solid #c9c2b4;
       padding-bottom: 0.3rem; margin-top: 2.2rem; text-transform: uppercase; }
  h3 { margin: 1.1rem 0 0.3rem; font-size: 1rem; }
  .subtitle { color: #6b6459; font-style: italic; }
  .wheel { text-align: center; margin: 1.5rem 0; }
  .wheel svg { max-width: 34rem; width: 100%; height: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
  td { padding: 0.25rem 0.5rem 0.25rem 0; border-top: 1px solid #e4ddcf; }
  .part { margin: 0.1rem 0; font-size: 0.92rem; }
  .part span { display: inline-block; width: 5.5rem; font-variant: small-caps;
               color: #8a5a1f; letter-spacing: 0.05em; }
  .disclaimer { font-size: 0.85rem; color: #6b6459; border: 1px solid #c9c2b4;
                padding: 0.8rem 1rem; margin-top: 2rem; }
  footer { font-size: 0.75rem; color: #8a8378; margin: 2rem 0 1rem; text-align: center; }
  @media print { body { margin: 0.5rem auto; } .placement { break-inside: avoid; } }
</style></head><body>
<header>
  <h1>✷ ASTRON</h1>
  <div>${esc(meta.title)}</div>
  <div class="subtitle">${esc(meta.subtitle)}${sect ? ` · ${sect}` : ""}</div>
</header>
<div class="wheel">${renderWheel(chart, { theme: { ...LIGHT_THEME, background: "none" } })}</div>
<h2>Placements</h2>
<table>${placementRows}
${chart.houses ? `<tr><td>Ascendant</td><td>${formatLongitude(chart.houses.ascendant)}</td><td colspan="3"></td></tr>
<tr><td>Midheaven</td><td>${formatLongitude(chart.houses.midheaven)}</td><td colspan="3"></td></tr>` : ""}
${pof !== undefined ? `<tr><td>Part of Fortune ⊗</td><td>${formatLongitude(pof)}</td><td colspan="3"></td></tr>` : ""}
${pos !== undefined ? `<tr><td>Part of Spirit</td><td>${formatLongitude(pos)}</td><td colspan="3"></td></tr>` : ""}
</table>
<h2>Aspects</h2>
<table>${aspectRows}</table>
${starRows ? `<h2>Fixed star contacts</h2><table>${starRows}</table>` : ""}
<h2>The reading, in parts</h2>
${readingBlocks}
<h2>Aspect readings</h2>
${aspectReadingBlocks}
<div class="disclaimer">${esc(reading.disclaimer)}</div>
<footer>Swiss Ephemeris · city data © GeoNames (CC-BY) · ASTRON is AGPL-3.0 —
the astronomy is real; the meanings belong to a tradition, and the judgement to you.</footer>
</body></html>`;
}
