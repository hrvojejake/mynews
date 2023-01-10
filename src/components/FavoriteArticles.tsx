import { useMyNews } from "../context/MyNewsContext";
import Article from "../components/Article";

type filteredArticleProps = {
    uri: string;
    title: string;
    section: string;
    author: string;
    image: any;
  };

const FavoriteArticles = ()=>{
    const { favoriteArticles } = useMyNews();

    return (
    <>
        <h3>Favorite articles</h3>
        <section className="l-page-main l-page-home-fav">
        {favoriteArticles.length > 1
          ? favoriteArticles.map((article: filteredArticleProps) => (
              <Article article={article} key={article.uri} />
              ))
              : null}
      </section>
              </>
    )
}

export default FavoriteArticles