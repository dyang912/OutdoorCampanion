import React from "react";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavigationBar() {
    const location = useLocation();

    return (
        <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark justify-content-center">
            <ul className="navbar-nav flex-row">
                <li className = "nav-item mx-5">
                    <Link to={"/"} className= "nav-link">
                        { location.pathname === "/" ?
                            <i className="bi bi-house-fill" style={{"font-size":"25px"}}/> :
                            <i className="bi bi-house" style={{"font-size":"25px"}}/> }
                    </Link>
                </li>
                <li className = "nav-item mx-5">
                    <Link to={"/newpost"} className= "nav-link">
                        { location.pathname === "/newpost" ?
                            <i className="bi bi-plus-square-fill" style={{"font-size":"25px"}}/> :
                            <i className="bi bi-plus-square" style={{"font-size":"25px"}}/> }
                    </Link>
                </li>
                <li className = "nav-item mx-5">
                    <Link to={"/login"} className= "nav-link">
                        { location.pathname === "/login" ?
                            <i className="bi bi-person-fill" style={{"font-size":"25px"}}/> :
                            <i className="bi bi-person" style={{"font-size":"25px"}}/> }
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;