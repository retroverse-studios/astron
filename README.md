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
- **CLI** with historical timezone handling via the IANA database

See [docs/PLAN.md](docs/PLAN.md) for the full roadmap (transits, returns, progressions,
synastry/composite/Davison, chart wheel rendering, web app, Tauri desktop).

## Structure

pnpm workspace monorepo:

```
astron/
├── packages/
│   └── core/       # Calculation engine — sweph provider, houses, aspects, vargas
└── apps/
    └── cli/        # astron command-line app
```

Planned: `packages/charts` (SVG wheel renderer), `packages/atlas` (geocoding +
historical time zones + pre-standardisation LMT), `apps/web` (React + Vite),
`apps/desktop` (Tauri).

## Usage

```bash
pnpm install

# Natal chart (tropical, Placidus)
pnpm --filter astron-cli --silent dev natal \
  -d 1955-02-24 -t 21:15 -z America/Los_Angeles --lat 37.77 --lon -122.42

# Vedic: sidereal Lahiri, whole-sign houses, navamsa
pnpm --filter astron-cli --silent dev natal \
  -d 1990-06-15 -t 10:00 -z Asia/Kolkata --lat 28.61 --lon 77.20 \
  --sidereal --houses wholeSign --varga d9

# Chart of the present moment (transits / horary)
pnpm --filter astron-cli --silent dev now --lat -31.95 --lon 115.86 -z Australia/Perth

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
  Luxon/ICU. Caveat: for births before standard time (~1893 in Germany, varies by
  country), IANA gives the zone reference city's mean time — a birth elsewhere in
  the zone needs LMT computed from its own longitude (planned atlas feature).

## License

AGPL-3.0 — required by the Swiss Ephemeris, which is dual-licensed AGPL/commercial.

## The fine print

Astrology is a rich symbolic tradition, not a predictive science. ASTRON computes
real astronomical positions and applies the tradition's rules faithfully — what the
placements *mean* is a question for the tradition, and for you.
