import { connection } from "next/server";
import {
  getLatestPosts,
  getWordPressGraphqlEndpoint,
  getWordPressSiteUrl,
  resolveWordPressUrl,
} from "@/lib/wpgraphql";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
  }).format(new Date(date));
}

function toPlainText(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return null;
  }

  return normalized.length > 180
    ? `${normalized.slice(0, 177).trimEnd()}...`
    : normalized;
}

function SetupState() {
  return (
    <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 text-zinc-100">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
        Configuration requise
      </p>
      <h2 className="mt-4 text-2xl font-semibold">
        Renseignez votre instance WordPress
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-300">
        Activez le plugin WPGraphQL dans WordPress puis ajoutez{" "}
        <code>WORDPRESS_GRAPHQL_ENDPOINT</code> ou{" "}
        <code>WORDPRESS_SITE_URL</code> dans votre <code>.env.local</code>.
      </p>
      <div className="mt-6 rounded-2xl bg-black/30 p-4 font-mono text-sm text-zinc-200">
        <p>WORDPRESS_SITE_URL=https://votre-site.fr</p>
        <p>WORDPRESS_GRAPHQL_ENDPOINT=https://votre-site.fr/graphql</p>
        <p>WORDPRESS_GRAPHQL_AUTH_TOKEN=optionnel-si-endpoint-prive</p>
      </div>
    </div>
  );
}

function ErrorState({
  endpoint,
  message,
}: {
  endpoint: string;
  message: string;
}) {
  return (
    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-zinc-100">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">
        Connexion WPGraphQL en erreur
      </p>
      <h2 className="mt-4 text-2xl font-semibold">
        Le front Next.js ne parvient pas a lire WordPress
      </h2>
      <p className="mt-3 text-sm text-zinc-300">
        Endpoint teste: <span className="font-mono text-zinc-100">{endpoint}</span>
      </p>
      <p className="mt-4 rounded-2xl bg-black/30 p-4 font-mono text-sm text-rose-100">
        {message}
      </p>
    </div>
  );
}

export default async function Home() {
  await connection();

  const endpoint = getWordPressGraphqlEndpoint();
  const siteUrl = getWordPressSiteUrl();

  if (!endpoint) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Next.js 16 + WordPress
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Front branche a WPGraphQL
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              La page d&apos;accueil est prete pour lire le contenu publie dans
              WordPress, il manque seulement l&apos;URL de votre instance.
            </p>
          </header>
          <SetupState />
        </main>
      </div>
    );
  }

  let posts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  let errorMessage: string | null = null;

  try {
    posts = await getLatestPosts(endpoint);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue cote serveur.";
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Next.js 16 + WordPress
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Connexion WPGraphQL configuree
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Le point d&apos;entree est defini, mais la requete ne passe pas
              encore. Le message ci-dessous vous donne l&apos;erreur exacte.
            </p>
          </header>
          <ErrorState endpoint={endpoint} message={errorMessage} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Next.js 16 + WordPress
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Contenu charge depuis WPGraphQL
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Cette page interroge WordPress cote serveur et affiche les
              derniers articles publies.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
            <p className="font-semibold text-zinc-100">Connexion active</p>
            <p className="mt-3 font-mono text-xs leading-6 break-all">
              {endpoint}
            </p>
            {siteUrl ? (
              <p className="mt-3 text-xs text-zinc-400">
                Site WordPress: <span className="font-mono">{siteUrl}</span>
              </p>
            ) : null}
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-200">
            Aucun article publie n&apos;a ete renvoye par WPGraphQL.
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const href = resolveWordPressUrl(post.uri, siteUrl) ?? endpoint;
              const excerpt = toPlainText(post.excerpt);

              return (
                <article
                  key={post.id}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <p className="text-sm text-zinc-400">{formatDate(post.date)}</p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                    {post.title}
                  </h2>
                  {excerpt ? (
                    <p className="mt-4 flex-1 text-base leading-7 text-zinc-300">
                      {excerpt}
                    </p>
                  ) : (
                    <p className="mt-4 flex-1 text-base leading-7 text-zinc-500">
                      Aucun extrait disponible pour cet article.
                    </p>
                  )}
                  <a
                    className="mt-6 inline-flex w-fit items-center rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ouvrir l&apos;article WordPress
                  </a>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
