import { useMyNews } from "../context/MyNewsContext";
import Article from "../components/Article";
import {articleItemProps} from '../types/types'


const FavoriteArticles = () => {
  const { favoriteArticles } = useMyNews();

  return (
    <>
      <h3>Favorite articles</h3>
      <section className="l-page-main l-page-home-fav">
        {favoriteArticles?.length > 0
          ? favoriteArticles.map((article: articleItemProps) => (
              <Article article={article} key={article.uri} />
            ))
          : null}
      </section>
    </>
  );
};

export default FavoriteArticles;
