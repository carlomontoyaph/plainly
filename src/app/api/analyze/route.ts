import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ANALYSIS_CHAR_LIMIT, MAX_TOKENS, OPENAI_MODEL } from '@/lib/constants';

const client = new OpenAI();

const LEVELS: Record<number, { name: string; guide: string }> = {
  1: { name: 'Simplest', guide: 'Explain like talking to a worried friend with no legal background. Very short sentences, everyday words, no legal terms. Around a 6th-grade reading level.' },
  2: { name: 'Plain English', guide: 'Clear plain English for a general adult reader. Define any unavoidable legal term in parentheses. Around a 9th-grade reading level.' },
  3: { name: 'Detailed', guide: 'Thorough but still plain. Reference section numbers where helpful and include concrete specifics (dollar amounts, deadlines, durations). Still avoid dense legalese.' },
};

function extractJson(s: string) {
  const t = s.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON in response');
  const body = t.slice(start, end + 1);
  try { return JSON.parse(body); }
  catch { return JSON.parse(body.replace(/,\s*([}\]])/g, '$1')); }
}

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (v == null) return [];
  return [String(v)];
}

export async function POST(req: NextRequest) {
  try {
    const { text, level } = await req.json();
    if (!text || typeof text !== 'string') return NextResponse.json({ error: 'Missing text' }, { status: 400 });

    const lv = LEVELS[level as number] ?? LEVELS[2];
    const trimmed = text.length > ANALYSIS_CHAR_LIMIT ? text.slice(0, ANALYSIS_CHAR_LIMIT) + '\n\n[document truncated for analysis]' : text;

    const prompt = `You translate confusing legal documents into plain language for people with NO legal background. Be reassuring and clear. Never give legal advice — only explain what the document says and what to watch for.

READER LEVEL: ${lv.name}. ${lv.guide}

Respond with ONLY a JSON object (no markdown, no commentary), in this exact shape:
{
  "docLabel": "short type label, 1-4 words",
  "docType": "1-2 plain sentences: what this document is and its purpose",
  "summary": ["3 short takeaways, each under 14 words"],
  "requires": ["3-4 things it requires of the reader: obligations, deadlines, costs. Short."],
  "redFlags": [{"flag": "the concern in plain words, under 16 words", "quote": "a 3-8 word phrase copied EXACTLY from the document, or empty string"}],
  "mistakes": ["3 common mistakes people make with this kind of document"]
}
Give 3-4 redFlags about unusual clauses, hidden fees, auto-renewals, rights you give up, or one-sided terms. Each "quote" must appear verbatim in the document. Be concise.

DOCUMENT:
"""
${trimmed}
"""`;

    const completion = await client.chat.completions.create({
      model: OPENAI_MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    const data = extractJson(raw);

    const rawFlags = Array.isArray(data.redFlags) ? data.redFlags : [];
    return NextResponse.json({
      docLabel: (data.docLabel || 'Legal Document').toString().trim(),
      docType: (data.docType || '').toString().trim(),
      summary: asArray(data.summary),
      requires: asArray(data.requires),
      redFlags: rawFlags.map((f: unknown) =>
        typeof f === 'string' ? { flag: f, quote: '' } : { flag: String((f as any).flag || ''), quote: String((f as any).quote || '') }
      ).filter((f: any) => f.flag),
      mistakes: asArray(data.mistakes),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
