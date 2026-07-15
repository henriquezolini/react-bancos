#!/usr/bin/env python3
"""Compõe ícones 100x100 do padrão do projeto a partir de SVGs oficiais baixados."""
import re
from pathlib import Path
from svgpathtools import parse_path

SRC = Path(__file__).parent / "sources"
OUT = Path(__file__).resolve().parents[1] / "icons"
VB = 100.03096

def get_paths(fname):
    """Lista de dicts {d, fill, class} na ordem do documento."""
    text = (SRC / fname).read_text()
    out = []
    for m in re.finditer(r"<path[^>]*>", text):
        tag = m.group()
        d = re.search(r'\sd="([^"]+)"', tag).group(1)
        fill = re.search(r'fill="([^"]+)"', tag)
        cls = re.search(r'class="([^"]+)"', tag)
        out.append({"d": d, "fill": fill.group(1) if fill else None,
                    "cls": cls.group(1) if cls else None})
    return out

def bbox(paths):
    x0 = y0 = float("inf"); x1 = y1 = float("-inf")
    for p in paths:
        a, b, c, d = parse_path(p["d"]).bbox()  # xmin xmax ymin ymax
        x0, x1, y0, y1 = min(x0, a), max(x1, b), min(y0, c), max(y1, d)
    return x0, y0, x1 - x0, y1 - y0

def get_flat_paths(fname):
    """Extrai TODOS os desenhos (paths, rects, círculos…) com transforms aplicados
    e fill resolvido (herdado de grupos/CSS), via svgelements. Retorna a mesma
    estrutura de get_paths: [{d, fill, cls}]. Use quando o SVG fonte tem
    transforms em grupos ou formas que não são <path>."""
    from svgelements import SVG, Path as SEPath, Shape
    out = []
    for el in SVG.parse(str(SRC / fname), reify=True).elements():
        if isinstance(el, Shape) and not isinstance(el, SEPath):
            el = SEPath(el)
        if isinstance(el, SEPath) and len(el):
            fill = el.fill.hexrgb if el.fill is not None and el.fill.value is not None else None
            out.append({"d": el.d(), "fill": fill, "cls": None})
    return out

def filter_subpaths(d, keep):
    """Mantém apenas os subpaths cujo bbox (xmin,xmax,ymin,ymax) passa no filtro."""
    subs = parse_path(d).continuous_subpaths()
    return " ".join(s.d() for s in subs if keep(s.bbox()))

def group(paths, fills, cx, cy, w=None, h=None, fit=None, extra="", box=None):
    """Gera <g> com os paths escalados/centralizados. fills: lista ou None p/ manter.
    w/h: fixa largura/altura; fit: maior dimensão do bbox = fit."""
    bx, by, bw, bh = box if box else bbox(paths)
    if fit:
        w, h = (fit, None) if bw >= bh else (None, fit)
    s = (w / bw) if w else (h / bh)
    tx, ty = cx - s * (bx + bw / 2), cy - s * (by + bh / 2)
    inner = ""
    for i, p in enumerate(paths):
        fill = fills[i] if fills else p["fill"]
        fr = ' fill-rule="evenodd"' if "evenodd" in (extra or "") else ""
        inner += f'\n    <path d="{p["d"]}" style="fill:{fill}"{fr} />'
    print(f"   grupo: bbox=({bx:.1f},{by:.1f} {bw:.1f}x{bh:.1f}) escala={s:.4f} -> {s*bw:.1f}x{s*bh:.1f}")
    return f'  <g transform="translate({tx:.4f},{ty:.4f}) scale({s:.5f})">{inner}\n  </g>'

def write_icon(name, bg, groups):
    body = "\n".join(groups)
    svg = f'''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="26.466524mm"
   height="26.466524mm"
   viewBox="0 0 {VB} {VB}"
   version="1.1"
   id="svg1"
   xmlns="http://www.w3.org/2000/svg">
  <rect
     style="fill:{bg};fill-opacity:1"
     id="rect1"
     width="{VB}"
     height="{VB}"
     x="0"
     y="0" />
{body}
</svg>
'''
    (OUT / f"{name}.svg").write_text(svg)
    print(f"-> {name}.svg (bg {bg})")

