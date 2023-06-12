import searchStyles from './Search.module.css'

function Search({handleSearch, setSearchInput, searchInput}) {

    return (
        <nav className={searchStyles.navHeader}>
            <div>
                <form onSubmit={handleSearch}>
                    <label htmlFor="search">Search POI: </label>
                    <input type="search" name="search" id="nav-search" value={searchInput} onChange={e => setSearchInput(e.target.value)}></input>
                    <button>GO</button>
                </form>
            </div>
        </nav>
    )

}

export default Search;