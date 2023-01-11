import { useMyNews } from "./context/MyNewsContext";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MakeHomepageCTA from "./components/MakeHomepageCTA";
import Header from "./components/Header";
import Search from "./components/Search";
import Home from "./pages/Home";
import LatestNewsPage from "./pages/LatestNewsPage";
import Error404 from "./pages/Error404";
import Navigation from "./components/Navigation";
import CategoryPageWrap from "./pages/CategoryPageWrap";
import "./styles/App.scss";

function App() {
  const { openMenu } = useMyNews();
  const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  });

  return (
    <div className={`App ${openMenu ? "open-menu" : ""}`}>
      <QueryClientProvider client={client}>
        <MakeHomepageCTA />
        <div className="container l-page">
          <Header>
            <Search />
          </Header>
          <div className="l-page-main-wrap">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:category" element={<CategoryPageWrap />} />
                <Route path="/latest-news" element={<LatestNewsPage />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </main>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
