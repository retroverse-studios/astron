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

## Phase 4 — Time techniques ✅ (engine + CLI)

Everything sits on `findCrossings` (core/src/scan.ts): sampled zero-crossings
of a circular signed function, wrap-guarded, refined by bisection to ~1s.

- [x] Transit scanner (`scanTransits`): exact hits of transiting aspects to
      natal points; each station pass reported separately (validated: the
      2019 Saturn return's direct–retro–direct triple). Moon opt-in.
      CLI: `astron transits --scan <days> [--moon]`.
- [x] Stations (`scanStations`, validated against Mercury Aug/Sep 2023) and
      sign ingresses incl. retrograde re-entries (`scanIngresses`, validated
      against the 2000 equinox minute).
- [x] Lunations (`scanLunations`, validated against the 8 Apr 2024 eclipse
      new moon) and void-of-course Moon (`scanVoidOfCourse` — last exact
      major aspect → ingress, empty-sign edge case handled).
- [x] Solar & lunar returns (`solarReturn`/`lunarReturn`) — return charts in
      the natal zodiac, relocatable. CLI: `astron return solar|lunar`.
- [x] Secondary progressions + solar arc directions. CLI: `astron progressed
      [--solar-arc]`. Progressed houses = progressed instant at natal place
      (one convention of several; labelled as such).
- [x] `astron ephemeris [--from --days -z]` — merged sky-events calendar.
- Deferred: ephemeris/calendar view in the web app; transit scanning UI.

## Phase 5 — Relationships ✅ (engine + CLI)

- [x] Synastry (`synastry`): inter-aspects (applying/separating suppressed —
      meaningless between birth charts) + house overlays both directions.
      CLI: `astron synastry -d ... --date2 ... --place2 ...`, `--svg` bi-wheel.
- [x] Composite (`compositeChart`): shorter-arc midpoints (deterministic 90°
      convention for exact oppositions), speeds zeroed, whole-sign houses
      from the midpoint ascendant, labelled as one convention of several.
- [x] Davison (`davisonChart`): average JD + great-circle geographic
      midpoint, then a real `computeChart` — genuine houses, speeds and
      retrogrades (antipodal birthplaces rejected explicitly).
- [x] Compatibility **bouquet** instead of a score: blooms = flowing
      inter-aspects, thorns = frictional ones, buds = conjunctions, sized by
      planet weight and orb tightness (`synastryBouquet` in core,
      `renderBouquet` SVG in charts, `astron synastry --bouquet <path>`).
      Two counts side by side resist being read as a verdict; the
      BOUQUET_DISCLAIMER ships in the profile and must accompany renders.
- Deferred: relationship UI in the web app; numeric compatibility scoring
  (deliberately rejected — the bouquet replaces it)

## Phase 6 — Desktop (Tauri) ✅ (local builds)

- [x] `apps/desktop`: Tauri 2 wrapping the web app — `devUrl` points at the
      Vite dev server, `frontendDist` at `apps/web/dist`, so the desktop app
      is byte-identical to the web app. Ephemeris stays WASM in the webview
      (one code path; a native Rust sweph bridge remains possible later).
- [x] Phosphor chart-wheel app icon (assets/icon.svg → `tauri icon`).
- [x] macOS .app + .dmg build (`pnpm --filter astron-desktop build`).
- Deferred: CI installers for Windows/Linux via tauri-action (needs GitHub
  Actions setup + signing decisions); native chart-library storage; auto-update.

## Phase 7 — Depth & polish (7a ✅)

- [x] Vargas D2/D3/D7/D12/D30/D60 added (with D30's unequal Parashari spans);
      tested including the navamsa ≡ 9th-harmonic identity
- [x] Harmonic charts (`harmonicChart`, CLI `--harmonic <n>`)
- [x] Vimshottari dashas: mahadashas from the sidereal Moon's nakshatra
      balance, antardashas, `dashaAt`; CLI `astron dashas` with the running
      periods marked
- [x] Part of Spirit (sect-reversed twin of Fortune)
- [x] CI: test workflow on push; tauri-action release workflow on v* tags
      (macOS arm64+x64, Linux, Windows; unsigned drafts — signing later)
### Phase 7b ✅ (electional, rectification, UI parity)

- [x] Electional search (`scanElectional`): interval algebra over the
      scanners — avoid VoC Moon / chosen retrogrades / Moon signs / waning
      Moon; returns clean windows. CLI `astron electional`. Framed honestly:
      the software dodges the classic cautions, the judgement stays yours.
- [x] Rectification (`rectify` + `candidateTimes`): scores candidate birth
      times by how tightly slow transits aspected the ASC/MC at dated life
      events; blind test recovers a known time within 20 min from a 4 h
      bracket. RECTIFICATION_DISCLAIMER travels with results. CLI
      `astron rectify --between --events`.
- [x] Web app: VARGA + HARMONIC panels on the natal tab, DASHAS tab
      (mahadashas + antardashas, running periods marked, always sidereal).

### Phase 7c ✅ (interpretation, stars, reports)

- [x] `@astron/interpret`: the LIGHT/TRUTH/SHADOW layer. Readings are
      assembled from named parts — planet archetype, sign through three
      lenses, house domain, dignity note, aspect lenses — and the parts are
      always shown (honest assembly over counterfeit fluency; the NUMERON
      principle). INTERPRETATION_DISCLAIMER is part of every reading.
      CLI `--read`, web natal tab "show the reading" toggle.
- [x] Fixed stars: sefstars.txt bundled, optional provider capability
      (native only — WASM lacks the catalog), 16 classical bright stars,
      conjunction-only contacts to points and angles. CLI `--stars`.
      Validated: Regulus at 29°50′ Leo (J2000); Einstein gets his
      documented Algol–Pluto and Sirius–ASC contacts.
- [x] Printable reports: CLI `--report out.html` — self-contained
      ink-on-paper HTML (light wheel, tables, the reading in parts, star
      contacts, all disclaimers) that prints cleanly to PDF from any
      browser.

### Remaining (7d)

- Electional/rectification UI in the web app; report button in the web app;
  code-signing for installers (needs certificates); readings for
  returns/progressions/synastry contexts

## Known constraints

- AGPL-3.0 project-wide (Swiss Ephemeris requirement). Publishing source is fine;
  a closed commercial fork would need Astrodienst's paid license.
- exFAT volume: macOS `._*` AppleDouble files break esbuild/native-module loading
  and Tauri's build script ("stream did not contain valid UTF-8"). Mitigations in
  place: vitest/tsc excludes, and apps/desktop pins CARGO_TARGET_DIR to
  ~/.cache/astron-cargo-target so Rust builds happen on APFS. If something else
  chokes, `find . -name '._*' -delete` first.
- `sweph` global sidereal state: `set_sid_mode` before every sidereal call (done in
  provider); revisit if we ever go multi-threaded.
