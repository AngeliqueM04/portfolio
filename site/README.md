# Angelique Muteba — Portfolio site

React + Vite + Tailwind. Content locked from sibling `01-experience` and `02-introduction` folders.

## Routes

| Path | Page |
|------|------|
| `/#/` | Landing: Spotlight hero, bio/mission, work preview, experience preview, connect |
| `/#/work` | Full case studies with live stats and tables |
| `/#/experience` | Timeline-02 professional + campus tiers |

HashRouter is used so GitHub Pages works with `base: './'`.

## Design system

- Background: charcoal-navy `#141820` site-wide
- Text: warm off-white `#EDE8E0`
- Accent: muted amber `#A68B5B` (Spotlight glow uses the same)
- Type: Newsreader (serif) + IBM Plex Sans (UI)

## Vetted 21st.dev components

- **Spotlight** (`@manuarora700`) for the hero
- **Timeline-02** (`@ruixen.ui`) for `/experience`
- **Excel-style table** (`@ravikatiyar162`): previewed, not used as-is. It is an editable spreadsheet UI. Replaced with a read-only Excel-like grid for comparison tables.

Rejected: portfolio-hero, circular-gallery, bento/media galleries, about-us-section.

## Images kept

Only chart-shaped visuals: iOme trajectory + saving-gap, MortgageIQ model comparison + SHAP beeswarm. Flat cropped stat slides replaced by live `StatPanel` components.

## Commands

```bash
npm install
npm run dev
npm run build
```

Open `http://127.0.0.1:5173/`
