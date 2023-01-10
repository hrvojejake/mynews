import "../styles/Search.scss";
import { useMyNews } from "../context/MyNewsContext";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const { searchTerm, setSearchTerm } = useMyNews();
  const location = useLocation();

  return (
    <div className="l-search-wrap">
      {location.pathname.search("search") > 0 ? (
        <button
          className="mynews-Search c-search-icon-btn"
          onClick={() => document.getElementById("js-search")?.click()}
        ></button>
      ) : (
        <Link to={`/search`} className="mynews-Search c-search-icon-btn"></Link>
      )}

      <input
        type="text"
        placeholder="Search news"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="l-search"
      />
      {location.pathname.search("search") > 0 ? (
        <button
          className="c-search-btn"
          onClick={() => document.getElementById("js-search")?.click()}
        >
          Search
        </button>
      ) : (
        <Link to={`/search`} className="c-search-btn">
          Search
        </Link>
      )}
    </div>
  );
};

export default Search;
