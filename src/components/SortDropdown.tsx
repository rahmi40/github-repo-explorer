type SortOption = "stars" | "recent" | "name";

interface SortDropdownProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

function SortDropdown({ sortOption, setSortOption }: SortDropdownProps) {
  return (
    <div className="sort-section">
      <label htmlFor="sort">Sort by:</label>

      <select
        id="sort"
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value as SortOption)}
      >
        <option value="stars">Most Stars</option>

        <option value="recent">Most Recent</option>

        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  );
}

export default SortDropdown;
