import { Link } from "react-router";

import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <nav id="topNavigation">
                <div id="navLinksContainer">
                    <p id="logo">{Title}</p>
                    <div id="navLinks">
                        {Links.map(({ Path, Title }, index) => (
                          <Link className="nav-link" to={Path} key={`Link-Index-${index}`} >{Title}</Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
