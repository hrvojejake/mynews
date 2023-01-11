import { useState, useMemo, useEffect } from "react";
import { useMyNews } from "../context/MyNewsContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Article from "../components/Article";
import LatestArticleWrap from "../components/LatestArticleWrap";
import LatestArticles from "../components/LatestArticles";
import FavoriteArticles from "../components/FavoriteArticles";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import adArticles from "../data/ads.json";
import "../styles/Home.scss";

type filteredArticleProps = {
  uri: string;
  title: string;
  section: string;
  author: string;
  image: string[];
  url?: string;
};

const Home = () => {
  const { windowWidth, favoriteArticles, setSearchTerm } = useMyNews();
  const [mobileView, setMobileView] = useState<string>("default");
  const location = useLocation();

  /* remove search term */
  useEffect(() => {
    if (location.pathname.search("search") < 0) {
      setSearchTerm("");
    }
  }, []);

  const {
    data: newsData,
    isLoading: newsIsLoading,
    isError: newsIsError
  } = useQuery(
    ["news"],
    () => {
      return axios
        .get(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X"
        )
        .then((res) => res.data);
    },
    { staleTime: 60000 }
  );

  const filteredArticles = useMemo(() => {
    if (newsData) {
      const articlesBeforeManipulation = newsData?.results.map((ar: any) => {
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

      articlesBeforeManipulation[Math.floor(Math.random() * 4)].section =
        "breaking";
      const adsArticles = adArticles;

      for (let i = 0; i < adArticles.length; i++) {
        articlesBeforeManipulation.splice(i * 6 + 6, 0, adsArticles[i]);
      }
      return articlesBeforeManipulation;
    }
    if (!newsData) {
      return [{}];
    }
  }, [newsData]);

  if (newsIsLoading) {
    return <Loader />;
  }
  if (newsIsError) {
    return <h3>We are having technical difficulties</h3>;
  }

  return (
    <>
      {
        /*screen wider than 1200 show desktop, else show mobile */
        windowWidth > 1200 ? (
          <>
            <h3>News</h3>
            <section className="l-page-main l-page-home">
              <LatestArticleWrap>
                <LatestArticles />
              </LatestArticleWrap>
              {filteredArticles.length > 1
                ? filteredArticles
                    .slice(0, 13)
                    .map((article: filteredArticleProps) => (
                      <Article article={article} key={article.uri} />
                    ))
                : null}
            </section>
            {favoriteArticles.length > 0 && <FavoriteArticles />}
          </>
        ) : (
          <>
            <div className="l-page-home-header-mob">
              <button
                className={`${mobileView === "default" && "active"}`}
                onClick={() => setMobileView("default")}
              >
                Featured
              </button>
              <button
                className={`${mobileView === "latest" && "active"}`}
                onClick={() => setMobileView("latest")}
              >
                Latest
              </button>
              {favoriteArticles.length > 0 && (
                <button
                  className={`${mobileView === "favorite" && "active"}`}
                  onClick={() => setMobileView("favorite")}
                >
                  Favorite
                </button>
              )}
            </div>
            {mobileView === "default" && (
              <>
                <h3>News</h3>
                <section className="l-page-main l-page-home-mob">
                  {filteredArticles.length > 1
                    ? filteredArticles.map((article: filteredArticleProps) => (
                        <Article article={article} key={article.uri} />
                      ))
                    : null}
                </section>
              </>
            )}
            {mobileView === "latest" && (
              <section className="l-page-main l-page-home-latest">
                <LatestArticleWrap>
                  <LatestArticles />
                </LatestArticleWrap>
              </section>
            )}
            {mobileView === "favorite" && <FavoriteArticles />}
          </>
        )
      }
    </>
  );
};

export default Home;
