# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack enabled
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## Architecture Overview

**NexVest** is a Next.js 15 investment platform with the following key architecture:

### Tech Stack
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Voice AI**: Vapi.ai integration for voice chat functionality
- **UI Components**: Custom components built with Radix UI primitives
- **Animations**: Framer Motion for smooth interactions

### Directory Structure
- `app/` - Next.js App Router pages (home, mutual-funds, personality-test, unlisted-shares)
- `components/` - Reusable React components including UI components in `ui/` subdirectory
- `sections/` - Page-specific section components (HeroSection, InvestmentMethodsSection, etc.)
- `lib/` - Utilities and SDK integrations (Vapi SDK, generated Prisma client)
- `prisma/` - Database schema and migrations
- `public/` - Static assets including mutual fund logos and videos

### Key Integrations
- **Prisma Client**: Generated to `lib/generated/prisma/` (custom output location)
- **Vapi.ai**: Voice AI chatbot integrated globally via ChatCallBot component
- **Database**: Simple Query model for storing user inquiries (fullName, phoneNumber, query)

### Component Architecture
- Global ChatCallBot component loaded in root layout
- Modular section-based page structure
- Custom UI components following shadcn/ui patterns with Tailwind CSS
- Animation wrapper components using Framer Motion

### Environment Requirements
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_VAPI_WEB_TOKEN` - Vapi.ai web token for voice functionality

### Development Notes
- Uses Turbopack for faster development builds
- TypeScript strict mode enabled
- Path aliases configured (`@/*` maps to root directory)
- Prisma generates client to custom location for better organization