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

## Phase 2 — Atlas & time correctness

The classic source of wrong charts. Own it as `packages/atlas`:

- Bundled GeoNames-derived city database (name → lat/lon/IANA zone), fuzzy search
- Historical timezone/DST via IANA (already through Luxon/ICU); document limits
- **LMT mode**: births before standard time get Local Mean Time from the city's own
  longitude, not the zone city's (validated need: Einstein/Ulm is 14 min off otherwise)
- Julian/Gregorian calendar toggle for pre-1582/1752 dates
- Unknown birth time → explicit "no time" chart semantics (done in CLI; formalise in core)

## Phase 3 — Chart wheel + web app

- `packages/charts`: SVG wheel renderer (signs, houses, glyphs, aspect lines,
  collision-avoiding glyph layout; retroverse aesthetic). SVG renders identically in
  browser, Tauri webview, CLI file export, and future PDF.
- Bi-wheel support (natal inner, transit outer) from the start; aspect grid component
- `apps/web`: React + Vite + Tailwind + Zustand (NUMERON stack), chart form,
  saved charts (IndexedDB), tropical/sidereal toggle
- Swap `sweph` for a Swiss Ephemeris **WASM** provider in the browser
  (`@swisseph/browser` or `swisseph-wasm`; same `EphemerisProvider` interface —
  this is why the interface exists)

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
