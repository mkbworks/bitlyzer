import styled from "styled-components";

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const StyledModal = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.primary};
    box-shadow: 0 0 1.5px 1.5px ${props => props.theme.colors.accent};
    width: 50%;
    max-width: 500px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    padding: 0.5rem;

    & > hr {
        height: 1px;
        background-color: ${props => props.theme.colors.primary};
    }
`;

export const ModalClose = styled.button.attrs({ type: "button" })`
    width: fit-content;
    height: fit-content;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.colors.primary};
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
        border: 1.5px solid ${props => props.theme.colors.primary};
        font-weight: bolder;
        cursor: pointer;
    }
`;

export const ModalData = styled.code`
    background-color: ${prop => prop.theme.colors.primary};
    color: #FFF;
    padding: 0.4rem;
    align-self: center;
`;
