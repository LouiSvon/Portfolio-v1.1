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
Faits et commités sur feature/refonte-visuelle : 1 à 10. Reste : QA (build, mobile 375, réduction des animations,
page article), relecture par le sous-agent `relecteur`, rapport final.
Dev : `npm run dev -- --webpack` (Turbopack servait un CSS périmé après plusieurs modifications).
