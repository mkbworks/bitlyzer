import styled from "styled-components";

export const PageTitle = styled.p`
    font-size: 2.5rem;
    font-family: "Markazi", serif;
    color: ${props => props.theme.colors.primary};
    width: fit-content;
    height: fit-content;
`;

export const PageLogo = styled.img`
    width: 70px;
    height: 70px;
    border: 1px solid ${props => props.theme.colors.primary};
    box-shadow: 0 0 1.5px 1.5px ${props => props.theme.colors.accent};
`;
