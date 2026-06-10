# Plainly

A legal document analyzer that translates legal jargon into plain English using OpenAI.

Upload or paste any legal document — a lease, employment contract, terms of service, or NDA — and Plainly breaks it down into five plain-language sections: what the document is, a quick summary, what it requires of you, red flags to watch, and common mistakes people make.

> **Plainly explains documents — it is not legal advice and does not create an attorney-client relationship.**

## What it does

- **Upload or paste** — drag-and-drop PDF, DOCX, or TXT files (up to 2 MB), or paste text directly
- **Three reading levels** — Simplest (6th-grade), Plain English (default), Detailed
- **Five output sections** — document type, nutshell summary, obligations/deadlines/costs, red flags with verbatim quotes, common mistakes
- **Privacy-first** — file parsing runs entirely in the browser; only the extracted text goes to the API
- **No account required** — no login, no storage, no tracking

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, custom CSS |
| AI | OpenAI `gpt-4o-mini` |
| PDF parsing | `pdfjs-dist` (client-side) |
| DOCX parsing | `mammoth` (client-side) |

## Prerequisites

- Node.js 18 or later
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Getting started

```bash
# 1. Clone the repo
git clone <repo-url>
cd plainly-app

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OpenAI API key

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Server-side OpenAI key — never use `NEXT_PUBLIC_` prefix |

See `.env.example` for the template.

## Project structure

```
src/
├── app/                    Next.js App Router
│   ├── api/analyze/        POST endpoint — calls OpenAI, returns AnalysisResult
│   ├── globals.css         Full design system (CSS custom properties)
│   ├── layout.tsx          Root HTML layout
│   └── page.tsx            Main client component, state orchestration
├── components/             React UI components
└── lib/
    ├── constants.ts        Shared constants (limits, model name, level labels)
    ├── types.ts            TypeScript interfaces (AnalysisResult, RedFlag, etc.)
    ├── parseFile.ts        Client-side PDF/DOCX/TXT parsing
    ├── sampleDoc.ts        Hardcoded sample document + analysis for demo/fallback
    └── empty.ts            Canvas stub required for pdfjs-dist build compatibility
```

## Architecture note

`next.config.ts` aliases the `canvas` module to `src/lib/empty.ts` for both Webpack and Turbopack. This stub is required because `pdfjs-dist` conditionally imports `canvas` in some environments; without the alias, the Next.js build fails. Do not remove either alias.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server (requires a prior build) |

## Deployment

Deploy to Vercel or any Node.js host that supports Next.js API routes. Set `OPENAI_API_KEY` as a server-side environment variable in your deployment platform. No database or file storage is required.

## Further reading

- [ARCHITECTURE.md](ARCHITECTURE.md) — system design, request flow, key decisions
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) — problem, users, value proposition
- [CONTRIBUTING.md](CONTRIBUTING.md) — development conventions and workflow
- [AI_CONTEXT.md](AI_CONTEXT.md) — critical invariants for AI coding agents
