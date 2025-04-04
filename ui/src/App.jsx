import Navbar from "./components/Navbar/Navbar.jsx";
import ShortenUrl from "./components/ShortenUrl/ShortenUrl.jsx";
import './App.css';

function App() {
  const LoggedInNavlinks = [{
    Title: "Shorten Url",
    Path: "/shorten-url"
  }, {
    Title: "My links",
    Target: "/my-links"
  }];

  return (
    <>
      <Navbar Title="Citadel of Code" Links={LoggedInNavlinks} />
      <main id="mainContent">
        <ShortenUrl />
      </main>
    </>
  )
}

export default App;
