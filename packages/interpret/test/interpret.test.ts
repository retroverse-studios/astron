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

describe("fluent set", () => {
  it("covers every body in every sign, non-trivially and distinctly", async () => {
    const { FLUENT_PLACEMENTS, fluentPlacement, FLUENT_PROVENANCE } = await import("../src/fluent.js");
    const seen = new Set<string>();
    for (const [body, signs] of Object.entries(FLUENT_PLACEMENTS)) {
      for (const sign of SIGNS) {
        const text = signs[sign];
        expect(text.length, `${body} in ${sign}`).toBeGreaterThan(60);
        if (body !== "meanNode") seen.add(text); // meanNode aliases trueNode
      }
    }
    expect(seen.size).toBe(13 * 12); // every non-alias entry unique
    expect(fluentPlacement("sun", "Pisces", 10)).toContain("10th house");
    expect(FLUENT_PROVENANCE).toMatch(/written once by an AI/);
  });
});

describe("ai prompt", () => {
  it("builds a prompt that enforces the house style and exposes the data", async () => {
    const { buildReadingPrompt, aiProvenance } = await import("../src/ai.js");
    const provider = new SwephProvider();
    const chart = computeChart(
      { utc: new Date(Date.UTC(1990, 5, 15, 4, 30)), location: { latitude: 28.61, longitude: 77.2 } },
      provider,
    );
    const prompt = buildReadingPrompt(chart, "modern", "career");
    expect(prompt.system).toMatch(/not a predictive science/);
    expect(prompt.system).toMatch(/light AND shadow/);
    expect(prompt.user).toContain("career");
    expect(prompt.user).toContain("fluentDraft");
    expect(aiProvenance("claude-x")).toMatch(/chart data leaves/);
  });
});

describe("content overrides", () => {
  it("merges sparse edits over shipped text and counts them", async () => {
    const { mergeContent, countOverrides, SHIPPED_CONTENT, overridesNote, parseOverrides } =
      await import("../src/overrides.js");
    const overrides = parseOverrides(
      JSON.stringify({
        version: 1,
        planetArchetypes: { sun: "my own sun words" },
        signLenses: { Aries: { shadow: "my own shadow words" } },
        houseDomains: { "10": "my summit" },
        fluentPlacements: { moon: { Pisces: "my own moon-in-pisces paragraph" } },
        bogusSection: { hack: "ignored" },
      }),
    );
    expect(countOverrides(overrides)).toBe(4);
    const merged = mergeContent(overrides);
    expect(merged.planetArchetypes.sun).toBe("my own sun words");
    expect(merged.planetArchetypes.moon).toBe(SHIPPED_CONTENT.planetArchetypes.moon);
    expect(merged.signLenses.Aries.shadow).toBe("my own shadow words");
    expect(merged.signLenses.Aries.light).toBe(SHIPPED_CONTENT.signLenses.Aries.light);
    expect(merged.houseDomains[9]).toBe("my summit");
    expect(merged.fluentPlacements.moon.Pisces).toBe("my own moon-in-pisces paragraph");
    expect(overridesNote(overrides)).toMatch(/4 passages/);
    expect((merged as unknown as Record<string, unknown>)["bogusSection"]).toBeUndefined();
  });

  it("restoring is just deleting the key", async () => {
    const { mergeContent, SHIPPED_CONTENT } = await import("../src/overrides.js");
    const merged = mergeContent({ version: 1 });
    expect(merged.planetArchetypes.sun).toBe(SHIPPED_CONTENT.planetArchetypes.sun);
    expect(merged).toBe(SHIPPED_CONTENT); // zero overrides → the shipped object itself
  });

  it("readings flow through personalised content", async () => {
    const { mergeContent } = await import("../src/overrides.js");
    const { readPlacement } = await import("../src/index.js");
    const content = mergeContent({ version: 1, planetArchetypes: { sun: "my sun" } });
    const provider = new SwephProvider();
    const chart = computeChart({ utc: new Date(Date.UTC(2000, 0, 1, 12)) }, provider);
    const sun = chart.positions.find((p) => p.body === "sun")!;
    expect(readPlacement(sun, "modern", content).archetype).toBe("my sun");
  });
});

describe("ai voices", () => {
  it("overlays a preset voice without dropping the honesty rules", async () => {
    const { buildReadingPrompt, VOICES } = await import("../src/ai.js");
    const provider = new SwephProvider();
    const chart = computeChart({ utc: new Date(Date.UTC(2000, 0, 1, 12)) }, provider);
    const prompt = buildReadingPrompt(chart, "modern", undefined, "pirate");
    expect(prompt.system).toContain(VOICES["pirate"]!.instruction);
    expect(prompt.system).toMatch(/honesty rule.*still bind/);
    expect(prompt.system).toMatch(/not a predictive science/);
    // free-text voices pass through
    const custom = buildReadingPrompt(chart, "modern", undefined, "a weary lighthouse keeper");
    expect(custom.system).toContain("weary lighthouse keeper");
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
