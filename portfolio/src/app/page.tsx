import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}`} />
      <a
        href={`/${defaultLocale}`}
        className="text-sm font-medium text-accent hover:underline underline-offset-4"
      >
        Entrer sur le site
      </a>
    </main>
  );
}
