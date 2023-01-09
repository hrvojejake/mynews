import { createContext, ReactNode, useContext, useState, useEffect } from "react";
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

 
  
    return (
      <MyNewsContext.Provider
        value={{
            showCTA,
            setShowCTA,
            showCTABuble,
            setShowCTABuble,
            openMenu,
            setOpenMenu,
            windowWidth
        }}
      >
      
        {children}
      </MyNewsContext.Provider>
    );
  };