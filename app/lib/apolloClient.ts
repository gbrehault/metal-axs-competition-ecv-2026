import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}

function getWordPressGraphqlUrl() {
  const directEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT?.trim();

  if (directEndpoint) {
    return directEndpoint;
  }

  const publicEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.trim();

  if (publicEndpoint) {
    return publicEndpoint;
  }

  const siteUrl = process.env.WORDPRESS_SITE_URL?.trim();

  if (siteUrl) {
    return new URL("graphql", ensureTrailingSlash(siteUrl)).toString();
  }

  throw new Error(
    "Aucun endpoint WPGraphQL configure. Ajoute WORDPRESS_GRAPHQL_ENDPOINT, NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ou WORDPRESS_SITE_URL.",
  );
}

export function getApolloClient() {
  const headers: Record<string, string> = {};
  const authToken = process.env.WORDPRESS_GRAPHQL_AUTH_TOKEN?.trim();

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: getWordPressGraphqlUrl(),
      fetch,
      headers,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
}
