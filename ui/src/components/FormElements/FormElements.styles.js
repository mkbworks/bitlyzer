import styled, { css } from "styled-components";

const FormElementStyle = css`
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.primary};
    padding: 5px;
    max-width: 500px;
    width: 90vw;
    letter-spacing: 1.5px;
    height: 35px;

    &:focus {
        box-shadow: 0 0 1.5px 1.5px ${props => props.theme.colors.accent}, inset 0 0 1.5px 1.5px ${props => props.theme.colors.accent};
    }
`;

export const FormLabel = styled.label`
    width: 90vw;
    max-width: 500px;
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    font-family: "Bona Nova", sans-serif;
    font-weight: 700;
`;

export const StyledText = styled.input.attrs({ type: "text" })`
    ${FormElementStyle}
`;

export const StyledNumber = styled.input.attrs({ type: "text" })`
    ${FormElementStyle}
`;

export const StyledSelect = styled.select`
    ${FormElementStyle}
`;

export const StyledPassword = styled.input.attrs({ type: "password" })`
    ${FormElementStyle}
`;

export const SubmitButton = styled.button`
    height: 35px;
    width: fit-content;
    min-width: 100px;
    font-size: 1.3rem;
    font-weight: 500;
    padding: 10px;
    letter-spacing: 1.5px;
    background-color: ${props => props.theme.colors.primary};
    color: #FFF;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
        box-shadow: 0 0 1.5px 1.5px ${props => props.theme.colors.accent};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: #C8CECF;
        opacity: 0.4;
    }
`;
