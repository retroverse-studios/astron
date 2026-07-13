import { describe, expect, it } from "vitest";
import {
  computeChart,
  julianDayUtc,
  lunarReturn,
  scanIngresses,
  scanLunations,
  scanStations,
  scanTransits,
  scanVoidOfCourse,
  secondaryProgression,
  solarArcDirections,
  solarReturn,
  utcFromJulianDay,
  norm180,
} from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";

const provider = new SwephProvider();
const lonOf = (chart: ReturnType<typeof computeChart>, body: string) =>
  chart.positions.find((p) => p.body === body)!.longitude;

describe("julian day round trip", () => {
  it("utcFromJulianDay inverts julianDayUtc to the millisecond scale", () => {
    for (const d of [
      new Date(Date.UTC(2026, 6, 13, 4, 30, 15, 250)),
      new Date(Date.UTC(1879, 2, 14, 10, 50)),
      new Date(Date.UTC(2000, 0, 1, 12)),
    ]) {
      const back = utcFromJulianDay(julianDayUtc(d));
      expect(Math.abs(back.getTime() - d.getTime())).toBeLessThan(5);
    }
  });
});

describe("returns", () => {
  const natal = computeChart(
    {
      utc: new Date(Date.UTC(1990, 5, 15, 4, 30)),
      location: { latitude: 28.61, longitude: 77.2 },
    },
    provider,
  );

  it("solar return puts the Sun exactly on its natal longitude", () => {
    const sr = solarReturn(provider, natal, 2026);
    expect(Math.abs(norm180(lonOf(sr, "sun") - lonOf(natal, "sun")))).toBeLessThan(1e-3);
    // within a couple of days of the birthday
    expect(sr.utc.getUTCMonth()).toBe(5);
    expect(Math.abs(sr.utc.getUTCDate() - 15)).toBeLessThanOrEqual(2);
    expect(sr.houses).toBeDefined(); // natal location carried over
  });

  it("lunar return finds the next Moon return after a date", () => {
    const after = new Date(Date.UTC(2026, 6, 1));
    const lr = lunarReturn(provider, natal, after);
    expect(Math.abs(norm180(lonOf(lr, "moon") - lonOf(natal, "moon")))).toBeLessThan(1e-3);
    const days = (lr.utc.getTime() - after.getTime()) / 86400000;
    expect(days).toBeGreaterThan(0);
    expect(days).toBeLessThan(28);
  });
});

describe("progressions", () => {
  const natal = computeChart(
    { utc: new Date(Date.UTC(1990, 5, 15, 4, 30)) },
    provider,
  );

  it("secondary progressed Sun advances ~1° per year of life", () => {
    const target = new Date(Date.UTC(2020, 5, 15, 4, 30)); // age 30
    const prog = secondaryProgression(provider, natal, target);
    const advance = norm180(lonOf(prog, "sun") - lonOf(natal, "sun"));
    expect(advance).toBeGreaterThan(28);
    expect(advance).toBeLessThan(31.5);
  });

  it("solar arc moves every point by the same arc", () => {
    const target = new Date(Date.UTC(2020, 5, 15, 4, 30));
    const { arc, positions } = solarArcDirections(provider, natal, target);
    expect(arc).toBeGreaterThan(28);
    expect(arc).toBeLessThan(31.5);
    for (const p of positions) {
      const natalP = natal.positions.find((n) => n.body === p.body)!;
      expect(Math.abs(norm180(p.longitude - natalP.longitude - arc))).toBeLessThan(1e-9);
    }
  });
});

describe("scanners", () => {
  it("finds Mercury's Aug/Sep 2023 stations on the documented days", () => {
    const events = scanStations(
      provider,
      { from: new Date(Date.UTC(2023, 7, 1)), days: 60 },
      ["mercury"],
    );
    expect(events).toHaveLength(2);
    expect(events[0]!.type).toBe("retrograde");
    expect(events[0]!.utc.toISOString().slice(0, 10)).toBe("2023-08-23");
    expect(events[1]!.type).toBe("direct");
    expect(events[1]!.utc.toISOString().slice(0, 10)).toBe("2023-09-15");
  });

  it("finds the Sun's equinox ingress into Aries at the documented minute", () => {
    const events = scanIngresses(
      provider,
      { from: new Date(Date.UTC(2000, 2, 15)), days: 10 },
      ["sun"],
    );
    const aries = events.find((e) => e.sign === "Aries")!;
    expect(aries.utc.toISOString().slice(0, 13)).toBe("2000-03-20T07");
  });

  it("finds the 8 April 2024 new moon (the eclipse) to the day", () => {
    const events = scanLunations(provider, {
      from: new Date(Date.UTC(2024, 3, 1)),
      days: 30,
    });
    const newMoon = events.find((e) => e.type === "new")!;
    expect(newMoon.utc.toISOString().slice(0, 10)).toBe("2024-04-08");
    // one of each phase in a synodic month
    expect(events.map((e) => e.type).sort()).toEqual(
      ["firstQuarter", "full", "lastQuarter", "new"],
    );
  });

  it("finds all three passes of a Saturn return across a station", () => {
    const natal = computeChart({ utc: new Date(Date.UTC(1990, 0, 1, 12)) }, provider);
    const natalSaturn = natal.positions.filter((p) => p.body === "saturn");
    const hits = scanTransits(
      provider,
      natalSaturn,
      { from: new Date(Date.UTC(2019, 0, 1)), days: 365 },
      { bodies: ["saturn"] },
    ).filter((h) => h.aspect === "conjunction");
    expect(hits).toHaveLength(3);
    expect(hits.map((h) => h.retrograde)).toEqual([false, true, false]);
    for (const h of hits) {
      const at = provider.bodyPosition(h.jd, "saturn", { type: "tropical" });
      expect(Math.abs(norm180(at.longitude - natalSaturn[0]!.longitude))).toBeLessThan(1e-3);
    }
  });

  it("void-of-course periods end exactly on sign boundaries", () => {
    const periods = scanVoidOfCourse(provider, {
      from: new Date(Date.UTC(2026, 0, 1)),
      days: 10,
    });
    expect(periods.length).toBeGreaterThan(1);
    for (const p of periods) {
      expect(p.jdEnd).toBeGreaterThan(p.jdStart);
      const moonAtEnd = provider.bodyPosition(p.jdEnd + 1e-4, "moon", { type: "tropical" });
      expect(moonAtEnd.sign).toBe(p.entering);
      expect(moonAtEnd.signDegree).toBeLessThan(0.01);
    }
  });
});
