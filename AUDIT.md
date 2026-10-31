# ASTRON (astrology/) — Full Code Audit

Date: 2026-10-31. Scope: all 5 packages, CLI, web app, Tauri desktop shell,
landing page, CI/release workflows. ~11.5k LOC TS/TSX + Rust shell.

## Baseline (verified by running)

- `pnpm -r --filter '!astron-desktop' build` — pass.
- `pnpm -r typecheck` — pass (strict + `noUncheckedIndexedAccess`).
- `pnpm -r test` — 110 tests pass (core 70, atlas 11, charts 12, interpret 11,
  ephemeris-wasm 6). CLI has zero tests; web/landing/desktop have no test script.
- `pnpm audit --prod` — no known vulnerabilities in production deps.
- `pnpm audit` (incl. dev) — 3 critical / 7 high / 15 moderate / 2 low, all in
  the Vite/Vitest dev toolchain.
- `pnpm format:check` — fails on 63 files (prettier never enforced in CI).

Overall: this is the strongest-engineered shape so far — pure core, pluggable
ephemeris providers, native/WASM parity tests, honest disclaimers travelling
with output. Findings below are mostly logic edge cases, CLI input handling,
web/CLI parity gaps, and hardening. Nothing suggests the astronomical core
maths is wrong for modern dates.

---

## HIGH — logic / correctness

### H1. Antardashas of the first (partial) mahadasha are wrong

`packages/core/src/dashas.ts:75-94` (`antardashas`) partitions whatever period
it is given proportionally. For the birth mahadasha, `vimshottariDashas`
returns only the _remaining_ fraction (`dashas.ts:62-63`), so the sub-periods
are compressed and start at the mahadasha lord's own antardasha at birth —
but at birth the native is usually part-way through the sequence already.
Correct method: partition the _full_ mahadasha and offset by the elapsed
fraction. Affects anyone still in their first mahadasha, in web DASHAS tab
and CLI `dashas`. The only test (`depth.test.ts:110`) uses period `[1]`
(a full period), so the bug is untested.

### H2. Synastry bi-wheel draws aspect lines between the wrong planets

`packages/charts/src/wheel.ts:245-258`: for `options.outer`, `a` is assumed to
be the outer body and `b` the inner body (true for transits:
`findCrossAspects(sky, natal)`). `synastry()` (`relationships.ts:55-57`)
returns aspects with `a` = chart A (the _inner_ wheel) and `b` = chart B
(the outer ring). Both web (`App.tsx:854-859`) and CLI (`index.ts:869-874`)
pass them unswapped, so each line joins B's copy of body `a` to A's copy of
body `b` — wrong endpoints whenever `a !== b`. Only tight (≤1.5°) lines draw,
which hides it. The wheel bi-wheel test only asserts glyph counts.

### H3. CLI accepts invalid enum/numeric input and fails badly or silently

`buildInput` casts unchecked strings (`apps/cli/src/index.ts:334-335`,
`331`): `--houses bogus`, `--sidereal bogus`, `--harmonic abc` die with raw
Node stack traces (verified). `--varga bogus` silently yields `undefined`
from `vargaSign` (switch fall-through, `vargas.ts:27-81`) — dropped key in
JSON, blank in text (verified). `--scan abc` / `--days abc` → `NaN` →
silently no scan / empty window (verified). `--lat/--lon` via `parseFloat`
(249-250) accepts `NaN`/out-of-range. There is no top-level error handler:
any thrown error in any command is an unhandled rejection with a stack,
instead of the `fail()` one-liner used elsewhere.

## MEDIUM — logic / robustness

### M1. `--json` and `--report` silently ignore `--content` and `--ai-voice`

`apps/cli/src/index.ts:526-543`: JSON `parts` calls `readChart(chart, scheme)`
without merged content; JSON `fluent` calls `fluentPlacement` without
content; JSON `ai` omits `voice: opts.aiVoice` (text path passes it at :164).
`renderReport` (`report.ts:36`) always uses shipped content and always the
parts reading. Users get different text in JSON/report than in terminal
output with no warning.

### M2. `utcFromJulianDay` breaks for years 0–99 (and BCE)

