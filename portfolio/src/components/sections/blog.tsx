import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { articles } from "@/data/articles";
import { sceneImage } from "@/lib/scenes";
import { SectionHeading } from "@/components/ui/section-heading";
import { PinTrack } from "@/components/ui/pin-track";
import { MediaSlot } from "@/components/ui/media-slot";

// Teinte propre à chaque article, tirée de son identifiant : deux articles ne se ressemblent jamais.
function hue(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

// Blog, section épinglée dès 768 px : la page s'arrête, les articles se présentent l'un après l'autre
// (le suivant arrive par la droite, le précédent part à gauche), puis le défilement reprend.
// Petit écran ou animations réduites : rangée glissable au doigt, accrochée sur chaque carte.
// Tous les articles restent dans la page et focalisables. L'id « articles » est la cible de l'ancienne
// page /blog (old-pages.json).
export function BlogSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PinTrack id="articles" labelledBy="articles-titre" steps={Math.max(sorted.length, 1)} step={50} tail={20} mode="md" stageClassName="blog-stage">
      <div className="shell blog-head">
        <SectionHeading id="articles-titre" title={t.blog.title} subtitle={t.blog.subtitle} />
        {sorted.length > 1 && (
          <ol className="blog-dots" aria-hidden="true">
            {sorted.map((article, i) => (
              <li key={article.slug} data-from={i} />
            ))}
          </ol>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="shell text-sm text-secondary">{t.articles.noArticles}</p>
      ) : (
        <div className="blog-viewport">
          <ul className="blog-rail">
            {sorted.map((article, i) => (
              <li key={article.slug} className="blog-item" data-at={i} data-step={i}>
                <article
                  className="panel group relative flex h-full flex-col !p-0 overflow-hidden"
                  style={{ "--h": hue(article.slug) } as React.CSSProperties}
                >
                  <div className="blog-visual">
                    <MediaSlot
                      src={sceneImage(`blog-${article.slug}`)}
                      alt=""
                      hint={`public/scenes/blog-${article.slug}.webp`}
                      width={1280}
                      height={720}
                      sizes="(min-width: 768px) 40rem, 85vw"
                      className="blog-img"
                    />
                    <span className="blog-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-3 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                      <time dateTime={article.date}>{formatFullDate(article.date, locale)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime} {t.articles.readingTime}</span>
                    </p>
                    <h3 className="panel-title mb-3 !text-2xl sm:!text-3xl">
                      <Link
                        href={`/${locale}/blog/${article.slug}`}
                        className="transition-colors duration-(--dur-fast) after:absolute after:inset-0 group-hover:text-accent"
                      >
                        {article.title[locale]}
                      </Link>
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-secondary sm:text-base">{article.summary[locale]}</p>
                    <div className="mt-auto flex items-end justify-between gap-4">
                      {article.tags.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <li key={tag} className="chip">{tag}</li>
                          ))}
                        </ul>
                      )}
                      <span className="proj-cta shrink-0" aria-hidden="true">
                        {t.blog.read} <span className="arrow">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PinTrack>
  );
}
