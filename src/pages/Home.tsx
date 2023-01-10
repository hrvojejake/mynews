import Article from "../components/Article";
import "../styles/Home.scss";
import LatestArticleWrap from "../components/LatestArticleWrap";
import LatestArticles from "../components/LatestArticles";
import { useMyNews } from "../context/MyNewsContext";
import { useState, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FavoriteArticles from "../components/FavoriteArticles";
import adArticles from "../data/ads.json";

type filteredArticleProps = {
  uri: string;
  title: string;
  section: string;
  author: string;
  image: any;
  url?:string
};

const Home = () => {
  const { windowWidth, favoriteArticles } = useMyNews();
  const [mobileView, setMobileView] = useState<string>("default");
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
    { staleTime: 6000 }
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

      articlesBeforeManipulation[Math.floor(Math.random() * 4)].section='breaking'
      const adsArticles = adArticles;
      console.log(adsArticles)
      console.log(articlesBeforeManipulation)
      
      for(let i=0;i<adArticles.length; i++){
        articlesBeforeManipulation.splice(i*6 + 6,0,adsArticles[i])
      }

      console.log(articlesBeforeManipulation)

      return articlesBeforeManipulation
    }
    if (!newsData) {
      return [{}];
    }
  }, [newsData]);

  if (newsIsLoading) {
    return <h1>Loading...</h1>;
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
            <FavoriteArticles />
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
              <button className={`${mobileView === "favorite" && "active"}`}
                onClick={() => setMobileView("favorite")}
              >
                Favorite
              </button>
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
            {mobileView === "favorite" && (
              <FavoriteArticles />
            )}
          </>
        )
      }
    </>
  );
};

export default Home;