`packages/core/src/time.ts:32`: `Date.UTC(year, ...)` maps 0–99 to 1900–1999
(verified: year 50 → 1950). Every scan/return/progression result routes
through this. Modern dates are unaffected; historical charts — an advertised
feature (Julian calendar, LMT) — return instants ~1900 years off.

### M3. House calculation failure kills the whole chart

`computeChart` (`chart.ts:54-62`) degrades gracefully per-body but
`provider.houses(...)` (61-67 of built file; `chart.ts` houses block) is
unguarded. Placidus at polar latitudes etc. throws and no chart is produced,
instead of falling back to a houses-less chart with a warning.

### M4. Web transit scan freezes the UI thread

TransitsTab "exact hits, 30 days" (`App.tsx:609-611`) runs `scanTransits`
synchronously: 10 bodies × 12 natal points × 5 aspects × ≤2 targets, each a
`findCrossings` sweep with 48-step bisection — order 10⁵ WASM calls on the
main thread. The button says "slower" but the tab, busy spinner and browser
all freeze. Needs a Web Worker or chunked/async yielding.

### M5. Atlas search re-normalizes 34k cities on every keystroke

`Atlas.search` (`atlas.ts:64-95`) calls `normalize()` (NFD + regex) over
every city name + alternates per query. PersonForm debounces 120 ms
(`PersonForm.tsx:20-26`) but there is no precomputed index. Precompute
normalized names once in the constructor.

### M6. `useCast` has no stale-result guard

`App.tsx:74-90`: concurrent/out-of-order completions can overwrite a newer
result with an older one (mitigated by `disabled={busy}`), and results set
state after tab unmount. Add a generation counter.

### M7. Saved people can never be deleted in the UI

`useSavedPeople().remove` (`people.ts:38-40`) has zero callers (verified).
Users can save and overwrite-by-label, never delete. Either wire a delete
control or remove the dead function — wiring is the right fix.

### M8. Unvalidated localStorage shapes

`people.ts:17` `JSON.parse(...) as SavedPerson[]` with no shape check: a
corrupt/old entry crashes later at `city.latitude.toFixed`
(`PersonForm.tsx:129`). `parseOverrides` (`overrides.ts:113-134`) is better
(string leaves only) but accepts unknown bodies/signs/sections keys unlimited
in size, and `__proto__` keys flow into plain objects. Add allowlists +
size cap; validate `SavedPerson` on load like `parseOverrides` does.

## MEDIUM — security / privacy

Threat model matters: no server, no accounts, BYOK only. Nothing below is a
remote exploit against a backend (there is none); these are XSS/key-theft and
supply-chain hardening items.

### S1. Tauri CSP is disabled while the webview renders raw HTML + holds an API key

`tauri.conf.json:22-24` `"csp": null`. The same frontend uses
`dangerouslySetInnerHTML` (`ChartView.tsx:16`, `App.tsx:864`) and stores the
Anthropic key in localStorage. Today the SVG strings are built only from
internal glyphs, numbers via `fmt()`, and theme constants, so no live XSS was
found — but `wheel.ts` `text()`/attribute interpolation (80-92) and
`bouquet.ts` `<title>`/caption (70, 123) do no escaping at all. Any future
user-controlled label (saved-person name on a wheel, custom theme) becomes
stored XSS with key theft. Set a real CSP in Tauri + a `<meta>` CSP for the
web build, and escape text/attribute values in the SVG builders as
defence in depth.

### S2. Anthropic API key persisted in plaintext localStorage

`App.tsx:168, 253`. Disclosed in UI copy (:242-245), sent only to Anthropic
with the browser-access header (`ai.ts:149`). Still: plaintext at rest
(browser profile / Tauri webview store), readable by any future XSS or any
local process/user. Prefer sessionStorage by default with an explicit
"remember on this device" opt-in. Note `ai.ts` doc says "never stored"
(:6) — true for ASTRON-the-company, false for the app; wording worth fixing.

### S3. Landing injects GitHub API values via `innerHTML` and unvalidated `href`

`landing/src/downloads.js:113,119` interpolates `release.tag_name` into
`innerHTML`; :90 assigns `browser_download_url` unchecked. Exploiting this
needs control/manipulation of the GitHub release payload, so likelihood is
low, but the landing page is public-facing: use `textContent` + DOM-built
links, and require `https:` + `github.com`/`objects.githubusercontent.com`
hosts before assigning download hrefs. Fallback copy also claims "coming
soon" on any fetch failure (rate-limit included) even when releases exist.

