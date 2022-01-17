import React from "react";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavigationBar() {
    const location = useLocation();

    return (
        <nav className="navbar fixed-bottom navbar-expand-lg justify-content-center" style={{background: "#bccad6", border: "none"}}>
            <ul className="navbar-nav flex-row">
                <li className = "nav-item mx-5">
                    <Link to={"/"} className= "nav-link">
                        { location.pathname === "/" ?
                            <i className="bi bi-house-fill" style={{fontSize:"25px", color: "#667292", border: "none"}}/> :
                            <i className="bi bi-house" style={{fontSize:"25px", color: "#667292", border: "none"}}/> }
                    </Link>
                </li>
                <li className = "nav-item mx-5">
                    <Link to={"/newpost"} className= "nav-link">
                        { location.pathname === "/newpost" ?
                            <i className="bi bi-plus-square-fill" style={{fontSize:"25px", color: "#667292", border: "none"}}/> :
                            <i className="bi bi-plus-square" style={{fontSize:"25px", color: "#667292", border: "none"}}/> }
                    </Link>
                </li>
                <li className = "nav-item mx-5">
                    <Link to={"/login"} className= "nav-link">
                        { location.pathname === "/login" ?
                            <i className="bi bi-person-fill" style={{fontSize:"25px", color: "#667292", border: "none"}}/> :
                            <i className="bi bi-person" style={{fontSize:"25px", color: "#667292", border: "none"}}/> }
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;