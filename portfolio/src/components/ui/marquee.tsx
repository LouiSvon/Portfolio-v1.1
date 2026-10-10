// Bandeau qui défile tout seul en boucle, sans pause (CSS pur).
// La liste est doublée pour une boucle sans saut ; la copie est masquée aux lecteurs d'écran.
export function Marquee({
  items,
  label,
  reverse = false,
}: {
  items: string[];
  label: string;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee${reverse ? " reverse" : ""}`}>
      <div className="marquee-track">
        <ul aria-label={label} className="marquee-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="marquee-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
