<p align="center">
  <img src="icons/nubank.svg" width="44" alt="" />
  <img src="icons/itau.svg" width="44" alt="" />
  <img src="icons/bancodobrasil.svg" width="44" alt="" />
  <img src="icons/bradesco.svg" width="44" alt="" />
  <img src="icons/caixa.svg" width="44" alt="" />
  <img src="icons/santander.svg" width="44" alt="" />
  <img src="icons/inter.svg" width="44" alt="" />
  <img src="icons/c6bank.svg" width="44" alt="" />
  <img src="icons/picpay.svg" width="44" alt="" />
  <img src="icons/sicredi.svg" width="44" alt="" />
</p>

<h1 align="center">react-bancos</h1>

<p align="center">
  Ícones dos principais bancos e fintechs do Brasil como componentes React.<br/>
  Fiéis às marcas, padronizados, tipados e com metadados — nome, código COMPE e cor de cada banco.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-bancos"><img src="https://img.shields.io/npm/v/react-bancos?color=ffd23e&label=npm" alt="npm" /></a>
  <img src="https://img.shields.io/badge/react-%E2%89%A517-61dafb" alt="React >=17" />
  <img src="https://img.shields.io/badge/licen%C3%A7a-MIT-3fb970" alt="MIT" />
  <img src="https://img.shields.io/badge/feito%20no-Brasil%20%F0%9F%87%A7%F0%9F%87%B7-009c3b" alt="Feito no Brasil" />
</p>

<p align="center">
  <strong>🔎 <a href="https://henriquezolini.github.io/react-bancos/">Veja todos os ícones ao vivo</a></strong> — busque por nome ou código, ajuste tamanho e raio, e copie o import com um clique.
</p>

---

Todo produto brasileiro que lida com dinheiro esbarra no mesmo problema: mostrar **de qual banco** é aquela conta, chave Pix, boleto ou cartão. Este pacote resolve isso de uma vez — um componente por banco, todos no mesmo padrão visual (quadrado, fundo na cor da marca, logo oficial centralizado com área de respiro consistente), prontos para listas de contas, extratos, seletores de instituição e telas de Pix.

## Instalação

```bash
npm install react-bancos
# ou: pnpm add react-bancos / yarn add react-bancos
```

## Uso

```tsx
import { Nubank, Itau, BancoDoBrasil } from "react-bancos";

<Nubank />                          // 48px, cantos retos
<Itau size={32} radius={8} />       // 32px, cantos arredondados
<BancoDoBrasil size="3rem" title="Conta corrente BB" />
```

Veio só o **código do banco** da sua API? Busque pelo COMPE, nome ou slug e renderize o ícone:

```tsx
import { banks, getBankByCompe, getBankByName } from "react-bancos";

getBankByCompe(260);   // aceita 260, "260" ou "77" (completa os zeros)
getBankByName("itau"); // ignora acentos/caixa → { slug: "itau", name: "Itaú Unibanco", ... }

const banco = banks.find((b) => b.compe === "260");
{banco && <banco.Icon size={24} radius={6} title={banco.name} />}
```

