// Gerado por scripts/build-icons.mjs — não editar manualmente.
import type { BankIconComponent } from "./createBankIcon";
import { banksData, getBankByCompe, getBankBySlug, type BankData } from "./data";
import { ABCBrasil } from "./icons/ABCBrasil";
import { Agibank } from "./icons/Agibank";
import { Arbi } from "./icons/Arbi";
import { Asaas } from "./icons/Asaas";
import { BancoDaAmazonia } from "./icons/BancoDaAmazonia";
import { BancoDoBrasil } from "./icons/BancoDoBrasil";
import { BancoDoNordeste } from "./icons/BancoDoNordeste";
import { Banese } from "./icons/Banese";
import { Banestes } from "./icons/Banestes";
import { Bankly } from "./icons/Bankly";
import { Banrisul } from "./icons/Banrisul";
import { BMG } from "./icons/BMG";
import { BNPParibas } from "./icons/BNPParibas";
import { Bradesco } from "./icons/Bradesco";
import { BRB } from "./icons/BRB";
import { BS2 } from "./icons/BS2";
import { BTGPactual } from "./icons/BTGPactual";
import { BV } from "./icons/BV";
import { C6Bank } from "./icons/C6Bank";
import { Caixa } from "./icons/Caixa";
import { Celcoin } from "./icons/Celcoin";
import { Citibank } from "./icons/Citibank";
import { CloudWalk } from "./icons/CloudWalk";
import { Cora } from "./icons/Cora";
import { Creditas } from "./icons/Creditas";
import { Cresol } from "./icons/Cresol";
import { Daycoval } from "./icons/Daycoval";
import { DeutscheBank } from "./icons/DeutscheBank";
import { Digimais } from "./icons/Digimais";
import { Digio } from "./icons/Digio";
import { EfiBank } from "./icons/EfiBank";
import { Fibra } from "./icons/Fibra";
import { BancoHonda } from "./icons/BancoHonda";
import { Inbursa } from "./icons/Inbursa";
import { IndustrialDoBrasil } from "./icons/IndustrialDoBrasil";
import { InfinitePay } from "./icons/InfinitePay";
import { Inter } from "./icons/Inter";
import { Itau } from "./icons/Itau";
import { Iugu } from "./icons/Iugu";
import { Klavi } from "./icons/Klavi";
import { LetsBank } from "./icons/LetsBank";
import { MercadoPago } from "./icons/MercadoPago";
import { Mercantil } from "./icons/Mercantil";
import { Mizuho } from "./icons/Mizuho";
import { MorganStanley } from "./icons/MorganStanley";
import { MUFG } from "./icons/MUFG";
import { Neon } from "./icons/Neon";
import { Next } from "./icons/Next";
import { NGCash } from "./icons/NGCash";
import { Nubank } from "./icons/Nubank";
import { Omni } from "./icons/Omni";
import { Original } from "./icons/Original";
import { Ourinvest } from "./icons/Ourinvest";
import { PagarMe } from "./icons/PagarMe";
import { PagBank } from "./icons/PagBank";
import { Pan } from "./icons/Pan";
import { Paulista } from "./icons/Paulista";
import { PayPal } from "./icons/PayPal";
import { PicPay } from "./icons/PicPay";
import { Pine } from "./icons/Pine";
import { Pluggy } from "./icons/Pluggy";
import { QITech } from "./icons/QITech";
import { Rabobank } from "./icons/Rabobank";
import { RecargaPay } from "./icons/RecargaPay";
import { Rendimento } from "./icons/Rendimento";
import { Revolut } from "./icons/Revolut";
import { Safra } from "./icons/Safra";
import { Santander } from "./icons/Santander";
import { Sicoob } from "./icons/Sicoob";
import { Sicredi } from "./icons/Sicredi";
import { Skrill } from "./icons/Skrill";
import { SocieteGenerale } from "./icons/SocieteGenerale";
import { Sofisa } from "./icons/Sofisa";
import { StarkBank } from "./icons/StarkBank";
import { BancoStellantis } from "./icons/BancoStellantis";
import { Stone } from "./icons/Stone";
import { SumitomoMitsui } from "./icons/SumitomoMitsui";
import { Topazio } from "./icons/Topazio";
import { Toro } from "./icons/Toro";
import { BancoToyota } from "./icons/BancoToyota";
import { Unicred } from "./icons/Unicred";
import { BancoVolkswagen } from "./icons/BancoVolkswagen";
import { Warren } from "./icons/Warren";
import { WillBank } from "./icons/WillBank";
import { Wise } from "./icons/Wise";
import { XP } from "./icons/XP";
import { ZroBank } from "./icons/ZroBank";

export interface Bank extends BankData {
  /** Componente React do ícone */
  Icon: BankIconComponent;
}

const ICONS: Record<string, BankIconComponent> = {
  "abcbrasil": ABCBrasil,
  "agibank": Agibank,
  "arbi": Arbi,
  "asaas": Asaas,
  "bancodaamazonia": BancoDaAmazonia,
  "bancodobrasil": BancoDoBrasil,
  "bancodonordeste": BancoDoNordeste,
  "banese": Banese,
  "banestes": Banestes,
  "bankly": Bankly,
  "banrisul": Banrisul,
  "bmg": BMG,
  "bnpparibas": BNPParibas,
  "bradesco": Bradesco,
  "brb": BRB,
  "bs2": BS2,
  "btgpactual": BTGPactual,
  "bv": BV,
  "c6bank": C6Bank,
  "caixa": Caixa,
  "celcoin": Celcoin,
  "citibank": Citibank,
  "cloudwalk": CloudWalk,
  "cora": Cora,
  "creditas": Creditas,
  "cresol": Cresol,
  "daycoval": Daycoval,
  "deutsche": DeutscheBank,
  "digimais": Digimais,
  "digio": Digio,
  "efibank": EfiBank,
  "fibra": Fibra,
  "honda": BancoHonda,
  "inbursa": Inbursa,
  "industrialdobrasil": IndustrialDoBrasil,
  "infinitepay": InfinitePay,
  "inter": Inter,
  "itau": Itau,
  "iugu": Iugu,
  "klavi": Klavi,
  "letsbank": LetsBank,
  "mercadopago": MercadoPago,
  "mercantil": Mercantil,
  "mizuho": Mizuho,
  "morganstanley": MorganStanley,
  "mufg": MUFG,
  "neon": Neon,
  "next": Next,
  "ngcash": NGCash,
  "nubank": Nubank,
  "omni": Omni,
  "original": Original,
  "ourinvest": Ourinvest,
  "pagarme": PagarMe,
  "pagbank": PagBank,
  "pan": Pan,
  "paulista": Paulista,
  "paypal": PayPal,
  "picpay": PicPay,
  "pine": Pine,
  "pluggy": Pluggy,
  "qitech": QITech,
  "rabobank": Rabobank,
  "recargapay": RecargaPay,
  "rendimento": Rendimento,
  "revolut": Revolut,
  "safra": Safra,
  "santander": Santander,
  "sicoob": Sicoob,
  "sicredi": Sicredi,
  "skrill": Skrill,
  "socgen": SocieteGenerale,
  "sofisa": Sofisa,
  "starkbank": StarkBank,
  "stellantis": BancoStellantis,
  "stone": Stone,
  "sumitomo": SumitomoMitsui,
  "topazio": Topazio,
  "toro": Toro,
  "toyota": BancoToyota,
  "unicred": Unicred,
  "volkswagen": BancoVolkswagen,
  "warren": Warren,
  "willbank": WillBank,
  "wise": Wise,
  "xp": XP,
  "zrobank": ZroBank,
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
