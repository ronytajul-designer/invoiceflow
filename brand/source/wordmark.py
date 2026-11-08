"""Shape text with HarfBuzz and emit SVG path data (outlined, no live text)."""
import sys, uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

def outline(font_path, text, cap_target, tracking_em=0.0):
    """Return (d, width, height) where cap height == cap_target units, baseline at y=cap_target."""
    blob = hb.Blob.from_file_path(font_path); face = hb.Face(blob); f = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(f, buf, {"kern": True, "liga": False})
    tt = TTFont(font_path); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    upm = tt['head'].unitsPerEm; cap = tt['OS/2'].sCapHeight
    s = cap_target / cap
    pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip('0').rstrip('.'))
    x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        tp = TransformPen(pen, (s, 0, 0, -s, (x + pos.x_offset) * s, cap_target))
        gs[name].draw(tp)
        x += pos.x_advance + tracking_em * upm
    x -= tracking_em * upm
    # trim right side bearing of last glyph
    last = order[buf.glyph_infos[-1].codepoint]
    lsb_last = tt['hmtx'][last][1]
    glyf = tt['glyf'][last] if 'glyf' in tt else None
    xmax = glyf.xMax if glyf is not None and hasattr(glyf,'xMax') else tt['hmtx'][last][0]
    width = (x - tt['hmtx'][last][0] + xmax) * s
    first = order[buf.glyph_infos[0].codepoint]
    lsb = tt['hmtx'][first][1] * s
    return pen.getCommands(), width, lsb

if __name__ == "__main__":
    d, w, l = outline(sys.argv[1], sys.argv[2], float(sys.argv[3]))
    print(w, l, len(d))
