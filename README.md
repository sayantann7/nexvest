# Nexvest

Smart investing companion for Indian investors — mutual funds discovery, private equity/unlisted shares, calculators, and research in one modern Next.js app.

## Overview

Nexvest is a full‑stack investment experience built on the Next.js App Router. It focuses on:

- **Mutual funds** – education, categories, and a simulator for different fund houses.
- **Private equity / unlisted shares** – curated dashboard of pre‑IPO and unlisted opportunities.
- **Tools & calculators** – SIP, lumpsum, EMI, tax, PPF, NPS, HRA, gratuity, and more.
- **Research & insights** – articles and notes fetched from a Nexvest research backend.
- **Investor UX** – animated, mobile‑friendly UI with a dark theme tailored to finance.

This repo contains the web app only.

## Tech Stack

- **Framework**: Next.js `app/` router (`next@15.x`), TypeScript
- **UI**:
  - Tailwind CSS (v4) + custom gradients and animations
  - Radix UI primitives via simple wrappers in `components/ui/*`
  - Framer Motion for scroll and entrance animations
  - Lucide icons for finance/UX icons
- **State & data**:
  - React server/client components
  - Feature‑layer APIs in `features/*/api.ts` for research, unlisted shares, etc.
  - Calculator logic modules in `features/calculators/logic/*` consumed by UI components
  - `fetch` to public JSON in `public/` and to a hosted research API
  - Local helpers in `lib/` for mutual fund data and utilities
- **Backend / DB**:
  - Prisma ORM
  - PostgreSQL datasource (`DATABASE_URL`)
  - `Query` table for storing contact / query submissions
- **Configuration / env**:
  - `lib/config/env.ts` using `zod` for validated, typed environment variables
  - Central `env` object used by feature APIs
