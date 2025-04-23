import { Outlet } from "react-router";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useAuth } from "./hooks";
import { NavbarLinks } from "./routes.jsx";
import './App.css';

const Page = styled.div`
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
`;

function App() {
    const { IsLoggedIn } = useAuth();
    const { LoggedIn, LoggedOut } = NavbarLinks;

    return (
        <Page>
            <Navbar Title="Citadel of Code" Links={IsLoggedIn ? LoggedIn : LoggedOut} />
            <div className="container">
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </Page>
    );
}

export default App;
