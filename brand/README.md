# InvoiceFlow brand identity

Open `guidelines.html` for the full system: exploration, logo lockups, size tests, palette, typography and usage rules.

- `logo/` production SVGs (outlined, no live text, no filters)
- `png/` favicons, apple-touch icon, app icon, symbol and horizontal PNGs
- `concepts/` the three explored directions (greyscale)
- `previews/` test sheet and concept board renders
- `reference/` the original mark this system evolves
- `source/build.py` regenerates `logo/` (needs `fonttools`, `uharfbuzz` and Plus Jakarta Sans Bold, SIL OFL)

```bash
python3 brand/source/build.py path/to/PlusJakartaSans-Bold.ttf
python3 brand/source/guidelines.py
```

| Token | HEX | Use |
|---|---|---|
| Deep Navy | #142746 | Sheet, wordmark, headings |
| Midnight | #0B1930 | Dark surfaces, app icon |
| Fresh Green | #55C99A | Paid corner, accent on dark |
| Soft Green | #8BD6B0 | Gradient start, tints |
| Ledger Green | #237A57 | Green text on light (5.0:1) |
| Off-white | #F7F9F8 | Light surfaces, reversed sheet |
