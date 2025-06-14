import type { Metadata } from "next";
// import { Geist_Mono, Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import Providers from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { TailwindWidget } from "@/components/tailwind-widget";
import { Locale } from "@/dictionaries";
import { env } from "@/env/server";
import { cn } from "@/lib/utils";

import "../../globals.css";

// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Fynzo",
  description: "Tu compañero fiscal",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          // geistMono.variable,
          // montserrat.variable,
          "text-foreground flex min-h-screen flex-col overflow-auto font-sans antialiased",
        )}
      >
        <Providers>
          <Navbar lang={lang} />
          {children}
          {env.NEXT_PUBLIC_ENVIRONMENT && <TailwindWidget position="right" />}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
