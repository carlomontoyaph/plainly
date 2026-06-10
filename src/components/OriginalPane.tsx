'use client';
import { useMemo } from 'react';
import { Doc } from './icons';

interface Props { text: string; quotes: string[]; }

export function OriginalPane({ text, quotes }: Props) {
  const html = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let out = esc(text);
    const seen = new Set<string>();
    (quotes || []).forEach((q) => {
      const clean = (q || '').trim();
      if (clean.length < 4 || seen.has(clean.toLowerCase())) return;
      seen.add(clean.toLowerCase());
      const escQ = esc(clean).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Quote may contain regex-special chars; silently skip if the pattern is invalid
      try { out = out.replace(new RegExp(escQ, 'i'), (m) => `\x01${m}\x02`); } catch { /* intentional */ }
    });
    out = out.replace(/\x01/g, '<mark>').replace(/\x02/g, '</mark>');
    return out;
  }, [text, quotes]);

  return (
    <div className="pane">
      <div className="pane-head">
        <div className="ph-icon" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}><Doc s={15} c="#8b8295" /></div>
        <div>
          <h3>Original document</h3>
          <p className="ph-sub">Highlighted phrases are flagged on the right →</p>
        </div>
      </div>
      <div className="orig-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
