import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Microcredit Bank",
  description: "Multilingual microcredit bank website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
