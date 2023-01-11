import { NavLink } from "react-router-dom";
import { navigationData } from "../data/navigationData";
import { useMyNews } from "../context/MyNewsContext";
import "../styles/Navigation.scss";

const Navigation = () => {
  const { openMenu, setOpenMenu } = useMyNews();
  return (
    <nav>
      {navigationData.map((item) => (
        <NavLink
          key={item.title}
          className={({ isActive }) =>
            isActive ? "active c-nav-link" : "c-nav-link"
          }
          to={item.title === "Home" ? "/" : `/category-${item.url}`}
          onClick={() => setOpenMenu(false)}
        >
          <i className={item.icon}></i>
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
