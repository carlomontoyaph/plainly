'use client';
import { useState, useRef, useCallback } from 'react';
import { Check } from './icons';

export function useToast() {
  const [msg, setMsg] = useState('');
  const tRef = useRef<ReturnType<typeof setTimeout>>(null);
  const show = useCallback((m: string) => {
    setMsg(m);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setMsg(''), 2200);
  }, []);
  const node = <div className={`toast${msg ? ' show' : ''}`}><Check s={16} c="#ecca84" /> {msg}</div>;
  return [show, node] as const;
}
