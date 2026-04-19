# Portfolio Louis Savon

Portfolio personnel de Louis Savon, développeur full-stack basé à Marseille.
Le projet présente le profil, les projets GitHub, le parcours, le CV et les
moyens de contact dans une interface bilingue français / anglais.

## Vision

Ce portfolio a été pensé comme un site simple, rapide et durable. L'objectif
est de mettre en avant le travail, le parcours et la personnalité sans
surcharger l'interface.

Les choix principaux :

- une expérience claire et directe ;
- une structure facile à maintenir ;
- du contenu centralisé dans des fichiers de données ;
- une navigation bilingue propre ;
- un design sobre, avec quelques touches de couleur sur les éléments clés ;
- une base saine pour évoluer avec de nouveaux projets, expériences et contenus.

## Fonctionnalités

- Page d'accueil avec présentation courte et projets récents.
- Page projets alimentée par l'API GitHub.
- Page parcours organisée par études, expériences personnelles / bénévolat,
  puis expériences professionnelles.
- Page CV avec aperçu PDF et téléchargement.
- Page contact avec email, GitHub et LinkedIn.
- Navigation français / anglais avec persistance de la langue.
- Metadata par page pour le référencement.
- Support du thème clair / sombre selon les préférences système.

## Stack technique

- Next.js 16 avec App Router
- React 19
- TypeScript
- Tailwind CSS 4
- CSS custom properties pour le thème et les badges
- GitHub REST API pour récupérer les projets publics

## Architecture

```text
src/
  app/
    [locale]/
      contact/
      cv/
      experience/
      projects/
      layout.tsx
      page.tsx
    styles/
      badges.css
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      footer.tsx
      header.tsx
    ui/
      badge.tsx
      experience-item.tsx
      language-switch.tsx
      project-card.tsx
      social-link.tsx
  data/
    experience.ts
    profile.ts
    projects.config.ts
    socials.ts
  i18n/
    en.ts
    fr.ts
  lib/
    experience.ts
    github.ts
    i18n.ts
  types/
    index.ts
  middleware.ts
```

## Organisation du contenu

Le contenu principal est centralisé dans `src/data`.

- `profile.ts` contient les informations de profil.
- `socials.ts` contient les liens de contact.
- `experience.ts` contient les études, expériences personnelles, bénévolat et
  expériences professionnelles.
- `projects.config.ts` permet de mettre en avant, masquer ou surcharger des
  projets GitHub.

Les traductions sont séparées dans `src/i18n/fr.ts` et `src/i18n/en.ts`.

## Projets GitHub

La page projets récupère les repositories publics du compte GitHub configuré
dans `src/lib/github.ts`.

Le fichier `src/data/projects.config.ts` permet de contrôler l'affichage :

```ts
export const projectsConfig = {
  featured: [],
  hidden: [],
  overrides: {},
};
```

- `featured` : liste des repositories à afficher en priorité.
- `hidden` : liste des repositories à masquer.
- `overrides` : descriptions, liens de démo, images ou ordre personnalisés.

## CV

Le CV est stocké dans le dossier `public` :

```text
public/Louis_Savon_CV.pdf
```

La page `/fr/cv` ou `/en/cv` affiche le PDF et propose le téléchargement.
Comme le fichier est dans `public`, il est accessible publiquement.

## Internationalisation

Le site utilise deux locales :

- `fr` comme langue par défaut ;
- `en` pour la version anglaise.

Le middleware redirige automatiquement vers la bonne locale selon le cookie de
langue ou l'en-tête `Accept-Language`.

Exemples de routes :

```text
/fr
/fr/projects
/fr/experience
/fr/cv
/fr/contact

/en
/en/projects
/en/experience
/en/cv
/en/contact
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site est disponible sur :

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Production locale

```bash
npm run start
```

## Variables d'environnement

Aucune variable d'environnement n'est obligatoire pour lancer le projet.

Une variable optionnelle peut être utilisée pour augmenter les limites de
l'API GitHub :

```bash
GITHUB_TOKEN=...
```

Cette valeur doit rester dans un fichier local non versionné, par exemple
`.env.local`.

## Sécurité

Les fichiers sensibles ne doivent pas être versionnés :

- `.env`
- `.env.local`
- clés privées
- certificats
- tokens
- fichiers de build
- caches locaux

Les règles `.gitignore` couvrent ces fichiers. Avant chaque push, vérifier que
les fichiers publics ne contiennent que des informations volontairement
publiques, notamment le PDF du CV.

## Déploiement

Le projet peut être déployé sur une plateforme compatible Next.js, par exemple
Vercel.

Étapes générales :

1. Installer les dépendances avec `npm install`.
2. Construire le projet avec `npm run build`.
3. Déployer le dossier applicatif `portfolio`.
4. Ajouter `GITHUB_TOKEN` uniquement si nécessaire, côté plateforme.

## Scripts

```bash
npm run dev      # lance le serveur de développement
npm run build    # compile le projet pour la production
npm run start    # lance le serveur de production local
```

## Auteur

Louis Savon

- GitHub : https://github.com/LouiSvon
- LinkedIn : https://www.linkedin.com/in/louis-savon-a46714354/
- Email : louis.savon@epitech.eu
