# Product Vision — Plainly

## Vision Statement

Plainly makes legal documents understandable to anyone, instantly, without a lawyer.

## Design Principles

**Privacy first.** File parsing is client-side. Only extracted text leaves the device. No documents are stored, no accounts are created, no analytics are collected. A user who is nervous about sharing a sensitive document should be able to use Plainly with confidence.

**Plain before thorough.** The default reading level is Plain English (level 2), not the most detailed. Most users want clarity, not depth. Level 1 exists for users who struggle with any jargon. Level 3 exists for users preparing to engage a lawyer or negotiate specific terms.

**Actionable over comprehensive.** The five output sections are not a summary — they are a decision-support tool. Each section is designed to answer a question the user would actually ask before signing.

## Why These Five Sections

| Section | Design rationale |
|---------|-----------------|
| **What this document is** | Orients the user before they read anything else. Many people don't know what kind of agreement they've been given. |
| **In a nutshell** | A three-point scannable summary for users who need the gist in 30 seconds. |
| **What it asks of you** | Surfaces obligations, deadlines, and costs — the things most likely to cause regret if missed. |
| **Red flags to watch** | Concerns paired with verbatim quotes from the document. The quote anchors the abstract concern to specific language the user can point to. |
| **Common mistakes** | Proactive — tells users what people typically get wrong with this type of document so they can avoid it. |

## Reading Levels Philosophy

Level 2 (Plain English) is the right default for most users. Level 1 (Simplest) is for users with lower reading confidence, non-native speakers, or anyone who wants no jargon at all. Level 3 (Detailed) is for users who want to understand the specifics before deciding whether to involve an attorney — it includes section references and dollar amounts. The three levels use the same structure; only the language register changes.

## Privacy Model

- **File parsing:** `pdfjs-dist` and `mammoth` run in the browser. No file bytes leave the device.
- **Text transmission:** Only the extracted text string is sent to `/api/analyze`.
- **Server:** The Next.js API route calls OpenAI and discards all data. Nothing is logged or stored.
- **Client:** No cookies. No analytics. `localStorage` stores only the selected reading level (an integer).

## Potential Future Directions

These are speculative and not committed to any roadmap. They are listed to give future contributors a sense of where the product might go.

- **Clause-by-clause mode** — highlight and explain individual clauses on click
- **Document comparison** — side-by-side analysis of two versions of a contract
- **Export to PDF** — save the plain-language breakdown as a formatted PDF
- **Multi-page results** — separate views for each of the five sections instead of a single scrolling page
- **Analytics** — understand which document types are most common, which red flags appear most often
