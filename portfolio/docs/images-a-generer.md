# Images à générer pour le site

Le site a un fond unique et continu, sans image par section. Il reste deux emplacements d'image, détectés au build :
on dépose le fichier dans `public/scenes/`, il apparaît sans toucher au code. Sans fichier, rien ne casse.

## Règles communes

- Style : abstrait, sombre, minimal. Fond quasi noir `#08080a`.
- Palette : bleu `#4d8dff` et violet `#8b7dff`.
- Pas de texte, pas de logo, pas de visage.
- Format : WebP (ou AVIF), poids réduit. Le site est exporté sans optimisation d'images : le poids du fichier est
  le poids servi.

## Fichiers

| Fichier | Où | Idée à demander |
|---|---|---|
| `blog-guide-llm-debutants.webp` | Carte de l'article « Guide pratique des LLM » (16:9, 1280 x 720) | Un réseau stylisé fait de points et de lignes bleues, fond noir. |
| `blog-prompt-engineering-avance.webp` | Carte de l'article « Prompt engineering » (16:9, 1280 x 720) | Un curseur de terminal qui laisse une traînée de lumière violette formant des blocs de texte abstraits. |
| `parcours-marcheur.png` | Personnage qui marche sur le chemin du Parcours | Silhouette de jeune développeur de profil, qui marche vers la droite avec un sac à dos, style illustration plate, **fond transparent**, 600 x 600, PNG. Remplace le portrait rond s'il existe. |

Les cartes d'articles futurs suivent la même règle : `blog-<slug de l'article>.webp`.
