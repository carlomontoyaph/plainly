# Validation Plan — Plainly

Run these checks before merging any change or deploying to production.

## 1. TypeScript Check

```bash
npx tsc --noEmit
```

Expected: zero errors. This validates types across the entire codebase, including the API route and all components.

## 2. Build Check

```bash
npm run build
```

Expected: completes without errors. This validates the canvas alias configuration, all imports, and that no client-only code leaks into the server bundle.

## 3. Manual Smoke Test

Start the dev server (`npm run dev`) and work through this checklist:

### Landing page
- [ ] Page loads at http://localhost:3000 with no console errors
- [ ] Header and upload zone are visible
- [ ] Reading level slider defaults to Plain English (level 2)
- [ ] Reading level blurb updates when slider moves
- [ ] "Try a sample Terms of Service" link is visible

### File upload
- [ ] Drag-and-drop a PDF → file chip appears, Translate button enables
- [ ] Click file picker, select a DOCX → same
- [ ] Click file picker, select a TXT → same
- [ ] Upload a file over 2 MB → error message appears below the dropzone
- [ ] Upload a `.doc` (legacy Word) → error message explains .docx is required
- [ ] Remove the file chip (click ×) → Translate button disables

### Text paste
- [ ] Paste 30+ characters into textarea → Translate button enables
- [ ] Paste fewer than 30 characters → Translate button stays disabled
- [ ] Paste text and also have a file selected → both work; text takes precedence when both present is not possible (file replaces paste, paste clears file)

### Sample document
- [ ] Click "Try a sample Terms of Service" → file chip appears with sample name
- [ ] Translate the sample → analysis appears with all five sections populated
- [ ] Red flag quotes are highlighted in the left (original document) pane
- [ ] Short quotes (< 4 characters) are not highlighted

### Results page
- [ ] All five sections render: document type, nutshell, what it asks, red flags, common mistakes
- [ ] Reading level control is visible at the top
- [ ] Moving the slider and clicking "Re-translate" fires a new request at the new level
- [ ] "New document" button returns to the landing page with empty state

### Actions
- [ ] Copy button → clipboard contains a plain-text breakdown
- [ ] Save button → a `.txt` file downloads and opens with correct content

### Mobile
- [ ] Resize browser to < 768px → results layout stacks vertically without overflow
- [ ] Landing page fits on mobile without horizontal scroll

### Error and fallback
- [ ] With an invalid `OPENAI_API_KEY` in `.env.local`: translate the sample document → fallback breakdown appears (no error shown), a toast may appear
- [ ] With an invalid `OPENAI_API_KEY`: translate any non-sample text → error state appears with a "Try again" button

## 4. OriginalPane Highlight Behavior

Verify with the sample document after a successful analysis:

- Quoted phrases from red flags appear highlighted (`<mark>` styling) in the left pane
- Quotes shorter than 4 characters are not highlighted
- If the same quote appears twice in red flags, it is highlighted only once in the document

## 5. No Automated Suite

There is currently no Jest or Playwright test suite. The manual checklist above is the only automated-equivalent validation. Adding automated tests is tracked in [MVP_SCOPE.md](MVP_SCOPE.md) as a deferred quality item.
