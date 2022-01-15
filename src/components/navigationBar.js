import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function NavigationBar() {
    return (
        <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
        <ul className = "navbar-nav">
        
            <li className = "nav-item">
                <Link to={"/"} exact={true} className= "nav-link"> Community </Link>
            </li>
            <li className = "nav-item">
                <Link to={"/newpost"} className= "nav-link"> Post Event </Link>
            </li>
            <li className = "nav-item">
                <Link to={"/login"} className= "nav-link"> Login </Link>
            </li>
        </ul>

        </nav>
    );
}

export default NavigationBar;