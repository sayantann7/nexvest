# Architecture Overview

This document gives a high-level overview of the Nexvest web application.

## Layers

- `app/` – Next.js App Router pages, layouts, and route handlers.
- `components/` – Reusable presentational components and UI primitives.
- `features/` – Domain-specific logic grouped by feature (calculators, research, unlisted-shares, etc.).
- `lib/` – Cross-cutting infrastructure such as database client, config, and utilities.
- `public/` – Static assets and JSON data.

## Data Flow

- UI components in `app/` and `components/` call into `features/*/api.ts` or `features/*/logic.ts`.
- `features/*/api.ts` files are responsible for fetching from remote APIs or filesystem/JSON.
- `lib/db.ts` holds a Prisma client singleton used by any future API routes.
- `lib/config/env.ts` centralizes environment variable parsing and typing.
