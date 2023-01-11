import { createContext, useContext, useState, useEffect} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {MyNewsProviderProps, MyNewsContextProp, articleItemProps} from '../types/types'

export const MyNewsContext = createContext({} as MyNewsContextProp);

export function useMyNews() {
  return useContext(MyNewsContext);
}

export const MyNewsProvider = ({ children }: MyNewsProviderProps) => {
  /* for CTA on top of page */
  const [showCTA, setShowCTA] = useState(true);
  const [showCTABuble, setShowCTABuble] = useState(false);

  /* for mobile menu */
  const [openMenu, setOpenMenu] = useState(false);

  /* to check screen size */
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  /*for search query */
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchPage, setSearchPage] = useState<number>(1);
  const [maxSearchPage, setMaxSearchPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<articleItemProps[]>([]);
  const [searchDataTrue, setSearchDataTrue] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);

  /* Favorite */
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage<
  articleItemProps[]
  >("my-news", []);

  return (
    <MyNewsContext.Provider
      value={{
        showCTA,
        setShowCTA,
        showCTABuble,
        setShowCTABuble,
        openMenu,
        setOpenMenu,
        windowWidth,
        searchTerm,
        setSearchTerm,
        searchPage,
        setSearchPage,
        maxSearchPage,
        setMaxSearchPage,
        searchData,
        setSearchData,
        searchDataTrue,
        setSearchDataTrue,
        searchLoading,
        setSearchLoading,
        favoriteArticles,
        setFavoriteArticles,
        searchError,
        setSearchError
      }}
    >
      {children}
    </MyNewsContext.Provider>
  );
};
