type GraphQLResponse<TData> = {
  data?: TData;
  errors?: Array<{
    message: string;
  }>;
};

export type WordPressPost = {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string | null;
};

type LatestPostsResponse = {
  posts: {
    nodes: WordPressPost[];
  };
};

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}

function getEnvValue(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getWordPressSiteUrl() {
  const siteUrl = getEnvValue("WORDPRESS_SITE_URL");

  if (siteUrl) {
    return ensureTrailingSlash(siteUrl);
  }

  const endpoint = getEnvValue("WORDPRESS_GRAPHQL_ENDPOINT");

  if (!endpoint) {
    return null;
  }

  const url = new URL(endpoint);
  url.pathname = url.pathname.replace(/\/graphql\/?$/, "/");
  url.search = "";
  url.hash = "";

  return ensureTrailingSlash(url.toString());
}

export function getWordPressGraphqlEndpoint() {
  const endpoint = getEnvValue("WORDPRESS_GRAPHQL_ENDPOINT");

  if (endpoint) {
    return endpoint;
  }

  const siteUrl = getEnvValue("WORDPRESS_SITE_URL");

  if (!siteUrl) {
    return null;
  }

  return new URL("graphql", ensureTrailingSlash(siteUrl)).toString();
}

export function resolveWordPressUrl(uri: string, siteUrl: string | null) {
  if (!uri) {
    return null;
  }

  try {
    return new URL(uri).toString();
  } catch {
    if (!siteUrl) {
      return null;
    }

    const site = new URL(siteUrl);
    const relativePath = uri.startsWith("/") ? uri : `/${uri}`;

    return new URL(relativePath, site.origin).toString();
  }
}

async function requestWordPress<TData>(
  endpoint: string,
  query: string,
  variables?: Record<string, unknown>,
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const authToken = getEnvValue("WORDPRESS_GRAPHQL_AUTH_TOKEN");

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `WPGraphQL a répondu avec ${response.status} ${response.statusText}.`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map(({ message }) => message).join(" | "));
  }

  if (!payload.data) {
    throw new Error("WPGraphQL n'a renvoyé aucune donnée.");
  }

  return payload.data;
}

const latestPostsQuery = `
  query LatestPosts($first: Int = 6) {
    posts(first: $first) {
      nodes {
        id
        title
        uri
        date
        excerpt
      }
    }
  }
`;

export async function getLatestPosts(endpoint: string, first = 6) {
  const data = await requestWordPress<LatestPostsResponse>(
    endpoint,
    latestPostsQuery,
    { first },
  );

  return data.posts.nodes.map((post) => ({
    ...post,
    title: post.title.trim() || "Sans titre",
  }));
}
