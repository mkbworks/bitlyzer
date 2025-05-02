import { StyledLogo, StyledNavLink, StyledNavbar, NavLinksContainer, NavLinks, ThemeSwitcher } from "./Navbar.styles.js";
import ToggleTheme from "../ToggleTheme.jsx";

function Navbar({ Links, Title }) {
    return (
        <StyledNavbar>
            <NavLinksContainer>
                <StyledLogo>{Title}</StyledLogo>
                <NavLinks>
                    <ThemeSwitcher>
                        <ToggleTheme Height={20} />
                        <span>Theme</span>
                    </ThemeSwitcher>
                    {Links.map(({ Path, Title }, index) => (
                        <StyledNavLink className={({ isActive }) => (isActive ? "active": undefined )} to={Path} key={`Link-Index-${index}`} >{Title}</StyledNavLink>
                    ))}
                </NavLinks>
            </NavLinksContainer>
        </StyledNavbar>
    );
}

export default Navbar;
