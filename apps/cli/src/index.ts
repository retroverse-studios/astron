#!/usr/bin/env node
import {
  Atlas,
  formatCity,
  formatOffset,
  lmtOffsetMinutes,
  localToUtc,
} from "@astron/atlas";
import {
  computeChart,
  dignities,
  findCrossAspects,
  formatLongitude,
  houseOf,
  isDayChart,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  partOfFortune,
  SwephProvider,
  vargaSign,
  type Aspect,
  type Ayanamsa,
  type Body,
  type CalendarSystem,
  type Chart,
  type ChartInput,
  type GeoLocation,
  type HouseSystem,
  type RulershipScheme,
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
  zone?: string;
  lat?: string;
  lon?: string;
  place?: string;
  houses: string;
  sidereal?: string | boolean;
  varga?: string;
  minorAspects?: boolean;
  json?: boolean;
  timeStandard?: "auto" | "iana" | "lmt";
  julian?: boolean;
}

let sharedAtlas: Atlas | undefined;
function getAtlas(): Atlas {
  return (sharedAtlas ??= new Atlas());
}

interface ResolvedMoment {
  utc: Date;
  calendar: CalendarSystem;
  location?: GeoLocation;
  zone: string;
  /** Wall-clock time as entered, for display. */
  wall: DateTime;
  timeNote?: string;
  noTime: boolean;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

/**
 * Turn CLI date/time/place options into a UTC instant and location.
 * Place comes from --lat/--lon, or an atlas lookup of --place.
 * Pre-standard-time dates use the place's own Local Mean Time; --julian
 * dates are always LMT (time zones postdate the Gregorian reform).
 */
function resolveMoment(dateStr: string, opts: CommonOpts): ResolvedMoment {
  let location: GeoLocation | undefined;
  let zone = opts.zone;
  if (opts.lat !== undefined && opts.lon !== undefined) {
    location = {
      latitude: parseFloat(opts.lat),
      longitude: parseFloat(opts.lon),
      name: opts.place,
    };
  } else if (opts.place) {
    const city = getAtlas().bestMatch(opts.place);
    if (!city) {
      const near = getAtlas().search(opts.place.split(",")[0]!, 3);
      fail(
        `No atlas match for "${opts.place}".` +
          (near.length
            ? ` Closest: ${near.map(formatCity).join(" · ")}`
            : " Try 'astron atlas <name>' or give --lat/--lon."),
      );
    }
    location = {
      latitude: city.latitude,
      longitude: city.longitude,
      name: formatCity(city),
    };
    zone ??= city.timezone;
  }
  zone ??= "UTC";

  const noTime = !opts.time;
  const time = opts.time ?? "12:00";
  const calendar: CalendarSystem = opts.julian ? "julian" : "gregorian";
  const wall = DateTime.fromISO(`${dateStr}T${time}`, { zone: "UTC" });
  if (!wall.isValid) fail(`Invalid date/time: ${wall.invalidExplanation}`);

  if (opts.julian) {
    const offset = location ? lmtOffsetMinutes(location.longitude) : 0;
    return {
      utc: wall.minus({ minutes: offset }).toJSDate(),
      calendar,
      location,
      zone,
      wall,
      noTime,
      timeNote: location
        ? `Julian calendar; Local Mean Time ${formatOffset(offset)} from longitude`
        : "Julian calendar",
    };
  }

  const resolved = localToUtc(
    dateStr,
    time,
    { longitude: location?.longitude ?? 0, zone },
    { timeStandard: location ? (opts.timeStandard ?? "auto") : "iana" },
  );
  return {
    utc: resolved.utc,
    calendar,
    location,
    zone,
    wall,
    noTime,
    timeNote:
      resolved.method === "lmt"
        ? `pre-standard time: Local Mean Time ${formatOffset(resolved.offsetMinutes)} from longitude, not ${zone}`
        : undefined,
  };
}

function buildInput(moment: ResolvedMoment, opts: CommonOpts): ChartInput {
  if (!opts.json) {
    if (!moment.location) {
      console.log("(no place given: computing a planets-only chart, no houses)\n");
    } else if (moment.noTime) {
      console.log("(no --time given: using noon, houses omitted — treat Moon degree as ±6°)\n");
    }
    if (moment.timeNote) console.log(`(${moment.timeNote})\n`);
  }
  const sidereal = opts.sidereal;
  return {
    utc: moment.utc,
    calendar: moment.calendar,
    location: moment.noTime ? undefined : moment.location,
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

/** Vedic charts read dignities with traditional rulers; Western with modern. */
function schemeFor(chart: Chart): RulershipScheme {
  return chart.zodiac.type === "sidereal" ? "traditional" : "modern";
}

function chartToJson(chart: Chart, opts: CommonOpts, moment?: ResolvedMoment): object {
  const scheme = schemeFor(chart);
  return {
    ...chart,
    positions: chart.positions.map((p) => ({
      ...p,
      formatted: formatLongitude(p.longitude),
      dignities: dignities(p.body, p.sign, scheme),
      ...(opts.varga
        ? { [opts.varga.toLowerCase()]: vargaSign(p.longitude, opts.varga.toLowerCase() as Varga) }
        : {}),
    })),
    partOfFortune: partOfFortune(chart),
    sect: chart.houses
      ? isDayChart(
          chart.positions.find((p) => p.body === "sun")!.longitude,
          chart.houses.ascendant,
        )
        ? "day"
        : "night"
      : undefined,
    rulershipScheme: scheme,
    ...(moment?.timeNote ? { timeNote: moment.timeNote } : {}),
  };
}

function printHeader(chart: Chart, moment: ResolvedMoment): void {
  const zodiacLabel =
    chart.zodiac.type === "tropical"
      ? "Tropical"
      : `Sidereal (${chart.zodiac.ayanamsa}, ayanamsa ${chart.ayanamsaValue?.toFixed(2)}°)`;
  console.log("═".repeat(64));
  const calNote = moment.calendar === "julian" ? " (Julian cal.)" : "";
  console.log(
    `  ${moment.wall.toFormat("d LLLL yyyy, HH:mm")} ${moment.zone}${calNote}  (${chart.utc.toISOString().slice(0, 16)}Z)`,
  );
  if (moment.location) {
    const { latitude, longitude, name } = moment.location;
    console.log(`  ${name ?? "location"}: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
  }
  console.log(`  Zodiac: ${zodiacLabel}${chart.houses ? `   Houses: ${chart.houses.system}` : ""}`);
  console.log("═".repeat(64));
}

function printPositions(chart: Chart): void {
  const scheme = schemeFor(chart);
  console.log("\n  PLANETS");
  for (const p of chart.positions) {
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(19);
    const house = (p.house ? `house ${String(p.house).padStart(2)}` : "").padEnd(10);
    const rx = p.retrograde ? "℞ " : "  ";
    const dig = dignities(p.body, p.sign, scheme).join(", ");
    console.log(`  ${BODY_GLYPHS[p.body]}  ${name}${pos}${house}${rx}${dig}`);
  }
}

function printAnglesAndLots(chart: Chart): void {
  if (!chart.houses) return;
  console.log("\n  ANGLES & HOUSES");
  console.log(`  ASC ${formatLongitude(chart.houses.ascendant).padEnd(20)}MC ${formatLongitude(chart.houses.midheaven)}`);
  const pof = partOfFortune(chart);
  if (pof !== undefined) {
    const sun = chart.positions.find((p) => p.body === "sun")!;
    const sect = isDayChart(sun.longitude, chart.houses.ascendant) ? "day" : "night";
    console.log(`  ⊗   Part of Fortune ${formatLongitude(pof)}  (${sect} chart)`);
  }
  const cuspCols = chart.houses.cusps
    .map((c, i) => `${String(i + 1).padStart(2)}: ${formatLongitude(c)}`)
    .map((s) => s.padEnd(24));
  for (let i = 0; i < 12; i += 2) {
    console.log(`  ${cuspCols[i]}${cuspCols[i + 1] ?? ""}`);
  }
}

function printAspects(aspects: Aspect[], title = "ASPECTS"): void {
  if (!aspects.length) return;
  console.log(`\n  ${title}`);
  for (const a of aspects) {
    const label = `${BODY_NAMES[a.a]} ${a.name} ${BODY_NAMES[a.b]}`.padEnd(36);
    console.log(`  ${BODY_GLYPHS[a.a]}–${BODY_GLYPHS[a.b]}  ${label}orb ${a.orb.toFixed(1)}°  ${a.applying ? "applying" : "separating"}`);
  }
}

function printVarga(chart: Chart, vargaOpt: string): void {
  const varga = vargaOpt.toLowerCase() as Varga;
  console.log(`\n  VARGA ${varga.toUpperCase()}`);
  for (const p of chart.positions) {
    console.log(`  ${BODY_GLYPHS[p.body]}  ${BODY_NAMES[p.body].padEnd(18)}${vargaSign(p.longitude, varga)}`);
  }
}

function printChart(chart: Chart, moment: ResolvedMoment, opts: CommonOpts): void {
  for (const w of chart.warnings ?? []) console.log(`(${w})`);
  printHeader(chart, moment);
  printPositions(chart);
  printAnglesAndLots(chart);
  printAspects(chart.aspects);
  if (opts.varga) printVarga(chart, opts.varga);
  console.log();
}

function addCommonOptions(cmd: Command): Command {
  return cmd
    .option("-t, --time <HH:MM>", "local clock time of birth/event")
    .option("-z, --zone <iana>", "IANA time zone (default: the place's zone)")
    .option("-p, --place <query>", 'place lookup, e.g. "Perth" or "Perth, UK"')
    .option("--lat <deg>", "latitude, degrees north-positive (overrides --place coords)")
    .option("--lon <deg>", "longitude, degrees east-positive")
    .option("--houses <system>", "placidus|wholeSign|equal|koch|campanus|regiomontanus|porphyry", "placidus")
    .option("--sidereal [ayanamsa]", "sidereal zodiac: lahiri (default), raman, krishnamurti, faganBradley")
    .option("--varga <dN>", "also show a divisional chart: d1, d9, d10")
    .option("--minor-aspects", "include minor aspects")
    .option("--time-standard <mode>", "auto|iana|lmt — how to interpret clock time", "auto")
    .option("--julian", "date is in the Julian calendar (implies Local Mean Time)")
    .option("--json", "machine-readable JSON output");
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
  const moment = resolveMoment(opts.date, opts);
  const chart = computeChart(buildInput(moment, opts), new SwephProvider());
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts, moment), null, 2));
  } else {
    printChart(chart, moment, opts);
  }
});

addCommonOptions(
  program
    .command("now")
    .description("chart of this exact moment (transits / horary)"),
).action((opts: CommonOpts) => {
  const probe = resolveMoment("2000-01-01", { ...opts, time: "12:00" });
  const nowLocal = DateTime.now().setZone(probe.zone);
  const moment = resolveMoment(nowLocal.toISODate()!, {
    ...opts,
    zone: probe.zone,
    time: nowLocal.toFormat("HH:mm"),
  });
  const chart = computeChart(buildInput(moment, opts), new SwephProvider());
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts, moment), null, 2));
  } else {
    printChart(chart, moment, opts);
  }
});

addCommonOptions(
  program
    .command("transits")
    .description("current (or chosen) sky against a natal chart")
    .requiredOption("-d, --date <YYYY-MM-DD>", "natal date")
    .option("--on <YYYY-MM-DD>", "transit date (default: today)")
    .option("--at <HH:MM>", "transit time (default: now / noon with --on)"),
).action((opts: CommonOpts & { date: string; on?: string; at?: string }) => {
  const provider = new SwephProvider();
  const natalMoment = resolveMoment(opts.date, opts);
  const natal = computeChart(buildInput(natalMoment, opts), provider);

  const zone = natalMoment.zone;
  const transitDate = opts.on ?? DateTime.now().setZone(zone).toISODate()!;
  const transitTime =
    opts.at ?? (opts.on ? "12:00" : DateTime.now().setZone(zone).toFormat("HH:mm"));
  const sky = computeChart(
    {
      utc: localToUtc(transitDate, transitTime, {
        longitude: natalMoment.location?.longitude ?? 0,
        zone,
      }).utc,
      zodiac: natal.zodiac,
    },
    provider,
  );
  // Transiting planets are read through the natal houses.
  if (natal.houses) {
    for (const p of sky.positions) p.house = houseOf(p.longitude, natal.houses);
  }
  const hits = findCrossAspects(sky.positions, natal.positions);

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          natal: chartToJson(natal, opts, natalMoment),
          transiting: sky.positions.map((p) => ({ ...p, formatted: formatLongitude(p.longitude) })),
          transitUtc: sky.utc,
          aspects: hits,
        },
        null,
        2,
      ),
    );
    return;
  }

  printHeader(natal, natalMoment);
  console.log(`\n  TRANSITS for ${transitDate} ${transitTime} ${zone}`);
  for (const p of sky.positions) {
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(19);
    const house = p.house ? `natal house ${String(p.house).padStart(2)}` : "";
    const rx = p.retrograde ? "  ℞" : "";
    console.log(`  ${BODY_GLYPHS[p.body]}  ${name}${pos}${house}${rx}`);
  }
  printAspects(hits, "TRANSITING → NATAL (orb ≤ 3°)");
  console.log();
});

program
  .command("atlas")
  .description("search the built-in city atlas")
  .argument("<query...>", 'e.g. astron atlas Perth, Australia')
  .option("--json", "machine-readable JSON output")
  .action((queryParts: string[], opts: { json?: boolean }) => {
    const query = queryParts.join(" ");
    const results = getAtlas().search(query);
    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }
    if (!results.length) {
      console.log(`No matches for "${query}".`);
      return;
    }
    for (const city of results) {
      console.log(
        `  ${formatCity(city).padEnd(52)}${city.latitude.toFixed(2).padStart(8)}°, ${city.longitude.toFixed(2).padStart(9)}°  ${city.timezone}`,
      );
    }
  });

program.parse();
