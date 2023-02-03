import { useEffect } from "react";
import { useMyNews } from "../context/MyNewsContext";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Article from "../components/Article";
import Loader from "../components/Loader";
import "../styles/CategoryPage.scss";
import { NYTItem } from "../types/types";

const CategoryPage = () => {
  const location = useLocation();
  const { setSearchTerm } = useMyNews();
  const { category } = useParams();
  const categoryFiltered = category?.slice(9);

  /* change json call for general */
  const caterogyJson =
    categoryFiltered === "general" ? "home" : categoryFiltered;

  /* call data */
  const { data, isLoading, isError } = useQuery(
    [categoryFiltered ? categoryFiltered : "category"],
    () => {
      if (caterogyJson) {
        return axios
          .get(
            `https://api.nytimes.com/svc/topstories/v2/${caterogyJson}.json?api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`
          )
          .then((res) => res.data);
      } else {
        return [];
      }
    },
    { staleTime: 6000 }
  );

  /* remove search term */
  useEffect(() => {
    if (location.pathname.search("search") < 0) {
      setSearchTerm("");
    }
    // eslint-disable-next-line
  }, []);

  /* if data is not done */
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h3>We are having technical difficulties</h3>;
  }

  /* when data is done filter it */
  const allFilteredArticles = [...data.results].filter(
    (element: NYTItem) => element.title
  );
  const filteredArticles = allFilteredArticles.map((article: NYTItem) => {
    const category =
      article.section === "business" ||
      article.section === "health" ||
      article.section === "science" ||
      article.section === "sports" ||
      article.section === "technology"
        ? article.section
        : "general";
    return {
      uri: article.uri,
      title: article.title,
      section: category,
      author: article.byline.slice(3),
      image: article.multimedia?.[0]?.url,
      url: article.url
    };
  });

  return (
    <>
      <h3 className="c-category-list-title">{categoryFiltered}</h3>
      <section className="l-page-main">
        {filteredArticles.map((article) => (
          <Article article={article} key={article.uri} />
        ))}
      </section>
    </>
  );
};

export default CategoryPage;
