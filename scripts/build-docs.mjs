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
  --bg: #0d1117; --panel: #161c23; --panel-2: #1c242e; --line: #29323d;
  --ink: #e9eef4; --muted: #94a3b2; --accent: #ffd23e; --accent-ink: #10141a;
  --ok: #3fb970; --mono: ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
}
:root[data-theme="light"] {
  --bg: #f6f7f9; --panel: #ffffff; --panel-2: #eef1f4; --line: #dde3e9;
  --ink: #1a2430; --muted: #5b6a79; --accent: #b8860b; --accent-ink: #ffffff;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --bg: #f6f7f9; --panel: #ffffff; --panel-2: #eef1f4; --line: #dde3e9;
    --ink: #1a2430; --muted: #5b6a79; --accent: #b8860b; --accent-ink: #ffffff;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--ink);
  font: 16px/1.55 ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif;
}
.wrap { max-width: 1060px; margin: 0 auto; padding: 0 1.25rem 5rem; }
header.hero { padding: 4.5rem 0 2.5rem; text-align: center; }
.hero h1 {
  margin: 1.4rem 0 .4rem; font-size: clamp(2.2rem, 6vw, 3.4rem);
  letter-spacing: -.03em; line-height: 1.05; text-wrap: balance;
}
.hero h1 .r { color: var(--accent); }
.hero p.tag { color: var(--muted); max-width: 46ch; margin: 0 auto 1.6rem; text-wrap: balance; }
.mosaic { display: flex; justify-content: center; gap: .55rem; flex-wrap: wrap; max-width: 620px; margin: 0 auto; }
.mosaic svg { border-radius: 22%; transition: transform .18s ease; }
.mosaic svg:hover { transform: translateY(-4px) scale(1.08); }
@media (prefers-reduced-motion: reduce) { .mosaic svg { transition: none; } .mosaic svg:hover { transform: none; } }
.install {
  display: inline-flex; align-items: center; gap: .8rem; margin-top: .4rem;
  background: var(--panel); border: 1px solid var(--line); border-radius: 10px;
  padding: .65rem 1rem; font: .95rem var(--mono); cursor: pointer; color: var(--ink);
}
.install:hover { border-color: var(--accent); }
.install .d { color: var(--muted); }
.controls {
  position: sticky; top: 0; z-index: 5; background: var(--bg);
  display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;
  padding: .9rem 0; border-bottom: 1px solid var(--line); margin-bottom: 1.4rem;
}
.controls input[type="search"] {
  flex: 1 1 220px; background: var(--panel); color: var(--ink);
  border: 1px solid var(--line); border-radius: 8px; padding: .55rem .8rem; font-size: .95rem;
}
.controls input[type="search"]:focus-visible,
.install:focus-visible, .card:focus-visible, #theme:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 2px;
}
.ctl { display: flex; align-items: center; gap: .5rem; font-size: .82rem; color: var(--muted); }
.ctl output { font: .82rem var(--mono); min-width: 3.2ch; color: var(--ink); }
input[type="range"] { accent-color: var(--accent); width: 110px; }
#theme { background: var(--panel); border: 1px solid var(--line); color: var(--ink);
  border-radius: 8px; padding: .45rem .7rem; cursor: pointer; font-size: .9rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: .8rem; }
.card {
  background: var(--panel); border: 1px solid var(--line); border-radius: 12px;
  padding: 1.05rem .8rem .85rem; display: flex; flex-direction: column; align-items: center;
  gap: .7rem; cursor: pointer; transition: border-color .15s, transform .15s; text-align: center;
}
.card:hover { border-color: var(--accent); transform: translateY(-2px); }
@media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
.card b { font-size: .84rem; font-weight: 600; line-height: 1.25; }
.card .meta { display: flex; gap: .4rem; align-items: center; }
.badge {
  font: .68rem/1.5 var(--mono); color: var(--muted);
  background: var(--panel-2); border-radius: 5px; padding: 0 .45em;
}
.hint { color: var(--muted); font-size: .78rem; margin: .6rem 0 0; }
h2 { font-size: 1.15rem; letter-spacing: -.01em; margin: 3rem 0 .8rem; }
pre {
  background: var(--panel); border: 1px solid var(--line); border-radius: 12px;
  padding: 1.1rem 1.2rem; overflow-x: auto; font: .88rem/1.6 var(--mono); margin: 0 0 1rem;
}
pre .c { color: var(--muted); } pre .k { color: var(--accent); } pre .s { color: var(--ok); }
footer { margin-top: 4rem; padding-top: 1.2rem; border-top: 1px solid var(--line);
  color: var(--muted); font-size: .82rem; }
