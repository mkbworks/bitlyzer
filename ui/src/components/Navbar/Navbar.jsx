import "./Navbar.css";

function Navbar({ Links }) {
    return (
        <>
            <nav id="topNavigation">
                <p id="logo">Citadel of Code</p>
                <div id="navLinks">
                    {Links.map((link, index) => (
                        <a key={index} href={link.Path} className="nav-link">{link.Title}</a> 
                    ))}
                </div>
            </nav>
        </>
    );
}

export default Navbar;