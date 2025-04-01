import "./Navbar.css";
import LogoImage from "../../assets/images/CitadelofCode.png";

function Navbar() {
    return (
        <>
            <nav id="topNavigation">
                <img src={LogoImage} id="logo" alt="Organisation logo for Citadel of Code" />
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