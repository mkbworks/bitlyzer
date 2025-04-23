import { StyledLogo, StyledNavLink, StyledNavbar } from "./Navbar.styles.js";
import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <StyledNavbar id="topNavigation">
                <div id="navLinksContainer">
                    <StyledLogo>{Title}</StyledLogo>
                    <div id="navLinks">
                        {Links.map(({ Path, Title }, index) => (
                          <StyledNavLink className={({ isActive }) => (isActive ? "active": undefined )} to={Path} key={`Link-Index-${index}`} >{Title}</StyledNavLink>
                        ))}
                    </div>
                </div>
            </StyledNavbar>
        </>
    );
}

export default Navbar;
