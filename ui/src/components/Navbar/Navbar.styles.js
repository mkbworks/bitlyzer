import styled from "styled-components";
import { NavLink } from "react-router";

export const StyledLogo = styled.p`
    height: fit-content;
    width: fit-content;
    padding: 0.4rem;
    font-size: 32px;
    font-family: "Nosifer", cursive;
    background: ${props => props.theme.logo.background};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FFF;
    -webkit-text-stroke: 1px ${props => props.theme.colors.accent};
`;

export const StyledNavLink = styled(NavLink)`
    width: fit-content;
    height: fit-content;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font-size: 1.3rem;
    padding: 0.5rem;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    &.active {
        background-color: ${props => props.theme.colors.accent};
        border-radius: 2px;
    }
`;
