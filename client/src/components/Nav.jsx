import navStyles from './Nav.module.css'

function Nav({handleSearch, setSearchInput, searchInput, setCurrentPage}) {

    return (
        <nav className={navStyles.navHeader}>
            <div onClick={()=>setCurrentPage('landing')}><p>Cool Travel</p></div>
            <div></div>
            <div onClick={()=>setCurrentPage('visited')}><p>Visited</p></div>
            <div onClick={()=>setCurrentPage('wishlist')}><p>Wish-list</p></div>
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

export default Nav;