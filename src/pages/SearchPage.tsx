import { useMyNews } from "../context/MyNewsContext";
import Article from "../components/Article";
import Loader from "../components/Loader";
import "../styles/SearchPage.scss";

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
    searchData,
    searchLoading,
    searchError
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
      {searchTerm && searchLoading && <Loader />}
      {searchError && <h3>We are having technical difficulties</h3>}
    </>
  );
};

export default SearchPage;
