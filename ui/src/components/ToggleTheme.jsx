import styled from "styled-components";
import { useAuth } from "../hooks";

const Rectangle = styled.rect`
    fill: ${props => props.theme.colors.background};
    stroke: ${props => props.theme.colors.accent};
    stroke-width: 2px;
`;

const Circle = styled.circle`
    fill: ${props => props.theme.colors.accent};
    stroke: ${props => props.theme.colors.secondary};
    stroke-width: 2px;
    transition: transform 0.3s ease-in;

    &.move {
        transform: translateX(${props => props.$movedist}px);
    }
`;

function ToggleTheme({ Height = 50 }) {
    const { Theme, ToggleTheme } = useAuth();
    const Width = 2 * Height;
    const BorderRadius = Height / 2;
    let cx = (Width / 4);
    let cy = (Width / 4);
    let CircleRadius = (Width / 4) - 3;

    const handleThemeChange = () => {
        ToggleTheme();
    };

    return (
        <svg width={Width + 4} height={Height + 4} viewBox={`0 0 ${Width + 4} ${Height + 4}`} xmlns="http://www.w3.org/2000/svg" onClick={handleThemeChange}>
            <Rectangle x="2" y="2" width={Width} height={Height} rx={BorderRadius} />
            <Circle className={Theme === "dark" ? "move" : null} cx={cx + 2} cy={cy + 2} r={CircleRadius} $movedist={Width / 2} />
        </svg>
    );
}

export default ToggleTheme;
