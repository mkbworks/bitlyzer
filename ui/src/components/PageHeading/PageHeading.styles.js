import styled from "styled-components";

export const PageTitle = styled.p`
    font-size: 2.5rem;
    font-family: "Markazi", serif;
    color: ${props => props.theme.colors.text};
    width: fit-content;
    height: fit-content;
`;

export const PageLogo = styled.img`
    width: 70px;
    height: 70px;
`;
