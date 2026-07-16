// Gerado por scripts/build-icons.mjs — não editar manualmente.
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
  { slug: "abcbrasil", name: "Banco ABC Brasil", compe: "246", color: "#1e1e1e" },
  { slug: "agibank", name: "Agibank", compe: "121", color: "#266bff" },
  { slug: "ailos", name: "Ailos", compe: "085", color: "#ffffff" },
  { slug: "almah", name: "Almah Conta", compe: null, color: "#1c1444" },
  { slug: "arbi", name: "Banco Arbi", compe: "213", color: "#ffffff" },
  { slug: "artta", name: "ARTTA", compe: null, color: "#ffffff" },
  { slug: "asaas", name: "Asaas", compe: "461", color: "#0038e5" },
  { slug: "avenue", name: "Avenue", compe: null, color: "#002820" },
  { slug: "bancodaamazonia", name: "Banco da Amazônia", compe: "003", color: "#003c2d" },
  { slug: "bancodobrasil", name: "Banco do Brasil", compe: "001", color: "#fee60e" },
  { slug: "bancodonordeste", name: "Banco do Nordeste", compe: "004", color: "#a6193c" },
  { slug: "banese", name: "Banese", compe: "047", color: "#00622a" },
  { slug: "banestes", name: "Banestes", compe: "021", color: "#004b8d" },
  { slug: "bankly", name: "Bankly", compe: "332", color: "#347bff" },
  { slug: "bankofamerica", name: "Bank of America Merrill Lynch", compe: "755", color: "#ffffff" },
  { slug: "banpara", name: "Banpará", compe: "037", color: "#ea1c24" },
  { slug: "banrisul", name: "Banrisul", compe: "041", color: "#010050" },
  { slug: "beesbank", name: "BEES Bank", compe: null, color: "#ffffff" },
  { slug: "bkbank", name: "BK Bank", compe: null, color: "#ffffff" },
  { slug: "bmg", name: "Banco BMG", compe: "318", color: "#f26321" },
  { slug: "bmp", name: "BMP Money Plus", compe: "274", color: "#0d0d12" },
  { slug: "bnpparibas", name: "Banco BNP Paribas Brasil", compe: "752", color: "#00915a" },
  { slug: "bradesco", name: "Bradesco", compe: "237", color: "#cf2032" },
  { slug: "brb", name: "BRB — Banco de Brasília", compe: "070", color: "#173e7d" },
  { slug: "bs2", name: "Banco BS2", compe: "218", color: "#3333cc" },
  { slug: "btgpactual", name: "BTG Pactual", compe: "208", color: "#001e61" },
  { slug: "bv", name: "Banco BV", compe: "655", color: "#5776d0" },
  { slug: "c6bank", name: "C6 Bank", compe: "336", color: "#000000" },
  { slug: "caixa", name: "Caixa Econômica Federal", compe: "104", color: "#ececfb" },
  { slug: "capitual", name: "Capitual", compe: null, color: "#ffffff" },
  { slug: "celcoin", name: "Celcoin", compe: "509", color: "#7664fa" },
  { slug: "citibank", name: "Citibank", compe: "745", color: "#255be3" },
  { slug: "cloudwalk", name: "CloudWalk", compe: "542", color: "#000000" },
  { slug: "contasimples", name: "Conta Simples", compe: null, color: "#ffffff" },
  { slug: "contbank", name: "Contbank", compe: null, color: "#ffffff" },
  { slug: "cora", name: "Cora", compe: "403", color: "#fe3e6d" },
  { slug: "credisis", name: "CrediSIS", compe: "097", color: "#ffffff" },
  { slug: "creditas", name: "Creditas", compe: "342", color: "#8edb00" },
  { slug: "cresol", name: "Cresol", compe: "133", color: "#ef8124" },
  { slug: "daycoval", name: "Banco Daycoval", compe: "707", color: "#001c55" },
  { slug: "deutsche", name: "Deutsche Bank Brasil", compe: "487", color: "#0018a8" },
  { slug: "digimais", name: "Banco Digimais", compe: "654", color: "#171b3d" },
  { slug: "digio", name: "Digio", compe: "335", color: "#23292e" },
  { slug: "dock", name: "Dock", compe: null, color: "#ffffff" },
  { slug: "efibank", name: "Efí Bank", compe: "364", color: "#f37124" },
  { slug: "fibra", name: "Banco Fibra", compe: "224", color: "#082a4d" },
  { slug: "grafeno", name: "Grafeno", compe: null, color: "#ffffff" },
  { slug: "honda", name: "Banco Honda", compe: null, color: "#da251d" },
  { slug: "ifoodpago", name: "iFood Pago", compe: null, color: "#ea1d2c" },
  { slug: "inbursa", name: "Banco Inbursa", compe: "012", color: "#012148" },
  { slug: "industrialdobrasil", name: "Banco Industrial do Brasil", compe: "604", color: "#001d5d" },
  { slug: "infinitepay", name: "InfinitePay", compe: null, color: "#171527" },
  { slug: "inter", name: "Banco Inter", compe: "077", color: "#ff7a00" },
  { slug: "itau", name: "Itaú Unibanco", compe: "341", color: "#fe6100" },
  { slug: "iugu", name: "iugu", compe: "401", color: "#1b1b1b" },
  { slug: "klavi", name: "Klavi", compe: null, color: "#ffffff" },
  { slug: "letsbank", name: "LetsBank", compe: "630", color: "#0d0d0d" },
  { slug: "linker", name: "Linker", compe: null, color: "#ffffff" },
  { slug: "magalupay", name: "MagaluPay", compe: "396", color: "#ffffff" },
  { slug: "mercadopago", name: "Mercado Pago", compe: "323", color: "#00bcff" },
  { slug: "mercantil", name: "Banco Mercantil", compe: "389", color: "#1526ff" },
  { slug: "mizuho", name: "Banco Mizuho do Brasil", compe: "370", color: "#37498b" },
  { slug: "modobank", name: "Modobank", compe: null, color: "#ffffff" },
  { slug: "morganstanley", name: "Banco Morgan Stanley", compe: "066", color: "#ffffff" },
  { slug: "mufg", name: "Banco MUFG Brasil", compe: "456", color: "#e30613" },
  { slug: "multiplobank", name: "Múltiplo Bank", compe: null, color: "#ffffff" },
  { slug: "neon", name: "Neon", compe: "735", color: "#00a8ef" },
  { slug: "next", name: "Next", compe: null, color: "#1e3c3c" },
  { slug: "ngcash", name: "NG.CASH", compe: null, color: "#000000" },
  { slug: "nomad", name: "Nomad", compe: null, color: "#ffce04" },
  { slug: "nubank", name: "Nubank", compe: "260", color: "#820ad1" },
  { slug: "omiecash", name: "Omie.Cash", compe: null, color: "#ffffff" },
  { slug: "omni", name: "Omni Banco", compe: "613", color: "#ffffff" },
  { slug: "original", name: "Banco Original", compe: "212", color: "#18ad47" },
  { slug: "orionpay", name: "OrionPay", compe: null, color: "#ffffff" },
  { slug: "ourinvest", name: "Banco Ourinvest", compe: "712", color: "#15252d" },
  { slug: "outros", name: "Outros", compe: null, color: "#9aa0a6" },
  { slug: "pagarme", name: "Pagar.me", compe: null, color: "#00af55" },
  { slug: "pagbank", name: "PagBank", compe: "290", color: "#1bb99a" },
  { slug: "pan", name: "Banco Pan", compe: "623", color: "#363636" },
  { slug: "paulista", name: "Banco Paulista", compe: "611", color: "#ffffff" },
  { slug: "paycash", name: "PayCash", compe: null, color: "#1c3256" },
  { slug: "paypal", name: "PayPal", compe: null, color: "#003087" },
  { slug: "picpay", name: "PicPay", compe: "380", color: "#11c76f" },
  { slug: "pinbank", name: "PinBank", compe: null, color: "#ffffff" },
  { slug: "pine", name: "Banco Pine", compe: "643", color: "#661739" },
  { slug: "pluggy", name: "Pluggy", compe: null, color: "#ffffff" },
  { slug: "qitech", name: "QI Tech", compe: "329", color: "#101828" },
  { slug: "qualitybank", name: "Quality Digital Bank", compe: null, color: "#ffffff" },
  { slug: "rabobank", name: "Banco Rabobank", compe: "747", color: "#283a93" },
  { slug: "recargapay", name: "RecargaPay", compe: null, color: "#053e6e" },
  { slug: "rendimento", name: "Banco Rendimento", compe: "633", color: "#0a1d6f" },
  { slug: "revolut", name: "Revolut", compe: null, color: "#000000" },
  { slug: "rico", name: "Rico", compe: null, color: "#010042" },
  { slug: "safra", name: "Banco Safra", compe: "422", color: "#00003c" },
  { slug: "santander", name: "Santander", compe: "033", color: "#fe0000" },
  { slug: "sicoob", name: "Sicoob", compe: "756", color: "#003641" },
  { slug: "sicredi", name: "Sicredi", compe: "748", color: "#3fa110" },
  { slug: "sisprime", name: "Sisprime do Brasil", compe: "084", color: "#ffffff" },
  { slug: "skrill", name: "Skrill", compe: null, color: "#ffffff" },
  { slug: "socgen", name: "Banco Société Générale Brasil", compe: "366", color: "#ffffff" },
  { slug: "sofisa", name: "Banco Sofisa", compe: "637", color: "#17b497" },
  { slug: "squid", name: "Squid", compe: null, color: "#ffffff" },
  { slug: "starkbank", name: "Stark Bank", compe: null, color: "#1d2732" },
  { slug: "stellantis", name: "Banco Stellantis", compe: null, color: "#243882" },
  { slug: "stone", name: "Stone", compe: "197", color: "#0db14b" },
  { slug: "stripe", name: "Stripe", compe: null, color: "#635bff" },
  { slug: "sulcredi", name: "Sulcredi", compe: null, color: "#ffffff" },
  { slug: "sumitomo", name: "Banco Sumitomo Mitsui Brasileiro", compe: "464", color: "#ffffff" },
  { slug: "ton", name: "Ton", compe: null, color: "#0dea4a" },
  { slug: "topazio", name: "Banco Topázio", compe: "082", color: "#50c3c7" },
  { slug: "toro", name: "Toro Investimentos", compe: "352", color: "#000000" },
  { slug: "toyota", name: "Banco Toyota", compe: "387", color: "#eb0a1e" },
  { slug: "transfeera", name: "Transfeera", compe: null, color: "#ffffff" },
  { slug: "tribanco", name: "Tribanco", compe: "634", color: "#00336d" },
  { slug: "unicred", name: "Unicred", compe: "136", color: "#004a35" },
  { slug: "uniprime", name: "Uniprime", compe: "099", color: "#ffffff" },
  { slug: "uzzipay", name: "UzziPay", compe: null, color: "#53a000" },
  { slug: "volkswagen", name: "Banco Volkswagen", compe: "393", color: "#001e50" },
  { slug: "warren", name: "Warren Investimentos", compe: "371", color: "#e24324" },
  { slug: "willbank", name: "Will Bank", compe: null, color: "#ffd900" },
  { slug: "wise", name: "Wise", compe: null, color: "#9fe870" },
  { slug: "xp", name: "XP", compe: "348", color: "#000000" },
  { slug: "zemobank", name: "Zemo Bank", compe: null, color: "#001041" },
  { slug: "zrobank", name: "Zro Bank", compe: null, color: "#252f59" },
];

const normalize = (s: string): string =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

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
    banksData.find((b) => normalize(b.name).includes(n) || b.slug.includes(n.replace(/\s+/g, "")))
  );
}

/** Busca livre por nome, slug ou COMPE; retorna todas as correspondências. */
export function searchBanks(query: string): BankData[] {
  const q = normalize(query);
  if (!q) return [];
  return banksData.filter(
    (b) =>
      normalize(b.name).includes(q) ||
      b.slug.includes(q.replace(/\s+/g, "")) ||
      (b.compe ?? "").includes(q)
  );
}
