// Apply the saved theme before first paint to avoid a flash.
// Kept as an external file so the page CSP needs no inline-script allowance.
try {
  var t = localStorage.getItem("astron.theme");
  if (t === "light" || t === "dark")
    document.documentElement.setAttribute("data-theme", t);
} catch {
  // storage unavailable (private mode etc.) — fall back to the default theme
}
