import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/ui/contact-form";

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="16" height="12" rx="1.5"/>
      <path d="M2 5l8 7 8-7"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 2C5.58 2 2 5.68 2 10.22c0 3.67 2.32 6.78 5.54 7.88.4.07.55-.18.55-.4 0-.19-.01-.84-.01-1.53-2.03.38-2.56-.51-2.72-.97-.09-.23-.48-.97-.82-1.17-.28-.15-.69-.53-.01-.54.64-.01 1.1.6 1.25.85.73 1.26 1.9.9 2.36.69.07-.54.28-.9.52-1.11-1.8-.21-3.69-.92-3.69-4.1 0-.9.31-1.64.83-2.23-.08-.21-.36-1.05.08-2.2 0 0 .68-.22 2.23.85A7.6 7.6 0 0110 6.8c.69 0 1.38.1 2.03.28 1.55-1.07 2.23-.85 2.23-.85.44 1.15.16 1.99.08 2.2.52.59.83 1.32.83 2.23 0 3.19-1.9 3.89-3.7 4.1.29.26.55.76.55 1.53 0 1.11-.01 2-.01 2.28 0 .22.15.48.56.4A8.04 8.04 0 0018 10.22C18 5.68 14.42 2 10 2z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M5.77 7.32H3.14v8.14h2.63V7.32zM4.46 3.2a1.52 1.52 0 100 3.04 1.52 1.52 0 000-3.04zm10.4 7.57c0-2.46-1.31-3.6-3.07-3.6a2.65 2.65 0 00-2.39 1.31h-.04V7.32H6.83v8.14h2.57v-4.02c0-1.06.2-2.09 1.52-2.09 1.3 0 1.31 1.22 1.31 2.16v3.95h2.57v-4.69z"/>
    </svg>
  );
}

// Contact : l'appel final. Le titre grandit en arrivant ; disponibilité, canaux directs et formulaire.
export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const isAvailable = profile.available !== false;

  return (
    <section id="contact" className="screen" aria-labelledby="contact-titre">
      <div className="shell">
        <h2 id="contact-titre" className="cta-xl scale-in text-primary">{t.contact.title}</h2>
        <p className="section-subtitle fade-in !mt-0 mb-12">{t.contact.subtitle}</p>
        <div className="contact-layout">
          <div className="fade-in">
            <p className="availability !mt-0">
              <span className={`availability-dot${isAvailable ? "" : " busy"}`} aria-hidden="true" />
              <span>{isAvailable ? t.contact.availabilityText : t.contact.unavailableText}</span>
            </p>

            <div className="contact-links">
              <a href={`mailto:${profile.email}`} className="contact-link">
                <MailIcon />
                {profile.email}
              </a>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="panel fade-in">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
