import { describe, expect, it } from "vitest";
import {
  candidateTimes,
  computeChart,
  rectify,
  scanElectional,
  scanStations,
  scanTransits,
  scanVoidOfCourse,
} from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";

const provider = new SwephProvider();

describe("electional search", () => {
  const window = { from: new Date(Date.UTC(2026, 0, 1)), days: 10 };

  it("windows avoiding void-of-course Moon never overlap a VoC period", () => {
    const good = scanElectional(provider, window, { avoidVoidOfCourse: true });
    expect(good.length).toBeGreaterThan(1);
    const voc = scanVoidOfCourse(provider, { from: new Date(Date.UTC(2025, 11, 29)), days: 13 });
    for (const w of good) {
      for (const p of voc) {
        const overlap =
          w.start.getTime() < p.end.getTime() && p.start.getTime() < w.end.getTime();
        expect(overlap).toBe(false);
      }
    }
  });

  it("respects a Mercury-direct constraint through the Aug/Sep 2023 retrograde", () => {
    const retroWindow = { from: new Date(Date.UTC(2023, 7, 20)), days: 30 };
    const good = scanElectional(provider, retroWindow, {
      avoidVoidOfCourse: false,
      avoidRetrograde: ["mercury"],
    });
    // Mercury was retrograde 23 Aug – 15 Sep: nothing allowed in between.
    const [stationRx, stationD] = scanStations(provider, retroWindow, ["mercury"]);
    for (const w of good) {
      const insideRetro =
        w.start.getTime() >= stationRx!.utc.getTime() &&
        w.end.getTime() <= stationD!.utc.getTime();
      expect(insideRetro).toBe(false);
    }
  });

  it("filters by Moon sign", () => {
    const good = scanElectional(provider, window, {
      avoidVoidOfCourse: false,
      moonSigns: ["Taurus"],
    });
    for (const w of good) {
      const mid = new Date((w.start.getTime() + w.end.getTime()) / 2);
      const moon = provider.bodyPosition(provider.julianDayUt(mid), "moon", { type: "tropical" });
      expect(moon.sign).toBe("Taurus");
    }
  });
});

describe("rectification", () => {
  it("scores the true birth time highest for events built from its angles", () => {
    // "True" birth: 1990-06-15 04:30 UT, Delhi.
    const location = { latitude: 28.61, longitude: 77.2 };
    const trueUtc = new Date(Date.UTC(1990, 5, 15, 4, 30));
    const natal = computeChart({ utc: trueUtc, location }, provider);
    const asc = natal.houses!.ascendant;

    // Manufacture "life events": moments when transiting Saturn/Jupiter hit
    // the true ascendant by conjunction/square/opposition.
    const pseudoAscPoint = [{ ...natal.positions[0]!, body: "sun" as const, longitude: asc }];
    const hits = scanTransits(
      provider,
      pseudoAscPoint,
      { from: new Date(Date.UTC(2010, 0, 1)), days: 3650 },
      { bodies: ["saturn", "jupiter"] },
    ).filter((h) => ["conjunction", "square", "opposition"].includes(h.aspect));
    const events = hits.slice(0, 6).map((h) => ({ utc: h.utc }));
    expect(events.length).toBeGreaterThanOrEqual(4);

    // Bracket 02:30–06:30 UT around the true time, 10-minute steps.
    const { candidates, disclaimer } = rectify(provider, {
      location,
      candidates: candidateTimes(
        new Date(Date.UTC(1990, 5, 15, 2, 30)),
        new Date(Date.UTC(1990, 5, 15, 6, 30)),
        10,
      ),
      events,
    });

    const best = candidates[0]!;
    const offMinutes = Math.abs(best.utc.getTime() - trueUtc.getTime()) / 60000;
    expect(offMinutes).toBeLessThanOrEqual(20);
    expect(best.score).toBeGreaterThan(0);
    expect(best.hits.length).toBeGreaterThan(0);
    expect(disclaimer).toMatch(/best-guess/);
  });
});
