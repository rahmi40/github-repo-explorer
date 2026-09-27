import RepoCard from "./RepoCard";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

interface RepoListProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
}

function RepoList({ repositories, loading, error }: RepoListProps) {
  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading...</h2>
        <p>Fetching repositories from GitHub.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error-message">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="empty-state">
        <h2>No repositories yet</h2>
        <p>Search for a GitHub username to see their repositories.</p>
      </div>
    );
  }

  return (
    <section className="repo-list">
      {repositories.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </section>
  );
}

export default RepoList;
