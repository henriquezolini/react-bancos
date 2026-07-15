# Contribuindo com o react-bancos

Obrigado pelo interesse! A contribuição mais valiosa é **adicionar um banco que falta** (veja a tabela no README).

## Regras de ouro dos ícones

1. **Fidelidade é requisito.** Nunca desenhe um logo "de memória" ou estilizado — sempre parta de um vetor oficial (Wikimedia Commons, simple-icons, material de imprensa do banco).
2. **Símbolo antes de logo completa.** Use apenas o símbolo/ícone do banco quando ele existir; a logo completa (wordmark) só entra se o banco não tiver símbolo próprio.
3. **Padrão do canvas**: SVG quadrado `viewBox="0 0 100.03096 100.03096"`, um `<rect>` de fundo na cor primária oficial da marca, marca centralizada.
4. **Área de respiro**: símbolos com a maior dimensão = **58** unidades; logos completas com largura = **80** unidades.

## Passo a passo para adicionar um banco

1. Encontre o vetor oficial do logo e salve em `tools/sources/<slug>_src.svg`:
   - Wikimedia Commons: busque na [API de busca](https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srsearch=NOME+logo+svg) e baixe via `https://commons.wikimedia.org/wiki/Special:FilePath/<arquivo>`;
   - [simple-icons](https://github.com/simple-icons/simple-icons/tree/develop/icons) para símbolos monocromáticos.
2. Adicione um bloco em `tools/compose.py` (recoloração, filtro de subpaths se precisar isolar o símbolo, escala/centralização automática por bounding box) e rode:
   ```bash
   pip install --user svgpathtools
   python3 tools/compose.py        # gera icons/<slug>.svg
   ```
3. Registre o banco em `scripts/banks-data.mjs` (slug, nome do componente, nome completo, código COMPE).
4. Regenere e valide:
   ```bash
   npm run generate && npm run docs && npm test
   ```
5. Confira o resultado abrindo `docs/index.html` no navegador — o ícone precisa ter o mesmo respiro visual dos vizinhos.
6. Atualize a tabela do `README.md` (🔜 → ✅) e abra o PR com uma captura da grade.

Detalhes finos do processo (fontes de vetores, armadilhas de parsing de SVG, etc.) estão documentados em [`CLAUDE.md`](CLAUDE.md) — o repositório é preparado para que o [Claude Code](https://claude.com/claude-code) siga esse mesmo processo automaticamente.

## Estrutura do repositório

```
icons/          SVGs finais (fonte da verdade da lib)
src/            componentes React (gerados — não edite src/icons/ à mão)
scripts/        geradores: build-icons.mjs, build-docs.mjs, smoke-test.mjs
tools/          pipeline de criação de ícones (compose.py + vetores fonte)
docs/           showcase interativo (GitHub Pages)
assets/         materiais que não fazem parte do pacote
```
