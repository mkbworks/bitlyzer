import styled from "styled-components";

export const PageContent = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    border: 1px solid ${props => props.theme.colors.primary};

    & > hr {
        height: 1px;
        background-color: ${props => props.theme.colors.primary}
    }

    &:focus {
        & > hr {
            height: 2px;
        }
    }
`;
