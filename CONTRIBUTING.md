# Contributing — Plainly

## Setup

Follow the [README](README.md) getting-started steps. You need Node 18+, an OpenAI API key in `.env.local`, and `npm install`.

## Key conventions

**TypeScript strict mode is on.** Do not use `any` in new code. Two known `any` usages exist in the current codebase (`Breakdown.tsx:26`, `route.ts:72-73`) and are tracked issues — do not add more.

**No new external dependencies without discussion.** The dependency surface is intentionally small: Next.js, React, OpenAI SDK, `pdfjs-dist`, `mammoth`. Adding a new package should come with a clear justification.

**Shared constants belong in `src/lib/constants.ts`.** If you add a magic number, file size limit, model name, or level label, put it there.

**Shared types belong in `src/lib/types.ts`.** The `AnalysisResult`, `RedFlag`, `View`, and `Level` types define the data contract between the API and UI.

## File locations

| What | Where |
|------|-------|
| New UI components | `src/components/` |
| Shared logic / helpers | `src/lib/` |
| Shared types | `src/lib/types.ts` |
| Shared constants | `src/lib/constants.ts` |
| Custom hooks (no JSX) | `src/hooks/` |
| API routes | `src/app/api/<name>/route.ts` |

## Code style

There is no linter configuration yet. Follow the existing style:
- Single quotes for strings
- 2-space indentation
- Trailing semicolons
- `'use client'` at the top of any component that uses browser APIs or hooks

## Adding a reading level

If a new reading level is ever added, every one of these must change — missing any one will cause a mismatch:

1. `LEVELS` map in `src/app/api/analyze/route.ts` (add the prompt guide string)
2. `LEVEL_LABELS` and `LEVEL_BLURBS` in `src/lib/constants.ts`
3. `min`/`max` on the range `<input>` in `src/components/ReaderSlider.tsx` and `src/components/ResultsReader.tsx`
4. `Level` type in `src/lib/types.ts`

## Testing

There is no automated test suite. Before merging, run the manual checklist:

- [ ] Upload a PDF — file chip appears, Translate button enables
- [ ] Upload a DOCX — same
- [ ] Upload a TXT — same
- [ ] Paste text (30+ chars) — Translate button enables
- [ ] Paste text (under 30 chars) — Translate button stays disabled
- [ ] File over 2 MB — error message appears
- [ ] Click "Try a sample Terms of Service" — sample chip appears
- [ ] Translate the sample — all five sections populate
- [ ] Change reading level slider — "Re-translate" button appears; clicking it fires a new request
- [ ] Copy button — clipboard contains formatted breakdown
- [ ] Save button — `.txt` file downloads
- [ ] "New document" button — returns to landing with empty state
- [ ] Resize to mobile (< 768px) — layout stacks without overflow

Also run:

```bash
npx tsc --noEmit   # zero TypeScript errors
npm run build      # production build succeeds
```

## Pull requests

- Describe any behavior change in the PR body
- If you change the OpenAI prompt wording, document the reason — prompt changes affect output quality and JSON reliability in non-obvious ways
- Keep PRs focused; avoid mixing documentation changes with code changes
