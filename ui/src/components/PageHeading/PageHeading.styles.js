import styled from "styled-components";

export const StyledPageHeading = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
`;

export const PageTitleSection = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    align-items: center;
`;

export const PageDescription = styled.p`
    width: fit-content;
    height: fit-content;
    font-size: 1.3rem;
    text-align: center;
`;

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
