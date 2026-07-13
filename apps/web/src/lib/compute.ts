import { formatCity, localToUtc, type City, type ResolvedTime } from "@astron/atlas";
import {
  computeChart,
  type Chart,
  type EphemerisProvider,
  type HouseSystem,
  type ZodiacMode,
} from "@astron/core";

export interface PersonDraft {
  date: string;
  time: string;
  city?: City;
}

export interface ChartSettings {
  zodiac: ZodiacMode;
  houseSystem: HouseSystem;
}

export interface CastResult {
  chart: Chart;
  resolved: ResolvedTime;
  noTime: boolean;
}

export function castNatal(
  provider: EphemerisProvider,
  person: PersonDraft,
  settings: ChartSettings,
): CastResult {
  if (!person.city) throw new Error("Pick a birthplace first.");
  const noTime = !person.time;
  const resolved = localToUtc(person.date, person.time || "12:00", person.city);
  const chart = computeChart(
    {
      utc: resolved.utc,
      location: noTime
        ? undefined
        : {
            latitude: person.city.latitude,
            longitude: person.city.longitude,
            name: formatCity(person.city),
          },
      zodiac: settings.zodiac,
      houseSystem: settings.houseSystem,
    },
    provider,
  );
  return { chart, resolved, noTime };
}

/** A plain moment chart (transiting sky) at the person's place or a given city. */
export function castMoment(
  provider: EphemerisProvider,
  dateIso: string,
  timeIso: string,
  city: City,
  settings: ChartSettings,
  withHouses = false,
): CastResult {
  const resolved = localToUtc(dateIso, timeIso, city);
  const chart = computeChart(
    {
      utc: resolved.utc,
      location: withHouses
        ? { latitude: city.latitude, longitude: city.longitude, name: formatCity(city) }
        : undefined,
      zodiac: settings.zodiac,
      houseSystem: settings.houseSystem,
    },
    provider,
  );
  return { chart, resolved, noTime: false };
}
