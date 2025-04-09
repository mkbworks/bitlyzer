import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import './main.css';

import App from './App.jsx';
import ShortenUrl from "./components/ShortenUrl/ShortenUrl.jsx";
import MyLinks from "./components/MyLinks/MyLinks.jsx";
import RegisterUser from './components/RegisterUser/RegisterUser.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([{
  path: "/",
  Component: App,
  children: [{
    path: "/shorten-url",
    Component: ShortenUrl
  }, {
    path: "/my-links",
    Component: MyLinks
  }, {
    index: true,
    Component: RegisterUser
  }, {
    path: "/register-user",
    Component: RegisterUser
  }]
}]);


root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
