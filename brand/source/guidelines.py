"""Generate the brand guidelines page (brand/guidelines.html) with every logo embedded inline."""
import base64, os
H = os.path.join(os.path.dirname(__file__), "..")
def uri(p): return "data:image/svg+xml;base64," + base64.b64encode(open(os.path.join(H, p), "rb").read()).decode()
def img(p, cls="", alt="InvoiceFlow", style=""): return f'<img class="{cls}" src="{uri(p)}" alt="{alt}" style="{style}">'

palette = [
  ("Deep Navy", "#142746", "Primary. Sheet, wordmark, headings.", "14.1:1 on Off-white", "#F7F9F8"),
  ("Midnight", "#0B1930", "Dark surfaces, app icon base, footer.", "16.6:1 with Off-white", "#F7F9F8"),
  ("Fresh Green", "#55C99A", "The paid corner. Accent on dark UI.", "7.3:1 on Deep Navy", "#0B1930"),
  ("Soft Green", "#8BD6B0", "Gradient start. Tints, success fills.", "8.8:1 on Deep Navy", "#0B1930"),
  ("Ledger Green", "#237A57", "Added. Green text and links on light.", "5.0:1 on Off-white", "#F7F9F8"),
  ("Off-white", "#F7F9F8", "Light surfaces, reversed sheet.", "Base surface", "#142746"),
]
sw = "".join(f'<li class="sw"><span class="chip" style="background:{h};color:{fg}">Aa</span><b>{n}</b><code>{h}</code><small>{u}</small><small class="m">{c}</small></li>' for n,h,u,c,fg in palette)

concepts = [
  ("A", "Folded Ledger", "concepts/A-folded-ledger.svg", "Abstract geometric", "The sheet's corner turns into a concentric arc. The document flows into payment; two cut-out line items keep it an invoice, not a generic card.", [4,3,5,5,4], "Recommended"),
  ("B", "IF Lettermark", "concepts/B-if-lettermark.svg", "Custom lettermark", "The I is the stem; two detached bars read as invoice line items and complete the F.", [3,2,4,3,3], "Risk: F built from bars is a crowded pattern. Reads like a menu or filter icon at 24 px."),
  ("C", "Flow Channel", "concepts/C-flow-channel.svg", "Flow symbol", "One S-shaped channel splits the sheet into sent and settled halves.", [3,3,4,3,4], "Risk: the channel reads as an S, a letter the name does not contain. Weak invoice cue."),
]
crit = ["Memorability","Distinctiveness","Scalability","Relevance","Craft"]
def score(v): return "".join(f'<tr><td>{c}</td><td><span class="bar" style="--v:{x}"></span></td><td class="n">{x}/5</td></tr>' for c,x in zip(crit,v))
cc = "".join(f'''<article class="concept{' rec' if k=='A' else ''}"><div class="cmark">{img(p)}</div><div class="sizes">{img(p,style="width:48px")}{img(p,style="width:32px")}{img(p,style="width:24px")}</div>
<p class="eyebrow">{k} · {t}</p><h3>{n}</h3><p>{d}</p><table class="score">{score(s)}<tr class="tot"><td>Total</td><td></td><td class="n">{sum(s)}/25</td></tr></table><p class="note">{r}</p></article>''' for k,n,p,t,d,s,r in concepts)

def sizes(v, small):
    out = ""
    for s in (48, 32, 24):
        out += f'<figure>{img(f"logo/symbol-{v}.svg", style=f"width:{s}px")}<figcaption>{s} px</figcaption></figure>'
    out += f'<figure>{img(f"logo/symbol-small-{small}.svg", style="width:16px")}<figcaption>16 px cut</figcaption></figure>'
    return out

