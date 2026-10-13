# Vitrine recruteur : audit des points 10 à 15

Date : 13 octobre 2026. Branche : `feature/vitrine-recruteur`. Regard : un recruteur ou un responsable technique qui découvre le site.
Légende : **vérifié** (mesure, commande ou page consultée, preuve donnée) ; **supposé** (déduction, à confirmer).

## 0. À lire d'abord

1. **Le site en ligne n'est pas cette branche.** `louis-savon.netlify.app/fr` affiche encore l'ancien titre « Étudiant en informatique, full-stack et IA », les sections « En bref / Projets phares / Contact », aucun formulaire, aucune image de partage (vérifié dans le navigateur le 13/10/2026). Toutes les corrections ci-dessous ne seront visibles qu'après fusion dans `main` et déploiement. C'est à vous de le décider (Q1).
2. **Le CV PDF est le plus gros écart** : il date d'avril 2026 et contredit le site sur l'année d'études, les dates du freelance et la durée du voyage (section 12). Il se corrige dans Canva, pas dans le code.
3. **Ce qui manque pour conclure** : le type de poste visé, les dates réelles du freelance, votre rôle dans jobaggregator, une version anglaise du CV (section « À fournir »).

## 1. Corrections faites (4 commits)

| Commit | Point | Changement | Fichiers |
|---|---|---|---|
| `c2e2f64` | 14, 12, 10 | Email, GitHub, LinkedIn dans le dock et le menu mobile ; CV rappelé dans Contact et le pied de page ; fichier enregistré sous `Louis_Savon_CV.pdf` ; phrase « Je conçois des applications web et des outils d'IA. » en première vue ; « Stage de 3 mois » dans la pastille ; libellé EN « Download my resume (PDF, French) » | `social-links.tsx`, `header.tsx`, `mobile-navigation.tsx`, `footer.tsx`, `contact.tsx`, `hero.tsx`, `education.tsx`, `profile.ts`, `fr.ts`, `en.ts` |
| `a62c328` | 11 | Rôle affiché quand il est prouvé ; stack de pass-gdg conforme au README (SQLite, pas Supabase) ; problème résolu dans l'accroche de pass-gdg et TokenTrex | `highlights.ts`, `project-scene.tsx`, `projects.tsx` |
| `e3b6b0e` | 13, 14 | « GDG Marseille » au lieu de « Google Developers Group » ; titres FR des certificats Plan B alignés sur leur page de vérification ; confidentialité : retrait d'une « note du site » que le formulaire ne collecte pas | `benevol.ts`, `certifications.ts`, `privacy/page.tsx`, `legal.ts` |
| `20e4a09` | 15 | Image d'aperçu 1200x630 par langue (portrait, rôle, métier, disponibilité), carte `summary_large_image` ; l'export Netlify sert l'image en PNG | `opengraph-image.tsx`, `layout.tsx`, `page.tsx`, `build-netlify-drop.mjs` |

Contrôles passés (vérifié) : `npm run typecheck`, `npm run lint` (0 erreur, 0 avertissement), `npm run build`, `npm run build:netlify-drop` (sortie 0, `out/fr/opengraph-image` : « PNG image data, 1200 x 630 »).

## 10. Test des 10 secondes

**État : passe, sauf le domaine du poste.**

Première vue mesurée sur le build de production local (`next start`), sans défiler :

| Fenêtre | Qui | Ce que je fais | Ce que je cherche | CV visible | Contact visible | Débordement |
|---|---|---|---|---|---|---|
| 1440x900 (FR) | Louis Savon, Étudiant en informatique, spécialité IA | Je conçois des applications web et des outils d'IA. | Stage de 3 mois dès avril 2027 · Alternance 2027-2028 | oui | oui | 0 px |
| 375x667 (EN) | idem | I build web applications and AI tools. | 3-month internship from April 2027 · Work-study 2027-2028 | oui | oui | 0 px |
| 360x640 (FR) | idem | idem | pastille sur deux lignes, coupée au point médian | oui | oui | 0 px |

Preuve : sonde `getBoundingClientRect` sur `.hero-screen a[download]` et `a[href="#contact"]`, `scrollWidth - innerWidth = 0`. Avant correction, la pastille allongée mesurait 385 px pour 375 px d'écran : corrigé par la coupure au point médian.

**Reste ouvert (Q2)** : le site dit « stage » sans dire **de quoi**. Un recruteur ne sait pas si vous visez du développement web, de l'IA, de la data ou autre chose. L'ancien rapport évoquait aussi le conseil. Je n'ai rien ajouté : l'information n'est nulle part dans le site ni le CV.

