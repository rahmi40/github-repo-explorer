interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
}

function SearchBar({ username, setUsername, onSearch }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-section" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
