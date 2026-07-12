import { DateTime } from "luxon";

export interface ResolvedTime {
  utc: Date;
  /**
   * iana: the IANA database offset (handles historical DST correctly).
   * lmt: Local Mean Time computed from the place's own longitude — used for
   * dates before the zone adopted standard time, where IANA would otherwise
   * apply the mean time of the zone's reference city (Berlin's for a birth
   * in Ulm, 14 minutes off).
   */
  method: "iana" | "lmt";
  offsetMinutes: number;
  zone: string;
}

/** Local Mean Time offset for a longitude: 4 minutes per degree east. */
export function lmtOffsetMinutes(longitude: number): number {
  return longitude * 4;
}

/**
 * Convert a local wall-clock date/time at a place to UTC.
 *
 * Pre-standard-time detection: IANA LMT-era offsets carry a seconds
 * component (e.g. Europe/Berlin +00:53:28 before 1893). When the resolved
 * offset is not a whole number of minutes we assume the zone had not yet
 * adopted standard time and use the place's own longitude instead.
 * Known limitation: a few historical *standard* times also had seconds
 * (e.g. Amsterdam +00:19:32, 1835–1937) and will be treated as LMT — for
 * those the longitude-based result is within a couple of minutes anyway.
 */
export function localToUtc(
  dateIso: string,
  timeIso: string,
  /** Accepts an Atlas City directly (its zone field is `timezone`). */
  place: { longitude: number; zone?: string; timezone?: string },
  options: { timeStandard?: "auto" | "iana" | "lmt" } = {},
): ResolvedTime {
  const standard = options.timeStandard ?? "auto";
  const zone = place.zone ?? place.timezone;
  if (!zone) throw new Error("place needs a zone/timezone");
  const local = DateTime.fromISO(`${dateIso}T${timeIso}`, { zone });
  if (!local.isValid) {
    throw new Error(`Invalid date/time/zone: ${local.invalidExplanation}`);
  }

  const ianaOffset = local.offset; // minutes, fractional in LMT-era zones
  const preStandardTime = Math.abs(ianaOffset % 1) > 1e-9;
  const useLmt = standard === "lmt" || (standard === "auto" && preStandardTime);

  if (useLmt) {
    const offset = lmtOffsetMinutes(place.longitude);
    const wall = DateTime.fromISO(`${dateIso}T${timeIso}`, { zone: "UTC" });
    return {
      utc: wall.minus({ minutes: offset }).toJSDate(),
      method: "lmt",
      offsetMinutes: offset,
      zone,
    };
  }

  return {
    utc: local.toUTC().toJSDate(),
    method: "iana",
    offsetMinutes: ianaOffset,
    zone,
  };
}

/** Format an offset like +0:40 or -7:52:30. */
export function formatOffset(minutes: number): string {
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = Math.floor(abs % 60);
  const s = Math.round((abs - Math.floor(abs)) * 60);
  return `${sign}${h}:${String(m).padStart(2, "0")}${s ? `:${String(s).padStart(2, "0")}` : ""}`;
}