#toast {
  position: fixed; left: 50%; bottom: 2rem; transform: translate(-50%, 20px);
  background: var(--accent); color: var(--accent-ink); font-weight: 600;
  padding: .6rem 1.1rem; border-radius: 99px; opacity: 0; pointer-events: none;
  transition: opacity .2s, transform .2s; font-size: .9rem;
}
#toast.on { opacity: 1; transform: translate(-50%, 0); }
</style>
<div class="wrap">
  <header class="hero">
    <div class="mosaic" id="mosaic" aria-hidden="true"></div>
    <h1><span class="r">react</span>-bancos</h1>
    <p class="tag">Ícones dos principais bancos e fintechs do Brasil como componentes React —
    fiéis às marcas, com nome, código COMPE e cor de cada banco.</p>
    <button class="install" id="install" title="Copiar comando">
      <span class="d">$</span> npm install react-bancos <span class="d">⧉</span>
    </button>
  </header>

  <div class="controls">
    <input type="search" id="q" placeholder="Buscar por nome, slug ou código… (ex.: nubank, 341)"
      aria-label="Buscar banco" />
    <label class="ctl">tamanho <input type="range" id="size" min="28" max="96" value="56" /><output id="sizeo">56</output></label>
    <label class="ctl">raio <input type="range" id="radius" min="0" max="50" value="18" /><output id="radiuso">18%</output></label>
    <button id="theme" title="Alternar tema">◐</button>
  </div>

  <div class="grid" id="grid"></div>
  <p class="hint">Clique em um card para copiar o import do componente.</p>

  <h2>Uso</h2>
  <pre><span class="k">import</span> { Nubank, Itau, banks, getBank } <span class="k">from</span> <span class="s">"react-bancos"</span>;

<span class="c">// direto</span>
&lt;Nubank size={48} radius={12} /&gt;

<span class="c">// a partir do código COMPE que veio da sua API</span>
<span class="k">const</span> banco = getBank(<span class="s">"260"</span>); <span class="c">// → { name: "Nubank", compe: "260", color: "#820ad1", Icon }</span>
banco &amp;&amp; &lt;banco.Icon size={32} title={banco.name} /&gt;

<span class="c">// listar todos</span>
banks.map(({ slug, Icon }) =&gt; &lt;Icon key={slug} size={40} radius={8} /&gt;)</pre>

  <footer>
    Os logos são marcas registradas de seus respectivos bancos, usados apenas para identificação.
    · MIT · <span id="count"></span> bancos e contando — contribuições são bem-vindas.
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
  grid.innerHTML = hits.map((b) =>
    '<button class="card" data-c="' + b.component + '" title="Copiar import">' +
    svgOf(b, s, r) + "<b>" + b.name + '</b><span class="meta"><span class="badge">&lt;' +
    b.component + ' /&gt;</span>' + (b.compe ? '<span class="badge">' + b.compe + "</span>" : "") +
    "</span></button>").join("") ||
    '<p style="color:var(--muted)">Nenhum banco encontrado — abra uma issue pedindo! 🏦</p>';
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
  const dark = (root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")) === "dark";
  root.dataset.theme = dark ? "light" : "dark";
});
// mosaico do hero: 8 ícones em destaque
document.getElementById("mosaic").innerHTML =
  ["nubank","itau","bancodobrasil","picpay","inter","c6bank","mercadopago","sicredi"]
    .map((s) => svgOf(BANKS.find((b) => b.slug === s), 56, 22)).join("");
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
