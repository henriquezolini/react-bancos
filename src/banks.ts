// Gerado por scripts/build-icons.mjs — não editar manualmente.
import type { BankIconComponent } from "./createBankIcon";
import { BancoDoBrasil } from "./icons/BancoDoBrasil";
import { Banrisul } from "./icons/Banrisul";
import { BMG } from "./icons/BMG";
import { Bradesco } from "./icons/Bradesco";
import { BTGPactual } from "./icons/BTGPactual";
import { BV } from "./icons/BV";
import { C6Bank } from "./icons/C6Bank";
import { Caixa } from "./icons/Caixa";
import { Cora } from "./icons/Cora";
import { Inter } from "./icons/Inter";
import { Itau } from "./icons/Itau";
import { MercadoPago } from "./icons/MercadoPago";
import { Neon } from "./icons/Neon";
import { Nubank } from "./icons/Nubank";
import { Original } from "./icons/Original";
import { PagBank } from "./icons/PagBank";
import { Pan } from "./icons/Pan";
import { PicPay } from "./icons/PicPay";
import { Safra } from "./icons/Safra";
import { Santander } from "./icons/Santander";
import { Sicoob } from "./icons/Sicoob";
import { Sicredi } from "./icons/Sicredi";
import { Stone } from "./icons/Stone";
import { XP } from "./icons/XP";

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
  { slug: "bancodobrasil", name: "Banco do Brasil", compe: "001", color: "#fee60e", Icon: BancoDoBrasil },
  { slug: "banrisul", name: "Banrisul", compe: "041", color: "#010050", Icon: Banrisul },
  { slug: "bmg", name: "Banco BMG", compe: "318", color: "#f26321", Icon: BMG },
  { slug: "bradesco", name: "Bradesco", compe: "237", color: "#cf2032", Icon: Bradesco },
  { slug: "btgpactual", name: "BTG Pactual", compe: "208", color: "#001e61", Icon: BTGPactual },
  { slug: "bv", name: "Banco BV", compe: "655", color: "#5776d0", Icon: BV },
  { slug: "c6bank", name: "C6 Bank", compe: "336", color: "#000000", Icon: C6Bank },
  { slug: "caixa", name: "Caixa Econômica Federal", compe: "104", color: "#ececfb", Icon: Caixa },
  { slug: "cora", name: "Cora", compe: "403", color: "#fe3e6d", Icon: Cora },
  { slug: "inter", name: "Banco Inter", compe: "077", color: "#ff7a00", Icon: Inter },
  { slug: "itau", name: "Itaú Unibanco", compe: "341", color: "#fe6100", Icon: Itau },
  { slug: "mercadopago", name: "Mercado Pago", compe: "323", color: "#00bcff", Icon: MercadoPago },
  { slug: "neon", name: "Neon", compe: "735", color: "#00a8ef", Icon: Neon },
  { slug: "nubank", name: "Nubank", compe: "260", color: "#820ad1", Icon: Nubank },
  { slug: "original", name: "Banco Original", compe: "212", color: "#18ad47", Icon: Original },
  { slug: "pagbank", name: "PagBank", compe: "290", color: "#1bb99a", Icon: PagBank },
  { slug: "pan", name: "Banco Pan", compe: "623", color: "#363636", Icon: Pan },
  { slug: "picpay", name: "PicPay", compe: "380", color: "#11c76f", Icon: PicPay },
  { slug: "safra", name: "Banco Safra", compe: "422", color: "#00003c", Icon: Safra },
  { slug: "santander", name: "Santander", compe: "033", color: "#fe0000", Icon: Santander },
  { slug: "sicoob", name: "Sicoob", compe: "756", color: "#003641", Icon: Sicoob },
  { slug: "sicredi", name: "Sicredi", compe: "748", color: "#3fa110", Icon: Sicredi },
  { slug: "stone", name: "Stone", compe: "197", color: "#0db14b", Icon: Stone },
  { slug: "xp", name: "XP", compe: "348", color: "#000000", Icon: XP },
];

/** Busca um banco pelo slug ("nubank") ou código COMPE ("260" ou 260). */
export function getBank(query: string | number): Bank | undefined {
  const q = String(query).toLowerCase();
  return banks.find((b) => b.slug === q || b.compe === q.padStart(3, "0"));
}
