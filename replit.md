# AI Advent Calendar

A holiday-themed interactive house with nine short AI fundamentals lessons for aspiring AI product managers.

## Run & Operate

- `pnpm --filter @workspace/ai-advent-calendar run dev` — run the frontend through its managed workflow
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- The current web app is frontend-only; opened-door progress is saved to the visitor's browser with localStorage.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ai-advent-calendar/` — the interactive web experience.
- `artifacts/api-server/` and `lib/` — shared workspace scaffolding, not required by this app yet.

## Architecture decisions

- Doors are available immediately rather than unlocked by date, because the product is an interview cram experience.
- Browser-local progress avoids creating accounts or storing personal data for this lightweight learning experience.

## Product

- Visitors open nine numbered doors of a snowy holiday house, learn an AI concept in each lesson, and see previously opened doors remain open on return.

## User preferences

- Holiday house and Christmas colors inspired by the attached miniature advent-calendar photo; homepage headline should be simple, punchy, and concise.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
