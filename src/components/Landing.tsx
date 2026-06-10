'use client';
import { useState, useRef, useCallback } from 'react';
import { parseFile } from '@/lib/parseFile';
import { SAMPLE_DOC } from '@/lib/sampleDoc';
import { ReaderSlider } from './ReaderSlider';
import { Disclaimer } from './Disclaimer';
import { Upload, Doc, Sparkle, Flag, X } from './icons';

interface Props {
  onAnalyze: (text: string) => void;
  level: number;
  setLevel: (l: number) => void;
  busy: boolean;
}

export function Landing({ onAnalyze, level, setLevel, busy }: Props) {
  const [drag, setDrag] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState<{ name: string; size: number; sample?: boolean } | null>(null);
  const [parsing, setParsing] = useState(false);
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    setErr('');
    const f = files?.[0];
    if (!f) return;
    setParsing(true);
    try {
      const { text: t, name } = await parseFile(f);
      setText(t);
      setFile({ name, size: f.size });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Couldn\'t read that file.');
      setFile(null);
    } finally {
      setParsing(false);
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  const loadSample = () => {
    setErr('');
    setText(SAMPLE_DOC.text);
    setFile({ name: SAMPLE_DOC.name, size: SAMPLE_DOC.text.length, sample: true });
  };

  const clearInput = () => {
    setText(''); setFile(null); setErr('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const canGo = text.trim().length > 30 && !busy && !parsing;

  return (
    <div className="fade-up">
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow"><Sparkle s={15} /> Understand any legal document</span>
          <h1>Legal documents, finally in <em>plain language</em>.</h1>
          <p className="lede">
            Drop in a contract, lease, or terms of service. Plainly breaks down what it is, what it asks of you,
            the red flags to watch, and the mistakes people commonly make — in words you actually understand.
          </p>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="card intake">
          <div
            className={`dropzone${drag ? ' drag' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => !file && inputRef.current?.click()}
            style={{ cursor: file ? 'default' : 'pointer' }}
          >
            <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,.md,text/plain,application/pdf"
              style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
            <div className="dz-icon">{parsing ? <span className="spinner" /> : <Upload s={26} />}</div>
            {parsing ? (
              <>
                <p className="dz-title">Reading your document…</p>
                <p className="dz-sub">Pulling the text out so nothing leaves your browser.</p>
              </>
            ) : file ? (
              <>
                <p className="dz-title">Ready to translate</p>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                  <span className="filechip">
                    <Doc s={15} c="#5f4a78" /> {file.name}{file.sample ? ' · sample' : ''}
                    <button onClick={(e) => { e.stopPropagation(); clearInput(); }} aria-label="Remove"><X /></button>
                  </span>
                </div>
              </>
            ) : (
              <>
                <p className="dz-title">Drop a document here</p>
                <p className="dz-sub">or click to browse — PDF, Word, or text</p>
                <div className="dz-formats">
                  <span className="fmt-chip">PDF</span>
                  <span className="fmt-chip">DOCX</span>
                  <span className="fmt-chip">TXT</span>
                  <span className="fmt-chip">≤ 2 MB</span>
                </div>
              </>
            )}
          </div>

          <div className="divider-or">or paste the text</div>

          <textarea
            className="paste-area"
            placeholder="Paste the confusing part here — a clause, a whole contract, anything…"
            value={text}
            onChange={(e) => { setText(e.target.value); if (file && !file.sample) setFile(null); }}
          />

          {err && <div className="error-box" style={{ marginTop: 14 }}><Flag s={16} c="#bb5230" /> {err}</div>}

          <div style={{ marginTop: 18 }}>
            <ReaderSlider level={level} setLevel={setLevel} />
          </div>

          <div className="intake-actions">
            <button className="link-btn" onClick={loadSample}>✦ Try a sample Terms of Service</button>
            <div className="spacer" />
            {text && <button className="btn btn-ghost btn-sm" onClick={clearInput}>Clear</button>}
            <button className="btn btn-primary" disabled={!canGo} onClick={() => onAnalyze(text.trim())}>
              {busy
                ? <><span className="spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.4)' }} /> Translating…</>
                : <><Sparkle s={17} c="#fff" /> Translate to plain language</>}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 22 }}><Disclaimer /></div>
      </div>
    </div>
  );
}
