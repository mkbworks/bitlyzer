import styled from "styled-components";

export const PageContent = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`;

export const MyLinksContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1rem;
    align-items: center;
    justify-content: space-evenly;
`;

export const SorryError = styled.p`
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 1.5rem;
    color: ${props => props.theme.section.borderColor};
`;
