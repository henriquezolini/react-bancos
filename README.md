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

Veio só o **código do banco** da sua API? Use `getBank`:

```tsx
import { getBank } from "react-bancos";

const banco = getBank("260"); // ou getBank(260), ou getBank("nubank")
// → { slug: "nubank", name: "Nubank", compe: "260", color: "#820ad1", Icon: [Componente] }

{banco && <banco.Icon size={24} radius={6} title={banco.name} />}
```

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

### SVGs puros

Não usa React? Os arquivos originais vêm no pacote:

```js
import nubankUrl from "react-bancos/icons/nubank.svg";
```

## Bancos

Cobertura atual dos principais bancos e fintechs do país — contribuições para os que faltam são muito bem-vindas!

| Banco | COMPE | Ícone | Componente |
| --- | :-: | :-: | --- |
| Banco do Brasil | 001 | ✅ | `<BancoDoBrasil />` |
| Bradesco | 237 | ✅ | `<Bradesco />` |
| Caixa Econômica Federal | 104 | ✅ | `<Caixa />` |
| Itaú Unibanco | 341 | ✅ | `<Itau />` |
| Santander | 033 | ✅ | `<Santander />` |
| Nubank | 260 | ✅ | `<Nubank />` |
| Banco Inter | 077 | ✅ | `<Inter />` |
| C6 Bank | 336 | ✅ | `<C6Bank />` |
| BTG Pactual | 208 | ✅ | `<BTGPactual />` |
| XP | 348 | ✅ | `<XP />` |
| Sicoob | 756 | ✅ | `<Sicoob />` |
| Sicredi | 748 | ✅ | `<Sicredi />` |
| Banrisul | 041 | ✅ | `<Banrisul />` |
| Banco Safra | 422 | ✅ | `<Safra />` |
| Banco BV | 655 | ✅ | `<BV />` |
| Banco Pan | 623 | ✅ | `<Pan />` |
| Banco BMG | 318 | ✅ | `<BMG />` |
| Banco Original | 212 | ✅ | `<Original />` |
| Neon | 735 | ✅ | `<Neon />` |
| Cora | 403 | ✅ | `<Cora />` |
| Mercado Pago | 323 | ✅ | `<MercadoPago />` |
| PicPay | 380 | ✅ | `<PicPay />` |
| PagBank | 290 | ✅ | `<PagBank />` |
| Stone | 197 | ✅ | `<Stone />` |
| Banco Daycoval | 707 | ✅ | `<Daycoval />` |
| BRB — Banco de Brasília | 070 | ✅ | `<BRB />` |
| Banco do Nordeste | 004 | ✅ | `<BancoDoNordeste />` |
| Banco da Amazônia | 003 | ✅ | `<BancoDaAmazonia />` |
| Banestes | 021 | ✅ | `<Banestes />` |
| Banco Mercantil | 389 | ✅ | `<Mercantil />` |
| Agibank | 121 | ✅ | `<Agibank />` |
| Will Bank | — | ✅ | `<WillBank />` |
| Banco Sofisa | 637 | ✅ | `<Sofisa />` |
| Banco ABC Brasil | 246 | ✅ | `<ABCBrasil />` |
| Citibank Brasil | 745 | ✅ | `<Citibank />` |
| Banco Master | 243 | 🔜 | — |

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

## Aviso legal

Os logos e nomes são **marcas registradas de seus respectivos titulares**, incluídos aqui exclusivamente para fins de identificação das instituições. Este projeto não é afiliado, endossado ou patrocinado por nenhum dos bancos listados. O código do pacote é [MIT](LICENSE).
