import { useMemo } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import ArticleLatest from "./ArticleLatest";
import "../styles/LatestArticles.scss";
import {LatestNewRawDataRootObject, LatestNewRawDataArticle, articleItemLatestProps} from '../types/types'

const LatestArticles = () => {
  /* axios setup, page size is 10, can go till 100 */
  const fetchProjects = ({ pageParam = 1 }) => {
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&page=${pageParam}&pageSize=10&apiKey=1b29c9ede1f741e0b67f5bcd3c834b1a`
      )
      .then((res) => res.data);
  };

  const { data, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["latest"],
      queryFn: fetchProjects,
      getNextPageParam: (lastPage, pages) => {
        const maxPages = lastPage.totalResults / 10 + 1;
        const nextPage = pages?.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      }
    });

  const characters = useMemo(
    () =>
      data?.pages
        .flatMap((page: LatestNewRawDataRootObject) => page.articles)
        .map((article: LatestNewRawDataArticle) => {
          const hour = new Date(article.publishedAt).getHours().toString();
          const min = new Date(article.publishedAt).getMinutes().toString();
          return {
            uri: article.url,
            title: article.title,
            hours: hour.length === 1 ? "0" + hour : hour,
            minutes: min.length === 1 ? "0" + min : min
          };
        }),
    [data]
  );
  const more = characters?.length === data?.pages[0].totalResults;

  if (status === "loading") return <Loader />;

  if (status === "error") return <p>Error...</p>;

  return (
    <section className="c-latest-articles-wrap" id="scrollableDiv">
      <div className="c-latest-articles">
        <InfiniteScroll
          dataLength={characters ? characters.length : 0}
          next={() => fetchNextPage()}
          hasMore={!more}
          loader={<Loader />}
          scrollableTarget="scrollableDiv"
        >
          {characters?.map((article: articleItemLatestProps) => (
            <ArticleLatest article={article} key={article.uri} />
          ))}
        </InfiniteScroll>

        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </section>
  );
};

export default LatestArticles;
