import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Password, Submit } from "./FormElements";

function LoginUser() {
    const [user, setUser] = useState({
        UserEmail: '',
        UserKey: ''
    });

    const [userValidity, setUserValidity] = useState({
        UserEmail: false,
        UserKey: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!userValidity.UserEmail || !userValidity.UserKey) {
            console.log("Some of the fields do not have a valid value.");
            return;
        }

        console.log("User login details: ", user);
    };

    const updateValidity = (name, value) => {
        setUserValidity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChange = (name, value) => {
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <PageHeading Title="User Login" IconKey="login">
                 Use your registered email address along with your access key to authenticate your account. Once logged in, you will gain access to all available functionalities.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleSubmit}>
                <Email Name="UserEmail" Label="Enter your email" Value={user.UserEmail} Placeholder="User's email address" OnChange={(value) => handleChange("UserEmail", value)} UpdateValidity={(value) => updateValidity("UserEmail", value)} Required />
                <Password Name="UserKey" Label="Enter your access key" Placeholder="User's access key" Value={user.UserKey} OnChange={(value) => handleChange("UserKey", value)} UpdateValidity={(value) => updateValidity("UserKey", value)} />
                <Submit Disabled={!userValidity.UserEmail || !userValidity.UserKey}>Login</Submit>
            </form>
        </>
    );
}

export default LoginUser;
