# ASTRON

> *The Clockwork of the Heavens, Charted.*

ASTRON is an astrology chart engine and app suite (CLI, web, desktop) built on the
[Swiss Ephemeris](https://www.astro.com/swisseph/). Western tropical and Vedic
sidereal are both first-class citizens. A [Retroverse Studios](https://retroverse.studio)
project, sibling to [NUMERON](https://numeron.retroverse.studio) — same spirit:
the maths is real and shown honestly; the meaning belongs to the tradition, not to fate.

## Status

Phase 1 in progress. Working today:

- **Natal / event charts** for any moment and place — Sun through Pluto, lunar nodes,
  Chiron, Lilith, with retrograde flags
- **House systems**: Placidus, Whole Sign, Equal, Koch, Campanus, Regiomontanus, Porphyry
- **Zodiacs**: tropical, and sidereal with Lahiri / Raman / Krishnamurti / Fagan-Bradley ayanamsas
- **Aspects** (majors + minors) with per-aspect orbs and applying/separating detection
- **Varga (divisional) charts**: D9 navamsa, D10 dashamsa
- **Essential dignities** (domicile/exaltation/detriment/fall, modern + traditional
  rulers) and the sect-aware **Part of Fortune**
- **Transits**: any moment's sky against a natal chart, read through natal houses,
  plus a scanner for exact-hit dates (`--scan`), stations, ingresses, lunations,
  and void-of-course Moon periods (`astron ephemeris`)
- **Returns & progressions**: solar/lunar return charts, secondary progressions,
  solar arc directions
- **Relationship charts**: synastry (inter-aspects + house overlays), midpoint
  composite, and Davison (time/space midpoint)
- **The compatibility bouquet**: instead of a fake percentage, synastry draws a
  bouquet — blooms for flowing aspects, thorns for frictional ones, buds for
  conjunctions (`--bouquet out.svg`). Thorny bouquets are still bouquets.
- **Depth**: harmonic charts (`--harmonic 9`), the full varga set
  (D1/D2/D3/D7/D9/D10/D12/D30/D60), Vimshottari dashas (`astron dashas`),
  Parts of Fortune and Spirit
- **Electional search**: `astron electional` finds windows that dodge the classic
  cautions (void-of-course Moon, chosen retrogrades, Moon signs, waning Moon)
- **Rectification**: `astron rectify --between 06:00-12:00 --events ...` ranks
  candidate birth times against dated life events — clearly labelled as the
  best-guess technique it is
- **Interpretations at three honesty-labelled tiers** (`--read [mode]`, or the
  selector in the app): **parts** — assembled from named pieces (planet
  archetype, sign through LIGHT/TRUTH/SHADOW lenses, house domain, dignities),
  no AI, deterministic; **fluent** — a built-in set of paragraphs written once
  by AI (Claude) during development, disclosed as such, works offline;
  **ai** — bring your own Anthropic key for a live, per-chart reading (the one
  mode where chart data leaves your machine, and the UI says so). The exact
  prompt is inspectable; the house style — light and shadow, tradition not
  prediction — is enforced in it.
- **Fixed stars**: the sixteen classical bright stars, conjunction contacts to
  points and angles (`--stars`)
- **Printable reports**: `--report chart.html` writes a self-contained
  ink-on-paper report — print to PDF from any browser
- **Fully offline**: web app and desktop app compute everything locally —
  ephemeris, atlas and engine ship in the bundle; birth data never leaves
  your machine
- **Built-in atlas**: offline GeoNames gazetteer (34k cities) — `--place "Ulm, Germany"`
  resolves coordinates and time zone; endonyms and exonyms both work
- **Historical time correctness**: IANA timezone/DST resolution, automatic Local Mean
  Time for pre-standard-time births, and a Julian calendar toggle for pre-reform dates
- **CLI** with `--json` output for machine consumption

See [docs/PLAN.md](docs/PLAN.md) for the full roadmap (transits, returns, progressions,
synastry/composite/Davison, chart wheel rendering, web app, Tauri desktop).

## Structure

pnpm workspace monorepo:

```
astron/
├── packages/
│   ├── core/            # Calculation engine — houses, aspects, dignities, vargas
│   ├── atlas/           # Offline gazetteer (GeoNames), timezone/LMT resolution
│   ├── charts/          # SVG chart wheel renderer (natal wheels, bi-wheels)
│   └── ephemeris-wasm/  # Swiss Ephemeris WASM provider for browsers
└── apps/
    ├── cli/             # astron command-line app
    ├── web/             # React web app — fully client-side charts
    └── desktop/         # Tauri 2 desktop app wrapping the web app
```

## Usage

```bash
pnpm install

# Natal chart (tropical, Placidus) — place resolves via the built-in atlas
pnpm --filter astron-cli --silent dev natal -d 1955-02-24 -t 21:15 -p "San Francisco"

# Vedic: sidereal Lahiri, whole-sign houses, navamsa
pnpm --filter astron-cli --silent dev natal \
  -d 1990-06-15 -t 10:00 -p "New Delhi" --sidereal --houses wholeSign --varga d9

# Chart of the present moment (transits / horary)
pnpm --filter astron-cli --silent dev now -p "Perth, Australia"

# Today's sky against a natal chart (add --on/--at for another date)
pnpm --filter astron-cli --silent dev transits -d 1955-02-24 -t 21:15 -p "San Francisco"

# Pre-standard-time birth: Local Mean Time applied automatically
pnpm --filter astron-cli --silent dev natal -d 1879-03-14 -t 11:30 -p "Ulm, Germany"

# Julian calendar date
pnpm --filter astron-cli --silent dev natal -d 1642-12-25 --julian -p "Grantham"

# Exact transit dates, returns, progressions, sky calendar
pnpm --filter astron-cli --silent dev transits -d 1955-02-24 -t 21:15 -p "San Francisco" --scan 30
pnpm --filter astron-cli --silent dev return solar -d 1990-06-15 -t 10:00 -p "New Delhi" --year 2026
pnpm --filter astron-cli --silent dev progressed -d 1990-06-15 -t 10:00 -p "New Delhi" --solar-arc
pnpm --filter astron-cli --silent dev ephemeris --days 14 -z Australia/Perth

# Relationship charts (synastry | composite | davison share the same options)
pnpm --filter astron-cli --silent dev synastry \
  -d 1990-06-15 -t 10:00 -p "New Delhi" --date2 1988-11-02 --time2 20:00 --place2 Perth

# Chart wheel SVG (add --light for the print theme; transits give a bi-wheel)
pnpm --filter astron-cli --silent dev natal -d 1879-03-14 -t 11:30 -p Ulm --svg wheel.svg

# Web app — Swiss Ephemeris runs in the browser via WebAssembly
pnpm --filter @astron/web dev   # http://localhost:5183

# Desktop app (Tauri 2; needs Rust): dev window or installable bundle
pnpm --filter astron-desktop dev
pnpm --filter astron-desktop build   # .app/.dmg on macOS

# Explicit coordinates still work (--lat 48.4 --lon 10.0 -z Europe/Berlin);
# any command takes --json; city lookup: astron atlas <query>

# Tests
pnpm test
```

Omit `--time` and ASTRON casts a noon "no time" chart (houses withheld, as they'd be
meaningless). Omit `--lat/--lon` for a planets-only chart.

## Accuracy notes

- Ephemeris files in `packages/core/ephe` cover 1800–2400 AD at Swiss Ephemeris
  precision (arcseconds). Outside that range the engine falls back to the built-in
  Moshier model (still sub-arcminute for planets; Chiron unavailable).
- Historical time zones (including pre-DST rules) come from the IANA database via
  Luxon/ICU. For births before standard time (~1893 in Germany, varies by country)
  ASTRON automatically switches to Local Mean Time computed from the birthplace's
  own longitude — the trap where IANA silently applies the zone reference city's
  mean time (Berlin's, for a birth in Ulm) is detected and avoided. Override with
  `--time-standard iana|lmt`.
- City data © [GeoNames](https://www.geonames.org) (CC-BY 4.0): cities with
  population over 15,000 (or capitals). Smaller birth towns: pass `--lat/--lon`,
  or use the nearest listed town (a few km barely moves the cusps).

## License

AGPL-3.0 — required by the Swiss Ephemeris, which is dual-licensed AGPL/commercial.

## The fine print

Astrology is a rich symbolic tradition, not a predictive science. ASTRON computes
real astronomical positions and applies the tradition's rules faithfully — what the
placements *mean* is a question for the tradition, and for you.
