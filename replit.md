# PRAX Healthcare Platform

PRAX is a bilingual Arabic/English healthcare coordination workspace for safer patient handoffs and emergency readiness.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/prax/src/components/prax-app.tsx` — routed clinician, paramedic, and hospital workspace UI with local demo interactions.
- `artifacts/prax/src/lib/i18n.ts` — centralized English/Arabic translation source.
- `artifacts/prax/src/index.css` — PRAX theme tokens, Arabic-friendly typography, and responsive base styles.
- `artifacts/prax/src/App.tsx` — app providers and routed entry point.

## Architecture decisions

- The first PRAX experience is frontend-first with fictional local demo data; no patient data is persisted.
- All interface copy is sourced from one typed English/Arabic translation object, and language is persisted in local storage.
- Direction and document language are updated at the root document level so every routed screen follows RTL/LTR automatically.
- Clinical interactions such as alert acknowledgement, AI review, consultation requests, role selection, and settings toggles are intentionally local and immediate for demo use.

## Product

PRAX includes role selection, an active-patient dashboard, patient identification and medical history, vital signs, AI clinical support, physician consultation, hospital readiness, alerts, and settings. English is the default language; Arabic switches the full interface to RTL with professional medical terminology.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
