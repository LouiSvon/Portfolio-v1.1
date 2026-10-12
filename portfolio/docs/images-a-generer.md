# Images à générer pour le site

Chaque section a déjà un décor dessiné (lueurs et motif au trait). Une image déposée dans `public/scenes/`
s'ajoute par-dessus, sans toucher au code : le site cherche le fichier au build (en développement, à chaque
requête). Sans fichier, rien ne casse.

## Règles communes (à coller dans chaque prompt)

- Style : abstrait, cinématographique, très sombre, minimal. Fond quasi noir `#08080a`.
- Palette : bleu `#4d8dff`, violet `#8b7dff`, touche orange chaud `#ffb36b`. Rien d'autre.
- Le centre reste calme et peu détaillé : du texte blanc est posé dessus. Les détails vivent sur les bords.
- Pas de texte, pas de logo, pas de visage.
- Pourquoi un fond noir : l'image est affichée en mode « screen » à 45 % d'opacité. Le noir disparaît,
  seules les parties lumineuses se voient, et le texte reste lisible.
- Format : WebP (ou AVIF), 16:9, 2400 x 1350, 250 Ko au plus. Le site est exporté sans optimisation d'images :
  le poids du fichier est le poids servi.

## Fichiers

| Fichier | Section | Idée à demander |
|---|---|---|
| `manifeste.webp` | Phrase d'accroche | Nuit étoilée dont les étoiles sont de minuscules icônes de circuits, reliées par de fins traits lumineux, profondeur de champ. |
| `parcours.webp` | Parcours (fond) | Vue aérienne d'un relief nocturne avec un sentier lumineux qui serpente de la gauche vers la droite, brume bleue. |
| `parcours-ecran.webp` | Fond de l'écran du Mac (16:10, 2400 x 1500) | Fond d'écran abstrait façon macOS : grandes ondes de lumière bleu et violet sur noir, doux, sans détail au centre. |
| `parcours-marcheur.png` | Personnage qui marche sur le chemin | Silhouette de jeune développeur de profil, qui marche vers la droite avec un sac à dos et un ordinateur, style illustration plate, **fond transparent**, 600 x 600, PNG. Remplace le portrait rond s'il existe. |
| `formation.webp` | Formation | Plan d'architecte lumineux (lignes bleues fines, cotes, cercles) sur fond noir, effet blueprint. |
| `competences.webp` | Compétences | Système d'orbites : anneaux lumineux inclinés autour d'un noyau, particules de lumière violette. |
| `projets.webp` | Projets | Atelier futuriste vu de loin : sol en perspective, rayons lumineux, silhouettes d'écrans flottants. |
| `blog.webp` | Blog | Encre lumineuse dans l'eau noire, volutes bleues et touches orange, mouvement doux. |
| `contact.webp` | Contact | Lever de soleil sur l'horizon : halo orange chaud qui monte, ciel bleu nuit. |
| `blog-guide-llm-debutants.webp` | Carte de l'article « Guide pratique des LLM » (16:9, 1280 x 720) | Un cerveau-réseau stylisé fait de points et de lignes bleues, vu de face, fond noir. |
| `blog-prompt-engineering-avance.webp` | Carte de l'article « Prompt engineering » (16:9, 1280 x 720) | Un curseur de terminal qui laisse une traînée de lumière violette formant des blocs de texte abstraits. |

Les cartes d'articles futurs suivent la même règle : `blog-<slug de l'article>.webp`.

## Si l'image ne plaît pas à l'écran

- Trop présente : la rendre plus sombre (le noir pur disparaît).
- Pas assez visible : augmenter le contraste de ses parties lumineuses, pas son fond.
- Pour changer l'opacité globale : `.backdrop-img` dans `src/app/globals.css`.
