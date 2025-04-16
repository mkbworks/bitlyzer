import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useAuth } from "./store/AuthContext.jsx";
import './App.css';

function App() {
    const { IsLoggedIn } = useAuth();
    const Navlinks = {
        "LoggedIn": [{
        Title: "Shorten Url",
        Path: "/shorten-url"
        }, {
        Title: "My Links",
        Path: "/my-links"
        }],
        "LoggedOut": [{
            Title: "Register",
            Path: "/register-user"
        }, {
            Title: "Login",
            Path: "/login-user"
        }]
    };

    return (
        <>
            <Navbar Title="Citadel of Code" Links={IsLoggedIn ? Navlinks["LoggedIn"] : Navlinks["LoggedOut"]} />
            <div className="container">
                <main className="main-content">
                    <div className="page-content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
