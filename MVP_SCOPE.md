# MVP Scope — Plainly

## In Scope (currently implemented)

- Upload PDF files (up to 2 MB, up to 40 pages) via drag-and-drop or file picker
- Upload DOCX files (up to 2 MB)
- Upload TXT / plain text files
- Paste text directly into the textarea
- Client-side text extraction (PDF via `pdfjs-dist`, DOCX via `mammoth`)
- Send extracted text to OpenAI `gpt-4o-mini` via `/api/analyze`
- Three reading levels: Simplest, Plain English (default), Detailed
- Five output sections: document type, nutshell, obligations, red flags with verbatim quotes, common mistakes
- Red flag quotes highlighted in the original document pane
- Copy plain-language breakdown to clipboard
- Download plain-language breakdown as `.txt`
- Sample Terms of Service for demo / no-API-key fallback
- Reading level persisted to `localStorage`
- Mobile-responsive layout

## Out of Scope

These are explicitly excluded from the MVP and are not partially implemented:

- User accounts / authentication
- Document history or saved analyses
- Multi-document comparison
- Fine-tuned or custom models
- Multi-language support (input and output are English only)
- API access for third-party integrations
- Export to PDF or Word
- Clause-by-clause interactive mode
- Usage analytics or tracking

## Technical Decisions Made for MVP Speed

| Decision | Rationale |
|----------|-----------|
| No database | Eliminates infrastructure complexity; all state is ephemeral |
| No authentication | Reduces attack surface and onboarding friction |
| Client-side file parsing | Avoids file upload handling, storage, and privacy concerns |
| Hardcoded model name (`gpt-4o-mini`) | Intentional; model selection affects prompt behavior and cost |
| Single structured prompt | Simpler to maintain and debug than multi-turn conversations |
| No linter config | Avoided mid-prototype to prevent style churn |
| No test suite | Deferred; manual smoke test covers the critical paths |

## Deferred Quality Items

These are known issues that are intentionally left for a later iteration:

| Issue | Location | Notes |
|-------|----------|-------|
| `any` type on `renderItem` | `src/components/Breakdown.tsx:26` | `f` is a `RedFlag`; fix is a one-line type import |
| `any` casts in response mapping | `src/app/api/analyze/route.ts:72-73` | Acceptable for MVP; stricter fix uses a type guard |
| CDN-loaded pdf.js worker | `src/lib/parseFile.ts:28` | Should be a self-hosted or bundled worker for production reliability |
| No automated test suite | — | Jest + Playwright would cover the core flows |
| Silent error swallowing in `extractJson` | `src/app/api/analyze/route.ts:19` | Retry pass hides real JSON errors; add logging before production |
