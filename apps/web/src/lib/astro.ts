import { Atlas } from "@astron/atlas";
import citiesUrl from "@astron/atlas/data/cities.tsv.gz?url";
import type { EphemerisProvider } from "@astron/core";
import { WasmSwephProvider } from "@astron/ephemeris-wasm";

let atlasPromise: Promise<Atlas> | undefined;
let providerPromise: Promise<EphemerisProvider> | undefined;

async function loadAtlasData(): Promise<Atlas> {
  const res = await fetch(citiesUrl);
  const buf = new Uint8Array(await res.arrayBuffer());
  // Some servers (Vite dev among them) send .gz files with
  // Content-Encoding: gzip, so the browser has already decompressed the
  // body; others serve the raw bytes. Check the gzip magic number.
  const isGzip = buf[0] === 0x1f && buf[1] === 0x8b;
  const text = isGzip
    ? await new Response(
        new Response(buf).body!.pipeThrough(new DecompressionStream("gzip")),
      ).text()
    : new TextDecoder().decode(buf);
  return Atlas.fromTsv(text);
}

export function getAtlas(): Promise<Atlas> {
  // Don't cache a rejection — a transient network failure would otherwise
  // brick the search box until reload.
  atlasPromise ??= loadAtlasData().catch((e: unknown) => {
    atlasPromise = undefined;
    throw e;
  });
  return atlasPromise;
}

export function getProvider(): Promise<EphemerisProvider> {
  providerPromise ??= WasmSwephProvider.create().catch((e: unknown) => {
    providerPromise = undefined;
    throw e;
  });
  return providerPromise;
}
