import { useMyNews } from "../context/MyNewsContext";
import ArticlePlaceholderImg from '../assets/images/Article-placeholder.jpg';
import '../styles/Article.scss';
import { Link } from "react-router-dom";

const Article = ({article}:any)=>{
    const {favoriteArticles, setFavoriteArticles } = useMyNews();

    const addFavorite = ()=>{
        if(favoriteArticles.some((e)=> e.uri === article.uri)){
            setFavoriteArticles([...favoriteArticles.filter((e)=>e.uri!==article.uri)])
        }else {
            setFavoriteArticles([...new Set<any>([...favoriteArticles,{...article}])])
        }
    }


return (
    <article className={`${article.section==='breaking'&&'c-article-breaking'} 
    ${article.section==='ad'&&'c-article-ad'} c-article`}>
        <div className='c-article-img'>
            <img src={article.image || ArticlePlaceholderImg} alt={article.title} />
        </div>

        <div className='c-article-body'>
            <h6>{article.section}</h6>
            <h3>{article.title}</h3>
            <div className='c-article-footer'>
                <p className='c-article-author'>{article.author}</p>
                <div className='c-article-fav' onClick={addFavorite}>
                    <i className={`mynews-star-${favoriteArticles.some((e)=> e.uri === article.uri)?'full':'empty'}`}>
                    </i>
                </div>
            </div>
        </div>
        {article.section==='ad'&& <a href={article?.url} className="c-article-ad-link"  target="_blank" rel="noopener noreferrer" ></a> }
       
        </article>
)
        
}

export default Article;