**Supposé** : « spécialité IA » n'apparaît ni dans le CV (« Bachelor informatique ») ni dans la description Epitech du site (« web, systèmes, données et IA »). Si ce n'est pas l'intitulé officiel, un recruteur qui vérifie peut y voir une exagération (Q3).

## 11. Projets et réalisations

Liens vérifiés le 13/10/2026 (README lu sur GitHub pour chacun).

| Projet | Problème (site) | Rôle | Stack | Résultat concret | Lien |
|---|---|---|---|---|---|
| Carte de membre GDG Marseille (`pass-gdg`) | Gérer les adhérents et vérifier une carte par QR code signé | Développeur bénévole au GDG Marseille (source : CV) | Next.js, TypeScript, SQLite, Vitest (README) | **absent** : pas d'utilisateurs ni de mise en ligne indiqués ; le README ne donne qu'une adresse locale | code : oui ; démo : non |
| Agrégateur d'offres d'emploi (`jobaggregator`) | Offres réunies, filtrables, statistiques du marché | **absent** : projet Epitech B-YEP-200, équipe et rôle non indiqués | Next.js, TypeScript, PostgreSQL, Docker | **absent** | code : oui ; démo : non |
| TokenTrex | Voir l'usage d'un abonnement d'IA sans ouvrir le navigateur (README) | Projet personnel : conception et développement | Swift, SwiftUI, AppKit | **absent** ; 0 étoile | code : oui ; démo : non |

Ordre conservé : la carte GDG d'abord (seul projet avec un usage réel annoncé, pour une association), puis le projet d'école, puis l'outil personnel. C'est un jugement, pas une mesure.

Problèmes relevés, non corrigés faute d'information :
- **TokenTrex** : le README dit de télécharger `TokenTrex.dmg` depuis la page Releases, qui est vide (« no releases », vérifié). Un recruteur qui clique tombe sur une promesse non tenue. Publier une release ou retirer la phrase du README.
- **pass-gdg** : la description GitHub dit « Pass MVP (stage) », le site et le CV disent bénévolat. Lequel est juste (Q6) ?
- **Aucun visuel** : les trois cartes ont un emplacement d'image vide (`public/projets/<dépôt>.webp`). Le README de TokenTrex contient déjà des GIF et captures réutilisables.
- **Liste « Voir tous les projets »** (dépôts GitHub hors projets phares) : `site-full-stack` s'affiche sans description ; `Taxe-calculator` garde une description vague (« interface simple, rapide et orientée usage ») alors que GitHub dit « Premier site en vibe coding (clode caude) + test des skills » ; `claude-code-mods` a une description sans accents (« taches », « etat »). À trier (Q7).
- **Écart CV / site** : le CV met en avant Halo Widget et « Token Widget » ; le site met en avant TokenTrex et ne mentionne Halo que dans la liste repliée. Le CV cite aussi du scraping, un système de scoring et des graphiques pour jobaggregator, absents du README et du site.

## 12. CV

Fichier : `public/Louis_Savon.pdf`. Mesures (vérifié, `pdfinfo`, `pdffonts`, `pdfimages`, `pdftotext`) :

