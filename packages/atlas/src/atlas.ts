export interface City {
  name: string;
  alternates: string[];
  latitude: number;
  longitude: number;
  countryCode: string;
  country: string;
  admin1: string;
  population: number;
  timezone: string;
}

/** Lowercase and strip diacritics so "München" matches "munchen". */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

export function parseCityTsv(tsv: string): City[] {
  return tsv.split("\n").map((line) => {
    const c = line.split("\t");
    return {
      name: c[0]!,
      alternates: c[1] ? c[1].split("|") : [],
      latitude: parseFloat(c[2]!),
      longitude: parseFloat(c[3]!),
      countryCode: c[4]!,
      country: c[5]!,
      admin1: c[6]!,
      population: parseInt(c[7]!, 10),
      timezone: c[8]!,
    };
  });
}

/**
 * Offline gazetteer over GeoNames cities15000 (population > 15k or capitals).
 * Queries take "City", "City, Country" or "City, Region, Country" form; the
 * qualifiers match country/region/country-code as substrings.
 *
 * Construct with a City[] (browser: fetch the bundled tsv.gz, decompress,
 * `Atlas.fromTsv(text)`); in Node use `loadAtlas()` from "@astron/atlas/node".
 */
export class Atlas {
  private cities: City[];

  constructor(cities: City[]) {
    this.cities = cities;
  }

  static fromTsv(tsv: string): Atlas {
    return new Atlas(parseCityTsv(tsv));
  }

  get size(): number {
    return this.cities.length;
  }

  search(query: string, limit = 8): City[] {
    const parts = query.split(",").map((p) => normalize(p)).filter(Boolean);
    if (!parts.length) return [];
    const cityQuery = parts[0]!;
    const qualifiers = parts.slice(1);

    const scored: { city: City; score: number }[] = [];
    for (const city of this.cities) {
      const names = [city.name, ...city.alternates].map(normalize);
      let score = 0;
      for (const n of names) {
        if (n === cityQuery) score = Math.max(score, 3);
        else if (n.startsWith(cityQuery)) score = Math.max(score, 2);
        else if (n.includes(cityQuery)) score = Math.max(score, 1);
      }
      if (!score) continue;

      const place = normalize(`${city.admin1} ${city.country} ${city.countryCode}`);
      if (!qualifiers.every((q) => place.includes(q))) continue;

      scored.push({ city, score });
    }

    return scored
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.city.population - a.city.population,
      )
      .slice(0, limit)
      .map((s) => s.city);
  }

  bestMatch(query: string): City | undefined {
    return this.search(query, 1)[0];
  }
}

export function formatCity(city: City): string {
  return [city.name, city.admin1, city.country].filter(Boolean).join(", ");
}
