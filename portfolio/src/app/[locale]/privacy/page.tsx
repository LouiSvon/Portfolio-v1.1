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
  return { title: t.privacy.title };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const isFr = locale === "fr";

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.privacy.title}
        </h1>
        <p className="text-xs text-tertiary mt-2">
          {t.privacy.lastUpdated} : 11 mai 2025
        </p>
      </header>

      <div className="prose">
        {isFr ? (
          <>
            <h2 id="donnees">Données collectées</h2>
            <p>
              Ce site collecte uniquement les données que vous fournissez
              volontairement via :
            </p>
            <p>
              - Le <strong>formulaire de contact</strong> : nom, email, sujet,
              message. Ces données sont transmises à Louis Savon pour répondre
              à votre demande.
              <br />
              - Le <strong>formulaire de téléchargement de ressources</strong>{" "}
              : email uniquement. Utilisé pour envoyer le lien de
              téléchargement et, avec votre accord implicite, pour vous informer
              des nouvelles ressources.
            </p>

            <h2 id="cookies">Cookies et traceurs</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de suivi ou de ciblage
              publicitaire. Aucune donnée analytique tiers n&apos;est collectée.
            </p>

            <h2 id="partage">Partage des données</h2>
            <p>
              Vos données ne sont jamais vendues ni partagées avec des tiers à
              des fins commerciales.
            </p>

            <h2 id="droits">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification et de suppression de vos données. Pour exercer ces
              droits, contactez :{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>

            <h2 id="conservation">Conservation des données</h2>
            <p>
              Les données issues du formulaire de contact sont conservées le
              temps nécessaire au traitement de votre demande, puis supprimées.
              Les emails collectés via les ressources sont conservés jusqu&apos;à
              votre désabonnement.
            </p>
          </>
        ) : (
          <>
            <h2 id="donnees">Data collected</h2>
            <p>
              This site only collects data you voluntarily provide via:
            </p>
            <p>
              - The <strong>contact form</strong>: name, email, subject,
              message. This data is transmitted to Louis Savon to respond to
              your request.
              <br />
              - The <strong>resource download form</strong>: email only. Used
              to send the download link and, with your implicit consent, to
              inform you of new resources.
            </p>

            <h2 id="cookies">Cookies and trackers</h2>
            <p>
              This site does not use tracking or advertising cookies. No
              third-party analytics data is collected.
            </p>

            <h2 id="partage">Data sharing</h2>
            <p>
              Your data is never sold or shared with third parties for
              commercial purposes.
            </p>

            <h2 id="droits">Your rights</h2>
            <p>
              In accordance with GDPR, you have the right to access, rectify,
              and delete your data. To exercise these rights, contact:{" "}
              <a href="mailto:louis.savon@epitech.eu">
                louis.savon@epitech.eu
              </a>
            </p>

            <h2 id="conservation">Data retention</h2>
            <p>
              Data from the contact form is kept for the time necessary to
              process your request, then deleted. Emails collected via
              resources are kept until you unsubscribe.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