| Critère | État | Preuve |
|---|---|---|
| Texte sélectionnable (lisible par un ATS) | oui | `pdftotext` extrait tout le texte ; 4 polices incorporées (Open Sans, Noto Sans) ; PDF balisé (`Tagged: yes`) |
| Nom de fichier | correct, amélioré | chemin `Louis_Savon.pdf` (sans espace) ; enregistré désormais sous `Louis_Savon_CV.pdf` |
| Poids | acceptable | 477 Ko, dont 414 Ko pour la photo (JPEG 857x1143) ; 1 page A4 |
| Métadonnées | **à corriger** | Titre : « Copie de Purple and White Clean and Professional Resume » ; mots-clés Canva. Le titre s'affiche dans l'onglet quand on clique « Ouvrir ». Renommer le design Canva « Louis Savon - CV » avant export |
| Liens cliquables | **absents** | aucune annotation `/URI` ; email, LinkedIn et GitHub sont du texte simple |
| Version anglaise | **absente** | le site est bilingue ; en attendant, le bouton EN dit « (PDF, French) » |
| Téléchargement mobile | supposé correct | lien direct même origine avec `download` ; non testé sur un vrai téléphone |
| Données personnelles | correct | ni adresse ni téléphone dans le PDF (`pdftotext` : seule coordonnée, l'email) |

Visibilité du bouton : en première vue (vérifié, section 10) et en fin de page (Contact et pied de page, ajoutés).

### Incohérences entre le CV et le site

| Sujet | CV (avril 2026) | Site | À faire |
|---|---|---|---|
| Année d'études | « Étudiant en 1ʳᵉ année » | « 2e année de bachelor » | mettre à jour le CV (le site est cohérent avec une entrée en septembre 2025) |
| Objectif | absent | stage de 3 mois dès avril 2027, alternance 2027-2028 | l'ajouter en tête du CV |
| Freelance | « Freelance 2022 - 2026 » | « Indépendant, Web et crypto, janv. 2022 à déc. 2022 » | **contradiction** (Q4) |
| Voyage | « Voyages (2ans) » | pause d'août 2023 à septembre 2024 (environ 13 mois) | aligner (Q5) |
| GDG | « Bénévole, Google Developer Group (GDG) Marseille », sans date | « Développeur web, GDG Marseille, avril 2026 à aujourd'hui » | ajouter la date au CV, harmoniser l'intitulé |
| Picard | « Picard Briançon » | « Picard Surgelés » | harmoniser |
| Baccalauréat | 2020-2023, mention très bien avec félicitations | absent | à ajouter au site si vous le souhaitez (il est vérifiable et valorisant) |
| CryptoRizon, Yellow Monkeys | absents | présents | choisir |
| Certifications | absentes | 4 certifications vérifiables | les ajouter au CV |
| Projets | Halo Widget, « Token Widget » | TokenTrex (nom réel du dépôt), pass-gdg, jobaggregator | utiliser les mêmes noms |
| Compétences | JavaScript, Python, Swift, HTML, CSS, React, Node.js, Express.js, MySQL, PostgreSQL, Docker, Git, Netlify, Ollama, Burp Suite, Prompt Engineering | 32 outils, dont Swift et JavaScript **absents** | voir section 13 |
| LinkedIn | « /in/louis-savon » | `/in/louis-savon-a46714354/` | vérifier lequel est le vôtre (Q8) ; LinkedIn bloque la vérification automatique |

## 13. Crédibilité et cohérence du profil

### Certifications (toutes vérifiées le 13/10/2026)

| Site | Page de vérification | Nom | Écart |
|---|---|---|---|
| Architecture du portefeuille Bitcoin, Plan B Network, mars 2026 | « Architecture du portefeuille Bitcoin » | Louis Savon | titre FR corrigé ; date non lisible (dans l'image) |
| Sécurité informatique & gestion des données, Plan B Network, mars 2026 | FR : « Sécurité informatique & gestion des données » ; EN : « Update Your Online Security » | Louis Savon | titre FR corrigé ; date non lisible |
| Google Prompting Essentials, Coursera, mars 2026 | « Google Prompting Essentials », 26 mars 2026 | Louis Savon | aucun |
| Notion Workflows Badge, avril 2026, expire avril 2028 | « Notion Workflows Quiz », 14 avril 2026 | Louis Savon | intitulé « Badge » contre « Quiz » ; expiration non affichée sur la page |

Aucune certification sans preuve. La certification LVMH « En cours » citée dans l'ancien rapport n'est plus affichée.

### Dates

Cohérentes entre elles sur le site (vérifié) : bac jusqu'en 2023 (CV), voyage d'août 2023 à septembre 2024 avec la mission CryptoRizon de décembre 2023 à février 2024 « pendant mon voyage », Picard de septembre 2024 à juin 2025, Epitech depuis septembre 2025. Le seul conflit est le freelance (Q4).

### Compétences : risque de crédibilité

Le site affiche 32 outils. Les suivants n'apparaissent **ni dans le CV ni dans les trois projets phares** (vérifié sur ces deux sources seulement, pas sur les 41 dépôts) : Hugging Face, LangChain, LangGraph, LlamaIndex, vLLM, MCP, PyTorch, TensorFlow, scikit-learn, NumPy, Pandas, Jupyter, CUDA, MLflow, Weights & Biases, Pinecone, FastAPI, Kubernetes. Un responsable technique qui pose une question sur Kubernetes ou CUDA en entretien attendra une réponse précise. À l'inverse, **Swift** (deux projets, CV) et **JavaScript** (CV) manquent. Je n'ai rien retiré : à vous de dire ce que vous maîtrisez (Q9).

### Preuves qui renforceraient le profil (à fournir, rien n'a été inventé)

- Un retour écrit du GDG Marseille (organisateur) sur la carte de membre, ou une capture de son usage réel.
- La note ou l'appréciation du projet jobaggregator à Epitech.
- Une recommandation LinkedIn d'un responsable chez Picard (autonomie, « parfois seul responsable »).
- Des captures de TokenTrex et Halo Widget, ou une release téléchargeable.

### GitHub et LinkedIn

- GitHub (vérifié via l'API) : nom affiché « Louis » (pas « Louis Savon »), bio vide, champ site web vide, 41 dépôts publics dont une trentaine de rendus d'école `B-...`. Le site les filtre, mais un recruteur qui ouvre votre profil les voit. Recommandé : nom complet, bio reprenant le titre du site, lien vers le site, épingler pass-gdg, jobaggregator et TokenTrex.
- LinkedIn : non vérifiable automatiquement. Comparer vous-même titre et présentation avec la première vue du site.

## 14. Contact et données personnelles

**Contact en un clic (vérifié)** : email, GitHub et LinkedIn dans la navigation (dock dès 1024 px, mesuré 774 px de large à 1024 px ; menu mobile), dans la section Contact et dans le pied de page.

**Données exposées** : nom, email Epitech, ville (« Marseille, France »), portrait. Pas d'adresse postale ni de téléphone, sur le site comme dans le CV. Rien d'inutile à retirer.

**Formulaire** :
- Anti-spam : champ piège `_gotcha` présent (vérifié dans le code), que Formspree reconnaît sur toutes les offres ; Formspree applique aussi son filtre Formshield sur toutes les offres (documentation Formspree, voir sources).
- Confirmation : « Merci pour votre message. Je vous répondrai rapidement. » Clair.
- **Risque** : le formulaire n'est pas encore en ligne. Il a besoin de `NEXT_PUBLIC_FORMSPREE_ID` au build. L'identifiant est présent dans le build local (vérifié sans l'afficher) ; il faut qu'il soit aussi défini dans les variables d'environnement Netlify, sinon chaque envoi échouera (Q10). Je n'ai envoyé aucun message de test.
- Détail : le formulaire ne vérifie côté navigateur que la longueur du message ; un email mal saisi donne le message d'erreur générique.

### Obligations légales d'un site personnel (à vérifier par vous)

Ce qui suit n'est pas un avis juridique. Sources officielles en fin de rapport.

1. **Mentions légales (LCEN, article 1-1, en vigueur depuis le 23 mai 2024)** : un éditeur « à titre non professionnel » peut se contenter de publier le nom et l'adresse de son hébergeur, à condition de lui avoir communiqué son identité. Votre page publie déjà votre nom, votre email et Netlify, Inc., 101 2nd Street, San Francisco, CA 94105 (adresse vérifiée sur la politique de confidentialité Netlify). **Conforme sous cette lecture.** **Incertitude** : je n'ai pas trouvé de texte officiel qui dise si une vitrine de recherche d'emploi reste « non professionnelle ». Si vous deveniez indépendant, l'alinéa I exige nom, domicile et téléphone.
2. **Cookies** : le site pose un seul cookie, `locale`, quand on change de langue. Selon la CNIL, un traceur qui ne sert qu'au choix de la langue peut être exempté de consentement ; elle recommande quand même d'en informer, ce que fait la politique de confidentialité. **Aucun bandeau nécessaire aujourd'hui.**
3. **Statistiques de fréquentation** : aucune n'est installée (vérifié : pas d'outil d'analyse dans le code). Si vous en voulez, deux voies sans bandeau : un outil configuré selon les conditions d'exemption de la CNIL (finalité limitée à la mesure d'audience, IP tronquée, durée de 13 mois au plus, pas de croisement), ou des statistiques côté serveur sans cookie. **Rien installé, à votre décision (Q11).**
4. **Formulaire (RGPD, article 13)** : la politique nomme le responsable, les données, le destinataire (Formspree), les transferts hors UE, les droits et la CNIL. Deux points faibles : la section « Base légale » ne nomme pas de base juridique, et la durée de conservation reste « le temps nécessaire ». Je ne les ai pas réécrits : le choix de la base (intérêt légitime ou consentement) vous revient (Q12).

## 15. Partage et première impression hors site

- **Aperçu de lien** (vérifié sur le build) : `og:image` 1200x630 par langue, `og:image:alt`, `twitter:card = summary_large_image`, titre « Louis Savon — Étudiant en informatique, spécialité IA », description en français sur `/fr`, en anglais sur `/en`. L'image est générée depuis le portrait du site : **aucune image à fournir**. Si vous préférez une photo plus récente ou un fond différent, déposer un portrait carré d'au moins 600 px à la place de `public/portrait.jpg`.
- **À tester après déploiement** : l'inspecteur de publication LinkedIn (Post Inspector) met en cache l'ancien aperçu ; le relancer une fois en ligne.
- **Titre de page** : contient votre nom et votre profil (vérifié).
- **Trouvable sur votre nom** : non vérifiable d'ici. Une recherche web sur « Louis Savon » Epitech ne renvoie rien, mais ce moteur n'est pas Google. Le `sitemap.xml`, `robots.txt`, le `canonical`, les `hreflang` et les données structurées `Person` (avec GitHub et LinkedIn en `sameAs`) sont en place. Recommandé : déclarer le site dans Google Search Console et y soumettre le sitemap ; ajouter le lien du site sur GitHub (champ « Website ») et LinkedIn (« Coordonnées » et section « Sélection »).

## À fournir ou à décider

- **Q1. Mise en ligne** : fusionner `feature/vitrine-recruteur` dans `main` pour déployer ? a) oui, j'ouvre la PR ; b) pas encore.
- **Q2. Poste visé** : a) développement web ; b) IA ou data ; c) autre (préciser). La réponse va dans la pastille ou le rôle.
- **Q3. « Spécialité IA »** : a) c'est l'intitulé officiel de votre parcours ; b) non, on écrit « Étudiant en informatique » et on garde l'IA dans la phrase métier.
- **Q4. Freelance** : a) 2022 seulement (le site a raison) ; b) de 2022 à 2026 (le CV a raison, le site est à corriger) ; c) autre.
- **Q5. Voyage** : a) environ 13 mois (le site) ; b) 2 ans (le CV).
- **Q6. pass-gdg** : a) bénévolat ; b) stage. Et : seul ou en équipe ? La carte est-elle utilisée par l'association ?
- **Q7. Liste des autres dépôts** : a) masquer `site-full-stack` (affiché sans description) ; b) leur ajouter une description ; c) laisser.
- **Q8. LinkedIn** : quelle adresse est la vôtre, `/in/louis-savon` ou `/in/louis-savon-a46714354` ?
- **Q9. Compétences** : lesquelles de la liste de la section 13 maîtrisez-vous assez pour en parler en entretien ? Ajouter Swift et JavaScript ? a) oui ; b) non.
- **Q10. Formspree** : `NEXT_PUBLIC_FORMSPREE_ID` est-il défini dans Netlify ? a) oui ; b) non, à ajouter.
- **Q11. Statistiques** : a) aucune ; b) outil exempté de consentement (je vérifie la configuration avant d'installer).
- **Q12. Base légale du formulaire** : a) intérêt légitime à répondre aux messages ; b) consentement.

