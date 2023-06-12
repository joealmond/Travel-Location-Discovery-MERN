function Search({ onFormSubmit, setSearchInput, searchInput }) {
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="search">Search POI: </label>
      <input
        type="search"
        name="search"
        id="nav-search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button>GO</button>
    </form>
  );
}

export default Search;
