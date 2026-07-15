/**
 * Gera docs/index.html — showcase interativo com todos os ícones inline.
 * Uso: node scripts/build-docs.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BANKS } from "./banks-data.mjs";
import { sanitizeSvg, assertNoCollisions } from "./svg-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const VERSION = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const AVATAR = `data:image/jpeg;base64,${readFileSync(join(root, "assets", "autor.png")).toString("base64")}`;
mkdirSync(join(root, "docs"), { recursive: true });

const data = BANKS.map((b) => {
  const raw = readFileSync(join(root, "icons", `${b.slug}.svg`), "utf8");
  const { viewBox, inner, background } = sanitizeSvg(raw, b.slug);
  return { ...b, viewBox, inner, color: b.color ?? background };
});
assertNoCollisions(data);

const payload = JSON.stringify(
  data.map(({ slug, component, name, compe, color, viewBox, inner }) => ({
    slug, component, name, compe, color, viewBox, inner,
  }))
);

const body = `
<title>react-bancos — ícones dos bancos do Brasil para React</title>
<style>
:root {
  --bg: #ffffff; --surface: #fafafa; --line: #e4e4e7; --line-strong: #d4d4d8;
  --ink: #18181b; --body: #3f3f46; --muted: #52525b; --accent: #4f46e5;
  --code-bg: #18181b; --code-ink: #e4e4e7; --code-muted: #a1a1aa;
  --toast-bg: #18181b; --toast-ink: #fafafa;
  --mono: ui-monospace, "SFMono-Regular", "Cascadia Code", Menlo, Consolas, monospace;
}
:root[data-theme="dark"] {
  --bg: #09090b; --surface: #18181b; --line: #27272a; --line-strong: #3f3f46;
  --ink: #fafafa; --body: #d4d4d8; --muted: #a1a1aa; --accent: #818cf8;
  --code-bg: #18181b; --code-ink: #e4e4e7; --code-muted: #a1a1aa;
  --toast-bg: #fafafa; --toast-ink: #18181b;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #09090b; --surface: #18181b; --line: #27272a; --line-strong: #3f3f46;
    --ink: #fafafa; --body: #d4d4d8; --muted: #a1a1aa; --accent: #818cf8;
    --code-bg: #18181b; --code-ink: #e4e4e7; --code-muted: #a1a1aa;
    --toast-bg: #fafafa; --toast-ink: #18181b;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--body);
  font: 15px/1.6 ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 1072px; margin: 0 auto; padding: 0 1.5rem 5rem; }
nav {
  display: flex; align-items: center; gap: 1.25rem;
  padding: .9rem 0; border-bottom: 1px solid var(--line);
}
.brand { font: 600 .9rem var(--mono); color: var(--ink); text-decoration: none;
  letter-spacing: -.02em; margin-right: auto; }
.brand .v {
  font-weight: 500; font-size: .7rem; color: var(--muted);
  border: 1px solid var(--line); border-radius: 99px; padding: .1em .55em; margin-left: .5rem;
  vertical-align: 1px;
}
nav a.link { color: var(--muted); font-size: .85rem; text-decoration: none; }
nav a.link:hover { color: var(--ink); }
header { padding: 3.5rem 0 2rem; }
h1 { margin: 0 0 .6rem; font-size: 2.25rem; font-weight: 700; letter-spacing: -.035em;
  color: var(--ink); line-height: 1.1; }
.tag { color: var(--muted); max-width: 58ch; margin: 0 0 1rem; }
.meta-line { display: flex; gap: .6rem; align-items: center; flex-wrap: wrap;
  color: var(--muted); font-size: .8rem; margin: 0 0 1.75rem; }
.meta-line .sep { color: var(--line-strong); }
.strip { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.strip svg { border-radius: 8px; }
.install {
  display: inline-flex; align-items: center; gap: .6rem;
  background: var(--surface); border: 1px solid var(--line); border-radius: 8px;
  padding: .5rem .9rem; font: .85rem var(--mono); cursor: pointer; color: var(--ink);
}
.install:hover { border-color: var(--line-strong); }
.install .d { color: var(--muted); user-select: none; }
.toolbar {
  position: sticky; top: 0; z-index: 5;
  background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(8px);
  display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;
  padding: .75rem 0; border-bottom: 1px solid var(--line); margin-bottom: 1.5rem;
}
.toolbar input[type="search"] {
  flex: 1 1 240px; background: var(--bg); color: var(--ink);
  border: 1px solid var(--line); border-radius: 8px; padding: .45rem .75rem; font-size: .875rem;
}
.toolbar input[type="search"]::placeholder { color: var(--muted); }
.toolbar input[type="search"]:hover { border-color: var(--line-strong); }
:is(.toolbar input, .install, .card, #theme):focus-visible {
  outline: 2px solid var(--accent); outline-offset: 2px; border-color: transparent;
}
.ctl { display: flex; align-items: center; gap: .5rem; font-size: .8rem; color: var(--muted); }
.ctl output { font: .8rem var(--mono); min-width: 3.4ch; color: var(--body);
  font-variant-numeric: tabular-nums; }
input[type="range"] { accent-color: var(--accent); width: 100px; }
#theme {
  background: transparent; border: 1px solid var(--line); color: var(--muted);
  border-radius: 8px; width: 2.1rem; height: 2.1rem; cursor: pointer; font-size: .95rem;
  display: inline-flex; align-items: center; justify-content: center;
}
#theme:hover { color: var(--ink); border-color: var(--line-strong); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: .75rem; }
.card {
  background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
  padding: 1.1rem .75rem .9rem; display: flex; flex-direction: column; align-items: center;
  gap: .65rem; cursor: pointer; text-align: center; transition: border-color .12s, box-shadow .12s;
}
.card:hover { border-color: var(--line-strong); box-shadow: 0 1px 3px rgb(0 0 0 / .06); }
.card b { font-size: .8rem; font-weight: 600; color: var(--ink); line-height: 1.3; }
.card .meta { display: flex; gap: .35rem; align-items: center; flex-wrap: wrap; justify-content: center; }
.badge {
  font: .66rem/1.6 var(--mono); color: var(--muted);
  border: 1px solid var(--line); border-radius: 5px; padding: 0 .4em; white-space: nowrap;
}
.empty { color: var(--muted); font-size: .875rem; grid-column: 1 / -1; padding: 2rem 0; }
.hint { color: var(--muted); font-size: .8rem; margin: .9rem 0 0; }
h2 { font-size: 1rem; font-weight: 600; color: var(--ink); letter-spacing: -.01em;
  margin: 3.5rem 0 .9rem; }
h2 .n { color: var(--muted); font-weight: 500; }
table { border-collapse: collapse; width: 100%; font-size: .85rem; margin: 0; }
th, td { text-align: left; padding: .55rem .9rem; border-bottom: 1px solid var(--line); }
th { color: var(--muted); font-weight: 500; font-size: .75rem; text-transform: uppercase;
  letter-spacing: .05em; }
td { color: var(--body); }
td code { font: .8rem var(--mono); color: var(--ink); }
td.def { color: var(--muted); }
pre {
  background: var(--code-bg); color: var(--code-ink); border-radius: 12px;
  border: 1px solid var(--line); padding: 1rem 1.25rem; overflow-x: auto;
  font: .8125rem/1.7 var(--mono); margin: 0;
}
pre .c { color: var(--code-muted); } pre .k { color: #93c5fd; } pre .s { color: #86efac; }
footer { margin-top: 4rem; padding-top: 1.25rem; border-top: 1px solid var(--line);
  color: var(--muted); font-size: .8rem; }
footer a { color: var(--accent); text-decoration: none; }
footer a:hover { text-decoration: underline; }
.autor { display: flex; align-items: center; gap: .8rem; margin-bottom: 1rem; }
.autor img { width: 44px; height: 44px; border-radius: 50%; display: block; }
.autor b { display: block; color: var(--ink); font-size: .875rem; }
#toast {
  position: fixed; left: 50%; bottom: 1.75rem; transform: translate(-50%, 12px);
  background: var(--toast-bg); color: var(--toast-ink); font-size: .8125rem; font-weight: 500;
  padding: .5rem 1rem; border-radius: 8px; opacity: 0; pointer-events: none;
  transition: opacity .18s, transform .18s; box-shadow: 0 4px 12px rgb(0 0 0 / .15);
}
#toast.on { opacity: 1; transform: translate(-50%, 0); }
@media (prefers-reduced-motion: reduce) {
  .card, #toast { transition: none; }
}
</style>
<div class="wrap">
  <nav>
    <a class="brand" href="#">react-bancos<span class="v">v${VERSION}</span></a>
    <a class="link" href="https://www.npmjs.com/package/react-bancos">npm</a>
    <a class="link" href="https://github.com/henriquezolini/react-bancos">GitHub</a>
    <button id="theme" title="Alternar tema" aria-label="Alternar tema">◐</button>
  </nav>

  <header>
    <h1>Ícones dos bancos do Brasil para React</h1>
    <p class="tag">Um componente por instituição — fiel à marca, tipado e com metadados:
    nome, código COMPE e cor. Feito para telas de Pix, extratos e seletores de conta.</p>
    <p class="meta-line">
      <span id="count"></span> bancos <span class="sep">·</span> TypeScript
      <span class="sep">·</span> ESM + CJS <span class="sep">·</span> React ≥ 17
      <span class="sep">·</span> MIT
    </p>
    <div class="strip" id="strip" aria-hidden="true"></div>
    <button class="install" id="install" title="Copiar comando">
      <span class="d">$</span> npm install react-bancos <span class="d">⧉</span>
    </button>
  </header>

  <h2 id="bancos">Bancos <span class="n" id="result"></span></h2>
  <div class="toolbar">
    <input type="search" id="q" placeholder="Buscar por nome, slug ou código (ex.: nubank, 341)"
      aria-label="Buscar banco" />
    <label class="ctl">tamanho <input type="range" id="size" min="28" max="96" value="52" /><output id="sizeo">52</output></label>
    <label class="ctl">raio <input type="range" id="radius" min="0" max="50" value="16" /><output id="radiuso">16%</output></label>
  </div>

  <div class="grid" id="grid"></div>
  <p class="hint">Clique em um card para copiar o import do componente.</p>

  <h2>Uso</h2>
  <pre><span class="k">import</span> { Nubank, banks, getBankByCompe } <span class="k">from</span> <span class="s">"react-bancos"</span>;

<span class="c">// direto</span>
&lt;Nubank size={48} radius={12} /&gt;

<span class="c">// a partir do código COMPE que veio da sua API</span>
<span class="k">const</span> dados = getBankByCompe(260); <span class="c">// → { slug: "nubank", name: "Nubank", compe: "260", color: "#820ad1" }</span>

<span class="c">// listar todos</span>
banks.map(({ slug, Icon }) =&gt; &lt;Icon key={slug} size={40} radius={8} /&gt;)</pre>

  <h2>Em Node / APIs (sem React)</h2>
  <pre><span class="c">// módulo só de dados — sem React e sem JSX, para backends</span>
<span class="k">import</span> { banksData, getBankByCompe, getBankByName, searchBanks } <span class="k">from</span> <span class="s">"react-bancos/data"</span>;

banksData.length;               <span class="c">// lista completa: { slug, name, compe, color }[]</span>
getBankByCompe(<span class="s">"77"</span>);           <span class="c">// completa os zeros → Banco Inter</span>
getBankByName(<span class="s">"itau"</span>);          <span class="c">// ignora acentos e caixa → Itaú Unibanco</span>
searchBanks(<span class="s">"banco"</span>);           <span class="c">// busca livre por nome, slug ou COMPE</span></pre>

  <h2>Props</h2>
  <table>
    <thead><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></thead>
    <tbody>
      <tr><td><code>size</code></td><td><code>number | string</code></td><td class="def">48</td>
        <td>Largura e altura. Número vira px.</td></tr>
      <tr><td><code>radius</code></td><td><code>number | string</code></td><td class="def">—</td>
        <td>border-radius dos cantos (ex.: 8, "50%").</td></tr>
      <tr><td><code>title</code></td><td><code>string</code></td><td class="def">nome do banco</td>
        <td>Título acessível (&lt;title&gt; + aria-label).</td></tr>
    </tbody>
  </table>
  <p class="hint">Qualquer outra prop de <code>&lt;svg&gt;</code> (className, onClick, …) é repassada.
  Metadados via <code>banks</code> e <code>getBank(slug | compe)</code>.</p>

  <footer>
    <div class="autor">
      <a href="https://henriquezolini.com/"><img src="${AVATAR}" alt="Henrique Zolini" /></a>
      <div>
        <b>Feito por Henrique Zolini</b>
        <a href="https://henriquezolini.com/">henriquezolini.com</a> ·
        <a href="https://github.com/henriquezolini">@henriquezolini</a>
      </div>
    </div>
    Contribuições são bem-vindas em
    <a href="https://github.com/henriquezolini/react-bancos">github.com/henriquezolini/react-bancos</a> —
    o guia está no CONTRIBUTING.md. Os logos são marcas registradas de seus respectivos titulares,
    usados apenas para identificação das instituições. Código sob licença MIT.
  </footer>
</div>
<div id="toast" role="status">Copiado!</div>
<script>
const BANKS = ${payload};
const grid = document.getElementById("grid");
const q = document.getElementById("q");
const size = document.getElementById("size");
const radius = document.getElementById("radius");
const toast = document.getElementById("toast");
document.getElementById("count").textContent = BANKS.length;

const svgOf = (b, s, r) =>
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + b.viewBox + '" width="' + s +
  '" height="' + s + '" style="border-radius:' + r + '%" role="img" aria-label="' + b.name + '">' +
  b.inner + "</svg>";

function render() {
  const term = q.value.trim().toLowerCase();
  const s = +size.value, r = +radius.value;
  document.getElementById("sizeo").textContent = s;
  document.getElementById("radiuso").textContent = r + "%";
  const hits = BANKS.filter((b) =>
    !term || b.name.toLowerCase().includes(term) || b.slug.includes(term) ||
    (b.compe || "").includes(term) || b.component.toLowerCase().includes(term));
  document.getElementById("result").textContent =
    hits.length === BANKS.length ? "(" + BANKS.length + ")" : "(" + hits.length + " de " + BANKS.length + ")";
  grid.innerHTML = hits.map((b) =>
    '<button class="card" data-c="' + b.component + '" title="Copiar import">' +
    svgOf(b, s, r) + "<b>" + b.name + '</b><span class="meta"><span class="badge">&lt;' +
    b.component + ' /&gt;</span>' + (b.compe ? '<span class="badge">' + b.compe + "</span>" : "") +
    "</span></button>").join("") ||
    '<p class="empty">Nenhum banco encontrado para "' + q.value.trim() +
    '" — contribuições são bem-vindas no GitHub.</p>';
}
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  copy('import { ' + card.dataset.c + ' } from "react-bancos";');
});
document.getElementById("install").addEventListener("click", () => copy("npm install react-bancos"));
function copy(text) {
  navigator.clipboard?.writeText(text);
  toast.classList.add("on");
  clearTimeout(copy.t);
  copy.t = setTimeout(() => toast.classList.remove("on"), 1400);
}
document.getElementById("theme").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
});
// faixa do hero: alguns ícones em destaque, discretos
document.getElementById("strip").innerHTML =
  ["nubank","itau","bancodobrasil","bradesco","caixa","santander","inter","c6bank","picpay","sicredi"]
    .map((s) => svgOf(BANKS.find((b) => b.slug === s), 36, 20)).join("");
q.addEventListener("input", render);
size.addEventListener("input", render);
radius.addEventListener("input", render);
render();
</script>
`;

writeFileSync(
  join(root, "docs", "index.html"),
  `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n</head>\n<body>\n${body}\n</body>\n</html>\n`
);
// fragmento sem wrapper (para publicar como Artifact do Claude)
writeFileSync(join(root, "docs", ".fragment.html"), body);
console.log(`✓ docs/index.html gerado com ${data.length} ícones inline`);
