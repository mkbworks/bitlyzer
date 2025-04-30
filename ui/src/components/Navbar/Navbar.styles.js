import styled from "styled-components";
import { NavLink } from "react-router";

export const StyledNavbar = styled.nav`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.section.backgroundColor}
`;

export const NavLinksContainer = styled.div`
    height: inherit;
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledLogo = styled.p`
    height: fit-content;
    width: fit-content;
    padding: 0.4rem;
    font-size: 48px;
    font-family: "Cal Sans", sans-serif;
    background: linear-gradient(120deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FFF;
    letter-spacing: 2px;
`;

export const NavLinks = styled.div`
    height: inherit;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 0.8rem;
`;

export const StyledNavLink = styled(NavLink)`
    width: fit-content;
    height: fit-content;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font-size: 1.3rem;
    padding: 0.5rem;
    border-radius: 2px;

    &:hover {
        cursor: pointer;
        color: ${props => props.theme.colors.accent}
    }

    &.active {
        color: ${props => props.theme.colors.accent};
    }
`;
