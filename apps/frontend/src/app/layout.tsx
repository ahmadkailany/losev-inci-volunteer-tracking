'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/api/query-client';
import { Toaster } from 'react-hot-toast';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="LÖSEV İncİ Volunteer Tracking System" />
        <title>LÖSEV İncİ - Volunteer Tracking</title>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
