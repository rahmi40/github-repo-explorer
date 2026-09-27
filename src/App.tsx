import { useRef, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import RepoList from "./components/RepoList";

import { fetchRepositories, type Repository } from "./services/githubApi";

type SortOption = "stars" | "recent" | "name";

function App() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [sortOption, setSortOption] = useState<SortOption>("stars");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const searchRepositories = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setRepositories([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const data = await fetchRepositories(username.trim(), controller.signal);

      setRepositories(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setRepositories([]);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const sortedRepositories = [...repositories].sort((a, b) => {
    if (sortOption === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sortOption === "recent") {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }

    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Repo Explorer</h1>

        <p>Search GitHub repositories by username</p>
      </header>

      <main className="container">
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={searchRepositories}
        />

        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

        <RepoList
          repositories={sortedRepositories}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
