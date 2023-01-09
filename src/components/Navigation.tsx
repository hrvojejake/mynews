import { NavLink } from "react-router-dom"
import { navigationData } from "../data/navigationData"
import '../styles/Navigation.scss';

const Navigation = ()=>{
    return(
        <nav>
            {navigationData.map(item=>(
                <NavLink 
                className={({ isActive }) =>
                isActive ? "active c-nav-link" : "c-nav-link"
            }
            
            to={item.url}>
                <i className={item.icon}></i>
                <span>{item.title}</span>
                </NavLink>
            ))}
        </nav>
    )
}

export default Navigation