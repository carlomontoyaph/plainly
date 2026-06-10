# Project Overview — Plainly

## Problem Statement

Legal documents are deliberately opaque. Terms of service, leases, employment agreements, and NDAs are written to be legally precise — not humanly readable. Most people sign without understanding what they are agreeing to. Existing options are unsatisfying: hiring a lawyer is expensive, generic "summarize" tools miss obligations and red flags, and legal dictionaries require the reader to already know what to look for.

## Solution

Plainly gives anyone a structured plain-language breakdown of any legal document in seconds. The output is organized into five sections chosen to answer the questions people actually ask before signing:

| Section | Answers |
|---------|---------|
| **What this document is** | What kind of agreement is this, and why does it exist? |
| **In a nutshell** | What are the 3 most important things to know? |
| **What it asks of you** | What am I required to do, pay, or avoid? When? |
| **Red flags to watch** | What's unusual, one-sided, or easy to miss? (with exact quotes) |
| **Common mistakes** | What do people typically get wrong with this type of document? |

## Target Users

- **Renters** reviewing a residential lease before signing
- **Employees** reviewing an employment agreement, NDA, or non-compete
- **Consumers** who receive a terms of service they actually want to understand
- **Small-business owners** reviewing vendor contracts, MSAs, or SOWs

## Core Value Pillars

**Privacy first.** File parsing runs entirely in the browser using `pdfjs-dist` and `mammoth`. Only the extracted text string is sent to the API. No files are uploaded. No documents are stored. No account is required.

**Accessibility.** Three reading levels let users choose the right depth: Simplest (6th-grade language, no legal terms), Plain English (clear adult language, the default), and Detailed (thorough, with section references and specific figures).

**Actionability.** The five output sections are chosen because they lead to action — knowing obligations prevents missed deadlines; red flags with verbatim quotes let users point to specific language when asking questions; common mistakes are proactive rather than retrospective.

## Non-Goals

- **Not legal advice.** Plainly explains what a document says. It does not give legal opinions, recommend courses of action, or create an attorney-client relationship.
- **Not a document storage service.** Documents are never persisted. Each session is stateless.
- **Not a comparison tool.** Plainly analyzes one document at a time.
- **Not a multi-language tool.** Input and output are English only.

## Current Status

Working MVP. The full analysis flow is functional end-to-end: file upload/paste → parsing → OpenAI analysis → rendered breakdown. No authentication, no database, no analytics. Ready for user testing.
