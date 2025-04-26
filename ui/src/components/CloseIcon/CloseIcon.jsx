import { StyledCloseIcon } from "./CloseIcon.styles.js";

function CloseIcon({ Size = 20, OnClick }) {
    const padding = Size / 4;
    return (
        <StyledCloseIcon width={Size} height={Size} onClick={OnClick}>
            <line x1={padding} y1={padding} x2={Size - padding} y2={Size - padding} />
            <line x1={Size - padding} y1={padding} x2={padding} y2={Size - padding} />
        </StyledCloseIcon>
    );
}

export default CloseIcon;
