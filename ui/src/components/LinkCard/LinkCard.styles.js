import styled from "styled-components";

export const StyledLinkCard = styled.div`
    width: 275px;
    height: 200px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.section.borderColor};
`;

export const LinkCardHeader = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row-reverse;
    column-gap: 0.5rem;
    align-items: center;
`;

export const ActionButton = styled.button.attrs({ type: "button" })`
    width: fit-content;
    padding: 2px;
    border-radius: 2px;
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    transition: color 0.3s;

    &:hover {
        color: ${props => props.theme.colors.accent};
        cursor: pointer;
    }
`;

export const LinkCardBody = styled.div`
    width: 100%;
    height: fit-content;
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    align-items: center;
    justify-content: center;

    & > .link-card-alias {
        font-size: 32px;
        color: ${props => props.theme.colors.text};
        transition: color 0.4s;
    }

    & > .link-card-alias:hover {
        color: ${props => props.theme.colors.accent};
        cursor: pointer;
    }

    & > .link-card-expiry {
        font-size: 18px;
        font-style: italic;
    }

    & > .link-card-action {
        width: fit-content;
        height: fit-content;
        padding: 5px;
        font-size: 14px;
        background-color: ${props => props.theme.colors.accent};
        color: #FFF;
        border-radius: 8px;
    }
`;
