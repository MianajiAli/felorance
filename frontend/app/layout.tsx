import type { Metadata } from "next";
import { Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SettingsProvider } from "@/components/SettingsProvider";
import { getServerSettings } from "@/lib/server-settings";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://felorance.example"),
  title: {
    default: "Felorance Jewelry | فروشگاه جواهرات فلورنس",
    template: "%s | Felorance Jewelry",
  },
  description:
    "فروشگاه آنلاین زیورآلات نقره و سنگ‌های قیمتی فلورنس با تجربه خرید دو زبانه، مدیریت سفارش و پنل ادمین.",
  keywords: [
    "jewelry",
    "silver",
    "persian jewelry",
    "فروشگاه جواهرات",
    "زیورآلات نقره",
    "online shop",
  ],
  openGraph: {
    title: "Felorance Jewelry",
    description: "Dual-language jewelry storefront with curated collections and concierge service.",
    url: "https://felorance.example",
    siteName: "Felorance Jewelry",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felorance Jewelry",
    description: "Shop modern silver jewelry with Persian + English support.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language, theme } = await getServerSettings();
  return (
    <html lang={language} dir={language === "fa" ? "rtl" : "ltr"} data-theme={theme} suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${playfair.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <SettingsProvider>
          <Header />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
