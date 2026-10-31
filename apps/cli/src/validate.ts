/**
 * CLI argument validation: every user string is checked here and turned
 * into a typed value, or rejected with a clean one-line Error (the
 * top-level handler prints it without a stack trace).
 */

export function invalid(message: string): Error {
  return new Error(message);
}

export function parseFinite(value: string, opt: string): number {
  const n = Number(value);
  if (!Number.isFinite(n))
    throw invalid(`${opt} must be a number (got "${value}")`);
  return n;
}

export function parseIntInRange(
  value: string,
  opt: string,
  min: number,
  max: number,
): number {
  const n = parseFinite(value, opt);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw invalid(
      `${opt} must be an integer between ${min} and ${max} (got "${value}")`,
    );
  }
  return n;
}

export function parseLatitude(value: string): number {
  const n = parseFinite(value, "--lat");
  if (n < -90 || n > 90)
    throw invalid(`--lat must be between -90 and 90 (got "${value}")`);
  return n;
}

export function parseLongitude(value: string): number {
  const n = parseFinite(value, "--lon");
  if (n < -180 || n > 180)
    throw invalid(`--lon must be between -180 and 180 (got "${value}")`);
  return n;
}

export function parseChoice<T extends string>(
  value: string,
  opt: string,
  choices: readonly T[],
): T {
  if ((choices as readonly string[]).includes(value)) return value as T;
  throw invalid(`${opt} must be one of ${choices.join("|")} (got "${value}")`);
}

/** Parse a comma list, rejecting any entry outside `choices`. */
export function parseList<T extends string>(
  value: string | undefined,
  opt: string,
  choices: readonly T[],
): T[] | undefined {
  if (value === undefined) return undefined;
  return value.split(",").map((s) => parseChoice(s.trim(), opt, choices));
}

/** YYYY-MM-DD at a fixed UTC time, rejecting invalid dates like 2020-13-40. */
export function parseDateAt(
  value: string,
  opt: string,
  time = "12:00:00",
): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw invalid(`${opt} must be YYYY-MM-DD (got "${value}")`);
  }
  const d = new Date(`${value}T${time}Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) {
    throw invalid(`${opt} is not a real calendar date (got "${value}")`);
  }
  return d;
}
