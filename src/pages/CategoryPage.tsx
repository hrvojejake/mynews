import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Article from "../components/Article";
import "../styles/CategoryPage.scss";

const CategoryPage = () => {
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
  /* if data is not done */
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  /* when data is done filter it */

  const allFilteredArticles = [...data.results].filter((el: any) => el.title);
  const filteredArticles = allFilteredArticles.map((ar: any) => {
    const category =
      ar.section === "business" ||
      ar.section === "health" ||
      ar.section === "science" ||
      ar.section === "sports" ||
      ar.section === "technology"
        ? ar.section
        : "general";
    return {
      uri: ar.uri,
      title: ar.title,
      section: category,
      author: ar.byline.slice(3),
      image: ar.multimedia
        ?.filter((e: any, i: number) => i === 0)
        .map((e: any) => e.url)
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
