import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { Atlas, parseCityTsv } from "./atlas.js";

/** Load the bundled GeoNames city database (Node only). */
export function loadAtlas(): Atlas {
  const path = join(
    fileURLToPath(new URL(".", import.meta.url)),
    "..",
    "data",
    "cities.tsv.gz",
  );
  return new Atlas(parseCityTsv(gunzipSync(readFileSync(path)).toString("utf8")));
}
