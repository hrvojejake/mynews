import { useEffect } from "react";
import { useMyNews } from "../context/MyNewsContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import adArticles from "../data/ads.json";
import "../styles/Search.scss";

const Search = () => {
  const location = useLocation();
  const {
    searchTerm,
    setSearchTerm,
    searchPage,
    setMaxSearchPage,
    setSearchDataTrue,
    setSearchData,
    setSearchLoading,
    setSearchError
  } = useMyNews();

  let navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchTerm, 600);

  /* axios setup, searching for term in headline */
  const fetchProjects = (searchPage: number, searchTerm: string) => {
    return axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=headline:${searchTerm}&page=${searchPage}&api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`
      )
      .then((res) => res.data);
  };

  const { isLoading, isError, data, refetch } = useQuery(
    ["projects", searchPage, searchTerm],
    () => fetchProjects(searchPage, debouncedSearchQuery),
    {
      enabled: false,
      staleTime: 6000
    }
  );

  /* fetch data on mount */
  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
    if (location.pathname.search("search") < 0) {
      setSearchTerm("");
    }
  }, []);

  /* fetch data change of query page of search term */
  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchPage, debouncedSearchQuery]);

  useEffect(() => {
    setSearchLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setSearchError(isError);
  }, [isError]);

  const filteredArticles = data?.response.docs.map((ar: any) => {
    let category =
      ar.section_name === "Business" ||
      ar.section_name === "Health" ||
      ar.section_name === "Science" ||
      ar.section_name === "Sports" ||
      ar.section_name === "Technology"
        ? ar.section_name
        : "general";
    if (ar.section_name === "Business Day") {
      category = "Business";
    }
    const img = ar.multimedia
      ?.filter((e: any, i: number) => i === 0)
      .map((e: any) => e.url);
    return {
      uri: ar.uri,
      title: ar.headline.main,
      section: category,
      author: ar.byline.original,
      image: img != "" ? `https://static01.nyt.com/${img}` : ""
    };
  });

  /* on data change add ads and ad data to searchData state */
  useEffect(() => {
    if (data) {
      filteredArticles?.unshift(adArticles[0]);
      filteredArticles?.push(adArticles[1]);
      setMaxSearchPage(data?.response.meta.hits);
      setSearchData(filteredArticles);
    }
    setSearchDataTrue(!!data);
  }, [data]);

  /* add on key down for Enter to go to search page*/
  const keyPressHandler = (e: any) => {
    if (e.key === "Enter") {
      navigate("/search/");
    }
  };

  return (
    <div className="l-search-wrap">
      {location.pathname.search("search") > 0 ? (
        <button
          aria-label="search"
          className="mynews-Search c-search-icon-btn"
          disabled={!(searchTerm?.length > 0)}
          onClick={() => {
            if (searchTerm?.length > 0) {
              refetch();
            }
          }}
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
        onKeyDown={keyPressHandler}
      />
      {location.pathname.search("search") > 0 ? (
        <button
          className="c-search-btn"
          onClick={() => {
            if (searchTerm?.length > 0) {
              refetch();
            }
          }}
          disabled={!(searchTerm?.length > 0)}
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