- **Tooling**:
  - ESLint (Next.js config)
  - TypeScript (strict mode)
  - Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`) for unit tests
  - Prettier for formatting (see `.prettierrc`)
  - Husky + lint‑staged for pre‑commit lint/format

## Key Features

### 1. Home experience (`/`)

- Animated **welcome overlay** (`WelcomeAnimation`).
- **Navbar** with routes to mutual funds, calculators, unlisted shares, research, contact, etc.
- **Stock ticker** style banner (`Ticker`).
- **Hero** and information sections explaining Nexvest.
- **Stats** component for global/India market stats.
- **Investment personality test** embedded on the home page.

### 2. Mutual Funds (`/mutual-funds`)

- Hero, overview, and education sections (`HeroSection`, `MutualFundsOverviewSection`).
- **Investment types info** for different MF strategies (`InvestmentTypesInfo`).
- **Simulator panel** (`ClientSimulatorPanel`) to experiment with MF investing patterns.
- **Fund houses section** (`FundHousesSection`) highlighting supported AMCs.
- Deep‑dive pages under `app/mutual-funds/[house]/` (per fund house) using static data from `public/mutual-fund-data/` and helpers in `lib/fundDataLoader.ts`.

### 3. Calculators Hub (`/calculators`)

One central page that lists and links to multiple calculators implemented as modular components in `components/calculators/*`:

- **Mutual fund & returns**
  - SIP calculator
  - Step‑up SIP calculator
  - Lumpsum calculator
  - Mutual fund NAV / units converter
  - CAGR & absolute return calculator
  - Monthly → annual return converter
- **Deposits & loans**
  - EMI calculator
  - Fixed deposit calculator
  - Recurring deposit calculator
  - Simple interest & compound interest calculators
- **Tax & retirement**
  - PPF calculator
  - NPS calculator
  - Income tax estimator
  - HRA exemption calculator
  - Gratuity calculator

Each calculator is a self‑contained React component registered in `components/calculators/registry.ts` and opened via `/calculators/[slug]` or the calculator modal.

### 4. Unlisted Shares / Private Equity (`/unlisted-shares`)

- Marketing/education hero explaining **private equity & unlisted markets**.
- **Process section** detailing buying flow: connect, process, settlement.
- **Benefits and risks** section to set expectations.
- **Browse cards** for unlisted/pre‑IPO companies:
  - Data loaded from `public/unlisted_shares.json`.
  - Company logo (where available), name, and recent % change.
  - Search and incremental “load more” behavior.

### 5. Research & Insights (`/research`)

- Fetches articles from the Nexvest backend:
  - `GET https://nexvest-backend.sayantannandi13.workers.dev/article`
  - Uses `cache: 'no-store'` for always‑fresh content.
- Displays cards with image, title, summary, date, and external link (if provided).
- Search within article titles and body content.
- Retry / refresh button with simple error messaging.

### 6. Contact & Queries (`/contact`)

- Simple contact form for name, email/phone, and message.
- Client‑side validation with success message UI.
- Contact details sidebar with support email, phone, and use‑cases.
- Prisma schema (`prisma/schema.prisma`) defines a `Query` model to store such submissions.

> Note: The current contact page simulates submission on the client. Hook it up to an API route and Prisma if you want persistence.

### 7. Personality Test (`/personality-test` and home widget)

- Investment personality quiz UI in `components/InvestmentPersonalityTest.tsx`.
- Helps categorize users by risk profile and investing style.

## Project Structure (high level)

- `app/`
  - `page.tsx` – Home page
  - `mutual-funds/` – Mutual funds main page and per‑house subroutes
  - `calculators/` – Calculators hub (`/calculators`) and dynamic per‑calculator routes
  - `unlisted-shares/` – Private equity / unlisted shares landing and list
  - `research/` – Articles & research feed (+ `loading.tsx` & `error.tsx` for UX)
  - `contact/` – Contact form
  - `personality-test/` – Standalone investment personality quiz page
  - `layout.tsx` – Root layout, fonts, metadata
- `components/`
  - Core UI and layout components (navbar, hero, stats, ticker, etc.)
  - `components/calculators/` – all individual calculator components + registry + modal
  - `components/ui/` – primitive UI elements (button, card, input, table, slider, etc.)
- `features/`
  - `research/` – `types.ts` + `api.ts` for article fetching
  - `unlisted-shares/` – `types.ts` + `api.ts` to load `public/unlisted_shares.json`
  - `calculators/logic/` – pure math/finance logic for SIP, EMI, PPF, NPS, etc.
- `sections/`
  - Page‑level sections for the mutual funds flow.
- `lib/`
  - `fundDataLoader.ts` – helpers for reading and shaping mutual fund JSON data.
  - `mutualFundsData.ts` – mutual funds metadata and configuration.
  - `utils.ts` – shared math/helpers.
  - `db.ts` – Prisma client singleton (central DB access point).
  - `config/env.ts` – zod‑based environment parsing exporting a typed `env` object.
  - `vapi.sdk.ts` – integration with the Vapi AI SDK for chat/call bot (if used).
- `prisma/`
  - `schema.prisma` – Prisma schema (`Query` model).
  - `migrations/` – database migrations.
- `public/`
  - `unlisted_shares.json` – source data used on `/unlisted-shares`.
  - `mutual-fund-data/` – JSON per fund house.
  - Static images and assets.
- `docs/`
  - `architecture.md` – high‑level architecture and layering.
  - `features/calculators.md` – calculator architecture (UI vs logic) and conventions.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- npm, pnpm, or yarn
- (Optional) PostgreSQL database for persisting queries

### Installation

Clone the repo and install dependencies:

```bash
npm install
```

Generate the Prisma client (also runs on `postinstall`):

```bash
npm run postinstall
```

### Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
```

If you only want to explore the UI, you can skip configuring the DB; Prisma will only be required once you wire up API routes that talk to the `Query` table.

Additional optional variables (validated in `lib/config/env.ts`):

```bash
NEXT_PUBLIC_RESEARCH_API_URL="https://nexvest-backend.sayantannandi13.workers.dev/article"
NEXT_PUBLIC_ENV="development" # or "production", used for minor UI/env switches
```

### Run in development

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### Build and production

```bash
npm run build
npm start
```

## Useful Scripts

Defined in `package.json`:

- `npm run dev` – start Next.js dev server with Turbopack.
- `npm run build` – production build.
- `npm start` – run the production server.
- `npm run lint` – run ESLint.
- `npm run test` – run Vitest test suite.
- `npm run format` – format codebase with Prettier.
- `npm run postinstall` – generate Prisma client.

> Git hooks: Husky + lint‑staged are configured so that on `git commit`, staged TS/TSX/JS/JSX files are linted and formatted automatically.

## Data & APIs

- **Local JSON**
  - `public/unlisted_shares.json` – unlisted shares data.
  - `public/mutual-fund-data/*` – mutual fund metadata for different fund houses.
- **Remote API**
  - Research articles: `GET https://nexvest-backend.sayantannandi13.workers.dev/article` (override via `NEXT_PUBLIC_RESEARCH_API_URL`).
- **Database**
  - PostgreSQL via Prisma with `Query` model for storing user questions.

## Development Notes

- This project is primarily a front‑end experience; there is no trading, order execution, or payment processing in the repo.
- Animation and visuals are implemented with Framer Motion and custom Tailwind + CSS effects.
- Images from remote domains are whitelisted in `next.config.ts`.
- UI is dark‑theme first and responsive down to mobile.

### Testing

- Unit tests are written with **Vitest** and **Testing Library**.
- Example: calculator math (e.g. SIP logic) is implemented in `features/calculators/logic/*` and tested independently from UI.
- To run the whole suite:

```bash
npm run test
```

Vitest uses a jsdom environment and `@testing-library/jest-dom` matchers (see `vitest.config.ts` and `vitest.setup.ts`).

## Roadmap / Ideas

- Connect contact form to a Next.js API route using Prisma for persistence.
- Add authentication and basic user profiles.
- Persist user calculator scenarios and personality test results.
- Add more research filters (tags, asset class, risk level).
- Integrate real‑time NAV / market feeds where appropriate.
