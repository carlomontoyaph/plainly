# AI Context — Plainly

Plainly is a Next.js 16 / React 19 legal document analyzer that translates legal jargon into plain English using OpenAI's `gpt-4o-mini`. File parsing runs client-side; only extracted text is sent to the server.

## Critical invariants

1. **OpenAI response shape is load-bearing.** The prompt in `route.ts` specifies an exact JSON structure. If you change the prompt, you must also update `extractJson()`, `asArray()`, and the response-mapping block (lines 65-75) in the same file. The five fields (`docLabel`, `docType`, `summary`, `requires`, `redFlags`, `mistakes`) map directly to the `AnalysisResult` type in `src/lib/types.ts`.

2. **`dangerouslySetInnerHTML` in `OriginalPane.tsx` is safe.** The `esc()` function HTML-encodes the raw document text before any manipulation. The only HTML tags injected afterward are `<mark>…</mark>` wrappers around regex-matched quote substrings. Do not change this without understanding the escaping chain.

3. **Both canvas aliases in `next.config.ts` must remain.** `pdfjs-dist` conditionally imports `canvas`; without the stub, the Next.js build fails.
   ```ts
   turbopack: { resolveAlias: { canvas: './src/lib/empty.ts' } }
   webpack: (config) => { config.resolve.alias.canvas = false; return config; }
   ```
   The two aliases target different bundlers. Removing either one breaks PDF parsing in that mode.

4. **`localStorage` key `'plainly_level'` is load-bearing.** `page.tsx` reads this key on mount to restore the user's last-used reading level. Do not rename it without a migration.

5. **`sampleDoc.ts` text must not be silently reformatted.** The fallback check in `page.tsx` is `text.trim() === SAMPLE_DOC.text.trim()`. If the sample text changes formatting (extra whitespace, different line endings), the fallback silently stops working and the sample document returns an error instead of the demo breakdown.

6. **`LEVELS` stays in `route.ts`.** The `guide` strings in the `LEVELS` map are prompt-engineering content, not display labels. Moving them to `constants.ts` would mix server API concerns with UI constants.

## Known `any` usages (tracked, not bugs)

| Location | Context |
|----------|---------|
| `src/components/Breakdown.tsx:26` | `renderItem={(f: any) =>` — `f` is a `RedFlag` object. Fix: import `RedFlag` from `@/lib/types` and replace `any`. |
| `src/app/api/analyze/route.ts:72-73` | `(f as any).flag` — `f` has already been narrowed to non-string at this point. Acceptable as-is; a stricter fix would use a type guard. |

## Architecture in three sentences

The browser parses uploaded files (PDF via `pdfjs-dist`, DOCX via `mammoth`, TXT via `FileReader`) and extracts plain text. That text is POSTed to `/api/analyze`, which builds a structured prompt and calls OpenAI, returning a typed `AnalysisResult` JSON object. React components in `src/components/` render the result, with `OriginalPane.tsx` highlighting verbatim red-flag quotes in the original text.

## Key files at a glance

| File | Responsibility |
|------|---------------|
| `src/app/page.tsx` | State hub — owns `view`, `docText`, `result`, `loading`, `error`, `level` |
| `src/app/api/analyze/route.ts` | OpenAI call, prompt construction, response parsing |
| `src/lib/parseFile.ts` | Client-side PDF/DOCX/TXT text extraction |
| `src/lib/constants.ts` | All shared magic numbers, model name, level labels |
| `src/lib/types.ts` | `AnalysisResult`, `RedFlag`, `View`, `Level` |
| `src/lib/sampleDoc.ts` | Hardcoded demo document + fallback analysis result |
| `src/components/Landing.tsx` | File upload, paste input, reading level selector |
| `src/components/Results.tsx` | Results container, copy/download actions |
| `src/components/OriginalPane.tsx` | Left pane — original text with red flag highlights |
| `src/components/Breakdown.tsx` | Right pane — five plain-language sections |
| `src/lib/empty.ts` | Canvas stub for pdfjs-dist build compatibility |
| `next.config.ts` | Canvas aliases (Turbopack + Webpack) + ngrok dev origins |
