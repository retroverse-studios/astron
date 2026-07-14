import { describe, expect, it } from "vitest";
import { computeChart, SIGNS, type AspectName, type Body } from "@astron/core";
import { SwephProvider } from "@astron/core/sweph";
import {
  ASPECT_LENSES,
  HOUSE_DOMAINS,
  PLANET_ARCHETYPES,
  SIGN_LENSES,
  readChart,
  readPlacement,
} from "../src/index.js";

describe("content completeness", () => {
  it("covers every sign with all three lenses, non-trivially", () => {
    for (const sign of SIGNS) {
      const l = SIGN_LENSES[sign];
      for (const lens of [l.light, l.truth, l.shadow]) {
        expect(lens.length).toBeGreaterThan(20);
      }
      expect(l.light).not.toBe(l.shadow);
    }
  });

  it("covers every body, house and aspect", () => {
    const bodies: Body[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "trueNode", "chiron", "meanLilith"];
    for (const b of bodies) expect(PLANET_ARCHETYPES[b].length).toBeGreaterThan(15);
    expect(HOUSE_DOMAINS).toHaveLength(12);
    const aspects: AspectName[] = ["conjunction", "sextile", "square", "trine", "opposition", "quincunx"];
    for (const a of aspects) expect(ASPECT_LENSES[a].truth.length).toBeGreaterThan(15);
  });
});

describe("reading assembly", () => {
  const provider = new SwephProvider();
  const chart = computeChart(
    {
      utc: new Date(Date.UTC(1879, 2, 14, 10, 50)),
      location: { latitude: 48.4, longitude: 10.0 },
    },
    provider,
  );

  it("assembles placements from the right parts", () => {
    const sun = chart.positions.find((p) => p.body === "sun")!;
    const reading = readPlacement(sun);
    expect(reading.archetype).toBe(PLANET_ARCHETYPES.sun);
    expect(reading.sign).toBe(SIGN_LENSES.Pisces);
    expect(reading.house).toBe(HOUSE_DOMAINS[sun.house! - 1]);
  });

  it("notes dignities when they apply", () => {
    const saturn = chart.positions.find((p) => p.body === "saturn")!;
    expect(saturn.sign).toBe("Aries"); // Saturn in fall
    expect(readPlacement(saturn).dignityNotes[0]).toMatch(/muted/);
  });

  it("reads a whole chart with the disclaimer attached", () => {
    const reading = readChart(chart);
    expect(reading.placements).toHaveLength(chart.positions.length);
    expect(reading.aspects.length).toBeGreaterThan(3);
    for (const a of reading.aspects) expect(a.aspect.orb).toBeLessThanOrEqual(4);
    expect(reading.disclaimer).toMatch(/parts are shown/);
    // opposition pairing uses "faces"
    const opp = reading.aspects.find((a) => a.aspect.name === "opposition");
    if (opp) expect(opp.pairing).toContain("faces");
  });
});
