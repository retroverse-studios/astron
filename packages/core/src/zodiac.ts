import { SIGNS, type Sign } from "./types.js";

export function norm360(deg: number): number {
  const d = deg % 360;
  return d < 0 ? d + 360 : d;
}

/** Signed smallest difference a-b, in (-180, 180]. */
export function norm180(deg: number): number {
  const d = norm360(deg);
  return d > 180 ? d - 360 : d;
}

/** Unsigned angular distance between two longitudes, 0–180. */
export function angularDistance(a: number, b: number): number {
  return Math.abs(norm180(a - b));
}

export function signOf(longitude: number): Sign {
  return SIGNS[Math.floor(norm360(longitude) / 30) % 12]!;
}

export function signIndex(longitude: number): number {
  return Math.floor(norm360(longitude) / 30) % 12;
}

export function degreeInSign(longitude: number): number {
  return norm360(longitude) % 30;
}

/** Format a longitude as e.g. 23°30′ Pisces. */
export function formatLongitude(longitude: number): string {
  const deg = degreeInSign(longitude);
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d}°${String(m).padStart(2, "0")}′ ${signOf(longitude)}`;
}
