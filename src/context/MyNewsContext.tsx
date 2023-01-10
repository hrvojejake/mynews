import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useLocalStorage} from '../hooks/useLocalStorage'

type MyNewsProviderProps = {
    children: ReactNode;
  };
  
  type MyNewsContext = {
    showCTA: boolean;
    setShowCTA: React.Dispatch<React.SetStateAction<boolean>>;
    showCTABuble:boolean
    setShowCTABuble: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    windowWidth: number
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchPage: number
    setSearchPage: React.Dispatch<React.SetStateAction<number>>;
    maxSearchPage: number
    setMaxSearchPage: React.Dispatch<React.SetStateAction<number>>;
    searchData: filteredArticleProps[]
    setSearchData: React.Dispatch<React.SetStateAction<filteredArticleProps[]>>;
    searchDataTrue: boolean
    setSearchDataTrue: React.Dispatch<React.SetStateAction<boolean>>;
    searchLoading: boolean
    setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
    favoriteArticles: filteredArticleProps[]
    setFavoriteArticles: React.Dispatch<React.SetStateAction<filteredArticleProps[]>>;
  };

  type filteredArticleProps = {
    uri: string;
    title: string;
    section: string;
    author: string;
    image: any;
    url: string;
  };
  

export const MyNewsContext = createContext({} as MyNewsContext);

export function useMyNews() {
    return useContext(MyNewsContext);
}

export const MyNewsProvider = ({ children }: MyNewsProviderProps) => {

    /* for CTA on top of page */
    const [showCTA, setShowCTA] = useState(true)
    const [showCTABuble, setShowCTABuble] = useState(false)

    /* for mobile menu */
    const [openMenu, setOpenMenu] = useState(false)

    /* to check screen size */
    const [windowWidth, setWindowWidth] = useState(0)
    useEffect(() => { 
       updateDimensions(); 
      window.addEventListener<any>('resize', updateDimensions);
      return () => 
        window.removeEventListener('resize',updateDimensions);
     }, [])
     const updateDimensions = () => {
       const width = window.innerWidth
       setWindowWidth(width)
     }

     /*for search query */
     const [searchTerm, setSearchTerm]=useState<string>('')
     const [searchPage, setSearchPage]=useState<number>(1)
     const [maxSearchPage, setMaxSearchPage]=useState<number>(1)
     const [searchData, setSearchData] = useState<filteredArticleProps[]>([])
     const [searchDataTrue, setSearchDataTrue] = useState<boolean>(false)
     const [searchLoading, setSearchLoading] = useState<boolean>(false)

     /* Favorite */
     const [favoriteArticles, setFavoriteArticles] = useLocalStorage<filteredArticleProps[]>('my-news',[]);

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
            setFavoriteArticles
        }}
      >
      
        {children}
      </MyNewsContext.Provider>
    );
  };