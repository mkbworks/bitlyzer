import Navbar from "./components/Navbar/Navbar.jsx";
import './App.css';

function App() {
  const LoggedInNavlinks = [{
    Title: "Generate link",
    Path: "/generate-link"
  }, {
    Title: "My links",
    Target: "/my-links"
  }];

  return (
    <>
      <Navbar Links={LoggedInNavlinks} />
    </>
  )
}

export default App
