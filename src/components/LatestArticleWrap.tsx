import { Link } from "react-router-dom"

const LatestArticleWrap = ({ children }: { children: React.ReactNode  }) => {

    return(
        <div className="l-latest-articles-wrapper">
               <h3 className="c-latest-articles-wrap-title">Latest news</h3>
            {children}
            <div className="c-latest-articles-btn-wrap">
        <Link to={'/latest-news'} className="c-latest-articles-btn" >See all news</Link>
      </div>
    </div>
    )
}

export default LatestArticleWrap;