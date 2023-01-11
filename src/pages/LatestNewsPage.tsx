import { useRef, useLayoutEffect, useState } from "react";
import LatestArticles from "../components/LatestArticles";
import "../styles/LatestNewsPage.scss";

const LatestNewsPage = () => {
  const latestWrapper = useRef<HTMLDivElement>(null);
  const [wrappHeight, setWrappHeight] = useState(0);

  useLayoutEffect(() => {
    if (latestWrapper.current) {
      const { height } = latestWrapper.current.getBoundingClientRect();
      const calcHeight: number =
        window.screen.height -
        latestWrapper.current.getBoundingClientRect().top -
        170;
      setWrappHeight(calcHeight > 650 ? 645 : calcHeight);
    }
  }, []);

  return (
    <>
      <h3>Latest News</h3>
      <section
        className="l-page-main l-page-latest"
        style={{ height: wrappHeight }}
        ref={latestWrapper}
      >
        <LatestArticles />
      </section>
    </>
  );
};

export default LatestNewsPage;
