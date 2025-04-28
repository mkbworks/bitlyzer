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
    padding: 1rem 0;
    background-color: ${props => props.theme.colors.background};
`;

const MainContent = styled.div`
    max-width: 1200px;
    width: 100%;
    flex: 1;
    background-color: ${props => props.theme.section.backgroundColor};
    border-radius: 4px;
`;

function App() {
    const { IsLoggedIn } = useAuth();
    const { LoggedIn, LoggedOut } = NavbarLinks;

    return (
        <Page>
            <Navbar Title="Bitlyzer" Links={IsLoggedIn ? LoggedIn : LoggedOut} />
            <Container>
                <MainContent>
                    <Outlet />
                </MainContent>
            </Container>
        </Page>
    );
}

export default App;
