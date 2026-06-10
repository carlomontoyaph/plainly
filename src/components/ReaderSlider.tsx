'use client';
import { LEVEL_LABELS, LEVEL_BLURBS } from '@/lib/constants';

interface Props { level: number; setLevel: (l: number) => void; compact?: boolean; }

export function ReaderSlider({ level, setLevel, compact }: Props) {
  return (
    <div className="reader-control" style={compact ? { padding: '13px 16px' } : undefined}>
      <div className="rc-head">
        <span className="rc-label">Reading level</span>
        <span className="rc-value">{LEVEL_LABELS[level]}</span>
      </div>
      <input className="rc-range" type="range" min="1" max="3" step="1" value={level}
        onChange={(e) => setLevel(Number(e.target.value))} aria-label="Reading level" />
      <div className="rc-ticks">
        {[1, 2, 3].map((i) => (
          <span key={i} className={level === i ? 'on' : ''} onClick={() => setLevel(i)}>{LEVEL_LABELS[i]}</span>
        ))}
      </div>
      {!compact && <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>{LEVEL_BLURBS[level]}</p>}
    </div>
  );
}
