import ArticleLatest from "./ArticleLatest"
import '../styles/LatestArticles.scss';
import axios from 'axios'
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useInView } from 'react-intersection-observer'

const LatestArticles = ()=>{
    const [page, setPage] = useState(1)
    const scrollWin = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView()


    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
      } = useInfiniteQuery(
        ['projects'],
        async ({ pageParam = 1 }) => {
          const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&page=${pageParam}apiKey=1b29c9ede1f741e0b67f5bcd3c834b1a`)
          return res.data
        },
        {
          getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
          getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        },
      )


      useEffect(() => {
        if (inView) {
          fetchNextPage()
        }
      }, [inView])

//     const {data: latestData, isLoading: latestLoading, isError: latestError} = useQuery(['latest'],
//     ()=>{
//      return axios.get(`https://newsapi.org/v2/top-headlines?country=us&page=${page}apiKey=1b29c9ede1f741e0b67f5bcd3c834b1a`).then(res=>res.data)
//     }, { staleTime: 1000}
//    )

    if ( status==='loading'){
        return <h1>Loading...</h1>
      }
    
    const latestArticleData = [...data.articles.map((ar:any)=>{
        const hour = new Date(ar.publishedAt).getHours().toString()
        const min =new Date(ar.publishedAt).getMinutes().toString()
        return {
          uri: ar.url,
          title: ar.title,
          hours: hour.length===1 ?'0'+ hour:hour , 
          minutes: min.length===1 ?'0'+ min:min 
        }
      })]

    return(
        <div className="l-latest-articles-wrapper">
            <h3 className="c-latest-articles-wrap-title">Latest news</h3>
            <section className="c-latest-articles-wrap">
                <div className="c-latest-articles" ref={scrollWin}>
                    {
                        latestArticleData.map((article:any)=>(
                        <ArticleLatest article={article} />
                        ))
                    }
                </div>
            </section>
            <div className='c-latest-articles-btn-wrap'>
                <button className="c-latest-articles-btn">See all news</button>
            </div>
        </div>
           
    )
}

export default LatestArticles