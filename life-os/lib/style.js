// Converts a plain CSS declaration string ("color:red; padding:4px 8px;") into a
// React style object. Lets us port the design's inline style strings verbatim
// for pixel-accurate parity instead of hand-transcribing each one into JS.
//
// Not for values that themselves contain a colon or semicolon (e.g. data: URIs) --
// build those style objects directly instead.
export function sx(str) {
  if (!str) return {};
  const out = {};
  String(str)
    .split(';')
    .forEach((decl) => {
      const idx = decl.indexOf(':');
      if (idx === -1) return;
      const prop = decl.slice(0, idx).trim();
      const value = decl.slice(idx + 1).trim();
      if (!prop || !value) return;
      const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      out[camel] = value;
    });
  return out;
}
