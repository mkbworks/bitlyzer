import { StyledLogo, StyledNavLink, StyledNavbar, NavLinksContainer, NavLinks } from "./Navbar.styles.js";

function Navbar({ Links, Title }) {
    return (
        <StyledNavbar>
            <NavLinksContainer>
                <StyledLogo>{Title}</StyledLogo>
                <NavLinks>
                    {Links.map(({ Path, Title }, index) => (
                        <StyledNavLink className={({ isActive }) => (isActive ? "active": undefined )} to={Path} key={`Link-Index-${index}`} >{Title}</StyledNavLink>
                    ))}
                </NavLinks>
            </NavLinksContainer>
        </StyledNavbar>
    );
}

export default Navbar;
