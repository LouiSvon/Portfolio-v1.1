# Progression : refonte visuelle (branche feature/refonte-visuelle)

But : appliquer la liste de retours de Louis du 12/10/2026.
Critères : typecheck, lint, build passent ; captures 1440 et 375 de chaque section ; plus de bandeaux ni de
« En ce moment » ; FR et EN synchronisés ; animations coupées avec « réduire les animations ».
Règle git : ajouter par chemins explicites (le dépôt a des fichiers sans rapport non commités : `../.gitignore`,
`node_modules 2`, `docs/`, `src/components/ui/theme-toggle.tsx`). Un commit par demande.

## Demandes
- [ ] 1. Bouton « LS » supprimé (garder un lien accueil sur les pages intérieures)
- [ ] 2. Phrase d'accroche plus attractive (FR + EN)
- [ ] 3. Logos du fond : dérive lente, comme des étoiles
- [ ] 4. Bandeaux de stack supprimés (code mort compris)
- [ ] 5. « En ce moment » supprimé ; section Blog : articles de droite à gauche au scroll (garder id `articles`)
- [ ] 6. Header redessiné
- [ ] 7. Formation : refonte (études + certifications, sans colonne de droite)
- [ ] 8. Compétences : nouvelle forme et nouvel emplacement
- [ ] 9. Décors imagés par section (procéduraux + emplacement d'image + prompts pour le générateur)
- [ ] 10. Parcours : Mac qui s'ouvre au scroll, chemin tracé, portrait qui avance (repli : frise actuelle)

## Décisions
- Décors : procéduraux (SVG/CSS) ; image optionnelle `public/scenes/<section>.webp` détectée au build.
- Parcours : piste épinglée Motion (`useScroll`), pas `animation-timeline`.
