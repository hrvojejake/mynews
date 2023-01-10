import Article from "../components/Article"
import '../styles/Home.scss';
import LatestArticleWrap from "../components/LatestArticleWrap";
import LatestArticles from "../components/LatestArticles";
import { useMyNews } from '../context/MyNewsContext';
import { useState } from "react";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

type filteredArticleProps = {
  uri: string,
  title: string,
  section: string,
  author: string, 
  image: any,
}

const Home = () => {
  const { windowWidth} = useMyNews();
  const [mobileView, setMobileView]= useState<string>('default')
  const {data: newsData, isLoading: newsIsLoading, isError: newsIsError} = useQuery(['news'],
   ()=>{
    return axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X').then(res=>res.data)
   }, { staleTime: 6000}
  )


  if (newsIsLoading){
    return <h1>Loading...</h1>
  }

    const filteredArticles:filteredArticleProps[] = [...newsData.results.map((ar:any)=>{
    const category = ar.section==='business'||ar.section==='health'||ar.section==='science'||ar.section==='sports'||ar.section==='technology'?ar.section:'general'
    return {
      uri: ar.uri,
      title: ar.title,
      section: category,
      author: ar.byline.slice(3), 
      image: ar.multimedia?.filter((e:any,i:number)=>i===0).map((e:any)=>e.url),
    }
  })]
  


  
  return (
    <>
    { /*screen wider than 1200 show desktop, else show mobile */
    windowWidth>1200?<>
        <h3>News</h3>
        <section className="l-page-main l-page-home">
        <LatestArticleWrap>
            <LatestArticles />
          </LatestArticleWrap>
          {
            filteredArticles.slice(0,13).map(article=>(
              <Article article={article} />
            ))
          }
        </section>
      </>:<>
        <div className="l-page-home-header-mob">
          <button 
            className={`${mobileView==='default'&& 'active'}`}
            onClick={()=>setMobileView('default')}
            >Featured</button>
          <button
            className={`${mobileView==='latest'&& 'active'}`}
            onClick={()=>setMobileView('latest')}
            >Latest</button>
          <button
            className={`${mobileView==='favorite'&& 'active'}`}
            onClick={()=>setMobileView('favorite')}
            >Favorite</button>
        </div>
       {mobileView==='default' && <section className="l-page-main l-page-home-mob">
               {
            filteredArticles.map(article=>(
              <Article article={article} />
            ))
          }
          </section>
        }
       {mobileView==='latest' && <section className="l-page-main l-page-home-latest">
          <LatestArticleWrap>
            <LatestArticles />
          </LatestArticleWrap>
          </section>
       }
       {
        mobileView==='favorite' && <section className="l-page-main l-page-home-fav">
        <h1>Favorite articles</h1>
        </section>
       }
      </>
    }
   
  </>
        
    )
}

export default Home

