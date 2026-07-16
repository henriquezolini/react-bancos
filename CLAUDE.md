# react-bancos — ícones de bancos brasileiros para React

Lib npm (`react-bancos`) de ícones SVG padronizados dos principais bancos e fintechs do Brasil,
distribuídos como componentes React tipados com metadados (nome, código COMPE, cor).

## Estrutura do repositório

```
icons/<slug>.svg     SVGs finais — fonte da verdade (slug minúsculo, sem espaços/acentos)
src/createBankIcon.tsx  fábrica dos componentes (única parte de src/ editada à mão)
src/icons/*.tsx      componentes GERADOS — nunca editar manualmente
src/data.ts          GERADO: dados puros sem React (banksData, getBankByCompe/Name/Slug,
                     searchBanks) — publicado como subpath "react-bancos/data" p/ Node/APIs
src/banks.ts         GERADO: banks[] (dados + componente Icon) e getBank (deprecated)
scripts/banks-data.mjs  registro de bancos: slug, componente, nome, COMPE, override de cor
scripts/build-icons.mjs gera src/ a partir de icons/ (sanitização anti-colisão)
scripts/build-docs.mjs  gera docs/index.html (showcase interativo, ícones inline)
scripts/smoke-test.mjs  SSR de todos os ícones + validação de metadados/colisões
tools/compose.py     pipeline python que CRIA icons/<slug>.svg a partir de vetores oficiais
tools/sources/       vetores oficiais baixados (<slug>_src.svg)
docs/index.html      showcase (GitHub Pages); docs/.fragment.html = versão p/ Artifact
assets/              materiais fora do pacote (ex.: logo-bancos.svg, folha antiga)
```

## Comandos

```bash
npm run generate   # icons/*.svg -> src/ (rodar após qualquer mudança em icons/ ou banks-data)
npm run docs       # regenera docs/index.html
npm test           # build (tsup) + smoke test SSR — precisa passar antes de commit/publish
python3 tools/compose.py   # regenera os icons/*.svg criados a partir de tools/sources/
```

## Padrão visual de cada ícone

1. **Canvas**: SVG quadrado com `viewBox="0 0 100.03096 100.03096"`.
2. **Fundo**: um `<rect>` cobrindo todo o canvas na cor primária oficial da marca.
3. **Marca**: vetor **oficial** do logo, centralizado, normalmente recolorido para branco.
   Manter as cores originais quando o símbolo é multicolorido e funciona sobre o fundo
   (ex.: `sicoob`, `mercadopago`).
4. **Prioridade: símbolo > logo completa.** Usar apenas o símbolo/ícone do banco quando existir
   (globo do BTG, cata-vento do Sicredi). Logo completa (wordmark) somente se o banco não tiver
   símbolo próprio ou o ícone oficial do app for o wordmark (PicPay, Stone, XP).
5. **Área de respiro (padronizada)**:
   - Símbolo: maior dimensão do bounding box = **58** unidades (~21 de margem por lado).
   - Logo completa/wordmark: largura = **80** unidades (10 de margem lateral), centralizada.

## Processo para adicionar um banco novo

**Nunca desenhar o logo "de memória" ou estilizado — fidelidade ao logo original é requisito**
(feedback explícito do dono do projeto). Sempre partir de um vetor oficial:

1. **Encontrar o vetor oficial** (nesta ordem):
   - Wikimedia Commons: buscar via API
     `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srsearch=<banco>+logo+svg`
     e baixar via `https://commons.wikimedia.org/wiki/Special:FilePath/<Nome do arquivo>`.
   - simple-icons: `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/<slug>.svg`.
   - **Wikipédia PT** (arquivos locais que NÃO estão no Commons): buscar em
     `https://pt.wikipedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srsearch=<banco>+logo`
     e baixar via `https://pt.wikipedia.org/wiki/Special:FilePath/<arquivo>` — achou Next, Modal,
     Digimais e Rabobank quando o Commons não tinha.
   - Coleções no GitHub (com `gh` autenticado: `gh api "search/code?q=<banco>+extension:svg"`);
     a coleção `Tgentil/Bancos-em-SVG` cobre muitos bancos brasileiros.
   - O próprio site do banco (`curl -A "Mozilla/5.0" <site> | grep -oE '"[^"]*\.svg[^"]*"'`) —
     foi assim que saiu o `will.svg` oficial; a cor da marca costuma estar no CSS do site.
   - iconape.com (achar a URL do asset no HTML da página do logo; a busca `?s=` não funciona).
   - Obs.: worldvectorlogo/brandfetch CDN são inacessíveis no sandbox (proxy retorna 502).
   - **Se não houver vetor confiável, o banco fica de fora** (ex.: Banco Master) — nunca desenhar à mão.
2. **Salvar** em `tools/sources/<slug>_src.svg` e **adicionar um bloco** em `tools/compose.py`
   (requer `pip install --user svgpathtools`), depois rodar `python3 tools/compose.py`.
3. **Registrar** o banco em `scripts/banks-data.mjs` (slug, component PascalCase, nome, COMPE).
4. `npm run generate && npm run docs && npm test`.
5. **Verificar visualmente** (respiro igual aos vizinhos): abrir `docs/index.html`, ou
   `convert -density 96 icons/<slug>.svg -resize 180x180 /tmp/x.png` + montage com os demais.
6. Atualizar a tabela do `README.md` (🔜 → ✅).

## Armadilhas conhecidas

- **Flags de arco compactadas** (`a4.827 4.827 0 004.835-4.835`, comum no simple-icons) quebram
  `svgpathtools` e ImageMagick → expandir para `0 0 0 4.835,-4.835` (o `compose.py` já faz no PagBank).
- **Fontes com `transform` em grupos ou formas que não são `<path>`** (rect/circle/polygon):
  `get_paths` ignora ambos — usar `get_flat_paths` (via `pip install svgelements`), que achata
  transforms, converte formas em paths e resolve o fill herdado (usado em brb, daycoval,
  citibank, banestes).
- Ao extrair `d` de um `<path>` por regex, usar `\sd="…"` — senão casa com `id="…"`/`data-name="…"`.
- Os SVGs antigos (Inkscape) têm `<style>` globais com classes `.st0`/ids `#SVGID_n_` que colidem
  entre arquivos. `scripts/svg-utils.mjs` resolve prefixando tudo com o slug — por isso os
  componentes React e a docs podem renderizar todos inline. Nunca inline os SVGs crus juntos.
- Vários arquivos antigos têm **rects sobrepostos** (sobras da folha do Inkscape); a cor de fundo
  auto-detectada pode errar → declarar `color` explicitamente em `scripts/banks-data.mjs`
  (já feito para `bmg` e `c6bank`).
- O ImageMagick (MSVG) não renderiza alguns SVGs antigos (`bradesco`, `santander`) — limitação do
  preview local, não defeito dos arquivos.

## Publicação e docs

- `npm publish` roda `prepublishOnly` (build + smoke test). O pacote leva `dist/` + `icons/`.
- A docs é auto-contida (sem dependências externas); publicar via GitHub Pages apontando p/ `/docs`.
- Ícone novo = atualizar também o showcase (`npm run docs`).
