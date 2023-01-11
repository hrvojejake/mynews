import "../styles/SearchPage.scss";
import { useMyNews } from "../context/MyNewsContext";
import Article from "../components/Article";

type filteredArticleProps = {
  uri: string;
  title: string;
  section: string;
  author: string;
  image: any;
  url: string;
};

const SearchPage = () => {
  // const query = useParams()
  const {
    searchTerm,
    searchPage,
    setSearchPage,
    maxSearchPage,
    searchDataTrue,
    searchData
  } = useMyNews();

  return (
    <>
      {!searchTerm && <h3>Search</h3>}
      {searchTerm && searchDataTrue && (
        <>
          <h3>Search for: {searchTerm}</h3>
          <div className="c-search-btn-wrap">
            <button
              onClick={() => setSearchPage(searchPage - 1)}
              disabled={searchPage === 1}
            >
              Previous
            </button>

            <button
              onClick={() => setSearchPage(searchPage + 1)}
              disabled={searchPage === maxSearchPage / 10 + 1 || undefined}
            >
              Next
            </button>
          </div>
          <section className="l-page-main ">
            {searchData.length > 1
              ? searchData.map((article: filteredArticleProps) => (
                  <Article article={article} key={article.uri} />
                ))
              : null}
          </section>
        </>
      )}
    </>
  );
};

export default SearchPage;
