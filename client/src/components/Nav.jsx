import { Link } from "react-router-dom";
import navStyles from "./Nav.module.css";
import Search from "./Search";

// eslint-disable-next-line react/prop-types
function Nav({ onFormSubmit, setSearchInput, searchInput, setCurrentPage }) {
  return (
    <nav className={navStyles.navHeader}>
      <div onClick={() => setCurrentPage("landing")}>
        <p>Cool Travel</p>
      </div>
      <div></div>
      <Link to="visited"><div onClick={() => setCurrentPage("visited")}>
        <p>Visited</p>
      </div></Link>
      <div onClick={() => setCurrentPage("wishlist")}>
        <p>Wish-list</p>
      </div>
      <div>
        <Search
          onFormSubmit={onFormSubmit}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>
    </nav>
  );
}

export default Nav;
