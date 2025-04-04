import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterLink from "./components/RegisterLink/RegisterLink.jsx";
import './App.css';

function App() {
  const LoggedInNavlinks = [{
    Title: "Register link",
    Path: "/register-link"
  }, {
    Title: "My links",
    Target: "/my-links"
  }];

  return (
    <>
      <Navbar Title="Citadel of Code" Links={LoggedInNavlinks} />
      <main id="mainContent">
        <RegisterLink />
      </main>
    </>
  )
}

export default App
