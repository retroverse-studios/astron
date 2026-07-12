import { describe, expect, it } from "vitest";
import { dignities, rulerOf } from "../src/dignities.js";
import { isDayChart, partOfFortune } from "../src/lots.js";
import { computeChart, SwephProvider } from "../src/index.js";
import { norm360 } from "../src/zodiac.js";

describe("essential dignities", () => {
  it("recognises domicile and exaltation", () => {
    expect(dignities("sun", "Leo")).toEqual(["domicile"]);
    expect(dignities("sun", "Aries")).toEqual(["exaltation"]);
    expect(dignities("moon", "Cancer")).toEqual(["domicile"]);
    expect(dignities("mars", "Capricorn")).toEqual(["exaltation"]);
  });

  it("recognises detriment and fall", () => {
    expect(dignities("saturn", "Cancer")).toEqual(["detriment"]);
    expect(dignities("venus", "Virgo")).toEqual(["fall"]);
    expect(dignities("sun", "Libra")).toEqual(["fall"]);
  });

  it("handles Mercury's double dignities in Virgo and Pisces", () => {
    expect(dignities("mercury", "Virgo")).toEqual(["domicile", "exaltation"]);
    expect(dignities("mercury", "Pisces")).toEqual(["detriment", "fall"]);
  });

  it("distinguishes modern and traditional rulership schemes", () => {
    expect(rulerOf("Scorpio", "modern")).toBe("pluto");
    expect(rulerOf("Scorpio", "traditional")).toBe("mars");
    expect(dignities("mars", "Scorpio", "traditional")).toEqual(["domicile"]);
    expect(dignities("mars", "Scorpio", "modern")).toEqual([]);
    expect(dignities("uranus", "Aquarius", "modern")).toEqual(["domicile"]);
  });

  it("returns peregrine (empty) for unrelated placements", () => {
    expect(dignities("jupiter", "Gemini")).toEqual(["detriment"]);
    expect(dignities("jupiter", "Leo")).toEqual([]);
    expect(dignities("chiron", "Leo")).toEqual([]);
  });
});

describe("sect and Part of Fortune", () => {
  it("judges day/night from Sun vs ascendant", () => {
    // ASC 100°: houses 1–6 span 100°→280°; Sun at 150° is below the horizon.
    expect(isDayChart(150, 100)).toBe(false);
    expect(isDayChart(50, 100)).toBe(true); // 50° is in the 280°→100° arc
  });

  it("applies the sect-reversed formula", () => {
    // Einstein, 11:30 LMT: Sun in the 10th house — a day chart.
    const chart = computeChart(
      {
        utc: new Date(Date.UTC(1879, 2, 14, 10, 50, 0)),
        location: { latitude: 48.4, longitude: 10.0 },
      },
      new SwephProvider(),
    );
    const sun = chart.positions.find((p) => p.body === "sun")!;
    const moon = chart.positions.find((p) => p.body === "moon")!;
    expect(isDayChart(sun.longitude, chart.houses!.ascendant)).toBe(true);
    expect(partOfFortune(chart)).toBeCloseTo(
      norm360(chart.houses!.ascendant + moon.longitude - sun.longitude),
      10,
    );
  });

  it("returns undefined without houses", () => {
    const chart = computeChart(
      { utc: new Date(Date.UTC(2000, 0, 1, 12)) },
      new SwephProvider(),
    );
    expect(partOfFortune(chart)).toBeUndefined();
  });
});
