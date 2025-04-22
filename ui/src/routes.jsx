import App from './App.jsx';
import ShortenUrl from "./features/ShortenUrl.jsx";
import MyLinks from "./features/MyLinks.jsx";
import RegisterUser from './features/RegisterUser.jsx';
import LoginUser from './features/LoginUser.jsx';
import HomeRedirect from './features/HomeRedirect.jsx';

export const Routes = [{
    path: "/",
    Component: App,
    children: [
        { index: true, Component: HomeRedirect },
        { path: "/shorten-url", Component: ShortenUrl },
        { path: "/my-links", Component: MyLinks },
        { path: "/register-user", Component: RegisterUser },
        { path: "/login-user", Component: LoginUser}
    ]
}];

export const NavbarLinks = {
    LoggedIn: [
        { Title: "Shorten Url", Path: "/shorten-url" },
        { Title: "My Links", Path: "/my-links" }
    ],
    LoggedOut: [
        { Title: "Register", Path: "/register-user" },
        { Title: "Login", Path: "/login-user" }
    ]
};
