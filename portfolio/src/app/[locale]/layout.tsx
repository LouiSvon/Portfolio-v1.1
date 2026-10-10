import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { profile } from "@/data/profile";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { FadeObserver } from "@/components/ui/fade-observer";
import type { Locale } from "@/types";
import "../globals.css";

// Ce layout est le layout racine : il porte <html> pour que l'attribut lang suive la langue de la route.

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: "dark",
  initialScale: 1,
  themeColor: "#0a0a0a",
  width: "device-width",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) return {};

  const t = getTranslations(locale);

  return {
    title: {
      default: `${profile.name} — ${t.hero.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.tagline[locale],
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: `${profile.name} — ${t.hero.role}`,
      description: profile.tagline[locale],
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {/* Restore accent color before first paint — no flash */}
        <Script
          id="accent-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var a=localStorage.getItem('accent-color');if(a)document.documentElement.style.setProperty('--accent',a)}catch(e){}`,
          }}
        />
        <a href="#main" className="skip-link">
          {getTranslations(locale as Locale).nav.skip}
        </a>
        <FadeObserver />
        <ScrollProgress />
        <Header locale={locale as Locale} />
        <main id="main" className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
