/**
 * Sanitização dos SVGs fonte para uso inline (React / docs).
 *
 * Os SVGs antigos (exportados do Inkscape) carregam <style> globais com classes
 * (.st0, .cls-1…) e ids (#SVGID_1_…) que COLIDEM entre arquivos quando vários
 * ícones são renderizados inline na mesma página. A sanitização prefixa todo
 * id/classe com o slug do banco, tornando cada ícone auto-contido.
 */

/** Extrai viewBox, conteúdo interno sanitizado e cor de fundo de um SVG fonte. */
export function sanitizeSvg(raw, slug) {
  let svg = raw
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const open = svg.match(/<svg\b[^>]*>/);
  if (!open) throw new Error(`${slug}: <svg> não encontrado`);
  const viewBox = open[0].match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`${slug}: viewBox ausente`);

  let inner = svg.slice(svg.indexOf(open[0]) + open[0].length, svg.lastIndexOf("</svg>"));

  const p = `${slug}_`;
  inner = inner
    // ids declarados e referências a eles (atributos e dentro de <style>)
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${p}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${p}${id})`)
    .replace(/\bhref="#([^"]+)"/g, (_, id) => `href="#${p}${id}"`)
    // tokens de classe nos atributos class="a b"
    .replace(/\bclass="([^"]+)"/g, (_, cls) =>
      `class="${cls.trim().split(/\s+/).map((c) => p + c).join(" ")}"`)
    // seletores de classe dentro de <style> (.st0 → .slug_st0; não pega ".75" de opacity)
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (m, css) =>
      m.replace(css, css.replace(/\.([A-Za-z_][\w-]*)/g, (_, c) => `.${p}${c}`)));

  return { viewBox, inner: inner.trim(), background: findBackground(inner) };
}

/**
 * Cor do <rect> de fundo (primeiro rect com fill hexadecimal; fundos em
 * gradiente usam a cor do último <stop>). Arquivos antigos têm rects
 * sobrepostos sobrando da folha do Inkscape — quando a heurística erra,
 * declare `color` explicitamente em scripts/banks-data.mjs.
 */
function findBackground(inner) {
  const hexOf = (tag) =>
    tag.match(/fill:\s*(#[0-9a-fA-F]{3,8})/)?.[1] ??
    tag.match(/\bfill="(#[0-9a-fA-F]{3,8})"/)?.[1] ??
    null;
  const rects = [...inner.matchAll(/<rect\b[^>]*>/g)].map((m) => hexOf(m[0])).filter(Boolean);
  if (rects.length) return rects[0].toLowerCase();
  const stops = [...inner.matchAll(/<stop[^>]*(?:stop-color:\s*|stop-color=")(#[0-9a-fA-F]{3,8})/g)];
  return stops.length ? stops[stops.length - 1][1].toLowerCase() : null;
}

/** Garante que nenhum id/classe se repete entre ícones diferentes. */
export function assertNoCollisions(sanitized) {
  const seen = new Map(); // token -> slug
  for (const { slug, inner } of sanitized) {
    const tokens = [
      ...[...inner.matchAll(/\bid="([^"]+)"/g)].map((m) => `#${m[1]}`),
      ...[...inner.matchAll(/\bclass="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/).map((c) => `.${c}`)),
    ];
    for (const t of tokens) {
      const owner = seen.get(t);
      if (owner && owner !== slug) throw new Error(`Colisão de "${t}" entre ${owner} e ${slug}`);
      seen.set(t, slug);
    }
  }
}
