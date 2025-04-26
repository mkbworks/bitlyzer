import styled from "styled-components";

export const PageContent = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    background-color: ${props => props.theme.section.backgroundColor};
    border-radius: 4px;
`;

export const MyLinksContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    col-gap: 1rem;
`;
