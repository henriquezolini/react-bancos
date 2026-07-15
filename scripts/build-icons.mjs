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

const dataTs = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
// Módulo SÓ de dados: sem React/JSX, seguro para Node, APIs e backends.
// Importe via "react-bancos/data".

export interface BankData {
  /** Identificador do arquivo/ícone (ex.: "nubank") */
  slug: string;
  /** Nome da instituição (ex.: "Nubank") */
  name: string;
  /** Código de compensação Bacen (ex.: "260") ou null */
  compe: string | null;
  /** Cor de fundo do ícone (ex.: "#820ad1") ou null */
  color: string | null;
}

/** Lista completa das instituições disponíveis, em ordem alfabética de slug. */
export const banksData: BankData[] = [
${sanitized.map((b) => `  { slug: ${JSON.stringify(b.slug)}, name: ${JSON.stringify(b.name)}, compe: ${JSON.stringify(b.compe)}, color: ${JSON.stringify(b.background)} },`).join("\n")}
];

const normalize = (s: string): string =>
  s.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().trim();

/** Busca pelo código COMPE do Bacen. Aceita "341", 341 ou "77" (completa os zeros). */
export function getBankByCompe(compe: string | number): BankData | undefined {
  const c = String(compe).trim().padStart(3, "0");
  return banksData.find((b) => b.compe === c);
}

/** Busca pelo slug exato (ex.: "nubank", "bancodobrasil"). */
export function getBankBySlug(slug: string): BankData | undefined {
  const s = normalize(slug);
  return banksData.find((b) => b.slug === s);
}

/**
 * Busca pelo nome, ignorando acentos e maiúsculas ("itaú unibanco" === "Itau Unibanco").
 * Se não houver correspondência exata, tenta correspondência parcial ("itau" → Itaú Unibanco).
 */
export function getBankByName(name: string): BankData | undefined {
  const n = normalize(name);
  if (!n) return undefined;
  return (
    banksData.find((b) => normalize(b.name) === n) ??
    banksData.find((b) => normalize(b.name).includes(n) || b.slug.includes(n.replace(/\\s+/g, "")))
  );
}

/** Busca livre por nome, slug ou COMPE; retorna todas as correspondências. */
export function searchBanks(query: string): BankData[] {
  const q = normalize(query);
  if (!q) return [];
  return banksData.filter(
    (b) =>
      normalize(b.name).includes(q) ||
      b.slug.includes(q.replace(/\\s+/g, "")) ||
      (b.compe ?? "").includes(q)
  );
}
`;
writeFileSync(join(root, "src", "data.ts"), dataTs);

const banksTs = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
import type { BankIconComponent } from "./createBankIcon";
import { banksData, getBankByCompe, getBankBySlug, type BankData } from "./data";
${sanitized.map((b) => `import { ${b.component} } from "./icons/${b.component}";`).join("\n")}

export interface Bank extends BankData {
  /** Componente React do ícone */
  Icon: BankIconComponent;
}

const ICONS: Record<string, BankIconComponent> = {
${sanitized.map((b) => `  ${JSON.stringify(b.slug)}: ${b.component},`).join("\n")}
};

/** Todos os bancos disponíveis (com componente), em ordem alfabética de slug. */
export const banks: Bank[] = banksData.map((b) => ({ ...b, Icon: ICONS[b.slug] }));

/**
 * Busca um banco pelo slug ("nubank") ou código COMPE ("260" ou 260).
 * @deprecated Prefira getBankBySlug, getBankByCompe ou getBankByName —
 * e, em Node/APIs sem React, importe de "react-bancos/data".
 */
export function getBank(query: string | number): Bank | undefined {
  const hit = getBankBySlug(String(query)) ?? getBankByCompe(query);
  return hit && banks.find((b) => b.slug === hit.slug);
}
`;
writeFileSync(join(root, "src", "banks.ts"), banksTs);

const indexTs = `// Gerado por scripts/build-icons.mjs — não editar manualmente.
export { createBankIcon } from "./createBankIcon";
export type { BankIconProps, BankIconComponent, BankDef } from "./createBankIcon";
export { banks, getBank } from "./banks";
export type { Bank } from "./banks";
export { banksData, getBankByCompe, getBankBySlug, getBankByName, searchBanks } from "./data";
export type { BankData } from "./data";
${sanitized.map((b) => `export { ${b.component} } from "./icons/${b.component}";`).join("\n")}
`;
writeFileSync(join(root, "src", "index.ts"), indexTs);

console.log(`✓ ${sanitized.length} componentes gerados em src/icons/ (+ banks.ts, index.ts)`);