À fournir : CV mis à jour (FR puis EN, design renommé, liens cliquables, photo compressée), rôle dans jobaggregator, captures des projets, une release TokenTrex ou la correction de son README, les preuves listées en section 13.

## Méthode

- Code lu : `src/data/*`, `src/i18n/*`, `src/components/sections/*`, `src/components/layout/*`, `src/app/[locale]/*`, `src/lib/*`.
- CV : `pdfinfo`, `pdffonts`, `pdfimages -list`, `pdftotext -layout`, recherche des annotations `/URI` dans les flux décompressés.
- Liens : API GitHub (profil et dépôts), README des trois projets phares, page Releases de TokenTrex, quatre pages de certificats (Coursera lu dans le navigateur intégré, cookies non essentiels refusés).
- Site : build de production local, sondes JavaScript dans le navigateur intégré à 1440x900, 1024x768, 375x667 et 360x640 ; site en ligne lu le 13/10/2026.

## Sources

- Légifrance, LCEN, article 1-1, version en vigueur depuis le 23 mai 2024 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049568614
- CNIL, « Cookies et traceurs : comment mettre mon site web en conformité ? » : https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite
- CNIL, recommandation « cookies et autres traceurs » consolidée (janvier 2026) : https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf
- CNIL, « Cookies : solutions pour les outils de mesure d'audience » : https://www.cnil.fr/fr/solutions-pour-la-mesure-daudience
- Netlify, politique de confidentialité (version du 10 avril 2026) : https://www.netlify.com/privacy/
- Formspree, « Honeypot spam filtering » : https://help.formspree.io/hc/en-us/articles/360013580813-Honeypot-spam-filtering
- Formspree, « How to prevent spam » : https://help.formspree.io/hc/en-us/articles/360017735154-How-to-prevent-spam