### S4. Privacy claim vs. third-party loads on the landing page

Landing loads Google Fonts (`landing/index.html:8-10`) and calls the GitHub
API — visitor IPs go to Google/GitHub while the page advertises "Fully
private / no tracking". The app itself honours the claim (except optional
AI mode). Self-host the font (as other Retroverse landings do) or soften
the landing copy.

### S5. Dev-toolchain vulnerabilities + unpinned CI actions

27 advisories, all dev-only (Vite/Vitest/esbuild chain) — they bite via
`vite dev` / `vitest --ui` on a developer machine. Bump vite/vitest.
Workflows pin actions by major tag only (`actions/checkout@v4`,
`tauri-apps/tauri-action@v0`) and the release job holds Apple/Tauri signing
secrets: pin to SHAs, add Dependabot. Rust deps (468 crates in Cargo.lock)
have no audit job.

## MEDIUM — unwired / incomplete UI & parity

### U1. Lilith (and mean node) content exists everywhere except charts

`DEFAULT_BODIES` (`types.ts:18-31`) omits `meanLilith` and `meanNode`, and no
CLI flag or web control ever overrides `bodies`. README/landing promise
Lilith, and there are 12 fluent paragraphs + archetypes + 10 narrator
variants + glyphs for her — all unreachable. LibraryTab even lets users edit
Lilith text (`LibraryTab.tsx:10`) for a body that never appears;
`meanNode` text is conversely not editable (absent from `EDIT_BODIES`).
Fix: add `meanLilith` to the default set (copy already promises it), decide
on mean node.

### U2. Web house-system and ayanamsa pickers expose a subset

Header offers 4 of 7 house systems (`App.tsx:1010-1013` — no Campanus,
Regiomontanus, Porphyry) and sidereal = Lahiri only (:953, 1000), while
core, CLI, README and landing claim 7 systems / 4 ayanamsas. Both providers
already support all of them; this is pure UI wiring.

### U3. CLI-only features with no web surface

Electional, rectification, ephemeris events, fixed stars (native-only —
WASM lacks the catalog, documented), SVG/report export, minor aspects,
Julian calendar, time-standard override. PLAN.md calls 7b "UI parity" but
only shipped varga/harmonic/dashas panels. Acceptable if intentional —
worth an explicit "CLI-only" note in the web footer/README so it does not
read as missing.

### U4. Small unwired/dead UI pieces

- `PersonForm.tsx:157` `export { button }` — re-export of an otherwise-unused
  import; nobody imports it from there. Dead.
- Landing failure mode (S3): hero button stays an anchor to an empty
  download section.
- PlaceSearch dropdown (`PersonForm.tsx:33-63`): no Escape/outside-click
  close, no keyboard navigation, no combobox ARIA. Tabs (`App.tsx:1038`)
  are plain buttons with no `aria-selected`. DisclaimerGate modal
  (:904-937) does not trap focus. Functionally wired, accessibility-unwired.
- Saved-charts `<select value="">` (`PersonForm.tsx:88`) never shows the
  loaded person — acceptable as a picker, but combined with M7 the saved
  list is write-only-ish.

## LOW — dead code & duplication

- `angularDistance` (`zodiac.ts:15`) and `NARRATOR_IDS` (`narrators/index.ts:47`)
  are exported but unused anywhere including tests. As published-package API
  they may be deliberate; otherwise delete. (Most other "unused export"
  hits are genuine public API types consumed via return types — not dead.)
- `serde_json` in `src-tauri/Cargo.toml:19` is unused (no `serde` in Rust
  sources). Dead dependency.
- CLI synastry: `aspects: result.aspects.map((x) => ({ ...x, a: x.a, b: x.b }))`
  (`index.ts:872`) is a no-op copy — and, per H2, exactly where the a/b swap
  should have been.
- Glyph/name tables are defined four times with subtle divergence
  (CLI "North Node (mean)" vs web "North Node"): `glyphs.ts`,
  `cli/index.ts:75-107`, `report.ts:17-23` (`BODY_LABELS`),
  `wheel.ts:15-30` (`CHART_BODY_GLYPHS`). `HOUSE_CODES`/`BODY_IDS`/
  `SID_MODES` duplicated across the two ephemeris providers (the WASM one as
  magic numbers, `ephemeris-wasm/src/index.ts:17-46`). Consolidate into core.
