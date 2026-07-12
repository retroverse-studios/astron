/**
 * Builds data/cities.tsv.gz from GeoNames (CC-BY 4.0, geonames.org).
 *
 * Sources: cities15000.zip (all cities with population > 15,000 or capitals),
 * admin1CodesASCII.txt (region names), countryInfo.txt (country names and
 * languages), alternateNamesV2.zip (language-tagged name variants — large
 * download, ~200 MB, but this script only runs when regenerating the bundle).
 *
 * Alternates kept per city: English names plus names in the country's own
 * languages (so both the exonym "Munich" and the endonym "München" resolve),
 * Latin script only, preferred names first.
 *
 * Output columns (tab-separated, one city per line):
 *   name, alternates ("|"-joined), lat, lon,
 *   countryCode, countryName, admin1Name, population, ianaTimezone
 */
import { execSync } from "node:child_process";
import { createReadStream, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { gzipSync } from "node:zlib";

const BASE = "https://download.geonames.org/export/dump";
const work = join(tmpdir(), "astron-geonames");
mkdirSync(work, { recursive: true });

/** Download with resume, so the ~200 MB alternateNamesV2.zip survives slow links. */
function fetchFile(name: string): void {
  const path = join(work, name);
  // exit 33 = server rejected the range request, i.e. file already complete
  execSync(
    `curl -sL -C - --retry 3 -o "${path}" "${BASE}/${name}" || [ $? -eq 33 ]`,
    { stdio: "inherit", shell: "/bin/bash" },
  );
}

function fetchZip(name: string): void {
  fetchFile(name);
  try {
    execSync(`unzip -t -qq "${join(work, name)}"`, { stdio: "ignore" });
  } catch {
    console.log(`${name} corrupt — refetching from scratch…`);
    execSync(`rm -f "${join(work, name)}"`);
    fetchFile(name);
    execSync(`unzip -t -qq "${join(work, name)}"`, { stdio: "ignore" });
  }
}

console.log("Downloading GeoNames data…");
fetchZip("cities15000.zip");
fetchFile("admin1CodesASCII.txt");
fetchFile("countryInfo.txt");
fetchZip("alternateNamesV2.zip");
execSync(`cd "${work}" && unzip -o -q cities15000.zip && unzip -o -q alternateNamesV2.zip`);

const strip = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "");
/** Latin script, possibly with diacritics (München yes, Мюнхен no). */
const isLatin = (s: string) => /^[A-Za-z .'-]+$/.test(strip(s));

const admin1 = new Map<string, string>();
for (const line of readFileSync(join(work, "admin1CodesASCII.txt"), "utf8").split("\n")) {
  const [code, name] = line.split("\t");
  if (code && name) admin1.set(code, name);
}

const countries = new Map<string, { name: string; langs: Set<string> }>();
for (const line of readFileSync(join(work, "countryInfo.txt"), "utf8").split("\n")) {
  if (line.startsWith("#")) continue;
  const cols = line.split("\t");
  if (!cols[0] || !cols[4]) continue;
  const langs = new Set(
    (cols[15] ?? "")
      .split(",")
      .map((l) => l.split("-")[0]!.trim().toLowerCase())
      .filter(Boolean),
  );
  countries.set(cols[0], { name: cols[4], langs });
}

interface CityRow {
  id: string;
  name: string;
  asciiName: string;
  lat: string;
  lon: string;
  cc: string;
  admin1Name: string;
  population: string;
  timezone: string;
}

const cities: CityRow[] = [];
for (const line of readFileSync(join(work, "cities15000.txt"), "utf8").split("\n")) {
  if (!line) continue;
  const c = line.split("\t");
  cities.push({
    id: c[0]!,
    name: c[1]!,
    asciiName: c[2]!,
    lat: c[4]!,
    lon: c[5]!,
    cc: c[8]!,
    admin1Name: admin1.get(`${c[8]}.${c[10]}`) ?? "",
    population: c[14]!,
    timezone: c[17]!,
  });
}
const cityById = new Map(cities.map((c) => [c.id, c]));

console.log(`Scanning alternate names for ${cities.length} cities…`);
const preferred = new Map<string, string[]>();
const regular = new Map<string, string[]>();
const rl = createInterface({
  input: createReadStream(join(work, "alternateNamesV2.txt")),
  crlfDelay: Infinity,
});
for await (const line of rl) {
  // columns: altId, geonameid, isolanguage, name, isPreferred, isShort,
  //          isColloquial, isHistoric, from, to
  const c = line.split("\t");
  const city = cityById.get(c[1]!);
  if (!city) continue;
  const lang = c[2]!;
  const alt = c[3]!;
  if (c[6] === "1" || c[7] === "1") continue; // colloquial / historic
  if (!alt || alt.length < 3 || !isLatin(alt)) continue;
  const isEnglish = lang === "en";
  const isLocal = countries.get(city.cc)?.langs.has(lang) ?? false;
  if (!isEnglish && !isLocal) continue;
  const bucket = c[4] === "1" ? preferred : regular;
  const list = bucket.get(city.id) ?? [];
  list.push(alt);
  bucket.set(city.id, list);
}

const rows = cities.map((city) => {
  const seen = new Set([
    strip(city.name).toLowerCase(),
    strip(city.asciiName).toLowerCase(),
  ]);
  const alternates: string[] = [];
  if (city.asciiName && city.asciiName !== city.name) alternates.push(city.asciiName);
  for (const alt of [
    ...(preferred.get(city.id) ?? []),
    ...(regular.get(city.id) ?? []),
  ]) {
    if (alternates.length >= 10) break;
    const key = strip(alt).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    alternates.push(alt);
  }
  return [
    city.name,
    alternates.join("|"),
    city.lat,
    city.lon,
    city.cc,
    countries.get(city.cc)?.name ?? city.cc,
    city.admin1Name,
    city.population,
    city.timezone,
  ].join("\t");
});

const out = join(import.meta.dirname, "..", "data");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "cities.tsv.gz"), gzipSync(rows.join("\n"), { level: 9 }));
console.log(`Wrote ${rows.length} cities to data/cities.tsv.gz`);
