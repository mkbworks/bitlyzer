import { useState } from "react";
import { Outlet } from "react-router";

import Navbar from "./components/Navbar/Navbar.jsx";

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

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
    }]
  };

  return (
    <>
      <Navbar Title="Citadel of Code" Links={loggedIn ? Navlinks["LoggedIn"] : Navlinks["LoggedOut"]} />
      <div className="container">
        <main id="mainContent">
            <Outlet />
        </main>
      </div>
    </>
  )
}

export default App;