- `Part` component defined inside `Reading` render (`App.tsx:182`) —
  recreated every render. Move out.
- `ordinal()` (`fluent.ts:248-251`) is correct for 1–12 only by accident of
  JS negative-modulo + nullish fallback (verified correct outputs). House
  numbers bound it, but it deserves the obvious implementation.
- `formatOffset` (`atlas/time.ts:72-79`) can emit `:60` seconds for
  fractional offsets near a minute boundary (verified `61.999 → 1:1:60`).
  Cosmetic; IANA LMT offsets make it reachable.
- `parseCityTsv` (`atlas.ts:22-38`) does not skip blank lines — the shipped
  file has no trailing newline (verified), but one regenerated file away
  from a NaN-coordinated ghost city. Filter empties.
- AppleDouble `._*` files litter the tree (`apps/._desktop`, `packages/._*`)
  — gitignored, harmless, exFAT artefacts.

## LOW — complexity / maintainability / perf

- Two monoliths: `apps/cli/src/index.ts` (1,115 lines, 13 commands, god
  `CommonOpts`) and `apps/web/src/App.tsx` (1,079 lines, 7 tabs + Reading).
  Everything else is admirably small (core files 35–267 lines). Split CLI
  per command group; split App per tab.
- Web bundle: 726 kB JS (214 kB gzip) single chunk — 10 narrator content
  sets (~3,800 lines) + fluent set all statically imported. Lazy-load
  narrators on selection; lazy-load tabs. Vite already warns.
- No ESLint anywhere and prettier check not run in CI (63 files already
  drifting). Add both to CI; run `pnpm format` once (large cosmetic diff —
  do it as its own commit).
- Version skew: desktop 0.1.4 (`tauri.conf.json`, `package.json`) vs Cargo
  0.1.3 vs everything else 0.1.0 incl. CLI `--version`. The in-app updater
  keys off the Tauri version; align Cargo at release time or script it.
- Test gaps: CLI (0), web (0), `report.ts` escaping, first-mahadasha
  antardashas (H1), synastry wheel endpoints (H2), `localToUtc` DST-gap
  behaviour (Luxon silently picks an offset in the gap/overlap — behaviour
  exists but is undocumented/untested), `people`/`overrides-store` loads.
- CI runs `build` (tsc) then `typecheck` (tsc again) — drop one.
- `scanVoidOfCourse` is O(ingresses × aspects) via `filter().pop()` inside
  the loop (`moon-events.ts`) — fine at current scale, noted for large
  windows.
- `SwephProvider` relies on the native binding's process-global sidereal
  mode/ephemeris path (set before every call, so currently safe in
  single-threaded sync use — would break under concurrent async providers).

## Checked and found sound

- SVG/HTML injection today: all interpolated chart values are enums,
  glyphs, or formatted numbers; `report.ts esc()` covers the user-derived
  title/subtitle/reading text (reading text can be user-edited via
  overrides — it is escaped). S1 is defence-in-depth, not a live hole.
- React renders API errors/AI text as text, not HTML (`App.tsx:299-304`).
- WASM provider throws on `swe_calc_ut` error (upstream), so computeChart's
  per-body warning path works in the browser too.
- `parseOverrides` never accepts non-string leaves; imports cannot smuggle
  functions/objects into readings (M8 is about keys/size).
- Tauri has no capabilities grants for the webview (plugins driven from
  Rust only) — least-privilege by default. Updater artifacts are signed
  and the release stays draft until complete.
- No secrets in the tree; signing secrets come from CI secrets.
- Aspect applying/separating maths, synastry `applying=false` handling,
  varga tables, sect lot formulae, bisection crossing finder — read
  carefully, no defects found beyond exact-orb-0 applying being arbitrary
  (cosmetic).
- Atlas: offline-only, diacritic-insensitive, qualifier-aware; tests cover
  endonyms/exonyms and LMT boundary.

---

## Resolution (same day, user-approved scope: everything)

