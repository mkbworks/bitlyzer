import styled from "styled-components";

export const StyledCloseIcon = styled.svg`
    border-radius: 50%;

    & > line {
        stroke: ${props => props.theme.colors.text};
        stroke-width: 2.5;
        transition: stroke 0.4s;
    }

    &:hover {
        background-color: ${props => props.theme.colors.secondary};
    }

    &:hover > line {
        cursor: pointer;
        stroke: ${props => props.theme.colors.accent};
    }
`;
