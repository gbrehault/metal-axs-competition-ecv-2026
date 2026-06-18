# Front Next.js connecte a WordPress via WPGraphQL

Ce projet charge les derniers articles publies dans WordPress depuis l'endpoint WPGraphQL, directement dans l'App Router Next.js.

## Prerequis WordPress

1. Installer et activer le plugin `WPGraphQL` sur votre site WordPress.
2. Verifier que l'endpoint GraphQL repond bien, en general sur `https://votre-site.fr/graphql`.
3. Si l'endpoint est protege, preparer un token Bearer pour l'acces serveur.

## Configuration du front

Renseignez les variables d'environnement dans `.env.local` a partir de `.env.example` :

```bash
npm ci
npm run dev
```

```env
WORDPRESS_SITE_URL=https://votre-site.fr
WORDPRESS_GRAPHQL_ENDPOINT=https://votre-site.fr/graphql
WORDPRESS_GRAPHQL_AUTH_TOKEN=
```

`WORDPRESS_GRAPHQL_ENDPOINT` est prioritaire. Si vous renseignez seulement `WORDPRESS_SITE_URL`, le front derive automatiquement l'endpoint `.../graphql`.

## Demarrage

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

La page d'accueil :

- lit WordPress cote serveur
- interroge WPGraphQL
- affiche les derniers articles publies
- remonte un message de configuration si l'endpoint n'est pas renseigne
- remonte un message d'erreur detaille si WordPress ne repond pas correctement

## Structure utile

- `app/page.tsx` : page d'accueil branchee sur WordPress
- `lib/wpgraphql.ts` : utilitaires de connexion WPGraphQL
- `.env.example` : variables d'environnement attendues

## Verification

```bash
npm run lint
npm run build
```
# metal-axs-competition-ecv-2026
# metal-axs-competition-ecv-2026
