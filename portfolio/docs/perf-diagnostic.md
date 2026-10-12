# Diagnostic de performance (12/10/2026)

## Conditions de mesure

- Build de production (`npm run build` puis `npm run start`), Chrome piloté par chrome-devtools.
- Processeur bridé x4 (repère d'un mobile milieu de gamme). Le mode développement n'est pas représentatif
  (React et Motion non minifiés, rechargement à chaud) : aucune mesure n'y a été faite.
- Trois gabarits : desktop 1440 x 900 (DPR 2), tablette 1024 x 768 (DPR 2, tactile), mobile 390 x 844 (DPR 3, tactile).
- Scénario identique avant et après : défilement scripté de toute la page, 24 px par frame
  (`requestAnimationFrame` + `scrollBy`), trace Performance enregistrée pendant le défilement.
- Analyse des traces brutes par script (événements `Paint`, `RasterTask`, `GPUTask`, `FireAnimationFrame`, etc.).
- Non mesuré : Safari / WebKit et appareils réels. `lighthouse_audit` de l'outil exclut la performance :
  les LCP et CLS ci-dessous viennent des traces de chargement, pas d'un score Lighthouse.

## Ce qui n'est pas en cause

Cadence des frames vue par le thread principal, défilement section par section à 20 px par frame :
p95 de 8,4 à 9,2 ms par frame dans toutes les sections, desktop et mobile, avec ou sans bridage x4,
aucune « long animation frame » attribuable à un script pendant le défilement. Le JavaScript ne bloque pas.

## Cause racine trouvée

**Le décor « orbites » de la section Compétences fait tourner un groupe SVG plein écran par une animation CSS
infinie (`.backdrop-spin` sur un `<g>`).** Une animation de `transform` sur un élément interne d'un SVG n'est pas
prise en charge par le compositeur : Chrome repeint tout le SVG (1440 x 900, masqué en dégradé) à chaque frame.
Comme l'animation est infinie, cette repeinture tourne en permanence, sur toute la page, que la section soit à
l'écran ou non. À l'arrivée dans Compétences s'y ajoutent les halos floutés (`filter: blur(40px)` sur des disques
de 60rem) et le masque du décor, ce qui alourdit la rastérisation sur un GPU modeste.

Preuve par A/B isolé (seule différence : un style injecté qui coupe `.backdrop-spin`), même défilement de la section
Compétences, desktop x4 :

| | Rotation active | Rotation coupée |
|---|---|---|
| Repeintures du SVG de décor | 357 (une par frame) | 0 |
| Événements `Paint` au total | 1190 | 494 |
| Temps de peinture (thread principal) | 165 ms | 105 ms |
| Repeintures du document | 355 | 159 |

Défilement de toute la page, avant correction (repeintures du SVG / frames dessinées) :
desktop 616 / 733, tablette 587 / 642, mobile 655 / 561 (plusieurs peintures par frame sur mobile).

## Causes secondaires mesurées

- JavaScript lié au défilement (Motion : `useScroll`, `useSpring`, `useTransform`, `useMotionValueEvent`) :
  `FireAnimationFrame` = 2,4 ms par frame à x4 en desktop, 1,8 ms en mobile. Plusieurs composants recalculent à
  chaque frame (Parcours, Compétences, Blog, Projets, Frise).
- Cartes de projets empilées : échelle et voile écrits par Motion à chaque frame (443 à 454 repeintures de
  `.stack-card` sur la page).
- Points d'étape du Parcours : transition de `transform` sur des éléments non composités (282 à 299 repeintures).
- `will-change` posé en permanence sur `.mac`, `.blog-rail` et `.stack-card`.

## Chargement (avant)

- Desktop sans bridage : LCP 65 ms, CLS 0.
- Mobile 390 x 844, x4, réseau « Slow 4G » : LCP 727 ms, CLS 0.
- Serveur local : le réseau réel n'est pas représenté.

## Corrections (voir PROGRESSION.md et les commits)

1. Supprimer la rotation du SVG et tous les décors par section (fond unique, fixe, sans animation).
2. États des sections épinglées pilotés par IntersectionObserver (mise à jour seulement aux frontières),
   effets continus en CSS lié au défilement avec repli, plus de Motion à chaque frame.
3. Retirer les `will-change` permanents.

## Mesures après

Voir la section « Après » ajoutée en fin de chantier.
