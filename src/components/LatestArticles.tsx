import ArticleLatest from "./ArticleLatest";
import "../styles/LatestArticles.scss";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const LatestArticles = () => {
  const scrollWindow = useRef<HTMLDivElement>(null);
  const fetchProjects = ({ pageParam = 1 }) => {
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&page=${pageParam}&pageSize=10&apiKey=1b29c9ede1f741e0b67f5bcd3c834b1a`
      )
      .then((res) => res.data);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ["latest"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.totalResults / 10 + 1;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    }
  });

  const characters = useMemo(
    () =>
      data?.pages
        .flatMap((page: any) => page.articles)
        .map((ar: any) => {
          const hour = new Date(ar.publishedAt).getHours().toString();
          const min = new Date(ar.publishedAt).getMinutes().toString();
          return {
            uri: ar.url,
            title: ar.title,
            hours: hour.length === 1 ? "0" + hour : hour,
            minutes: min.length === 1 ? "0" + min : min
          };
        }),
    [data]
  );
  const more = characters?.length === data?.pages[0].totalResults;

  if (status === "loading") return <p>Loading...</p>;

  if (status === "error") return <p>Error...</p>;

  return (
    <div className="l-latest-articles-wrapper">
      <h3 className="c-latest-articles-wrap-title">Latest news</h3>
      <section className="c-latest-articles-wrap" id="scrollableDiv">
        <div className="c-latest-articles" ref={scrollWindow}>
          <InfiniteScroll
            dataLength={characters ? characters.length : 0}
            next={() => fetchNextPage()}
            hasMore={!more}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {characters?.map((article: any) => (
              <ArticleLatest article={article} />
            ))}
          </InfiniteScroll>

          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </div>
      </section>
      <div className="c-latest-articles-btn-wrap">
        <button className="c-latest-articles-btn">See all news</button>
      </div>
    </div>
  );
};

export default LatestArticles;
