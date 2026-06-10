import type { ReactNode } from 'react';

interface Props {
  accent: string;
  icon: ReactNode;
  title: string;
  sub: string;
  items: unknown[];
  renderItem?: (item: unknown) => ReactNode;
}

export function SectionCard({ accent, icon, title, sub, items, renderItem }: Props) {
  if (!items || !items.length) return null;
  return (
    <div className={`sec-card acc-${accent}`}>
      <div className="sec-head">
        <div className="sec-icon">{icon}</div>
        <h4 className="sec-title">{title}<small>{sub}</small></h4>
      </div>
      <div className="sec-body">
        <ul>
          {items.map((it, i) => (
            <li key={i}>{renderItem ? renderItem(it) : (<><span className="bullet" /><span>{it as string}</span></>)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
