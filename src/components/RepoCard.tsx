interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

interface RepoCardProps {
  repo: Repository;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="repo-card">
      <h2>{repo.name}</h2>

      <p>{repo.description || "No description available."}</p>

      <p>Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>

      <div className="repo-info">
        <span>⭐ {repo.stargazers_count} stars</span>

        <span>{repo.language || "Unknown language"}</span>
      </div>

      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View Repository
      </a>
    </div>
  );
}

export default RepoCard;
