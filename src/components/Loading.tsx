'use client';
import { useEffect, useState } from 'react';

const MSGS = [
  'Reading the whole document…',
  'Spotting obligations and deadlines…',
  'Looking for red flags and one-sided clauses…',
  'Rewriting it in plain language…',
];

export function Loading() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % MSGS.length), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="breakdown loading-wrap">
      <div className="thinking"><span className="spinner" /> {MSGS[i]}</div>
      <div className="summary-card" style={{ minHeight: 150 }}>
        <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 16, opacity: .5 }} />
        <div className="skeleton" style={{ height: 12, width: '90%', marginBottom: 10, opacity: .4 }} />
        <div className="skeleton" style={{ height: 12, width: '80%', marginBottom: 10, opacity: .4 }} />
        <div className="skeleton" style={{ height: 12, width: '85%', opacity: .4 }} />
      </div>
      {[0, 1, 2].map((k) => (
        <div className="sec-card" key={k} style={{ padding: 18 }}>
          <div className="skeleton" style={{ height: 14, width: '35%', marginBottom: 14 }} />
          <div className="skeleton" style={{ height: 11, width: '92%', marginBottom: 9 }} />
          <div className="skeleton" style={{ height: 11, width: '78%' }} />
        </div>
      ))}
    </div>
  );
}
