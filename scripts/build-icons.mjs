/**
 * Gera src/icons/*.tsx, src/banks.ts e src/index.ts a partir de icons/*.svg.
 * Uso: node scripts/build-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BANKS } from "./banks-data.mjs";
import { sanitizeSvg, assertNoCollisions } from "./svg-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ICONS = join(root, "icons");
const OUT = join(root, "src", "icons");
mkdirSync(OUT, { recursive: true });

const files = readdirSync(ICONS).filter((f) => f.endsWith(".svg"));
const missing = files.map((f) => f.replace(".svg", "")).filter((s) => !BANKS.some((b) => b.slug === s));
if (missing.length) throw new Error(`Sem metadados em scripts/banks-data.mjs: ${missing.join(", ")}`);

const sanitized = [];
for (const bank of BANKS) {
  const raw = readFileSync(join(ICONS, `${bank.slug}.svg`), "utf8");
  const { viewBox, inner, background } = sanitizeSvg(raw, bank.slug);
  sanitized.push({ ...bank, viewBox, inner, background: bank.color ?? background });
}
assertNoCollisions(sanitized);

for (const b of sanitized) {
  const tsx = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
import { createBankIcon } from "../createBankIcon";

/** ${b.name}${b.compe ? ` — COMPE ${b.compe}` : ""} */
export const ${b.component} = createBankIcon({
  name: ${JSON.stringify(b.name)},
  slug: ${JSON.stringify(b.slug)},
  compe: ${JSON.stringify(b.compe)},
  color: ${JSON.stringify(b.background)},
  viewBox: ${JSON.stringify(b.viewBox)},
  html: ${JSON.stringify(b.inner)},
});
`;
  writeFileSync(join(OUT, `${b.component}.tsx`), tsx);
}

const banksTs = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
import type { BankIconComponent } from "./createBankIcon";
${sanitized.map((b) => `import { ${b.component} } from "./icons/${b.component}";`).join("\n")}

export interface Bank {
  /** Identificador do arquivo/ícone (ex.: "nubank") */
  slug: string;
  /** Nome do banco (ex.: "Nubank") */
  name: string;
  /** Código de compensação Bacen (ex.: "260") ou null */
  compe: string | null;
  /** Cor de fundo do ícone (ex.: "#820ad1") ou null */
  color: string | null;
  /** Componente React do ícone */
  Icon: BankIconComponent;
}

/** Todos os bancos disponíveis, em ordem alfabética de slug. */
export const banks: Bank[] = [
${sanitized.map((b) => `  { slug: ${JSON.stringify(b.slug)}, name: ${JSON.stringify(b.name)}, compe: ${JSON.stringify(b.compe)}, color: ${JSON.stringify(b.background)}, Icon: ${b.component} },`).join("\n")}
];

/** Busca um banco pelo slug ("nubank") ou código COMPE ("260" ou 260). */
export function getBank(query: string | number): Bank | undefined {
  const q = String(query).toLowerCase();
  return banks.find((b) => b.slug === q || b.compe === q.padStart(3, "0"));
}
`;
writeFileSync(join(root, "src", "banks.ts"), banksTs);

const indexTs = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
export { createBankIcon } from "./createBankIcon";
export type { BankIconProps, BankIconComponent, BankDef } from "./createBankIcon";
export { banks, getBank } from "./banks";
export type { Bank } from "./banks";
${sanitized.map((b) => `export { ${b.component} } from "./icons/${b.component}";`).join("\n")}
`;
writeFileSync(join(root, "src", "index.ts"), indexTs);

console.log(`✓ ${sanitized.length} componentes gerados em src/icons/ (+ banks.ts, index.ts)`);
