'use client';
import { useState, useEffect } from 'react';
import { LEVEL_LABELS } from '@/lib/constants';

interface Props { level: number; onApply: (l: number) => void; busy: boolean; }

export function ResultsReader({ level, onApply, busy }: Props) {
  const [pending, setPending] = useState(level);
  // Sync pending when parent updates level (e.g. after a re-translate completes)
  useEffect(() => { setPending(level); }, [level]);
  const changed = pending !== level;
  return (
    <div className="results-reader">
      <span className="rr-label">Reading level</span>
      <input className="rc-range rr-range" type="range" min="1" max="3" step="1" value={pending}
        disabled={busy} onChange={(e) => setPending(Number(e.target.value))} aria-label="Reading level" />
      <div className="rr-ticks">
        {[1, 2, 3].map((i) => (
          <span key={i} className={pending === i + 1 ? 'on' : ''} onClick={() => !busy && setPending(i + 1)}>{LEVEL_LABELS[i]}</span>
        ))}
      </div>
      <button className={`btn btn-sm ${changed ? 'btn-gold' : 'btn-ghost'}`} disabled={!changed || busy} onClick={() => onApply(pending)}>
        {busy ? 'Working…' : changed ? 'Re-translate' : 'Current'}
      </button>
    </div>
  );
}
