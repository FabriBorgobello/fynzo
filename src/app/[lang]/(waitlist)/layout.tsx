import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";

import { Locale } from "@/dictionaries";
import { cn } from "@/lib/utils";

import "../../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fynzo - Waitlist",
  description: "Tu compañero fiscal",
};

export default async function WaitlistLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn(geistMono.variable, montserrat.variable)}>{children}</body>
    </html>
  );
}
