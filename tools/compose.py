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

# XP: a marca é o próprio "XP" com a flâmula (sem símbolo separado); remove o "inc."
print("xp"); p = get_paths("xp_src.svg")
write_icon("xp", "#000000", [group([p[1], p[2]], ["#0084d5", "#ffffff"], C, C, w=LARG_LOGO)])

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