> `getBank(slug | compe)` continua existindo, mas está **deprecated** — prefira as buscas
> específicas acima (que também existem em [`react-bancos/data`](#em-node-apis-e-backends-sem-react), sem React).

Listar todos (ex.: seletor de instituição):

```tsx
import { banks } from "react-bancos";

{banks.map(({ slug, name, Icon }) => (
  <button key={slug}>
    <Icon size={40} radius={10} /> {name}
  </button>
))}
```

### Props

Todos os componentes aceitam qualquer prop de `<svg>` (`className`, `onClick`, …) e mais:

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `size` | `number \| string` | `48` | Largura e altura. Número vira `px`. |
| `radius` | `number \| string` | — | `border-radius` dos cantos (ex.: `8`, `"50%"`). |
| `title` | `string` | nome do banco | Título acessível (`<title>` + `aria-label`). |

### Em Node, APIs e backends (sem React)

Precisa só dos **dados** — lista completa, nome, código COMPE, cor — num backend?
Importe de **`react-bancos/data`**: é um módulo puro, sem React e sem JSX, que funciona
em qualquer ambiente Node (ESM e CommonJS):

```js
import {
  banksData,        // lista completa: { slug, name, compe, color }[]
  getBankByCompe,   // busca pelo código Bacen: getBankByCompe(341) / "341" / "77"
  getBankByName,    // ignora acentos/caixa: "itau" → Itaú Unibanco
  getBankBySlug,    // slug exato: "nubank"
  searchBanks,      // busca livre por nome, slug ou COMPE → array
} from "react-bancos/data";

getBankByCompe(341);           // → { slug: "itau", name: "Itaú Unibanco", compe: "341", color: "#fe6100" }
getBankByName("mercado pago"); // → { slug: "mercadopago", ... }
searchBanks("banco");          // → todas as instituições com "banco" no nome
```

As mesmas funções também são exportadas pelo pacote principal (`react-bancos`),
para quem já está no front. `getBank(slug | compe)` continua existindo, mas está
**deprecated** em favor das buscas específicas.

### SVGs puros

Não usa React? Os arquivos originais vêm no pacote:

```js
import nubankUrl from "react-bancos/icons/nubank.svg";
```

### Via URL (sem instalar nada)

Todo ícone também é servido como SVG estático direto pelo GitHub Pages do projeto,
endereçado pelo `slug` do banco — útil pra apps mobile, e-mails, ou qualquer lugar
que só aceite uma URL de imagem:

```
https://henriquezolini.github.io/react-bancos/icons/<slug>.svg
```

```html
<img src="https://henriquezolini.github.io/react-bancos/icons/nubank.svg" width="48" height="48" />
```

Um índice com os metadados de todas as instituições (slug, nome, COMPE, cor e a URL
de cada ícone) fica em:

```
https://henriquezolini.github.io/react-bancos/api/bancos.json
```

Os slugs válidos são os da coluna **Slug** da tabela abaixo.

## Bancos

Cobertura atual dos principais bancos e fintechs do país — contribuições para os que faltam são muito bem-vindas!

| Banco | Slug | COMPE | Ícone | Componente |
| --- | --- | :-: | :-: | --- |
| Banco do Brasil | `bancodobrasil` | 001 | ✅ | `<BancoDoBrasil />` |
| Bradesco | `bradesco` | 237 | ✅ | `<Bradesco />` |
| Caixa Econômica Federal | `caixa` | 104 | ✅ | `<Caixa />` |
| Itaú Unibanco | `itau` | 341 | ✅ | `<Itau />` |
| Santander | `santander` | 033 | ✅ | `<Santander />` |
| Nubank | `nubank` | 260 | ✅ | `<Nubank />` |
| Banco Inter | `inter` | 077 | ✅ | `<Inter />` |
| C6 Bank | `c6bank` | 336 | ✅ | `<C6Bank />` |
| BTG Pactual | `btgpactual` | 208 | ✅ | `<BTGPactual />` |
| XP | `xp` | 348 | ✅ | `<XP />` |
| Sicoob | `sicoob` | 756 | ✅ | `<Sicoob />` |
| Sicredi | `sicredi` | 748 | ✅ | `<Sicredi />` |
| Banrisul | `banrisul` | 041 | ✅ | `<Banrisul />` |
| Banco Safra | `safra` | 422 | ✅ | `<Safra />` |
| Banco BV | `bv` | 655 | ✅ | `<BV />` |
| Banco Pan | `pan` | 623 | ✅ | `<Pan />` |
| Banco BMG | `bmg` | 318 | ✅ | `<BMG />` |
| Banco Original | `original` | 212 | ✅ | `<Original />` |
| Neon | `neon` | 735 | ✅ | `<Neon />` |
| Cora | `cora` | 403 | ✅ | `<Cora />` |
| Mercado Pago | `mercadopago` | 323 | ✅ | `<MercadoPago />` |
| PicPay | `picpay` | 380 | ✅ | `<PicPay />` |
| PagBank | `pagbank` | 290 | ✅ | `<PagBank />` |
| Stone | `stone` | 197 | ✅ | `<Stone />` |
| Banco Daycoval | `daycoval` | 707 | ✅ | `<Daycoval />` |
| BRB — Banco de Brasília | `brb` | 070 | ✅ | `<BRB />` |
| Banco do Nordeste | `bancodonordeste` | 004 | ✅ | `<BancoDoNordeste />` |
| Banco da Amazônia | `bancodaamazonia` | 003 | ✅ | `<BancoDaAmazonia />` |
| Banestes | `banestes` | 021 | ✅ | `<Banestes />` |
| Banco Mercantil | `mercantil` | 389 | ✅ | `<Mercantil />` |
| Agibank | `agibank` | 121 | ✅ | `<Agibank />` |
| Will Bank | `willbank` | — | ✅ | `<WillBank />` |
| Banco Sofisa | `sofisa` | 637 | ✅ | `<Sofisa />` |
| Banco ABC Brasil | `abcbrasil` | 246 | ✅ | `<ABCBrasil />` |
| Citibank Brasil | `citibank` | 745 | ✅ | `<Citibank />` |
| Banco Arbi | `arbi` | 213 | ✅ | `<Arbi />` |
| Banese | `banese` | 047 | ✅ | `<Banese />` |
| Banco BNP Paribas Brasil | `bnpparibas` | 752 | ✅ | `<BNPParibas />` |
| Banco BS2 | `bs2` | 218 | ✅ | `<BS2 />` |
| Cresol | `cresol` | 133 | ✅ | `<Cresol />` |
| Deutsche Bank Brasil | `deutsche` | 487 | ✅ | `<DeutscheBank />` |
| Digio | `digio` | 335 | ✅ | `<Digio />` |
| Banco Fibra | `fibra` | 224 | ✅ | `<Fibra />` |
| Banco Honda | `honda` | — | ✅ | `<BancoHonda />` |
| Banco Inbursa | `inbursa` | 012 | ✅ | `<Inbursa />` |
| Banco Industrial do Brasil | `industrialdobrasil` | 604 | ✅ | `<IndustrialDoBrasil />` |
| LetsBank | `letsbank` | 630 | ✅ | `<LetsBank />` |
| Banco Mizuho do Brasil | `mizuho` | 370 | ✅ | `<Mizuho />` |
| Banco Morgan Stanley | `morganstanley` | 066 | ✅ | `<MorganStanley />` |
| Banco MUFG Brasil | `mufg` | 456 | ✅ | `<MUFG />` |
| Omni Banco | `omni` | 613 | ✅ | `<Omni />` |
| Banco Paulista | `paulista` | 611 | ✅ | `<Paulista />` |
| Banco Pine | `pine` | 643 | ✅ | `<Pine />` |
| Banco Rendimento | `rendimento` | 633 | ✅ | `<Rendimento />` |
| Banco Société Générale Brasil | `socgen` | 366 | ✅ | `<SocieteGenerale />` |
| Banco Stellantis | `stellantis` | — | ✅ | `<BancoStellantis />` |
| Banco Sumitomo Mitsui Brasileiro | `sumitomo` | 464 | ✅ | `<SumitomoMitsui />` |
| Banco Topázio | `topazio` | 082 | ✅ | `<Topazio />` |
| Banco Toyota | `toyota` | 387 | ✅ | `<BancoToyota />` |
| Unicred | `unicred` | 136 | ✅ | `<Unicred />` |
| Banco Volkswagen | `volkswagen` | 393 | ✅ | `<BancoVolkswagen />` |
| Efí Bank | `efibank` | 364 | ✅ | `<EfiBank />` |
| Stark Bank | `starkbank` | — | ✅ | `<StarkBank />` |
| Zro Bank | `zrobank` | — | ✅ | `<ZroBank />` |
| Revolut | `revolut` | — | ✅ | `<Revolut />` |
| Next | `next` | — | ✅ | `<Next />` |
| Banco Digimais | `digimais` | 654 | ✅ | `<Digimais />` |
| Banco Rabobank | `rabobank` | 747 | ✅ | `<Rabobank />` |
| Banco Ourinvest | `ourinvest` | 712 | ✅ | `<Ourinvest />` |
| PayPal | `paypal` | — | ✅ | `<PayPal />` |
| Wise | `wise` | — | ✅ | `<Wise />` |
| Skrill | `skrill` | — | ✅ | `<Skrill />` |
| RecargaPay | `recargapay` | — | ✅ | `<RecargaPay />` |
| NG.CASH | `ngcash` | — | ✅ | `<NGCash />` |
| Asaas | `asaas` | 461 | ✅ | `<Asaas />` |
| Celcoin | `celcoin` | 509 | ✅ | `<Celcoin />` |
| QI Tech | `qitech` | 329 | ✅ | `<QITech />` |
| Bankly | `bankly` | 332 | ✅ | `<Bankly />` |
| iugu | `iugu` | 401 | ✅ | `<Iugu />` |
| CloudWalk | `cloudwalk` | 542 | ✅ | `<CloudWalk />` |
| InfinitePay | `infinitepay` | — | ✅ | `<InfinitePay />` |
| Pagar.me | `pagarme` | — | ✅ | `<PagarMe />` |
| Creditas | `creditas` | 342 | ✅ | `<Creditas />` |
| Warren Investimentos | `warren` | 371 | ✅ | `<Warren />` |
| Toro Investimentos | `toro` | 352 | ✅ | `<Toro />` |
| Pluggy | `pluggy` | — | ✅ | `<Pluggy />` |
| Klavi | `klavi` | — | ✅ | `<Klavi />` |
| Ailos | `ailos` | 085 | ✅ | `<Ailos />` |
| Almah Conta | `almah` | — | ✅ | `<Almah />` |
| ARTTA | `artta` | — | ✅ | `<Artta />` |
| Avenue | `avenue` | — | ✅ | `<Avenue />` |
| Bank of America Merrill Lynch | `bankofamerica` | 755 | ✅ | `<BankOfAmerica />` |
| Banpará | `banpara` | 037 | ✅ | `<Banpara />` |
| BEES Bank | `beesbank` | — | ✅ | `<BeesBank />` |
| BK Bank | `bkbank` | — | ✅ | `<BKBank />` |
| BMP Money Plus | `bmp` | 274 | ✅ | `<BMP />` |
| Capitual | `capitual` | — | ✅ | `<Capitual />` |
| Conta Simples | `contasimples` | — | ✅ | `<ContaSimples />` |
| Contbank | `contbank` | — | ✅ | `<Contbank />` |
| CrediSIS | `credisis` | 097 | ✅ | `<CrediSIS />` |
| Dock | `dock` | — | ✅ | `<Dock />` |
| Grafeno | `grafeno` | — | ✅ | `<Grafeno />` |
| iFood Pago | `ifoodpago` | — | ✅ | `<IfoodPago />` |
| Linker | `linker` | — | ✅ | `<Linker />` |
| MagaluPay | `magalupay` | 396 | ✅ | `<MagaluPay />` |
| Modobank | `modobank` | — | ✅ | `<Modobank />` |
| Múltiplo Bank | `multiplobank` | — | ✅ | `<MultiploBank />` |
| Nomad | `nomad` | — | ✅ | `<Nomad />` |
| Omie.Cash | `omiecash` | — | ✅ | `<OmieCash />` |
| OrionPay | `orionpay` | — | ✅ | `<OrionPay />` |
| PayCash | `paycash` | — | ✅ | `<PayCash />` |
| PinBank | `pinbank` | — | ✅ | `<PinBank />` |
| Quality Digital Bank | `qualitybank` | — | ✅ | `<QualityDigitalBank />` |
| Rico | `rico` | — | ✅ | `<Rico />` |
| Sisprime do Brasil | `sisprime` | 084 | ✅ | `<Sisprime />` |
| Squid | `squid` | — | ✅ | `<Squid />` |
| Stripe | `stripe` | — | ✅ | `<Stripe />` |
| Sulcredi | `sulcredi` | — | ✅ | `<Sulcredi />` |
| Ton | `ton` | — | ✅ | `<Ton />` |
| Transfeera | `transfeera` | — | ✅ | `<Transfeera />` |
| Tribanco | `tribanco` | 634 | ✅ | `<Tribanco />` |
| Uniprime | `uniprime` | 099 | ✅ | `<Uniprime />` |
| UzziPay | `uzzipay` | — | ✅ | `<UzziPay />` |
| Zemo Bank | `zemobank` | — | ✅ | `<ZemoBank />` |
| Banco Master | — | 243 | 🔜 | — |
| Contabilizei Bank | — | — | 🔜 | — |
| 99Pay | — | — | 🔜 | — |
| AstroPay | — | — | 🔜 | — |
| Ame Digital | — | — | 🔜 | — |
| Superdigital | — | — | 🔜 | — |
| Banco Modal | — | 746 | 🔜 | — |
| Banco Alfa | — | 025 | 🔜 | — |
| Crefisa | — | 069 | 🔜 | — |
| Banco Fator | — | 265 | 🔜 | — |
| Banco BOCOM BBM | — | 107 | 🔜 | — |
| Banco Carrefour | — | 368 | 🔜 | — |
| Banco GM | — | 390 | 🔜 | — |
| Banco Mercedes-Benz | — | 381 | 🔜 | — |
| Banco John Deere | — | — | 🔜 | — |
| Banco CNH Industrial | — | — | 🔜 | — |
| Banco J. Safra | — | 074 | 🔜 | — |
| Banco Crédit Agricole Brasil | — | 222 | 🔜 | — |
| Banco KEB Hana do Brasil | — | 757 | 🔜 | — |
| Banco Genial | — | 125 | 🔜 | — |
| Banco Andbank | — | 065 | 🔜 | — |
| Banco Bari | — | — | 🔜 | — |
| Banco Voiter | — | 653 | 🔜 | — |
| Banco Tricury | — | 018 | 🔜 | — |
| Banco Guanabara | — | 612 | 🔜 | — |
| Banco Luso Brasileiro | — | 600 | 🔜 | — |
| Banco Semear | — | 743 | 🔜 | — |
| Banco CCB Brasil | — | 320 | 🔜 | — |
| Banco Bexs | — | — | 🔜 | — |
| Travelex Bank | — | 095 | 🔜 | — |
| Banco Ribeirão Preto | — | 741 | 🔜 | — |
| BDMG | — | — | 🔜 | — |
| BRDE | — | — | 🔜 | — |
| Banco BNI | — | — | 🔜 | — |

Sentiu falta de um banco? [Abra uma issue](../../issues) ou envie um PR — o processo de criação está documentado em [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Exemplos ao vivo

**[henriquezolini.github.io/react-bancos](https://henriquezolini.github.io/react-bancos/)** — playground com busca por nome/código, controles de tamanho e raio, e cópia do import com um clique. (Fonte em [`docs/index.html`](docs/index.html).)

Para regenerar a página: `npm run docs`.

## Padrão visual

Todos os ícones seguem o mesmo padrão, o que faz listas e grades ficarem visualmente uniformes:

- Canvas quadrado (`viewBox` 100×100), fundo chapado na **cor primária oficial** da marca;
- **Símbolo** oficial do banco centralizado — logo completa somente quando o banco não tem símbolo próprio;
- Área de respiro padronizada (símbolos ocupam 58/100 do canvas; logos completas, 80/100 de largura);
- Vetores extraídos de fontes oficiais, nunca redesenhados à mão.

## Contribuindo

```bash
npm install
npm run generate   # regenera os componentes a partir de icons/*.svg
npm run docs       # regenera docs/index.html
npm test           # build + smoke test (SSR de todos os ícones)
```

O guia completo para criar um novo ícone fiel à marca está em [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Autor

<table>
  <tr>
    <td><a href="https://henriquezolini.com/"><img src="https://github.com/henriquezolini.png?size=96" width="72" height="72" alt="Henrique Zolini" style="border-radius: 50%" /></a></td>
    <td>
      Feito por <strong><a href="https://henriquezolini.com/">Henrique Zolini</a></strong><br/>
      <a href="https://github.com/henriquezolini">@henriquezolini</a> · <a href="https://henriquezolini.com/">henriquezolini.com</a>
    </td>
  </tr>
</table>

## Aviso legal

Os logos e nomes são **marcas registradas de seus respectivos titulares**, incluídos aqui exclusivamente para fins de identificação das instituições. Este projeto não é afiliado, endossado ou patrocinado por nenhum dos bancos listados. O código do pacote é [MIT](LICENSE).
