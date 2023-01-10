import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "../styles/SearchPage.scss";
import { useMyNews } from "../context/MyNewsContext";
import { useState, useEffect, useMemo } from "react";
import Article from "../components/Article";

type filteredArticleProps = {
  uri: string;
  title: string;
  section: string;
  author: string;
  image: any;
  url: string;
};

const SearchPage = () => {
  // const query = useParams()
  const { searchTerm, setSearchTerm } = useMyNews();
  const [page, setPage] = useState<number>(1);

  const fetchProjects = (page: number, searchTerm: string) => {
    console.log(page, searchTerm);
    console.log(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=headline:${searchTerm}&page=${page}&api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`
    );
    return axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=headline:${searchTerm}&page=${page}&api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`
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
    ["projects", page, searchTerm],
    () => fetchProjects(page, searchTerm),
    {
      enabled: false
    }
  );

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [page]);

  const filteredArticles = useMemo(() => {
    if (data) {
      return data?.response.docs.map((ar: any) => {
        // return ar;
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
          image: img === "" ? `https://static01.nyt.com/${img}` : ""
        };
      });
    }
    if (!data) {
      return [{}];
    }
  }, [data]);

  if (isError) {
    return <h1>Error..</h1>;
  }
  const maxPage = data?.response.meta.hits;

  return (
    <>
      {!searchTerm && <h3>Search</h3>}
      {searchTerm && data && (
        <>
          <h3>Search for: {searchTerm}</h3>
          <div className="c-search-btn-wrap">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === maxPage / 10 + 1 || undefined}
            >
              Next
            </button>
          </div>
          <section className="l-page-main ">
            {filteredArticles.length > 1
              ? filteredArticles.map((article: filteredArticleProps) => (
                  <Article article={article} key={article.uri} />
                ))
              : null}
          </section>
        </>
      )}

      <button id="js-search" onClick={() => refetch()}>
        Search
      </button>
    </>
  );
};

export default SearchPage;
