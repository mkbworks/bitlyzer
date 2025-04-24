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
    color: ${props => props.theme.colors.text};
`;

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 75px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    background-color: ${props => props.theme.colors.background};
`;

function App() {
    const { IsLoggedIn } = useAuth();
    const { LoggedIn, LoggedOut } = NavbarLinks;

    return (
        <Page>
            <Navbar Title="Citadel of Code" Links={IsLoggedIn ? LoggedIn : LoggedOut} />
            <Container>
                <div className="main-content">
                    <Outlet />
                </div>
            </Container>
        </Page>
    );
}

export default App;
