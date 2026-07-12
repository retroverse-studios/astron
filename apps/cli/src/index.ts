#!/usr/bin/env node
import {
  computeChart,
  formatLongitude,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  SwephProvider,
  vargaSign,
  type Ayanamsa,
  type Body,
  type Chart,
  type ChartInput,
  type HouseSystem,
  type Varga,
} from "@astron/core";
import { Command } from "commander";
import { DateTime } from "luxon";

const BODY_GLYPHS: Record<Body, string> = {
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

const BODY_NAMES: Record<Body, string> = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluto",
  trueNode: "North Node",
  meanNode: "North Node (mean)",
  chiron: "Chiron",
  meanLilith: "Lilith (mean)",
};

interface CommonOpts {
  time?: string;
  zone: string;
  lat?: string;
  lon?: string;
  place?: string;
  houses: string;
  sidereal?: string | boolean;
  varga?: string;
  minorAspects?: boolean;
}

function resolveUtc(dateStr: string, opts: CommonOpts): {
  utc: Date;
  noTime: boolean;
  local: DateTime;
} {
  const noTime = !opts.time;
  const time = opts.time ?? "12:00";
  const local = DateTime.fromISO(`${dateStr}T${time}`, { zone: opts.zone });
  if (!local.isValid) {
    console.error(`Invalid date/time/zone: ${local.invalidExplanation}`);
    process.exit(1);
  }
  return { utc: local.toUTC().toJSDate(), noTime, local };
}

function buildInput(utc: Date, noTime: boolean, opts: CommonOpts): ChartInput {
  const hasPlace = opts.lat !== undefined && opts.lon !== undefined;
  if (!hasPlace) {
    console.log("(no --lat/--lon given: computing a planets-only chart, no houses)\n");
  } else if (noTime) {
    console.log("(no --time given: using noon, houses omitted — treat Moon degree as ±6°)\n");
  }
  const sidereal = opts.sidereal;
  return {
    utc,
    location:
      hasPlace && !noTime
        ? {
            latitude: parseFloat(opts.lat!),
            longitude: parseFloat(opts.lon!),
            name: opts.place,
          }
        : undefined,
    zodiac: sidereal
      ? {
          type: "sidereal",
          ayanamsa: (typeof sidereal === "string" ? sidereal : "lahiri") as Ayanamsa,
        }
      : { type: "tropical" },
    houseSystem: opts.houses as HouseSystem,
    aspectDefs: opts.minorAspects
      ? [...MAJOR_ASPECTS, ...MINOR_ASPECTS]
      : undefined,
  };
}

function printChart(chart: Chart, local: DateTime, opts: CommonOpts): void {
  const zodiacLabel =
    chart.zodiac.type === "tropical"
      ? "Tropical"
      : `Sidereal (${chart.zodiac.ayanamsa}, ayanamsa ${chart.ayanamsaValue?.toFixed(2)}°)`;

  console.log("═".repeat(64));
  console.log(`  ${local.toFormat("d LLLL yyyy, HH:mm")} ${local.zoneName}  (${chart.utc.toISOString().slice(0, 16)}Z)`);
  if (chart.location) {
    const { latitude, longitude, name } = chart.location;
    console.log(`  ${name ?? "location"}: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
  }
  console.log(`  Zodiac: ${zodiacLabel}${chart.houses ? `   Houses: ${chart.houses.system}` : ""}`);
  console.log("═".repeat(64));

  console.log("\n  PLANETS");
  for (const p of chart.positions) {
    const glyph = BODY_GLYPHS[p.body];
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(18);
    const house = p.house ? `house ${String(p.house).padStart(2)}` : "";
    const rx = p.retrograde ? "  ℞" : "";
    console.log(`  ${glyph}  ${name}${pos}${house}${rx}`);
  }

  if (chart.houses) {
    console.log("\n  ANGLES & HOUSES");
    console.log(`  ASC ${formatLongitude(chart.houses.ascendant).padEnd(20)}MC ${formatLongitude(chart.houses.midheaven)}`);
    const cuspCols = chart.houses.cusps
      .map((c, i) => `${String(i + 1).padStart(2)}: ${formatLongitude(c)}`)
      .map((s) => s.padEnd(24));
    for (let i = 0; i < 12; i += 2) {
      console.log(`  ${cuspCols[i]}${cuspCols[i + 1] ?? ""}`);
    }
  }

  if (chart.aspects.length) {
    console.log("\n  ASPECTS");
    for (const a of chart.aspects) {
      const label = `${BODY_NAMES[a.a]} ${a.name} ${BODY_NAMES[a.b]}`.padEnd(36);
      console.log(`  ${BODY_GLYPHS[a.a]}–${BODY_GLYPHS[a.b]}  ${label}orb ${a.orb.toFixed(1)}°  ${a.applying ? "applying" : "separating"}`);
    }
  }

  if (opts.varga) {
    const varga = opts.varga.toLowerCase() as Varga;
    console.log(`\n  VARGA ${varga.toUpperCase()}`);
    for (const p of chart.positions) {
      console.log(`  ${BODY_GLYPHS[p.body]}  ${BODY_NAMES[p.body].padEnd(18)}${vargaSign(p.longitude, varga)}`);
    }
  }
  console.log();
}

function addCommonOptions(cmd: Command): Command {
  return cmd
    .option("-t, --time <HH:MM>", "local clock time of birth/event")
    .option("-z, --zone <iana>", "IANA time zone, e.g. Australia/Perth", "UTC")
    .option("--lat <deg>", "latitude, degrees north-positive")
    .option("--lon <deg>", "longitude, degrees east-positive")
    .option("--place <name>", "place label for display")
    .option("--houses <system>", "placidus|wholeSign|equal|koch|campanus|regiomontanus|porphyry", "placidus")
    .option("--sidereal [ayanamsa]", "sidereal zodiac: lahiri (default), raman, krishnamurti, faganBradley")
    .option("--varga <dN>", "also show a divisional chart: d1, d9, d10")
    .option("--minor-aspects", "include minor aspects");
}

const program = new Command()
  .name("astron")
  .description("ASTRON — astrology charts from the command line")
  .version("0.1.0");

addCommonOptions(
  program
    .command("natal")
    .description("cast a natal (or any event) chart")
    .requiredOption("-d, --date <YYYY-MM-DD>", "local date of birth/event"),
).action((opts: CommonOpts & { date: string }) => {
  const { utc, noTime, local } = resolveUtc(opts.date, opts);
  const chart = computeChart(buildInput(utc, noTime, opts), new SwephProvider());
  printChart(chart, local, opts);
});

addCommonOptions(
  program
    .command("now")
    .description("chart of this exact moment (transits / horary)"),
).action((opts: CommonOpts) => {
  const nowLocal = DateTime.now().setZone(opts.zone);
  const withTime = { ...opts, time: nowLocal.toFormat("HH:mm") };
  const chart = computeChart(
    buildInput(nowLocal.toUTC().toJSDate(), false, withTime),
    new SwephProvider(),
  );
  printChart(chart, nowLocal, opts);
});

program.parse();
