import { Scales } from './icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="brand">
          <div className="brand-mark"><Scales s={21} /></div>
          <div className="brand-name">Plainly<span>Legal Jargon Translator</span></div>
        </div>
        <div className="header-spacer" />
        <div className="header-pill"><span className="dot" /> No sign-in · Nothing stored</div>
      </div>
    </header>
  );
}
