import styled from "styled-components";

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background-color: rgb(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const StyledModal = styled.div`
    background-color: ${props => props.theme.section.backgroundColor};
    border: 1px solid ${props => props.theme.section.borderColor};
    width: fit-content;
    min-width: 500px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    padding: 0.5rem;
    border-radius: 5px;
`;

export const ModalData = styled.code`
    background-color: ${prop => prop.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    padding: 0.4rem;
    align-self: center;
    border-radius: 4px;
`;

export const ModalHeader = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`;

export const ModalBody = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    align-items: flex-start;
    padding: 0.5rem;

    & > h1 {
        width: 100%;
        height: fit-content;
        font-size: 1.6rem;
        letter-spacing: 1.5px;
        text-align: center;
    }

    $ > p {
        width: 100%;
        height: fit-content;
        font-size: 1.3rem;
        letter-spacing: 1.5px;
        text-align: center;
    }
`;
