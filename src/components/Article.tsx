import { useMyNews } from "../context/MyNewsContext";
import ArticlePlaceholderImg from "../assets/images/Article-placeholder.jpg";
import "../styles/Article.scss";
import { articleProps, articleItemProps } from "../types/types";

const Article = ({ article }: articleProps) => {
  const { favoriteArticles, setFavoriteArticles } = useMyNews();

  /* function for add/remove favorite article */
  const addFavorite = () => {
    if (favoriteArticles.some((element) => element.uri === article.uri)) {
      setFavoriteArticles([
        ...favoriteArticles.filter((element) => element.uri !== article.uri)
      ]);
    } else {
      setFavoriteArticles([
        ...new Set<articleItemProps>([...favoriteArticles, { ...article }])
      ]);
    }
  };

  return (
    <article
      className={`${article.section === "breaking" ? "c-article-breaking" : ""} 
    ${article.section === "ad" ? "c-article-ad" : ""} c-article`}
    >
      <div className="c-article-img">
        <img src={article.image || ArticlePlaceholderImg} alt={article.title} />
      </div>

      <div className="c-article-body">
        <h6>{article.section}</h6>
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="c-article-link"
        >
          <h3>{article.title}</h3>
        </a>
        <div className="c-article-footer">
          <p className="c-article-author">{article.author}</p>
          <div className="c-article-fav" onClick={addFavorite}>
            <i
              className={`mynews-star-${
                favoriteArticles.some((element) => element.uri === article.uri)
                  ? "full"
                  : "empty"
              }`}
            ></i>
          </div>
        </div>
      </div>
      {article.section === "ad" && (
        <a
          href={article?.url}
          className="c-article-ad-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.title}
        </a>
      )}
    </article>
  );
};

export default Article;
