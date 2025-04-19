import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks";

function HomeRedirect() {
    const { IsLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(IsLoggedIn) {
            navigate("/shorten-url", { replace: true });
        } else {
            navigate("/login-user", { replace: true });
        }
    }, [IsLoggedIn]);
    return null;
}

export default HomeRedirect;
