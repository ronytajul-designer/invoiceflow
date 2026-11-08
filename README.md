# InvoiceFlow

Marketing site and brand system for InvoiceFlow, a cloud invoicing and payment tracking tool for freelancers, agencies and small businesses.

## Landing page

React 18 + TypeScript + Vite 5 + Tailwind CSS 4 + Lucide icons. No chart library: charts are hand-built SVG.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
```

### Structure

```
src/
  index.css                 design tokens (@theme), base styles, reveal + reduced-motion rules
  App.tsx                   section order
  sections/                 one file per page section (Header … Footer)
  components/
    ui/                     Button, Container, Logo, SectionHeading, StatusBadge, Reveal, ArcMotif
    dashboard/              AppFrame + widgets (StatCard, RevenueChart, InvoiceTable, PaymentStatus)
                            and the four product views used in the showcase tabs
    FeatureTile, PricingCard, TestimonialCard, Accordion
  data/
    dashboard.ts            sample numbers and fictional clients for the mockups
    content.ts              steps, testimonials, plans, FAQ, footer links
    links.ts                placeholder routes (/signup, /login, …) in one place
  assets/logo/              Folded Ledger logo files copied from brand/logo
```

Product mockups are container-query driven (`@container` on `AppFrame`), so they adapt to their own width rather than the viewport.

### Content notes

- Company names, testimonials and dashboard figures are fictional sample content. Testimonials and the logo strip are labelled as such on the page.
- Pricing is illustrative concept pricing; edit `plans` in `src/data/content.ts`. Yearly = two months free (about 17% off).
- Security answers in the FAQ describe intended practice; confirm them against the real product before launch.
- `/signup`, `/login` and footer routes are placeholders until those pages exist.

## Brand

`brand/` holds the logo system: outlined SVG masters, PNG exports, concepts, a guidelines page and the build script. See `brand/README.md`.
