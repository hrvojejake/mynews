import '../styles/ArticleLatest.scss';
import { articleLatestProps} from '../types/types'

const ArticleLatest = ({article}:articleLatestProps)=>{

    return(
        <article key={article.uri} className="c-article-latest">
            <p>{article.hours}:{article.minutes}</p>
            <h3>{article.title}</h3>       
        </article>
    )
}

export default ArticleLatest;