import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getDirection } from "@/lib/i18n";
import { getLocale, getTheme } from "@/lib/i18n-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://felorance.example"),
  title: {
    default: "Felorance Jewelry | استودیو فلورنس",
    template: "%s | Felorance",
  },
  description:
    "Luxury silver jewelry studio with curated collections, editorial content, and a client concierge.",
  openGraph: {
    title: "Felorance Jewelry",
    description:
      "Luxury silver jewelry studio with curated collections, editorial content, and a client concierge.",
    url: "https://felorance.example",
    siteName: "Felorance Jewelry",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felorance Jewelry",
    description:
      "Luxury silver jewelry studio with curated collections, editorial content, and a client concierge.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
      "en-US": "/?lang=en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();
  const direction = getDirection(locale);
  const theme = getTheme();

  return (
    <html lang={locale} dir={direction} data-theme={theme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
