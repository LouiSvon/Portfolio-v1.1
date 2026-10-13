# Progression : refonte visuelle (branche feature/refonte-visuelle)

But : appliquer la liste de retours de Louis du 12/10/2026.
Critères : typecheck, lint, build passent ; captures 1440 et 375 de chaque section ; plus de bandeaux ni de
« En ce moment » ; FR et EN synchronisés ; animations coupées avec « réduire les animations ».
Règle git : ajouter par chemins explicites (le dépôt a des fichiers sans rapport non commités : `../.gitignore`,
`node_modules 2`, `docs/`, `src/components/ui/theme-toggle.tsx`). Un commit par demande.

## Demandes
- [x] 1. Bouton « LS » supprimé (garder un lien accueil sur les pages intérieures)
- [x] 2. Phrase d'accroche plus attractive (FR + EN)
- [x] 3. Logos du fond : dérive lente, comme des étoiles
- [x] 4. Bandeaux de stack supprimés (code mort compris)
- [x] 5. « En ce moment » supprimé ; section Blog : articles de droite à gauche au scroll (garder id `articles`)
- [x] 6. Header redessiné
- [x] 7. Formation : refonte (études + certifications, sans colonne de droite)
- [x] 8. Compétences : nouvelle forme et nouvel emplacement
- [x] 9. Décors imagés par section (procéduraux + emplacement d'image + prompts pour le générateur)
- [x] 10. Parcours : Mac qui s'ouvre au scroll, chemin tracé, portrait qui avance (repli : frise actuelle)

## Décisions
- Décors : procéduraux (SVG/CSS) ; image optionnelle `public/scenes/<section>.webp` détectée au build.
- Parcours : piste épinglée Motion (`useScroll`), pas `animation-timeline`.

## État (12/10/2026)
Faits et commités sur feature/refonte-visuelle : 1 à 10. QA faite (typecheck, lint, build, export Netlify, captures
1440 / 800 / 375, page article). Relecture faite, corrections commitées (marcheur aligné, focus blog, dock dès 1024 px,
CSS mort, theme-toggle.tsx sorti du suivi). À valider : images de public/scenes après revalidation sur Netlify.
Dev : `npm run dev -- --webpack` (Turbopack servait un CSS périmé après plusieurs modifications).

## Chantier 2 : performance, fond unifié, épinglage (branche feature/perf-scroll-unifie)
- [x] 1. Diagnostic mesuré (docs/perf-diagnostic.md) : rotation infinie d'un SVG plein écran = repeinture à chaque
      frame ; JS Motion à chaque frame. Corrigé, mesures avant / après dans le même document.
- [x] 2. Fond unique et continu (calque fixe 100lvh), décors par section supprimés.
- [x] 3. Brique commune PinTrack (piste en svh, scène sticky, étapes par IntersectionObserver).
- [x] 4. Accroche : mot à mot, mots clés colorés (dictionnaire, vérifiés au build).
- [x] 5. Parcours : feux macOS, écran noir, durées calculées, phrases clés tirées des descriptions.
- [x] 6. Formation sur un écran (vérifié 1280x720, 1024x768, 1920x1080), domaines en avant.
- [x] 7. Compétences sans doublon (nombre d'outils au centre).
- [x] 8. Blog épinglé dès 768 px, un article à la fois ; rangée glissable sur mobile.
Décisions mobile : Parcours en frise sous 1024 px (Mac illisible) ; Formation dans le flux sous 1024 px ;
Blog en rangée sous 768 px ; Accroche, Compétences et Contact épinglés partout (sauf écran bas < 600 px ou
animations réduites). Contact : seule la phase titre est épinglée (clavier virtuel mobile sur le formulaire).
Relecture faite (4 défauts, 0 bloquant), corrigés : mots clés de l'accroche doublés dans le texte (calque en
::after), étape périmée après un saut (recalage à l'entrée à l'écran), titre du Parcours sur l'écran du Mac en
repli et cartes superposées avant hydratation, marge du blog épinglé jamais appliquée. Débordement des scènes
mesuré à 360x600, 768x600, 1024x700, 1440x900 : 0 px partout (témoin positif détecté). Export Netlify fait.
Poussé. Reste : rapport. Réduire les animations vérifié (docs/perf-diagnostic.md). Non vérifié : Safari / WebKit, appareils réels.

## Chantier 3 : vitrine recruteur, points 10 à 15 (branche feature/vitrine-recruteur, 13/10/2026)
But : un recruteur comprend en dix secondes qui, quoi, quoi chercher ; projets, CV, certifications vérifiables ; contact en un clic.
- [x] Contact en un clic dans la navigation, CV rappelé en fin de page (c2e2f64)
- [x] Première vue : phrase métier, durée du stage ; mesuré 1440x900, 375x667, 360x640, 0 px de débordement
- [x] Projets : rôle prouvé, stack conforme aux README (a62c328)
- [x] Noms GDG et certificats, confidentialité (e3b6b0e)
- [x] Image d'aperçu par langue, export Netlify en PNG (20e4a09)
- [x] Rapport : docs/rapport-vitrine-recruteur.md (questions Q1 à Q12, incohérences CV, légal)
Reste : réponses de Louis (Q1 à Q12), CV Canva à refaire (FR et EN), fusion dans main (site en ligne = ancienne version).
