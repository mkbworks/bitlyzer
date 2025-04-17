import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useAuth } from "./store/AuthContext.jsx";
import { NavbarLinks } from "./routes.jsx";
import './App.css';

function App() {
    const { IsLoggedIn } = useAuth();
    const { LoggedIn, LoggedOut } = NavbarLinks;

    return (
        <>
            <Navbar Title="Citadel of Code" Links={IsLoggedIn ? LoggedIn : LoggedOut} />
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
