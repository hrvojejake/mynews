import '../styles/ArticleLatest.scss';

const ArticleLatest = ({article}:any)=>{

    return(
        <article key={article.uri} className="c-article-latest">
            <p>{article.hours}:{article.minutes}</p>
            <h3>{article.title}</h3>       
        </article>
    )
}

export default ArticleLatest;