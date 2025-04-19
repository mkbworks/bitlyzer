import { useContext } from "react";
import { AuthContext } from "../store/AuthContext.jsx";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
