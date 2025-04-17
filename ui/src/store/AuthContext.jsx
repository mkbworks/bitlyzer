import { createContext, useContext, useState } from "react";

const defaultAuth = {
    Email: "",
    AccessKey: "",
    IsLoggedIn: false,
    Login: () => {},
    Logout: () => {}
};

export const AuthContext = createContext(defaultAuth);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ Email: "", AccessKey: "", IsLoggedIn: false });
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
    return (
        <AuthContext value={{ Email: user.Email, AccessKey: user.AccessKey, IsLoggedIn: user.IsLoggedIn, Login: login, Logout: logout }}>
            {children}
        </AuthContext>
    );
}