C = VB / 2
FIT_SIMBOLO = 58    # símbolo: maior dimensão = 58 (respiro ~21 por lado)
LARG_LOGO = 80      # logo completa (fallback): largura = 80 (respiro 10 lateral)

# BTG Pactual: só o símbolo (globo com "btg" dentro), branco sobre azul oficial.
# O SVG fonte é um path único; descarta os subpaths do "pactual" (xmin > 165).
print("btgpactual"); p = get_paths("btg_src.svg")
p[0]["d"] = filter_subpaths(p[0]["d"], lambda bb: bb[0] < 165)
write_icon("btgpactual", "#001e61", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# PicPay: não tem símbolo separado (ícone oficial é o wordmark) -> logo completa
print("picpay"); p = get_paths("picpay_src.svg")
write_icon("picpay", "#11c76f", [group(p, ["#ffffff"], C, C, w=LARG_LOGO)])

# Sicredi: só o símbolo (cata-vento, paths 0,1) branco sobre verde Sicredi
print("sicredi"); p = get_paths("sicredi_src.svg")
write_icon("sicredi", "#3fa110", [group(p[0:2], ["#ffffff", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Sicoob: só o símbolo (triângulos tricolores) sobre verde-escuro oficial
print("sicoob"); p = get_paths("sicoob_src.svg")
write_icon("sicoob", "#003641", [group(p[1:4], None, C, C, fit=FIT_SIMBOLO)])

# XP: tile oficial do app (xp_tile_src, fornecido pelo dono) com o "xp" vazado
# no canto inferior direito — a posição faz parte do ícone. Os 4 cantos
# arredondados do tile viram retos (substituição dos arcos por linhas), e o
# tile é ancorado no canto inferior-direito do canvas; como ele é mais largo
# que alto, o rect preto de fundo completa a faixa do topo. As letras aparecem
# via um rect branco desenhado sob o tile (os vazados revelam o branco).
print("xp")
_raw = (SRC / "xp_tile_src.svg").read_text()
_d = re.search(r'\sd="([^"]+)"', _raw).group(1)
for _old, _new in [
    ("V3.89641C30.0276 1.49309 28.7845 0.25 26.3812 0.25H", "V0.25H"),          # canto sup. dir.
    ("H3.64641C1.24309 0.25 0 1.49309 0 3.89641V", "H0V"),                      # canto sup. esq.
    ("V23.703C0 26.0787 1.24309 27.3218 3.64641 27.3218Z", "V27.3218Z"),        # canto inf. esq.
    ("H26.3812C28.7845 27.3218 30.0276 26.0787 30.0276 23.6754V", "H30.0276V"), # canto inf. dir.
]:
    assert _old in _d, _old[:30]
    _d = _d.replace(_old, _new)
_s = VB / 30.0276
_topo = VB - _s * 27.0718           # início do tile no canvas (faixa preta acima)
_ty = _topo - _s * 0.25
write_icon("xp", "#000000", [
    f'  <rect style="fill:#ffffff" x="0.05" y="{_topo + 0.03:.4f}" width="{VB - 0.1:.4f}" height="{_s * 27.0718 - 0.08:.4f}" />',
    f'  <g transform="translate(0,{_ty:.4f}) scale({_s:.5f})">\n    <path d="{_d}" style="fill:#000000" />\n  </g>',
])

# PagBank: símbolo PagSeguro/PagBank (simple-icons) branco sobre verde PagBank
# (flags de arco compactadas tipo "0 004.835" são expandidas p/ compatibilidade)
print("pagbank"); p = get_paths("pagseguro_src.svg")
p[0]["d"] = re.sub(r"(?<=[\d\s])0 ([01])([01])", r"0 \1 \2 ", p[0]["d"])
write_icon("pagbank", "#1bb99a", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, box=(0, 0, 24, 24))])

# Stone: não tem símbolo separado reconhecível -> logo completa branca
print("stone"); p = get_paths("stone_src.svg")
write_icon("stone", "#0db14b", [group(p, ["#ffffff"] * len(p), C, C, w=LARG_LOGO,
                                      extra="evenodd", box=(0, 0, 119.94, 44.85))])

# Mercado Pago: só o símbolo oficial (oval + aperto de mãos), cores originais
print("mercadopago"); p = get_paths("mercadopago_src.svg")
CLS = {"cls-1": "#0a0080", "cls-2": "#ffffff", "cls-3": "#00bcff"}
sym = p[0:5]
fills = [CLS.get(q["cls"], "#0a0080") for q in sym]
write_icon("mercadopago", "#00bcff", [group(sym, fills, C, C, fit=FIT_SIMBOLO)])

# ABC Brasil: lockup compacto oficial (não há símbolo separado) branco sobre o escuro do arquivo
print("abcbrasil"); p = get_paths("abcbrasil_src.svg")
write_icon("abcbrasil", "#1e1e1e", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Agibank: marca reduzida oficial "agi" branca, mantendo o ponto verde
print("agibank"); p = get_paths("agibank_src.svg")
write_icon("agibank", "#266bff",
           [group(p, ["#2fc750", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Banco da Amazônia (2025): só o símbolo verde-claro sobre o verde-escuro oficial
print("bancodaamazonia"); p = get_paths("bancodaamazonia_src.svg")
sym = [q for q in p if q["fill"] == "#00e12d"]
write_icon("bancodaamazonia", "#003c2d", [group(sym, None, C, C, fit=FIT_SIMBOLO)])

# Banco do Nordeste: só o símbolo (flor), vinho recolorido p/ branco, laranja mantido
print("bancodonordeste"); p = get_paths("bancodonordeste_src.svg")
write_icon("bancodonordeste", "#a6193c",
           [group(p[0:2], ["#f68b1f", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Banestes: só o símbolo (laço "B"); o path único traz símbolo+texto -> filtra subpaths
print("banestes"); p = get_flat_paths("banestes_src.svg")
p[0]["d"] = filter_subpaths(p[0]["d"], lambda bb: bb[0] < 120)
write_icon("banestes", "#004b8d", [group(p[0:1], ["#ffffff"], C, C, fit=FIT_SIMBOLO)])

# BRB: símbolo duotônico (vela + onda); parte navy vira branca sobre o navy oficial
print("brb"); p = get_flat_paths("brb_full_src.svg")
write_icon("brb", "#173e7d", [group(p, ["#00adef", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Citi: wordmark "citi" branco com o arco vermelho oficial sobre o azul Citi
print("citibank"); p = get_flat_paths("citibank_src.svg")
write_icon("citibank", "#255be3",
           [group(p, ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ff3c28"], C, C, w=LARG_LOGO)])

# Daycoval: símbolo do app ("D" + quadrados) nas cores originais sobre o navy oficial
print("daycoval"); p = get_flat_paths("daycoval_src.svg")
write_icon("daycoval", "#001c55", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# Mercantil: wordmark novo (não há símbolo separado no vetor) branco sobre o azul oficial
print("mercantil"); p = get_paths("mercantil_src.svg")
write_icon("mercantil", "#1526ff", [group(p, ["#ffffff"], C, C, w=LARG_LOGO)])

# Sofisa: wordmark oficial, teal recolorido p/ branco mantendo o "Banco" amarelo
print("sofisa"); p = get_paths("sofisa_src.svg")
write_icon("sofisa", "#17b497", [group(p, ["#fab327", "#ffffff"], C, C, w=LARG_LOGO)])

# Will Bank: wordmark "will" preto sobre o amarelo oficial do site (#ffd900);
# descarta a bola (path 0) — o ícone do app é só o "will"
print("willbank"); p = get_paths("willbank_src.svg")
write_icon("willbank", "#ffd900", [group(p[1:5], ["#000000"] * 4, C, C, w=LARG_LOGO)])

# ---------------------------------------------------------------------------
# Lote 2 (2026-07-15): bancos da lista extensa. Fontes: Tgentil/Bancos-em-SVG
# e Wikimedia Commons. bbox de cada shape confere no histórico do projeto.
# ---------------------------------------------------------------------------
def _bb(q):
    return parse_path(q["d"]).bbox()  # (xmin, xmax, ymin, ymax)

# Pine: símbolo (pinheiros) branco sobre o vinho oficial
print("pine"); p = get_flat_paths("pine_src.svg")
write_icon("pine", "#661739", [group(p[0:1], ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Topázio: os dois triângulos brancos sobre o teal oficial
print("topazio"); p = get_flat_paths("topazio_src.svg")
write_icon("topazio", "#50c3c7", [group(p, ["#ffffff", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Rendimento: monograma "R/" branco sobre o azul-marinho oficial
print("rendimento"); p = get_flat_paths("rendimento_src.svg")
write_icon("rendimento", "#0a1d6f", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Paulista: monograma "S" nas cores originais sobre branco
print("paulista"); p = get_flat_paths("paulista_src.svg")
write_icon("paulista", "#ffffff", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# Arbi: símbolo circular nas cores originais sobre branco
print("arbi"); p = get_flat_paths("arbi_src.svg")
write_icon("arbi", "#ffffff", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# BS2: wordmark branco sobre o azul oficial
print("bs2"); p = get_flat_paths("bs2_src.svg")
write_icon("bs2", "#3333cc", [group(p, ["#ffffff"] * 3, C, C, w=LARG_LOGO)])

# Industrial do Brasil: "BIB" branco sobre o azul da variante BIB-logo-azul
print("industrialdobrasil"); p = get_flat_paths("industrialdobrasil_src.svg")
write_icon("industrialdobrasil", "#001d5d", [group(p, ["#ffffff"], C, C, w=LARG_LOGO, extra="evenodd")])

# Banese: a marca oficial É o quadrado verde com a onda vazada -> reproduz o
# tile em sangria total (o rect de fundo faz o papel do quadrado), onda branca
print("banese"); p = get_flat_paths("banese_src.svg")
p[0]["d"] = filter_subpaths(p[0]["d"], lambda bb: (bb[3] - bb[2]) < 3000)
write_icon("banese", "#00622a", [group(p, ["#ffffff"], C, C, w=VB, box=(0, 2, 3336, 3336))])

# Cresol: marca verde oficial sobre o laranja oficial (tile descartado)
print("cresol"); p = get_flat_paths("cresol_src.svg")
write_icon("cresol", "#ef8124", [group(p[1:2], None, C, C, fit=FIT_SIMBOLO)])

# Unicred: marca dourada sobre o verde oficial (cores do arquivo "verde.svg")
print("unicred"); p = get_flat_paths("unicred_src.svg")
write_icon("unicred", "#004a35", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# LetsBank: blocos neon originais sobre preto
print("letsbank"); p = get_flat_paths("letsbank_src.svg")
write_icon("letsbank", "#0d0d0d", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# MUFG: símbolo branco sobre o vermelho oficial
print("mufg"); p = get_flat_paths("mufg_src.svg")
write_icon("mufg", "#e30613", [group(p, ["#ffffff", "#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Omni: oval em laranja chapado (a fonte usa gradiente laranja) + "omni" azul, sobre branco
print("omni"); p = get_flat_paths("omni_src.svg")
fills = ["#f47920", "#f47920"] + [q["fill"] for q in p[2:]]
write_icon("omni", "#ffffff", [group(p, fills, C, C, w=LARG_LOGO)])

# BNP Paribas: estrelas/curva brancas sobre o verde oficial (tile e sombras fora)
print("bnpparibas"); p = get_flat_paths("bnpparibas_src.svg")
write_icon("bnpparibas", "#00915a", [group(p[6:10], None, C, C, fit=FIT_SIMBOLO)])

# Fibra: lockup "BANCO FIBRA" branco sobre o azul oficial
print("fibra"); p = get_flat_paths("fibra_src.svg")
write_icon("fibra", "#082a4d", [group(p, ["#ffffff"] * len(p), C, C, w=LARG_LOGO)])

# Digio: wordmark branco + detalhe ciano sobre o grafite oficial
print("digio"); p = get_flat_paths("digio_src.svg")
write_icon("digio", "#23292e", [group(p, ["#00a0e6", "#ffffff"], C, C, w=LARG_LOGO, extra="evenodd")])

# Banco Toyota: emblema (sem o wordmark) branco sobre o vermelho oficial
print("toyota"); p = get_flat_paths("toyota_src.svg")
p[0]["d"] = filter_subpaths(p[0]["d"], lambda bb: bb[3] < 560)
write_icon("toyota", "#eb0a1e", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Banco Stellantis: wordmark branco sobre o azul oficial
print("stellantis"); p = get_flat_paths("stellantis_src.svg")
write_icon("stellantis", "#243882", [group(p, ["#ffffff"], C, C, w=LARG_LOGO, extra="evenodd")])

# Banco Morgan Stanley: wordmark original sobre branco
print("morganstanley"); p = get_flat_paths("morganstanley_src.svg")
write_icon("morganstanley", "#ffffff", [group(p, None, C, C, w=LARG_LOGO, extra="evenodd")])

# Banco Mizuho: letras brancas do tile oficial sobre o azul do próprio tile
print("mizuho"); p = get_flat_paths("mizuho_src.svg")
write_icon("mizuho", "#37498b", [group(p[1:6], None, C, C, w=LARG_LOGO)])

# Sumitomo Mitsui (SMBC): marca sol-nascente nas cores originais sobre branco
print("sumitomo"); p = get_flat_paths("sumitomo_src.svg")
sym = [q for q in p if _bb(q)[1] < 30]
write_icon("sumitomo", "#ffffff", [group(sym, None, C, C, fit=FIT_SIMBOLO)])

# Société Générale: marca compacta (SG + bandeira) original sobre branco, sem o texto
print("socgen"); p = get_flat_paths("socgen_src.svg")
sym = [q for q in p if _bb(q)[1] < 100]
write_icon("socgen", "#ffffff", [group(sym, None, C, C, w=LARG_LOGO)])

# Inbursa: cruz oficial branca sobre o azul-marinho oficial
print("inbursa"); p = get_flat_paths("inbursa_src.svg")
sym = [q for q in p if _bb(q)[1] < 760]
write_icon("inbursa", "#012148", [group(sym, ["#ffffff"] * len(sym), C, C, fit=FIT_SIMBOLO)])

# Banco Volkswagen: emblema VW branco sobre o azul oficial
print("volkswagen"); p = get_flat_paths("volkswagen_src.svg")
write_icon("volkswagen", "#001e50", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Deutsche Bank: quadrado com barra, branco sobre o azul oficial
print("deutsche"); p = get_flat_paths("deutsche_src.svg")
write_icon("deutsche", "#0018a8", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Banco Honda: asa (sem o wordmark) branca sobre o vermelho oficial
print("honda"); p = get_flat_paths("honda_src.svg")
wing = [q for q in p if _bb(q)[3] < 1350]
write_icon("honda", "#da251d", [group(wing, ["#ffffff"] * len(wing), C, C, fit=FIT_SIMBOLO)])

# Efí Bank (ex-Gerencianet): lockup "efí bank" branco sobre o laranja oficial
print("efibank"); p = get_flat_paths("efibank_src.svg")
write_icon("efibank", "#f37124", [group(p, ["#ffffff", "#ffffff"], C, C, w=LARG_LOGO)])

# Stark Bank: símbolo (raio em azuis) nas cores originais sobre o grafite da marca
print("starkbank"); p = get_flat_paths("starkbank_src.svg")
write_icon("starkbank", "#1d2732", [group(p[0:4], None, C, C, fit=FIT_SIMBOLO)])

# Zro Bank: lockup "zro bank" branco (ponto ciano mantido) sobre o azul da marca
print("zrobank"); p = get_flat_paths("zrobank_src.svg")
write_icon("zrobank", "#252f59", [group(p, ["#54b7e8", "#ffffff", "#ffffff", "#ffffff"], C, C, w=LARG_LOGO)])

# Revolut: monograma "R" (simple-icons) branco sobre o preto da marca
print("revolut"); p = get_flat_paths("revolut_src.svg")
write_icon("revolut", "#000000", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# ---------------------------------------------------------------------------
# Lote 3 (2026-07-15): carteiras/fintechs muito usadas (escopo ampliado pelo dono)
# ---------------------------------------------------------------------------

# PayPal: monograma PP (simple-icons) branco sobre o azul oficial
print("paypal"); p = get_flat_paths("paypal_src.svg")
write_icon("paypal", "#003087", [group(p, ["#ffffff"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Wise: bandeira (simple-icons) no verde-escuro sobre o verde-claro — par oficial da marca
print("wise"); p = get_flat_paths("wise_src.svg")
write_icon("wise", "#9fe870", [group(p, ["#163300"], C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Warren: wordmark branco sobre o coral oficial
print("warren"); p = get_flat_paths("warren_src.svg")
write_icon("warren", "#e24324", [group(p, ["#ffffff"], C, C, w=LARG_LOGO, extra="evenodd")])

# Asaas: wordmark branco sobre o azul oficial
print("asaas"); p = get_flat_paths("asaas_src.svg")
write_icon("asaas", "#0038e5", [group(p, ["#ffffff"], C, C, w=LARG_LOGO, extra="evenodd")])

# QI Tech: marca ciano oficial sobre o grafite do site da marca
print("qitech"); p = get_flat_paths("qitech_src.svg")
write_icon("qitech", "#101828", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# Celcoin: wordmark branco sobre o roxo oficial
print("celcoin"); p = get_flat_paths("celcoin_src.svg")
write_icon("celcoin", "#7664fa", [group(p, ["#ffffff"] * len(p), C, C, w=LARG_LOGO)])

# Bankly: wordmark branco sobre o azul oficial (do ponto do "i" no próprio arquivo)
print("bankly"); p = get_flat_paths("bankly_src.svg")
write_icon("bankly", "#347bff", [group(p, ["#ffffff", "#ffffff"], C, C, w=LARG_LOGO)])

# iugu: marca branca sobre grafite (o vetor oficial é monocromático)
print("iugu"); p = get_flat_paths("iugu_src.svg")
write_icon("iugu", "#1b1b1b", [group(p, ["#ffffff"] * len(p), C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# InfinitePay: wordmark branco sobre o grafite da marca (tile do lockup descartado)
print("infinitepay"); p = get_flat_paths("infinitepay_src.svg")
letras = [q for q in p if q["fill"] == "#ffffff"]
write_icon("infinitepay", "#171527", [group(letras, None, C, C, w=LARG_LOGO)])

# CloudWalk: wordmark branco sobre preto (marca usa fundo escuro)
print("cloudwalk"); p = get_flat_paths("cloudwalk_src.svg")
write_icon("cloudwalk", "#000000", [group(p, ["#ffffff"] * len(p), C, C, w=LARG_LOGO)])

# Pagar.me: wordmark "pagar.me" branco sobre o verde oficial (selo "stone" fora)
print("pagarme"); p = get_flat_paths("pagarme_src.svg")
write_icon("pagarme", "#00af55", [group(p[6:9], ["#ffffff"] * 3, C, C, w=LARG_LOGO, extra="evenodd")])

# RecargaPay: monograma do badge oficial branco sobre o navy do próprio arquivo
print("recargapay"); p = get_flat_paths("recargapay_src.svg")
write_icon("recargapay", "#053e6e", [group(p[1:3], ["#ffffff", "#ffffff"], C, C, fit=FIT_SIMBOLO)])

# Creditas: "C" grafite do ícone oficial sobre o verde-lima oficial
print("creditas"); p = get_flat_paths("creditas_src.svg")
write_icon("creditas", "#8edb00", [group(p[1:4], None, C, C, fit=FIT_SIMBOLO)])

# Toro: touro vermelho + "toro" branco (asset oficial p/ fundo escuro) sobre preto
print("toro"); p = get_flat_paths("toro_src.svg")
write_icon("toro", "#000000", [group(p, None, C, C, w=LARG_LOGO)])

# NG.CASH: wordmark branco sobre preto (marca preto e branco)
print("ngcash"); p = get_flat_paths("ngcash_src.svg")
write_icon("ngcash", "#000000", [group(p, None, C, C, w=LARG_LOGO)])

# Pluggy: ícone oficial multicolorido sobre branco
print("pluggy"); p = get_flat_paths("pluggy_src.svg")
write_icon("pluggy", "#ffffff", [group(p, None, C, C, fit=FIT_SIMBOLO)])

# Klavi: tile azul oficial (com o K vazado) sobre branco
print("klavi"); p = get_flat_paths("klavi_src.svg")
write_icon("klavi", "#ffffff", [group(p[0:1], None, C, C, fit=FIT_SIMBOLO, extra="evenodd")])

# Skrill: wordmark preto oficial sobre branco
print("skrill"); p = get_flat_paths("skrill_src.svg")
write_icon("skrill", "#ffffff", [group(p, None, C, C, w=LARG_LOGO)])
