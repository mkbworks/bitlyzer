import styled from "styled-components";

export const Card = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
`;

export const CardHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    row-gap: 0.8rem;
    align-items: center;
`;

export const ActionButton = styled.button.attrs({ type: "button" })`
    width: fit-content;
    height: fit-content;
    padding: 2px;
    border-radius: 2px;
    font-size: 0.8rem;
    border: 1px solid ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.accent};
    transition: background-color 0.4s;

    &:hover {
        background-color: ${props => props.theme.colors.accent};
        color: #FFF;
    }
`;
