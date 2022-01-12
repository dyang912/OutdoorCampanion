import React from "react";
import {Link} from "react-router-dom";

function NavigationBar() {
    return (
        <ul>
            <li>
                <Link to={"/"}> Community </Link>
            </li>
            <li>
                <Link to={"/login"}> Login </Link>
            </li>
            <li>
                <Link to={"/newpost"}> Post Event </Link>
            </li>
        </ul>
    );
}

export default NavigationBar;