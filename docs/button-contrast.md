# Button contrast check

The signature buttons (`.btn-glow`, `.btn-glass`, `.btn-aurora` in `src/index.css`) put text over gradients, so contrast was measured against the worst pixel behind each label, not an average colour.

Method: render the page at 2x, make each label transparent, screenshot the button at rest and on hover, then compute the WCAG 2.2 contrast ratio between the label colour and every pixel inside the label's bounding box. The lowest value is reported.

| Button | Label colour | Worst case (rest) | Worst case (hover) | Result |
|---|---|---|---|---|
| `.btn-glow` (primary) | Midnight `#0B1930` | 8.44:1 | 8.43:1 | AAA |
| `.btn-glass` (secondary) | Deep Navy `#142746` | 11.44:1 | 12.61:1 | AAA |
| `.btn-aurora` (header) | White | 12.74:1 | 12.74:1 | AAA |

AA for normal text needs 4.5:1; AAA needs 7:1.

Other checks:
- Keyboard focus keeps the global `:focus-visible` outline (Ledger Green, 3px offset).
- Hover and press motion is disabled under `prefers-reduced-motion`.
- Labels never rely on colour alone; every button has visible text.

Re-run after changing any gradient stop in those three classes.
