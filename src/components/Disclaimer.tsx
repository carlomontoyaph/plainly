import { Info } from './icons';

export function Disclaimer() {
  return (
    <div className="disclaimer">
      <Info s={18} c="#a9772a" />
      <div>
        <strong>This is information, not legal advice.</strong> Plainly explains what a document says in everyday language —
        it can be wrong or incomplete. For decisions that affect your rights, money, or safety, consult a licensed attorney before you act or sign.
      </div>
    </div>
  );
}
