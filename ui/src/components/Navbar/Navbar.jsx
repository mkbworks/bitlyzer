import { useRef, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
    const logoCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = logoCanvasRef.current;
        const context = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        context.font = "48px cursive";
        context.direction = "ltr";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#f76649";
        context.fillText("Citadel of Code", canvasWidth / 2, canvasHeight / 2);
    }, []);

    return (
        <>
            <nav id="topNavigation">
                <div id="logo">
                    <canvas ref={logoCanvasRef} id="logoCanvas"></canvas>
                </div>
                <div id="navLinks">
                    <button type="button" className="nav-btn" data-action="createLink">
                        Create link
                    </button>
                    <button type="button" className="nav-btn" data-action="manageLinks">
                        Manage links
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;