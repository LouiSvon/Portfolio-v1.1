import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";

// « En ce moment » : quatre lignes d'état, le pont entre le récit et le contact.
export function NowSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  // Cibles des lignes : le projet phare en cours, puis les sections de la page.
  const targets = {
    project: { href: `https://github.com/${profile.github}/pass-gdg`, external: true },
    articles: { href: "#articles", external: false },
    contact: { href: "#contact", external: false },
  };

  return (
    <section id="maintenant" className="screen" aria-labelledby="maintenant-titre">
      <div className="shell">
        <SectionHeading id="maintenant-titre" title={t.now.title} />
        <ul>
          {t.now.items.map((item) => {
            const content = (
              <>
                <span className="eyebrow now-label">
                  <span className="now-dot" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="now-text">{item.text}</span>
                {item.link && <span className="now-arrow" aria-hidden="true">&rarr;</span>}
              </>
            );
            const target = item.link ? targets[item.link] : null;
            return (
              <li key={item.label} className="fade-in">
                {!target ? (
                  <div className="now-row">{content}</div>
                ) : (
                  <a
                    href={target.href}
                    {...(target.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="now-row is-link"
                  >
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