All High + Medium + Low items addressed except the deliberate retentions
below. Tests 110 → 126 (new: antardashas partial-period, year<100
round-trip, houses fallback, Lilith default, varga/step rejection, atlas
blank-line/offset, overrides allowlist, wheel escaping + outer endpoints,
CLI validate unit + spawned invalid-input tests).

- H1 fixed: `antardashas` lays sub-periods over the full mahadasha and
  clips to birth onward (`dashas.ts`).
- H2 fixed: synastry aspects swapped a/b at both renderWheel call sites;
  wheel contract pinned by a coordinate test.
- H3 fixed: `apps/cli/src/validate.ts` + validation at every cast/parseInt;
  top-level handler prints one-line errors, exit 1, no stacks (verified by
  spawned CLI tests). `vargaSign` and `candidateTimes` also throw on bad
  input at the core level (the latter previously infinite-looped on step 0).
- M1 fixed: `--content`/`--ai-voice` honoured in JSON and report output
  (smoke-tested with a marker override).
- M2 fixed: `setUTCFullYear` in `utcFromJulianDay`.
- M3 fixed: houses failure degrades to a warning + houses-less chart.
- M4 mitigated: web transit scan chunked per body with yields (full Web
  Worker port remains future work — recorded here, not hidden).
- M5 fixed: Atlas precomputes normalized search index.
- M6 fixed: `useCast` generation guard.
- M7 fixed: saved people can be deleted from PersonForm.
- M8 fixed: `SavedPerson` shape validation; `parseOverrides` key
  allowlists + 5000-char passage cap.
- S1 fixed: CSP in `tauri.conf.json` + web `<meta>`; SVG builders escape
  text/attributes (`packages/charts/src/escape.ts`); inline theme script
  externalised (`public/theme-init.js`).
- S2 fixed: API key session-only by default, explicit "remember" opt-in.
- S3 fixed: landing uses `textContent`, validates https + GitHub hosts.
- S4 fixed: Google Fonts removed from landing (system mono stack).
- S5 mostly fixed: vite 8 / vitest 5 / tailwind latest → `pnpm audit`
  27 → 1 moderate (eslint's transitive minimatch, dev-only glob DoS);
  `--prod` clean. Dependabot config added. Actions still pinned by major
  tag (SHA pinning needs network lookups to do honestly — Dependabot will
  maintain them; recorded as residual).
- U1 fixed: `meanLilith` in `DEFAULT_BODIES`. Mean node left opt-in via
  the `bodies` API (true node is the shipped default) — deliberate.
- U2 fixed: all 7 house systems + 4 ayanamsas selectable in the web header.
- U3 noted in web footer (CLI-only feature list).
- U4 fixed: dead re-export removed; PlaceSearch keyboard/Escape/blur +
  ARIA; tabs `role=tab/aria-selected`; disclaimer autofocus.
- Low fixed: glyph/name tables consolidated into `@astron/core`
  (`bodies.ts`, `CHART_BODY_GLYPHS` kept as compat alias); `serde_json`
  dead dep removed; Cargo version aligned 0.1.4; no-op synastry map
  removed; `Part` hoisted; `ordinal`/`formatOffset` rewritten;
  `parseCityTsv` skips blanks; `RELEASES_URL` dead const removed.
- Complexity: Reading extracted to `components/Reading.tsx`; narrators
  lazy-loaded per selection with subpath exports + `sideEffects: false`
  on all packages (web main chunk 726 kB → 393 kB, narrators ~31–39 kB
  per voice on demand); CLI validation extracted. The two tab/command
  files (`App.tsx` tabs, CLI command definitions) were NOT split further:
  after extractions they are cohesive registries over shared state and
  another split was churn without a bug behind it — recorded as the one
  consciously deferred Low.
- `angularDistance` and `NARRATOR_IDS` retained as published package API
  surface (deleting exported symbols from versioned packages for zero
  internal gain did not survive a second look).
- ESLint (flat config, typescript-eslint recommended) at zero errors;
  prettier sweep applied and `format:check` + `lint` + web typecheck in CI.
- Verified: full build, `pnpm -r typecheck`, lint, format:check, 126
  tests, CLI smokes (Lilith present, clean invalid-input errors,
  overrides reaching JSON + report), web production build with lazy
  chunks listed.
