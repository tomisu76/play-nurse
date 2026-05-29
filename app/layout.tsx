import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Nursing English Voice Trainer',
  description: 'Simple OSCE Voice Practice for nursing English communication.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
