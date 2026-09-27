export interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export async function fetchRepositories(
  username: string,
  signal: AbortSignal,
): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("GitHub user not found.");
  }

  const data: Repository[] = await response.json();

  return data;
}