html = f'''<title>InvoiceFlow Brand Identity</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
/* Layout: a ledger. Left column carries labels like invoice field names, right column carries the work. */
:root{{--bg:#F7F9F8;--surface:#FFFFFF;--ink:#142746;--muted:#5A6B80;--line:#DCE3E0;--accent:#237A57;--dark:#0B1930;--mark:#55C99A;
--display:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,Menlo,monospace}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#0B1930;--surface:#122440;--ink:#EEF3F1;--muted:#9AABBF;--line:#22385A;--accent:#8BD6B0;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#0B1930;--surface:#122440;--ink:#EEF3F1;--muted:#9AABBF;--line:#22385A;--accent:#8BD6B0;color-scheme:dark}}
body{{background:var(--bg);color:var(--ink);font:16px/1.6 var(--display)}}
.wrap{{max-width:1120px;margin:0 auto;padding-block:56px 96px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}}
h1,h2,h3{{text-wrap:balance;letter-spacing:-.02em;margin:0}}
h1{{font-size:clamp(32px,5vw,52px);line-height:1.08;font-weight:700}}h2{{font-size:28px;font-weight:700}}h3{{font-size:19px;font-weight:600}}
p{{margin:0;max-width:65ch}}.lead{{font-size:18px;color:var(--muted)}}
.eyebrow{{font:500 12px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}}
section{{display:grid;grid-template-columns:200px minmax(0,1fr);gap:32px;padding-block:56px;border-top:1px solid var(--line)}}
section>header{{display:flex;flex-direction:column;gap:10px}}section>header p{{color:var(--muted);font-size:14px}}
.body{{display:flex;flex-direction:column;gap:24px;min-width:0}}
.hero{{display:grid;gap:28px;padding-bottom:56px}}
.stage{{display:grid;grid-template-columns:1fr 1fr;gap:16px}}
.panel{{border-radius:16px;padding:48px 32px;display:flex;align-items:center;justify-content:center;min-height:220px}}
.panel.l{{background:#F7F9F8;border:1px solid #DCE3E0}}.panel.d{{background:#0B1930}}.panel.n{{background:#142746}}.panel.w{{background:#fff;border:1px solid #DCE3E0}}
.panel img{{max-height:120px;max-width:100%;height:auto;min-width:0}}
.concepts{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
.concept{{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:12px}}
.concept.rec{{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}}
.cmark{{background:#fff;border-radius:10px;padding:24px;display:flex;justify-content:center}}.cmark img{{width:120px}}
.sizes{{display:flex;gap:14px;align-items:flex-end;background:#fff;border-radius:10px;padding:14px}}
.concept p{{font-size:14px;color:var(--muted)}}.concept .note{{font-size:13px;color:var(--ink)}}
.score{{width:100%;border-collapse:collapse;font-size:13px}}.score td{{padding:3px 0}}.score td:nth-child(2){{width:45%;padding:0 12px}}.score .n{{text-align:right;font-family:var(--mono);font-variant-numeric:tabular-nums;width:44px}}
.bar{{display:block;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--accent) calc(var(--v)*20%),var(--line) 0)}}
.tot td{{border-top:1px solid var(--line);padding-top:8px;font-weight:600}}
.grid2{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}}
.cap{{font:500 12px var(--mono);color:var(--muted);margin-top:8px}}
.ladder{{display:flex;gap:28px;align-items:flex-end;flex-wrap:wrap}}.ladder figure{{margin:0;text-align:center}}
.ladder figcaption{{font:12px var(--mono);margin-top:8px;color:inherit;opacity:.7}}
.panel.d .ladder{{color:#9AABBF}}.panel.l .ladder{{color:#5A6B80}}
.swatches{{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
.sw{{display:flex;flex-direction:column;gap:4px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px}}
.chip{{height:88px;border-radius:8px;display:flex;align-items:flex-end;padding:10px;font-weight:700;font-size:20px;margin-bottom:8px;box-shadow:inset 0 0 0 1px rgba(20,39,70,.08)}}
.sw code{{font:500 13px var(--mono)}}.sw small{{font-size:13px;color:var(--muted)}}.sw .m{{font-family:var(--mono);font-size:12px}}
.type{{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:28px;display:grid;gap:14px}}
.spec{{font:13px/1.5 var(--mono);color:var(--muted)}}
ul.rules{{margin:0;padding-left:20px;display:grid;gap:8px;max-width:70ch}}
.files{{font:13px/1.8 var(--mono);background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto;white-space:pre}}
.donts{{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}}.donts figure{{margin:0}}.donts .panel{{min-height:120px;padding:20px}}.donts img{{max-height:44px}}
.donts figcaption{{font-size:13px;color:var(--muted);margin-top:8px}}
@media (max-width:860px){{section{{grid-template-columns:1fr;gap:20px}}.concepts,.swatches{{grid-template-columns:1fr}}.donts{{grid-template-columns:repeat(2,minmax(0,1fr))}}}}
@media (max-width:560px){{.stage,.grid2{{grid-template-columns:1fr}}.swatches{{grid-template-columns:1fr}}}}
</style>
<div class="wrap">
<div class="hero"><p class="eyebrow">Brand identity · v1.0 · November 2026</p>
<h1>InvoiceFlow</h1>
<p class="lead">The sheet's corner becomes the flow. A Folded Ledger symbol, a Plus Jakarta Sans Bold wordmark and a navy and green palette built for invoices that get paid.</p>
<div class="stage"><div class="panel l">{img("logo/logo-horizontal-color.svg")}</div><div class="panel d">{img("logo/logo-horizontal-dark.svg")}</div></div></div>

<section><header><p class="eyebrow">01 · Starting point</p><h2>Your file</h2></header><div class="body">
<p>The uploaded mark already had the right idea: a sheet whose corner is replaced by a quarter circle and a green paid corner. Three problems held it back. The symbol carried no invoice cue, so it read as a generic signal or radar corner. The wordmark cap height was 94% of the symbol height, which made the lockup top-heavy. The F and l were drawn as plain rectangles that did not match the rounded symbol.</p>
<p>The refined system keeps that equity, adds two line items to the sheet, moves the wordmark to a 2.3:1 symbol-to-cap ratio and rebuilds every letter from one typeface.</p></div></section>

<section><header><p class="eyebrow">02 · Exploration</p><h2>Three directions</h2><p>Greyscale on purpose: judge form before colour.</p></header><div class="body">
<div class="concepts">{cc}</div>
<p><b>Why A wins.</b> It is the only concept that answers both halves of the name at once: the line items say invoice, the concentric arc says flow, and the green corner says paid. It survives 16 px because its one defining feature is large (the corner arc is half the symbol). Its weakest score is distinctiveness: quarter-arc corners appear elsewhere, so the line items and the specific 128/104 concentric ratio are what make it ownable. Run a trademark search before launch.</p></div></section>

<section><header><p class="eyebrow">03 · Logo system</p><h2>Lockups</h2><p>Horizontal is the default for web headers and the dashboard. Stacked is for square spaces.</p></header><div class="body">
<div class="grid2"><div><div class="panel l">{img("logo/logo-stacked-color.svg")}</div><p class="cap">Primary · stacked · light</p></div>
<div><div class="panel d">{img("logo/logo-stacked-dark.svg")}</div><p class="cap">Primary · stacked · dark</p></div>
<div><div class="panel l">{img("logo/logo-horizontal-color.svg", style="max-height:64px")}</div><p class="cap">Horizontal · light background</p></div>
<div><div class="panel d">{img("logo/logo-horizontal-dark.svg", style="max-height:64px")}</div><p class="cap">Horizontal · dark background</p></div>
<div><div class="panel l">{img("logo/symbol-color.svg")}</div><p class="cap">Symbol only · light</p></div>
<div><div class="panel d">{img("logo/symbol-dark.svg")}</div><p class="cap">Symbol only · dark</p></div>
<div><div class="panel w">{img("logo/logo-horizontal-mono-black.svg", style="max-height:56px")}</div><p class="cap">Monochrome · black</p></div>
<div><div class="panel n">{img("logo/logo-horizontal-mono-white.svg", style="max-height:56px")}</div><p class="cap">Monochrome · white (reversed)</p></div>
</div></div></section>

<section><header><p class="eyebrow">04 · Construction</p><h2>Geometry</h2></header><div class="body">
<ul class="rules">
<li>256-unit square, 28-unit corner radius (11%).</li>
<li>Fold: circle of radius 128 (half the sheet) centred on the top-right corner.</li>
<li>Paid corner: concentric circle of radius 104, leaving a 24-unit channel. At 24 px the channel is 2.25 px, so it stays open.</li>
<li>Line items: 28 units tall with full round ends, 12-unit gap, lengths 116 and 80. Both start at x = 46.</li>
<li>Gradients are optional and subtle: green #8BD6B0 to #55C99A across the corner, navy #1C3760 to #142746 across the sheet. Use the <code>-flat</code> files below 48 px and in print.</li>
</ul></div></section>

<section><header><p class="eyebrow">05 · Legibility</p><h2>Size tests</h2><p>Rendered at real pixel size.</p></header><div class="body">
<div class="grid2"><div class="panel l"><div class="ladder">{sizes("color-flat","color")}</div></div><div class="panel d"><div class="ladder">{sizes("dark-flat","dark")}</div></div></div>
<p>48 and 32 px hold every detail. At 24 px the line items are 2.6 px tall and still read. Below 20 px use the <code>symbol-small</code> cut, which drops the line items so the corner arc carries recognition alone. <code>favicon.svg</code> uses that cut and switches to the light sheet in dark browser themes.</p>
<div class="grid2"><div class="panel n" style="min-height:180px">{img("logo/app-icon.svg", style="width:120px")}&nbsp;&nbsp;{img("logo/app-icon.svg", style="width:60px")}</div><div class="panel l" style="min-height:180px">{img("logo/app-icon.svg", style="width:120px")}&nbsp;&nbsp;{img("logo/app-icon.svg", style="width:60px")}</div></div>
<p class="cap">App icon · 1024 master · symbol at 59% of the canvas, inside the iOS and Android safe zone</p></div></section>

<section><header><p class="eyebrow">06 · Colour</p><h2>Palette</h2><p>Contrast ratios per WCAG 2.2.</p></header><div class="body">
<ul class="swatches">{sw}</ul>
<p>One change to your brief: Fresh Green measures 1.95:1 on Off-white, so it fails as text on light surfaces. Ledger Green (#237A57) is the same hue darkened to 5.0:1 and handles links, "Paid" status text and positive amounts on light UI. Keep Fresh Green for the logo and for dark mode. Recommended ratio in layouts: 70% neutrals, 20% navy, 10% green.</p></div></section>

<section><header><p class="eyebrow">07 · Type</p><h2>Typography</h2></header><div class="body">
<div class="type"><p style="font-size:44px;font-weight:700;letter-spacing:-.02em;line-height:1.1">Get paid without the chase.</p>
<p class="spec">Plus Jakarta Sans · Bold 700 · headings · tracking −2%</p>
<p style="font-size:17px;max-width:60ch">Send a branded invoice in under a minute, track every view and payment, and let reminders follow up for you.</p>
<p class="spec">Plus Jakarta Sans · Regular 400 / Medium 500 · body and UI</p>
<p style="font:500 22px var(--mono);font-variant-numeric:tabular-nums">INV-2026-0418 · $4,250.00 · Due 30 Nov</p>
<p class="spec">JetBrains Mono · 500 · invoice numbers, amounts, IDs</p></div>
<p>The wordmark is Plus Jakarta Sans Bold converted to outlines, cap height 112 on the 256 grid, tracking −1.2%. Plus Jakarta Sans has geometric bowls with slightly squared terminals, which match the symbol's round-cornered square. It is SIL Open Font License, free for logo and commercial use. Outfit was rejected as too soft; Manrope as too neutral. Never retype the wordmark from a live font: always use the SVG files.</p></div></section>

<section><header><p class="eyebrow">08 · Usage</p><h2>Rules</h2></header><div class="body">
<ul class="rules">
<li><b>Clear space:</b> keep x = 1/4 of the symbol height (64 units on the 256 grid) free on all sides.</li>
<li><b>Minimum size:</b> horizontal lockup 96 px wide (screen) or 25 mm (print). Symbol 20 px, below that use the small cut.</li>
<li><b>Backgrounds:</b> the colour logo on Off-white, white or light greys. The dark logo on Midnight or Deep Navy. On photos use mono white over a dark area.</li>
</ul>
<div class="donts">
<figure><div class="panel n">{img("logo/logo-horizontal-color.svg")}</div><figcaption>No navy logo on navy. Use the dark version.</figcaption></figure>
<figure><div class="panel l">{img("logo/logo-horizontal-color.svg", style="transform:scaleX(1.35)")}</div><figcaption>No stretching or condensing.</figcaption></figure>
<figure><div class="panel l">{img("logo/logo-horizontal-color.svg", style="transform:rotate(-12deg)")}</div><figcaption>No rotation.</figcaption></figure>
<figure><div class="panel l">{img("logo/logo-horizontal-color.svg", style="filter:drop-shadow(4px 6px 4px rgba(0,0,0,.45))")}</div><figcaption>No shadows or effects.</figcaption></figure>
</div></div></section>

<section><header><p class="eyebrow">09 · Files</p><h2>Assets</h2></header><div class="body">
<div class="files">brand/logo/
  logo-stacked-{{color,dark,color-flat,dark-flat,mono-navy,mono-black,mono-white}}.svg
  logo-horizontal-{{same variants}}.svg
  symbol-{{same variants}}.svg
  symbol-small-{{color,dark}}.svg       under 20 px
  wordmark-{{same variants}}.svg
  favicon.svg                           adapts to dark browser theme
  app-icon.svg                          1024 master
brand/png/                              favicons 16/32/48, apple-touch 180, app icon 1024
brand/source/build.py                   regenerates every SVG from the geometry</div>
<p>All SVGs are outlined (no live text), filter-free and use exact arcs. Trademark clearance was not checked; run a search in your filing markets before launch.</p></div></section>
</div>'''
open(os.path.join(H, "guidelines.html"), "w").write(html)
print(len(html))
