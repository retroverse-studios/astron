# ASTRON — Roadmap

Decisions made at kick-off (July 2026):

- **Ephemeris**: Swiss Ephemeris (`sweph` native binding now; WASM build for the
  browser in Phase 3). Consequence: project is **AGPL-3.0**.
- **Zodiacs**: tropical *and* sidereal/Vedic first-class from day one.
- **Targets**: CLI → Web → Tauri desktop (macOS/Windows/Linux), sharing one
  TypeScript core, mirroring the NUMERON monorepo pattern.

The guiding insight: almost every "chart type" is the same computation pointed at a
different moment. `computeChart(moment, place)` already covers natal, transit,
horary and electional charts. Returns are root-finding on that function; progressions
are a date transform; composite/Davison are midpoints. The engine is the hard 20%;
the chart-type catalogue is mostly thin wrappers.

## Phase 1 — Core engine + CLI ✅ (mostly done)

- [x] Monorepo scaffold (pnpm workspaces, strict TS, vitest)
- [x] `EphemerisProvider` interface + Swiss Ephemeris provider (`sweph`, bundled 1800–2400 ephe files)
- [x] Natal/event charts: planets, nodes, Chiron, Lilith; retrogrades; 7 house systems
- [x] Tropical + sidereal (4 ayanamsas); vargas D1/D9/D10
- [x] Aspects (majors/minors, orbs, applying/separating)
- [x] CLI: `astron natal`, `astron now`; IANA timezone conversion via Luxon
- [x] Tests against documented reference charts (Einstein), equinox, retrograde windows
- [x] Dignities table (rulership/exaltation/detriment/fall; modern + traditional
      schemes, auto-selected by zodiac) + sect-aware Part of Fortune
- [x] `astron transits` (moment vs natal cross-aspects, transiting planets read
      through natal houses; `findCrossAspects` will also serve synastry in Phase 5)
- [x] JSON output flag (`--json`) so other tools/apps can consume the CLI

## Phase 2 — Atlas & time correctness ✅

The classic source of wrong charts. Owned by `packages/atlas`:

- [x] Bundled GeoNames-derived city database (34k cities, population > 15k or
      capitals; name → lat/lon/IANA zone/region/country). Alternates are
      language-filtered from alternateNamesV2 (English + the country's own
      languages) so "Munich", "München", "Wien" and "Vienna" all resolve.
      Regenerate with `pnpm --filter @astron/atlas build:data`.
- [x] Search: diacritic-insensitive, "City, Region, Country" qualifiers,
      population-ranked. CLI: `--place "Ulm, Germany"` and `astron atlas <query>`.
- [x] Historical timezone/DST via IANA (Luxon/ICU)
- [x] **LMT mode**: pre-standard-time offsets are detected by their seconds
      component (Berlin +0:53:28) and replaced with Local Mean Time from the
      place's own longitude; `--time-standard iana|lmt` overrides. Known
      limitation: seconds-precision *standard* times (Amsterdam +0:19:32,
      1835–1937) are treated as LMT — within ~2 minutes for that zone anyway.
- [x] Julian calendar toggle (`--julian`, `ChartInput.calendar`) for
      pre-reform dates, always resolved as LMT
- Deferred: towns under 15k population (needs cities500 or a paid gazetteer);
  formal no-time semantics in core (CLI handles it)

## Phase 3 — Chart wheel + web app ✅ (core done)

- [x] `packages/charts`: dependency-free SVG wheel renderer — sign band with
      element tints, degree ticks, house cusps + numbers, ASC/MC axes,
      collision-avoiding glyph layout, aspect lines, retrogrades, phosphor
      and ink-on-paper themes. Bi-wheel (outer ring + cross-aspect lines,
      tight-orb filtered).
- [x] CLI `--svg <path>` (natal/now wheels, transit bi-wheels), `--light` theme
- [x] `packages/ephemeris-wasm`: Swiss Ephemeris WASM provider
      (swisseph-wasm), parity-tested against the native provider (positions,
      ayanamsa < 1″, houses, sidereal whole-sign recomputed from the sidereal
      ascendant since swe_houses is tropical-only in that build)
- [x] `apps/web`: React + Vite + Tailwind v4, phosphor-CRT theme, atlas-backed
      place search (fetched + decompressed in-browser), tropical/sidereal and
      house-system toggles, wheel + planets/dignities/aspects tables, LMT and
      no-time notices. Fully client-side; production build verified.
      Gotchas encoded in the repo: exclude swisseph-wasm from Vite
      optimizeDeps; sync .wasm/.data to public/wasm/ (scripts/sync-wasm.mjs);
      detect gzip magic bytes because dev servers Content-Encoding-decode
      .gz assets.
- Deferred to later phases: saved charts (IndexedDB), aspect-grid component,
  transit bi-wheel UI in the web app, deploy (astron.retroverse.studio)

## Phase 4 — Time techniques

- Transit scanner: exact-hit dates for transiting aspects to natal points (root-find
  on longitude difference), retrograde/station calendar, void-of-course Moon
- Secondary progressions (day-per-year) + solar arc
- Solar & lunar returns (root-find Sun/Moon return to natal longitude, chart at that instant)
- Ephemeris/calendar view in web + `astron ephemeris` in CLI

## Phase 5 — Relationships

- Synastry: bi-wheel overlay + inter-aspect grid + house overlays
- Composite: midpoint chart (handle the 180° midpoint ambiguity correctly)
- Davison: midpoint in time (average JD) and space (great-circle midpoint), then
  it's just `computeChart` again

## Phase 6 — Desktop (Tauri)

- `apps/desktop`: Tauri 2 wrapping the web app; native file storage for chart library
- CI builds/installers for macOS (arm64+x64), Windows, Linux via tauri-action
- Decide: keep WASM ephemeris in the webview (simplest, one code path) vs native
  Rust sweph via Tauri commands (faster, more plumbing). Default: WASM.

## Phase 7 — Depth & polish

- More vargas (D2–D60 as demanded), Vimshottari dasha periods
- Harmonic charts (longitude × N mod 360 — trivial once wheel exists)
- Arabic parts, fixed stars, vertex
- Interpretation text — port NUMERON's LIGHT/TRUTH/SHADOW three-lens approach;
  biggest content (not code) effort in the project
- PDF reports (reuse NUMERON's @react-pdf patterns)
- Electional search tools; event-based rectification scanner (batch transit-fit
  scoring over a birth-time range) — last, and clearly labelled as approximate

## Known constraints

- AGPL-3.0 project-wide (Swiss Ephemeris requirement). Publishing source is fine;
  a closed commercial fork would need Astrodienst's paid license.
- exFAT volume: macOS `._*` AppleDouble files break esbuild/native-module loading.
  Mitigations in place (vitest/tsc excludes); `find . -name '._*' -delete` if it recurs.
- `sweph` global sidereal state: `set_sid_mode` before every sidereal call (done in
  provider); revisit if we ever go multi-threaded.
