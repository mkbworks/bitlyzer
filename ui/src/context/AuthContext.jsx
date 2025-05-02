import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { LIGHT_THEME, DARK_THEME } from "../styles/theme.js";

const defaultAuth = {
    Email: "",
    AccessKey: "",
    IsLoggedIn: false,
    Theme: "light",
    Login: () => {},
    Logout: () => {},
    ToggleTheme: () => {}
};

export const AuthContext = createContext(defaultAuth);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ Email: "", AccessKey: "", IsLoggedIn: false });
    const [themeMode, setThemeMode] = useState("light");
    const login = (email, accessKey) => {
        setUser(prev => ({
            ...prev,
            Email: email,
            AccessKey: accessKey,
            IsLoggedIn: true
        }));
    };

    const logout = () => {
        setUser(prev => ({
            ...prev,
            Email: "",
            AccessKey: "",
            IsLoggedIn: false
        }));
    };

    const toggleThemeMode = () => {
        setThemeMode(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <AuthContext value={{ Email: user.Email, AccessKey: user.AccessKey, IsLoggedIn: user.IsLoggedIn, Login: login, Logout: logout, ToggleTheme: toggleThemeMode, Theme: themeMode }}>
            <ThemeProvider theme={themeMode === "light" ? LIGHT_THEME : DARK_THEME}>
                {children}
            </ThemeProvider>
        </AuthContext>
    );
}
