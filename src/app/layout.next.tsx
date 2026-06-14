import '../index.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
  title: 'Eductools - Philippine Educational Portal',
  description: 'Interactive visualizers and programmatic SEO portal for Philippine education.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en" data-theme="dark">
      <body className="bg-base-100 text-base-content font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
