# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```

No test suite is configured.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Recharts.
All calculations run client-side — no backend, no database.

> **Note:** Next.js 16 has breaking API and file-structure changes versus earlier versions. Check `node_modules/next/dist/docs/` before writing any Next.js-specific code.

## Architecture

### Routing
Each calculator lives under `app/<slug>/page.tsx` and is a thin wrapper that renders the corresponding `components/calculadoras/<Name>Calculator.tsx` inside `components/CalculatorLayout.tsx`.

### Calculation logic
`lib/calculos.ts` — all pure calculation functions (no UI). This is the central business logic file.  
`lib/tabelas-fiscais.ts` — INSS and IRRF bracket tables. **Update here when government publishes new annual tables.**

### Shared lib
`lib/site.ts` — `BASE_URL`, `SITE_NOME`, `EMAIL_CONTATO`, `ULTIMA_ATUALIZACAO`, and the canonical calculator list used across the site.  
`lib/conteudo.ts` — editorial copy (FAQs, official sources) per calculator.  
`lib/format.ts` — currency/percentage formatters.

### SEO & metadata
`app/sitemap.xml/route.ts` generates the sitemap as a static route handler. `app/robots.ts` is auto-generated via Next.js metadata convention. Per-page metadata is declared inside each `app/<slug>/page.tsx`. `BASE_URL` in `lib/site.ts` must match the deployed URL — it feeds the sitemap and OG tags.

### Ads
`components/AdSlot.tsx` has placeholder slots. Replace its content with the AdSense script once the account is approved.

## Adding a new calculator

1. Add pure calculation function(s) to `lib/calculos.ts`.
2. Add editorial content (FAQ, sources) to `lib/conteudo.ts`.
3. Create `components/calculadoras/<Name>Calculator.tsx` as a `"use client"` component.
4. Create `app/<slug>/page.tsx` — export metadata and render `<CalculatorLayout>` wrapping the new component.
5. Register it in `lib/site.ts` so it appears in navigation and the related-calculators list.
