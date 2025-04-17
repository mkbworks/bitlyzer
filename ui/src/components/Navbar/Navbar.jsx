import { Link, NavLink } from "react-router";

import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <nav id="topNavigation">
                <div id="navLinksContainer">
                    <p id="logo">{Title}</p>
                    <div id="navLinks">
                        {Links.map(({ Path, Title }, index) => (
                          <NavLink className={({ isActive }) => (isActive ? "nav-link active": "nav-link")} to={Path} key={`Link-Index-${index}`} >{Title}</NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
