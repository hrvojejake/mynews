import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";
import MakeHomepageCTA from "./components/MakeHomepageCTA";
import Header from "./components/Header";
import Search from "./components/Search";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import LatestNewsPage from "./pages/LatestNewsPage";
import SearchPage from "./pages/SearchPage";
import Error404 from "./pages/Error404";
import articlesData from "./data/home.json";
import { useState } from "react";
import Navigation from "./components/Navigation";
import { useMyNews } from "./context/MyNewsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryPageWrap from "./pages/CategoryPageWrap";

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
