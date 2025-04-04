import "./Navbar.css";

function Navbar({ Links, Title }) {
    return (
        <>
            <nav id="topNavigation">
                <div id="navLinksContainer">
                    <p id="logo">{Title}</p>
                    <div id="navLinks">
                        {Links.map((link, index) => (
                            <a key={index} href={link.Path} className="nav-link">{link.Title}</a> 
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;