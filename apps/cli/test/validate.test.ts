import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  parseChoice,
  parseDateAt,
  parseIntInRange,
  parseLatitude,
  parseList,
  parseLongitude,
} from "../src/validate.js";

describe("CLI validation helpers", () => {
  it("rejects non-numeric and out-of-range values with the option name", () => {
    expect(() => parseIntInRange("abc", "--scan", 1, 10)).toThrow(/--scan/);
    expect(() => parseIntInRange("99", "--scan", 1, 10)).toThrow(/--scan/);
    expect(() => parseIntInRange("2.5", "--scan", 1, 10)).toThrow(/--scan/);
    expect(parseIntInRange("5", "--scan", 1, 10)).toBe(5);
  });

  it("bounds latitude/longitude", () => {
    expect(parseLatitude("-31.95")).toBeCloseTo(-31.95);
    expect(() => parseLatitude("91")).toThrow(/--lat/);
    expect(() => parseLatitude("north")).toThrow(/--lat/);
    expect(() => parseLongitude("181")).toThrow(/--lon/);
  });

  it("rejects unknown enum values and lists the choices", () => {
    expect(() =>
      parseChoice("bogus", "--houses", ["placidus", "equal"]),
    ).toThrow(/placidus\|equal/);
    expect(parseChoice("equal", "--houses", ["placidus", "equal"])).toBe(
      "equal",
    );
  });

  it("validates comma lists entry by entry", () => {
    expect(
      parseList("mercury, venus", "--avoid-retro", ["mercury", "venus"]),
    ).toEqual(["mercury", "venus"]);
    expect(() =>
      parseList("mercury,krypton", "--avoid-retro", ["mercury"]),
    ).toThrow(/--avoid-retro/);
    expect(parseList(undefined, "--avoid-retro", ["mercury"])).toBeUndefined();
  });

  it("rejects unreal calendar dates", () => {
    expect(parseDateAt("1990-06-15", "--to").toISOString()).toBe(
      "1990-06-15T12:00:00.000Z",
    );
    expect(() => parseDateAt("1990-02-30", "--to")).toThrow(/--to/);
    expect(() => parseDateAt("15/06/1990", "--to")).toThrow(/--to/);
  });
});

describe("built CLI rejects invalid input cleanly (no stack trace)", () => {
  const dist = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "dist",
    "index.js",
  );
  it.skipIf(!existsSync(dist))("--houses bogus and --varga bogus", () => {
    for (const args of [
      [
        "natal",
        "-d",
        "1990-06-15",
        "-t",
        "10:00",
        "-p",
        "Perth, Australia",
        "--houses",
        "bogus",
      ],
      ["natal", "-d", "1990-06-15", "--varga", "bogus"],
      ["natal", "-d", "1990-06-15", "--sidereal", "bogus"],
    ]) {
      const run = () => {
        try {
          const stdout = execFileSync(process.execPath, [dist, ...args], {
            encoding: "utf8",
            stdio: "pipe",
          });
          return { status: 0, out: stdout };
        } catch (e) {
          const err = e as {
            stdout?: string;
            stderr?: string;
            status?: number;
          };
          return {
            status: err.status,
            out: `${err.stdout ?? ""}${err.stderr ?? ""}`,
          };
        }
      };
      const { status, out } = run();
      expect(status).toBe(1);
      expect(out).toMatch(/must be one of|unknown varga/);
      expect(out).not.toContain("node_modules");
      expect(out).not.toMatch(/\bat\s+\w+\s+\(file:/);
    }
  });
});
