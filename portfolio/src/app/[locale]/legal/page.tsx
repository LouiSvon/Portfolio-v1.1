import type { Metadata } from "next";
import { alternatesFor } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales, formatFullDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { HOST, LEGAL_LAST_UPDATED } from "@/lib/legal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return { title: t.legal.title, alternates: alternatesFor(locale, "/legal") };
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const isFr = locale === "fr";
  const hostAddress = isFr ? HOST.address : HOST.addressEn;

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.legal.title}
        </h1>
        <p className="text-xs text-tertiary mt-2">
          {t.legal.lastUpdated} : {formatFullDate(LEGAL_LAST_UPDATED, locale)}
        </p>
      </header>

      <div className="prose">
        {isFr ? (
          <>
            <h2 id="editeur">Éditeur du site</h2>
            <p>
              Ce site est édité par <strong>{profile.name}</strong>, personne
              physique, à titre non professionnel.
              <br />
              Email de contact :{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>

            <h2 id="hebergement">Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>{HOST.name}</strong>
              {hostAddress.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
              <br />
              <a href={HOST.url} target="_blank" rel="noopener noreferrer">
                netlify.com
              </a>
            </p>

            <h2 id="propriete-intellectuelle">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, code, design) est la
              propriété de {profile.name}, sauf mention contraire. Toute
              reproduction sans autorisation écrite préalable est interdite.
            </p>

            <h2 id="responsabilite">Limitation de responsabilité</h2>
            <p>
              Les informations présentées sur ce site sont fournies à titre
              indicatif. {profile.name} ne saurait être tenu responsable des
              erreurs ou omissions, ni de tout dommage résultant de l&apos;utilisation
              des informations publiées.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              Pour toute question relative à ce site :{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </>
        ) : (
          <>
            <h2 id="editeur">Site publisher</h2>
            <p>
              This site is published by <strong>{profile.name}</strong>, a
              private individual, on a non-professional basis.
              <br />
              Contact email:{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>

            <h2 id="hebergement">Hosting</h2>
            <p>
              This site is hosted by <strong>{HOST.name}</strong>
              {hostAddress.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
              <br />
              <a href={HOST.url} target="_blank" rel="noopener noreferrer">
                netlify.com
              </a>
            </p>

            <h2 id="propriete-intellectuelle">Intellectual property</h2>
            <p>
              All content on this site (text, code, design) is the property of
              {" "}{profile.name}, unless otherwise stated. Any reproduction without
              prior written permission is prohibited.
            </p>

            <h2 id="responsabilite">Liability limitation</h2>
            <p>
              The information presented on this site is provided for
              informational purposes only. {profile.name} cannot be held liable
              for errors or omissions, or for any damage resulting from the use
              of published information.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              For any question about this site:{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
