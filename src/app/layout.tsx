import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plainly — Legal Jargon Translator',
  description: 'Understand any legal document in plain language.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
