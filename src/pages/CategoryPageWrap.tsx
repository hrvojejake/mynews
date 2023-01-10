import { useLocation } from "react-router-dom";
import "../styles/CategoryPage.scss";
import SearchPage from "./SearchPage";
import CategoryPage from "./CategoryPage";

const CategoryPageWrap = () => {
  const location = useLocation();
  /* depending on   */
  if (location.pathname.search("search") > 0) return <SearchPage />;
  if (location.pathname.search("category") > 0) return <CategoryPage />;
  return <h3>My News</h3>;
};

export default CategoryPageWrap;
