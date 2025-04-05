import { Link } from "react-router";

import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <nav id="topNavigation">
                <div id="navLinksContainer">
                    <p id="logo">{Title}</p>
                    <div id="navLinks">
                        {Links.map((link, index) => (
                            <Link className="nav-link" to={link.Path} key={index} >{link.Title}</Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;