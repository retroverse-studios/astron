/** Escape a value used as SVG element text. */
export const escText = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Escape a value used inside a double-quoted SVG attribute. */
export const escAttr = (s: string): string =>
  escText(s).replace(/"/g, "&quot;");
