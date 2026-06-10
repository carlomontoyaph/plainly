import type { AnalysisResult, RedFlag } from '@/lib/types';
import { SectionCard } from './SectionCard';
import { Check, List, Flag, Bulb, Shield } from './icons';

interface Props { result: AnalysisResult; }

export function Breakdown({ result }: Props) {
  return (
    <div className="breakdown stagger">
      <div className="summary-card">
        <div className="sc-eyebrow">In a nutshell</div>
        <h3>{result.docType}</h3>
        <ul>
          {result.summary.map((s, i) => (
            <li key={i}><Check s={16} c="#ecca84" /> <span>{s}</span></li>
          ))}
        </ul>
      </div>

      <SectionCard accent="requires" icon={<List s={18} c="#5f4a78" />}
        title="What it asks of you" sub="Obligations · deadlines · costs" items={result.requires} />

      <SectionCard accent="flag" icon={<Flag s={18} c="#bb5230" />}
        title="Red flags to watch" sub="Unusual or one-sided terms"
        items={result.redFlags}
        renderItem={(item: unknown) => {
          const f = item as RedFlag;
          return (<><span className="bullet" /><span>{f.flag}{f.quote ? <span style={{ display: 'block', marginTop: 4, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic' }}>&#34;{f.quote}&#34;</span> : null}</span></>);
        }} />

      <SectionCard accent="mistakes" icon={<Bulb s={18} c="#a9772a" />}
        title="Common mistakes people make" sub="So you don't get caught out" items={result.mistakes} />

      <div className="disclaimer" style={{ marginTop: 2 }}>
        <Shield s={18} c="#a9772a" />
        <div><strong>Reminder:</strong> this is a plain-language explanation, not legal advice. Before you sign or act, have a licensed attorney review anything that affects your rights or money.</div>
      </div>
    </div>
  );
}
