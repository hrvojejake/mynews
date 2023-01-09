import ArticlePlaceholderImg from '../assets/images/Article-placeholder.jpg';
import '../styles/Article.scss';

const Article = ({article}:any)=>{
return (
    <article key={article.uri} className="c-article">
        <div className='c-article-img'>
            <img src={article.image || ArticlePlaceholderImg} alt={article.title} />
        </div>

        <div className='c-article-body'>
            <h6>{article.section}</h6>
            <h3>{article.title}</h3>
            <div className='c-article-footer'>
                <p className='c-article-author'>{article.author}</p>
                <div className='c-article-fav'>
                    <i className='mynews-star-empty'></i>
                </div>
            </div>
            {/*<p>{article.hours}:{article.minutes}</p>*/} 
        </div>
       
        </article>
)
        
}

export default Article;