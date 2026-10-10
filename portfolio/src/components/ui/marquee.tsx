// Bandeau qui défile tout seul en boucle, sans pause (CSS pur).
// La liste est répétée 4 fois (boucle sans saut même sur très grand écran) ; les copies sont masquées aux lecteurs d'écran.
export function Marquee({
  items,
  label,
  reverse = false,
  accent = false,
}: {
  items: string[];
  label: string;
  reverse?: boolean;
  // Rangée mise en avant (outils IA) : texte bleu.
  accent?: boolean;
}) {
  return (
    <div className={`marquee${reverse ? " reverse" : ""}${accent ? " accent" : ""}`}>
      <div className="marquee-track">
        <ul aria-label={label} className="marquee-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {[1, 2, 3].map((copy) => (
          <ul key={copy} aria-hidden="true" className="marquee-list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
