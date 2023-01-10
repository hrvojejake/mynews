import { NavLink } from "react-router-dom";
import React from "react";
import "../styles/Header.scss";
import { useMyNews } from "../context/MyNewsContext";

const Header = ({ children }: { children: React.ReactNode }) => {
  const { openMenu, setOpenMenu } = useMyNews();
  return (
    <header>
      <NavLink className="logo" to={"/"}>
        My<span>News</span>
      </NavLink>
      <button
        aria-label="Open/close navigation"
        onClick={() => setOpenMenu(!openMenu)}
        className="mob-menu-btn"
      >
        <span></span>
      </button>
      {children}
    </header>
  );
};

export default Header;
