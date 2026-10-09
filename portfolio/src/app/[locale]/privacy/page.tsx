import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales, formatFullDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { FORM_PROCESSOR, LEGAL_LAST_UPDATED } from "@/lib/legal";

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
          {t.privacy.lastUpdated} : {formatFullDate(LEGAL_LAST_UPDATED, locale)}
        </p>
      </header>

      <div className="prose">
        {isFr ? (
          <>
            <h2 id="responsable">Responsable du traitement</h2>
            <p>
              {profile.name}, joignable à{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>

            <h2 id="donnees">Données collectées</h2>
            <p>
              Ce site collecte uniquement les données que vous saisissez dans le
              <strong> formulaire de contact</strong> : prénom, email, sujet,
              message et, si vous la donnez, une note du site. Elles servent
              uniquement à répondre à votre demande.
            </p>

            <h2 id="destinataires">Destinataires</h2>
            <p>
              Les messages du formulaire de contact sont acheminés par{" "}
              <strong>{FORM_PROCESSOR.name}</strong>, prestataire d&apos;envoi de
              formulaires, avant d&apos;arriver dans ma boîte email. Voir sa{" "}
              <a href={FORM_PROCESSOR.privacyUrl} target="_blank" rel="noopener noreferrer">
                politique de confidentialité
              </a>
              . Vos données ne sont ni vendues ni partagées à d&apos;autres fins.
            </p>

            <h2 id="cookies">Cookies et stockage local</h2>
            <p>
              Ce site n&apos;utilise ni cookie de suivi, ni cookie publicitaire,
              ni outil d&apos;analytique. Il utilise seulement :
              <br />
              - un cookie <code>locale</code>, posé quand vous changez de langue,
              pour mémoriser ce choix pendant un an ;
              <br />
              - une entrée de stockage local <code>accent-color</code>, si vous
              choisissez une couleur d&apos;accent.
            </p>

            <h2 id="droits">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification et de suppression de vos données. Pour les exercer,
              écrivez à{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>

            <h2 id="conservation">Conservation des données</h2>
            <p>
              Les messages sont conservés le temps nécessaire au traitement de
              votre demande, puis supprimés. Les durées de conservation propres
              à {FORM_PROCESSOR.name} sont décrites dans sa politique.
            </p>
          </>
        ) : (
          <>
            <h2 id="responsable">Data controller</h2>
            <p>
              {profile.name}, reachable at{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>

            <h2 id="donnees">Data collected</h2>
            <p>
              This site only collects the data you enter in the
              <strong> contact form</strong>: first name, email, subject,
              message and, if you give it, a rating of the site. It is used only
              to answer your request.
            </p>

            <h2 id="destinataires">Recipients</h2>
            <p>
              Contact form messages are delivered by{" "}
              <strong>{FORM_PROCESSOR.name}</strong>, a form processing
              provider, before reaching my inbox. See its{" "}
              <a href={FORM_PROCESSOR.privacyUrl} target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>
              . Your data is never sold or shared for any other purpose.
            </p>

            <h2 id="cookies">Cookies and local storage</h2>
            <p>
              This site uses no tracking cookies, no advertising cookies and no
              analytics. It only uses:
              <br />
              - a <code>locale</code> cookie, set when you switch language, to
              remember that choice for one year;
              <br />
              - an <code>accent-color</code> local storage entry, if you pick an
              accent color.
            </p>

            <h2 id="droits">Your rights</h2>
            <p>
              In accordance with GDPR, you have the right to access, rectify,
              and delete your data. To exercise these rights, write to{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>

            <h2 id="conservation">Data retention</h2>
            <p>
              Messages are kept for the time needed to handle your request, then
              deleted. Retention periods specific to {FORM_PROCESSOR.name} are
              described in its policy.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
