import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Text, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";

function RegisterUser() {
    const [user, setUser] = useState({
        FullName: '',
        UserEmail: ''
    });

    const [userValidity, setUserValidity] = useState({
        FullName: false,
        UserEmail: false
    });

    const handleChange = (name, value) => {
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateValidity = (name, value) => {
        setUserValidity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(!userValidity.FullName || !userValidity.UserEmail) {
            console.log("Some of the fields do not have a valid value.");
            return;
        }

        console.log(`User details:`, user);
    };

    return (
        <>
            <PageHeading Title="User Registration" ImagePath="/images/RegisterUser.png">
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an Access key for authentication purposes.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleFormSubmit}>
                <Text Name="FullName" Label="Enter your full name" Value={user.FullName} Placeholder="User's full name" OnChange={(value) => handleChange("FullName", value)} Pattern="^[a-zA-Z][a-zA-Z\s]+$" UpdateValidity={(value) => updateValidity("FullName", value)} Required />
                <Email Name="UserEmail" Label="Enter your email address" Value={user.UserEmail} Placeholder="User's email address" OnChange={(value) => handleChange("UserEmail", value)} UpdateValidity={(value) => updateValidity("UserEmail", value)} Required />
                <Submit Disabled={!userValidity.FullName || !userValidity.UserEmail}>Register</Submit>
            </form>
            <Modal></Modal>
        </>
    );
}

export default RegisterUser;
