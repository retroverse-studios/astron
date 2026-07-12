import { describe, expect, it } from "vitest";
import { Atlas, formatCity } from "../src/atlas.js";
import { formatOffset, lmtOffsetMinutes, localToUtc } from "../src/time.js";

const atlas = new Atlas();

describe("city search", () => {
  it("loads the GeoNames database", () => {
    expect(atlas.size).toBeGreaterThan(30000);
  });

  it("ranks the biggest city first for a bare name", () => {
    const perth = atlas.bestMatch("Perth")!;
    expect(perth.countryCode).toBe("AU");
    expect(perth.timezone).toBe("Australia/Perth");
    expect(perth.latitude).toBeCloseTo(-31.95, 1);
  });

  it("disambiguates with a country qualifier", () => {
    const perthUk = atlas.bestMatch("Perth, United Kingdom")!;
    expect(perthUk.countryCode).toBe("GB");
    expect(perthUk.timezone).toBe("Europe/London");
  });

  it("matches admin-region qualifiers", () => {
    const sf = atlas.bestMatch("San Francisco, California")!;
    expect(sf.countryCode).toBe("US");
    expect(sf.longitude).toBeCloseTo(-122.4, 1);
  });

  it("finds cities by endonym and exonym alike", () => {
    // GeoNames' canonical name for München is "Munich"; the endonym lives
    // in the alternates and must still resolve.
    const munich = atlas.bestMatch("München")!;
    expect(munich.name).toBe("Munich");
    expect(munich.countryCode).toBe("DE");
    expect(atlas.bestMatch("Munich")!.name).toBe("Munich");
  });

  it("matches names with diacritics stripped", () => {
    const sp = atlas.bestMatch("Sao Paulo")!;
    expect(sp.name).toBe("São Paulo");
  });

  it("finds Ulm with its zone", () => {
    const ulm = atlas.bestMatch("Ulm, Germany")!;
    expect(ulm.timezone).toBe("Europe/Berlin");
    expect(ulm.longitude).toBeCloseTo(10.0, 0);
    expect(formatCity(ulm)).toContain("Ulm");
  });
});

describe("time resolution", () => {
  it("uses IANA offsets for modern dates, including DST", () => {
    const winter = localToUtc("2026-01-15", "12:00", {
      longitude: 115.86,
      zone: "Australia/Perth",
    });
    expect(winter.method).toBe("iana");
    expect(winter.utc.toISOString()).toBe("2026-01-15T04:00:00.000Z");

    // New York DST: EDT (-4) in July, EST (-5) in January.
    const july = localToUtc("2026-07-04", "12:00", {
      longitude: -74.01,
      zone: "America/New_York",
    });
    expect(july.utc.toISOString()).toBe("2026-07-04T16:00:00.000Z");
    const jan = localToUtc("2026-01-04", "12:00", {
      longitude: -74.01,
      zone: "America/New_York",
    });
    expect(jan.utc.toISOString()).toBe("2026-01-04T17:00:00.000Z");
  });

  it("switches to place-longitude LMT before standard time (Einstein, Ulm 1879)", () => {
    const ulm = atlas.bestMatch("Ulm, Germany")!;
    const resolved = localToUtc("1879-03-14", "11:30", ulm);
    expect(resolved.method).toBe("lmt");
    // Ulm at 9.99°E → +39.97 min; astro.com uses LMT +0:40 → 10:50 UT.
    expect(resolved.offsetMinutes).toBeCloseTo(40, 0);
    expect(resolved.utc.toISOString().slice(0, 16)).toBe("1879-03-14T10:50");
  });

  it("honours an explicit timeStandard override", () => {
    const ulm = atlas.bestMatch("Ulm, Germany")!;
    const iana = localToUtc("1879-03-14", "11:30", ulm, { timeStandard: "iana" });
    expect(iana.method).toBe("iana");
    // Berlin mean time +0:53:28 → 10:36:32 UT (the wrong-city trap).
    expect(iana.utc.toISOString().slice(0, 16)).toBe("1879-03-14T10:36");
  });

  it("computes and formats LMT offsets", () => {
    expect(lmtOffsetMinutes(10)).toBeCloseTo(40);
    expect(lmtOffsetMinutes(-122.42)).toBeCloseTo(-489.68);
    expect(formatOffset(40)).toBe("+0:40");
    expect(formatOffset(-489.68)).toBe("-8:09:41");
  });
});
