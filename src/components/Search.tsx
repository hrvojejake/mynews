import { useRef, useEffect, useState } from "react";
import { useMyNews } from "../context/MyNewsContext";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
    setSearchData
  } = useMyNews();
  const searchField = useRef<HTMLInputElement>(null);
  const [searchFieldText, setSearchFieldText] = useState<string>("");

  const fetchProjects = (searchPage: number, searchTerm: string) => {
    return axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=headline:${searchTerm}&page=${searchPage}&api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`
      )
      .then((res) => res.data);
  };

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    refetch,
    isPreviousData
  } = useQuery(
    ["projects", searchPage, searchTerm],
    () => fetchProjects(searchPage, searchTerm),
    {
      enabled: false,
      staleTime: 6000
    }
  );

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchPage, searchTerm]);

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

  useEffect(() => {
    if (data) {
      filteredArticles?.unshift(adArticles[0]);
      filteredArticles?.push(adArticles[1]);
      setMaxSearchPage(data?.response.meta.hits);
      setSearchData(filteredArticles);
    }
    setSearchDataTrue(!!data);
  }, [data]);

  //search dodat na enter
  //search provjerit zasto neće odmah
  //dodat loader

  return (
    <div className="l-search-wrap">
      {location.pathname.search("search") > 0 ? (
        <button
          aria-label="search"
          className="mynews-Search c-search-icon-btn"
          disabled={!searchFieldText}
          onClick={() => {
            if (searchField.current?.value)
              setSearchTerm(searchField.current?.value);
          }}
        ></button>
      ) : (
        <Link to={`/search`} className="mynews-Search c-search-icon-btn"></Link>
      )}

      <input
        type="text"
        placeholder="Search news"
        value={searchFieldText}
        onChange={(e) => setSearchFieldText(e.target.value)}
        className="l-search"
        ref={searchField}
      />
      {location.pathname.search("search") > 0 ? (
        <button
          className="c-search-btn"
          onClick={() => {
            if (searchField.current?.value)
              setSearchTerm(searchField.current?.value);
          }}
          disabled={!searchFieldText}
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
