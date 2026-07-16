/**
 * Smoke test: renderiza todos os componentes via SSR e valida o output.
 * Uso: node scripts/smoke-test.mjs (após npm run build)
 */
import { readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { banks, getBank, Nubank } from "../dist/index.js";
import {
  banksData,
  getBankByCompe,
  getBankBySlug,
  getBankByName,
  searchBanks,
} from "../dist/data.js";

let failures = 0;
const check = (cond, msg) => {
  if (!cond) {
    console.error(`✗ ${msg}`);
    failures++;
  }
};

check(banks.length >= 24, `esperava >=24 bancos, veio ${banks.length}`);

for (const bank of banks) {
  const html = renderToStaticMarkup(React.createElement(bank.Icon, { size: 64 }));
  check(html.startsWith("<svg"), `${bank.slug}: não renderizou <svg>`);
  check(html.includes('width="64"'), `${bank.slug}: prop size não aplicada`);
  check(html.includes(`data-bank="${bank.slug}"`), `${bank.slug}: data-bank ausente`);
  check(html.includes("<title>"), `${bank.slug}: <title> acessível ausente`);
  check(html.includes("viewBox"), `${bank.slug}: viewBox ausente`);
  check(/#[0-9a-f]{6}/i.test(bank.color ?? ""), `${bank.slug}: metadado color inválido (${bank.color})`);
  check(bank.compe === null || /^\d{3}$/.test(bank.compe), `${bank.slug}: compe inválido (${bank.compe})`);
}

// diretiva do projeto: todo banco tem slug ÚNICO em string lowercase ([a-z0-9]+)
const slugs = banks.map((b) => b.slug);
check(new Set(slugs).size === slugs.length, "slugs duplicados em banks");
for (const s of slugs) {
  check(typeof s === "string" && /^[a-z0-9]+$/.test(s), `slug fora do padrão lowercase: "${s}"`);
}

// ids/classes não podem colidir entre ícones renderizados na mesma página
const all = banks.map((b) => renderToStaticMarkup(React.createElement(b.Icon))).join("");
const ids = [...all.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
check(new Set(ids).size === ids.length, "ids duplicados entre ícones diferentes");

// API de metadados
check(getBank("nubank")?.name === "Nubank", "getBank('nubank') falhou");
check(getBank(260)?.slug === "nubank", "getBank(260) falhou");
check(getBank("077")?.slug === "inter", "getBank('077') falhou");

// módulo de dados (react-bancos/data): puro, sem React, para Node/APIs
check(banksData.length === banks.length, "banksData e banks divergem em tamanho");
check(banksData.every((b) => !("Icon" in b)), "banksData não pode conter componentes");
check(getBankByCompe(341)?.slug === "itau", "getBankByCompe(341) falhou");
check(getBankByCompe("77")?.slug === "inter", "getBankByCompe('77') sem zeros falhou");
check(getBankBySlug("nubank")?.name === "Nubank", "getBankBySlug falhou");
check(getBankByName("Itaú Unibanco")?.slug === "itau", "getBankByName exato falhou");
check(getBankByName("itau")?.slug === "itau", "getBankByName sem acento/parcial falhou");
check(getBankByName("CAIXA")?.slug === "caixa", "getBankByName caixa-alta falhou");
check(searchBanks("banco").length >= 10, "searchBanks('banco') retornou pouco");
check(searchBanks("").length === 0, "searchBanks('') deveria ser vazio");
const dataBundle = readFileSync(new URL("../dist/data.js", import.meta.url), "utf8");
check(!/from\s*["']react["']|require\(["']react["']\)/.test(dataBundle),
  "dist/data.js não pode depender de react");

// props title e radius
const custom = renderToStaticMarkup(
  React.createElement(Nubank, { title: "Conta roxa", radius: 12 })
);
check(custom.includes("<title>Conta roxa</title>"), "prop title não aplicada");
check(custom.includes("border-radius:12px"), "prop radius não aplicada");

if (failures) {
  console.error(`\n${failures} verificações falharam`);
  process.exit(1);
}
console.log(`✓ smoke test: ${banks.length} ícones renderizados via SSR, sem colisões, metadados ok`);
