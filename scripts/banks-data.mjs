/**
 * Metadados dos bancos — fonte única usada pelo gerador de componentes e da doc.
 * slug = nome do arquivo em icons/<slug>.svg
 * compe = código de compensação Bacen (string com zeros à esquerda) ou null
 * color = override da cor de fundo quando a detecção automática erra
 */
export const BANKS = [
  { slug: "bancodobrasil", component: "BancoDoBrasil", name: "Banco do Brasil", compe: "001" },
  { slug: "banrisul", component: "Banrisul", name: "Banrisul", compe: "041" },
  { slug: "bmg", component: "BMG", name: "Banco BMG", compe: "318", color: "#f26321" },
  { slug: "bradesco", component: "Bradesco", name: "Bradesco", compe: "237" },
  { slug: "btgpactual", component: "BTGPactual", name: "BTG Pactual", compe: "208" },
  { slug: "bv", component: "BV", name: "Banco BV", compe: "655" },
  { slug: "c6bank", component: "C6Bank", name: "C6 Bank", compe: "336", color: "#000000" },
  { slug: "caixa", component: "Caixa", name: "Caixa Econômica Federal", compe: "104" },
  { slug: "cora", component: "Cora", name: "Cora", compe: "403" },
  { slug: "inter", component: "Inter", name: "Banco Inter", compe: "077" },
  { slug: "itau", component: "Itau", name: "Itaú Unibanco", compe: "341" },
  { slug: "mercadopago", component: "MercadoPago", name: "Mercado Pago", compe: "323" },
  { slug: "neon", component: "Neon", name: "Neon", compe: "735" },
  { slug: "nubank", component: "Nubank", name: "Nubank", compe: "260" },
  { slug: "original", component: "Original", name: "Banco Original", compe: "212" },
  { slug: "pagbank", component: "PagBank", name: "PagBank", compe: "290" },
  { slug: "pan", component: "Pan", name: "Banco Pan", compe: "623" },
  { slug: "picpay", component: "PicPay", name: "PicPay", compe: "380" },
  { slug: "safra", component: "Safra", name: "Banco Safra", compe: "422" },
  { slug: "santander", component: "Santander", name: "Santander", compe: "033" },
  { slug: "sicoob", component: "Sicoob", name: "Sicoob", compe: "756" },
  { slug: "sicredi", component: "Sicredi", name: "Sicredi", compe: "748" },
  { slug: "stone", component: "Stone", name: "Stone", compe: "197" },
  { slug: "xp", component: "XP", name: "XP", compe: "348" },
];
