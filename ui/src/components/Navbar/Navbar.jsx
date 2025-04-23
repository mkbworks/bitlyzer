import { StyledLogo, StyledNavLink } from "./Navbar.styles.js";
import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <nav id="topNavigation">
                <div id="navLinksContainer">
                    <StyledLogo>{Title}</StyledLogo>
                    <div id="navLinks">
                        {Links.map(({ Path, Title }, index) => (
                          <StyledNavLink className={({ isActive }) => (isActive ? "active": undefined )} to={Path} key={`Link-Index-${index}`} >{Title}</StyledNavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
