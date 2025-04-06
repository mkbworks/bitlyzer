import { NewUserIcon } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";

import "./RegisterUser.css";

function RegisterUser() {
    return (
        <>
            <PageHeading Title="User Registration" Icon={NewUserIcon}>
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an API key for authentication purposes.
            </PageHeading>
            <hr />
        </>
    );
}

export default RegisterUser;
