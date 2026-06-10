# Architecture — Plainly

## Overview

Plainly is a single-page Next.js application with no database and no authentication. All state is ephemeral. Two client-side views — **landing** and **results** — are toggled by a `view` state variable in `src/app/page.tsx`. The only server-side code is the OpenAI API route at `src/app/api/analyze/route.ts`.

## Request Flow

```
User uploads file or pastes text
        │
        ▼
src/lib/parseFile.ts          (runs in the browser)
  PDF  → pdfjs-dist           dynamic import, CDN worker
  DOCX → mammoth              dynamic import
  TXT  → FileReader API
        │
        │  extracted text (string)
        ▼
src/app/page.tsx              (client component, state hub)
  - truncates to 6 000 chars
  - reads level from state
        │
        │  POST /api/analyze  { text, level }
        ▼
src/app/api/analyze/route.ts  (server-side, runs on Node)
  - builds structured prompt
  - calls OpenAI gpt-4o-mini
  - parses JSON via extractJson()
        │
        │  AnalysisResult JSON
        ▼
src/components/Results.tsx
  ├── OriginalPane.tsx         left pane — original text with <mark> highlights
  └── Breakdown.tsx            right pane — five plain-language sections
```

## Client-Side Parsing

File parsing runs entirely in the browser. Binary files are never sent to the server — only the extracted text string crosses the network. This avoids file storage requirements and improves privacy.

**Limits enforced in `parseFile.ts`:**
- Max file size: 2 MB (`MAX_FILE_SIZE_BYTES`)
- Max PDF pages processed: 40 (`MAX_PDF_PAGES`)
- Scanned PDFs (< 50 chars extracted): rejected with a clear error message

**pdf.js CDN worker:** `parseFile.ts` sets `workerSrc` to the Cloudflare CDN URL for `pdf.worker.min.js`, pinned to match `pdfjs-dist@3.11.174`. Both versions must be kept in sync. Switching to a bundled worker requires build configuration changes and is deferred.

## API Route (`src/app/api/analyze/route.ts`)

Accepts `POST { text: string, level: 1 | 2 | 3 }`.

1. Validates `text` is present
2. Resolves the `LEVELS` map entry for the requested level (falls back to level 2)
3. Trims text to `ANALYSIS_CHAR_LIMIT` (6 000 chars) to stay within token limits
4. Builds a structured prompt that instructs the model to return a specific JSON shape
5. Calls `client.chat.completions.create()` (OpenAI SDK reads `OPENAI_API_KEY` from env)
6. Parses the response with `extractJson()` — handles markdown code fences and trailing commas common in LLM output
7. Returns a validated `AnalysisResult` object

**`LEVELS` map:** stays in `route.ts` because its `guide` strings are prompt-engineering content, not display labels. Moving them would mix API and UI concerns.

**`extractJson()`:** a defensive JSON parser. It strips markdown fences, finds the outermost `{}`, and falls back to a trailing-comma repair pass if `JSON.parse` fails. This exists because LLMs occasionally wrap JSON in code blocks or leave trailing commas.

## Reading Levels

| Level | Name | Audience |
|-------|------|----------|
| 1 | Simplest | ~6th grade, no legal terms |
| 2 | Plain English | General adult, default |
| 3 | Detailed | Thorough, with section refs and specifics |

Level 2 is the default because most users want clarity over simplification. The level choice is persisted to `localStorage` under key `plainly_level` and restored on next visit.

## Fallback Behavior

If the OpenAI call fails **and** the submitted text matches the sample document (`text.trim() === SAMPLE_DOC.text.trim()` in `page.tsx`), the app silently returns `SAMPLE_DOC.breakdown` instead of showing an error. This lets the app function as a demo without a valid API key. For any other text, a failure shows an error with a retry button.

## State Management

All UI state lives in `src/app/page.tsx` as `useState` hooks:

| State variable | Type | Purpose |
|----------------|------|---------|
| `view` | `'landing' \| 'results'` | Which page is shown |
| `docText` | `string` | Extracted document text |
| `result` | `AnalysisResult \| null` | Analysis output |
| `loading` | `boolean` | API call in progress |
| `error` | `string` | Error message |
| `level` | `1 \| 2 \| 3` | Current reading level |

There is no global state, context, or external store. `level` is also persisted to `localStorage`.

## CSS Architecture

A single global stylesheet (`src/app/globals.css`) provides the entire design system via CSS custom properties:

- **Color palette:** Plum (primary), Gold (accent), Cream (background), Ink (text)
- **Typography:** Spectral (serif display) + Mulish (sans-serif UI), both from Google Fonts
- **Design tokens:** `--radius-sm/md/lg`, `--shadow-sm/md/lg`, `--max-w`
- **No external CSS framework** — no Tailwind, no CSS modules, no styled-components

## Notable Workarounds

### Canvas alias
`next.config.ts` aliases `canvas` to `src/lib/empty.ts` in both Webpack and Turbopack. `pdfjs-dist` conditionally requires `canvas` for Node-side rendering; the stub prevents build failures. **Both aliases must remain.**

```ts
// next.config.ts — do not remove either alias
turbopack: { resolveAlias: { canvas: './src/lib/empty.ts' } }
webpack: (config) => { config.resolve.alias.canvas = false; return config; }
```

### OriginalPane highlight safety
`OriginalPane.tsx` uses `dangerouslySetInnerHTML`. It is safe because:
1. The `esc()` function HTML-encodes the raw document text before any manipulation
2. The only HTML injected afterward is `<mark>…</mark>` wrappers around matched quote substrings
3. If a quote string contains regex-special characters, the `try/catch` around the replace silently skips that quote rather than throwing

## Key Constants (`src/lib/constants.ts`)

| Constant | Value | Used in |
|----------|-------|---------|
| `MAX_FILE_SIZE_BYTES` | `2 * 1024 * 1024` | `parseFile.ts` |
| `MAX_PDF_PAGES` | `40` | `parseFile.ts` |
| `ANALYSIS_CHAR_LIMIT` | `6000` | `route.ts` |
| `MAX_TOKENS` | `1024` | `route.ts` |
| `OPENAI_MODEL` | `'gpt-4o-mini'` | `route.ts` |
| `LEVEL_LABELS` | `{ 1: 'Simplest', … }` | `ReaderSlider.tsx`, `ResultsReader.tsx` |
| `LEVEL_BLURBS` | `{ 1: '…', … }` | `ReaderSlider.tsx` |
