"""Build the InvoiceFlow logo system as clean, outlined SVG files.

Usage: python3 build.py <path-to-PlusJakartaSans-Bold.ttf>
Requires: fonttools, uharfbuzz. All geometry lives on a 256-unit symbol grid.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from wordmark import outline

FONT = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "logo")
os.makedirs(OUT, exist_ok=True)

# ---------- Palette ----------
NAVY, MIDNIGHT = "#142746", "#0B1930"
FRESH, SOFT, LEDGER = "#55C99A", "#8BD6B0", "#237A57"
OFF, WHITE, BLACK = "#F7F9F8", "#FFFFFF", "#000000"

# ---------- Symbol geometry (256 grid) ----------
# Sheet: 256 square, 28 corner radius, top-right corner removed by a
# quarter circle (r=128) centred on the corner: the "fold".
SHEET = "M28 0H128A128 128 0 0 0 256 128V228A28 28 0 0 1 228 256H28A28 28 0 0 1 0 228V28A28 28 0 0 1 28 0Z"
# Two line items cut through the sheet (28 tall, full round ends, 12-unit gap).
LINES = ("M60 160H148A14 14 0 0 1 148 188H60A14 14 0 0 1 60 160Z"
         "M60 200H112A14 14 0 0 1 112 228H60A14 14 0 0 1 60 200Z")
# Paid corner: concentric quarter disc r=104 (24-unit channel), outer corner follows the sheet.
CORNER = "M152 0H228A28 28 0 0 1 256 28V104A104 104 0 0 1 152 0Z"


def defs(uid):
    return (f'<defs><linearGradient id="{uid}g" x1="152" y1="0" x2="256" y2="104" gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="{SOFT}"/><stop offset="1" stop-color="{FRESH}"/></linearGradient>'
            f'<linearGradient id="{uid}n" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="#1C3760"/><stop offset="1" stop-color="{NAVY}"/></linearGradient></defs>')


def symbol(sheet, corner, lines=True, uid="s"):
    """sheet/corner: colour string, or 'grad' for the brand gradient."""
    sf = f"url(#{uid}n)" if sheet == "grad" else sheet
    cf = f"url(#{uid}g)" if corner == "grad" else corner
    d = SHEET + (LINES if lines else "")
    body = (f'<path fill="{sf}" fill-rule="evenodd" d="{d}"/>'
            f'<path fill="{cf}" d="{CORNER}"/>')
    return (defs(uid) if "grad" in (sheet, corner) else ""), body


def write(name, w, h, inner, title, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}" height="{h:g}" viewBox="0 0 {w:g} {h:g}" '
           f'role="img" aria-label="{title}"><title>{title}</title>{rect}{inner}</svg>\n')
    open(os.path.join(OUT, name), "w").write(svg)


# ---------- Wordmark ----------
CAP = 112                        # cap height in symbol units (symbol = 256)
TRACK = -0.012                   # em
WM_D, WM_W, WM_LSB = outline(FONT, "InvoiceFlow", CAP, tracking_em=TRACK)
ASC_OVER = 8                     # 'l' ascender rises slightly above cap height; keep in bounds


def wordmark(fill, x, y):
    return f'<path fill="{fill}" transform="translate({x - WM_LSB:.2f} {y:.2f})" d="{WM_D}"/>'


VARIANTS = {
    # name: (sheet, corner, word, background-for-preview)
    "color": ("grad", "grad", NAVY),
    "color-flat": (NAVY, FRESH, NAVY),
    "dark": (OFF, "grad", OFF),
    "dark-flat": (OFF, FRESH, OFF),
    "mono-navy": (NAVY, NAVY, NAVY),
    "mono-black": (BLACK, BLACK, BLACK),
    "mono-white": (WHITE, WHITE, WHITE),
}

PAD = 0
for v, (s, c, word) in VARIANTS.items():
    uid = "if" + v.replace("-", "")
    d, b = symbol(s, c, uid=uid)
    # Symbol only
    write(f"symbol-{v}.svg", 256, 256, d + b, "InvoiceFlow")
    # Horizontal lockup: gap = 0.25 x symbol; cap height centred on symbol
    gap = 64
    wx = 256 + gap
    wy = (256 - CAP) / 2
    W = wx + WM_W
    write(f"logo-horizontal-{v}.svg", round(W, 2), 256,
          d + b + wordmark(word, wx, wy), "InvoiceFlow")
    # Stacked (primary) lockup: symbol centred above wordmark, gap = 0.5 cap
    sw = 256
    gapv = 72
    W2 = max(WM_W, sw)
    sx = (W2 - sw) / 2
    H2 = 256 + gapv + CAP
    write(f"logo-stacked-{v}.svg", round(W2, 2), H2,
          f'<g transform="translate({sx:.2f} 0)">{d}{b}</g>' + wordmark(word, (W2 - WM_W) / 2, 256 + gapv),
          "InvoiceFlow")
    # Wordmark only
    write(f"wordmark-{v}.svg", round(WM_W, 2), CAP + ASC_OVER,
          wordmark(word, 0, ASC_OVER), "InvoiceFlow")

# ---------- Small-size cut (favicon, <= 20 px): line items dropped ----------
for v, (s, c) in {"color": (NAVY, FRESH), "dark": (OFF, FRESH)}.items():
    d, b = symbol(s, c, lines=False)
    write(f"symbol-small-{v}.svg", 256, 256, d + b, "InvoiceFlow")

# favicon.svg adapts to the browser theme
fav = (f'<style>.s{{fill:{NAVY}}}.c{{fill:{FRESH}}}@media (prefers-color-scheme:dark){{.s{{fill:{OFF}}}}}</style>'
       f'<path class="s" d="{SHEET}"/><path class="c" d="{CORNER}"/>')
write("favicon.svg", 256, 256, fav, "InvoiceFlow")

# ---------- App icon (1024, iOS/Android safe area ~ 62%) ----------
d, b = symbol(OFF, "grad", uid="app")
k = 600 / 256
icon = (f'<defs><linearGradient id="appbg" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{NAVY}"/><stop offset="1" stop-color="{MIDNIGHT}"/></linearGradient></defs>'
        f'<rect width="1024" height="1024" rx="228" fill="url(#appbg)"/>'
        f'{d}<g transform="translate(212 212) scale({k:.6f})">{b}</g>')
write("app-icon.svg", 1024, 1024, icon, "InvoiceFlow")

print("wordmark width", round(WM_W, 2), "files:", len(os.listdir(OUT)))
