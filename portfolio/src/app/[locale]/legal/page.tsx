import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return { title: t.legal.title };
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const isFr = locale === "fr";

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.legal.title}
        </h1>
        <p className="text-xs text-tertiary mt-2">
          {t.legal.lastUpdated} : 11 mai 2025
        </p>
      </header>

      <div className="prose">
        {isFr ? (
          <>
            <h2 id="editeur">Éditeur du site</h2>
            <p>
              Ce site est édité par <strong>Louis Savon</strong>, développeur
              indépendant basé à Marseille, France.
              <br />
              Email de contact :{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>

            <h2 id="hebergement">Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>
              <br />
              340 Pine Street, Suite 701
              <br />
              San Francisco, CA 94104, États-Unis
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
            </p>

            <h2 id="propriete-intellectuelle">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, code, design) est la
              propriété de Louis Savon, sauf mention contraire. Toute
              reproduction sans autorisation écrite préalable est interdite.
            </p>

            <h2 id="responsabilite">Limitation de responsabilité</h2>
            <p>
              Les informations présentées sur ce site sont fournies à titre
              indicatif. Louis Savon ne saurait être tenu responsable des
              erreurs ou omissions, ni de tout dommage résultant de l&apos;utilisation
              des informations publiées.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              Pour toute question relative à ce site :{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 id="editeur">Site publisher</h2>
            <p>
              This site is published by <strong>Louis Savon</strong>,
              independent developer based in Marseille, France.
              <br />
              Contact email:{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>

            <h2 id="hebergement">Hosting</h2>
            <p>
              This site is hosted by <strong>Vercel Inc.</strong>
              <br />
              340 Pine Street, Suite 701
              <br />
              San Francisco, CA 94104, United States
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
            </p>

            <h2 id="propriete-intellectuelle">Intellectual property</h2>
            <p>
              All content on this site (text, code, design) is the property of
              Louis Savon, unless otherwise stated. Any reproduction without
              prior written permission is prohibited.
            </p>

            <h2 id="responsabilite">Liability limitation</h2>
            <p>
              The information presented on this site is provided for
              informational purposes only. Louis Savon cannot be held liable
              for errors or omissions, or for any damage resulting from the use
              of published information.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              For any question about this site:{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
