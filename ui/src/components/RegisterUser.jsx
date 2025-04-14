import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Text, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { Request } from "../utilities.js";

function RegisterUser() {
    const initialAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };
    const initialUserState = {
        FullName: '',
        UserEmail: ''
    };
    const initialValidityState = {
        FullName: false,
        UserEmail: false
    };

    const [alertModal, setAlertModal] = useState(initialAlertState);
    const [user, setUser] = useState(initialUserState);
    const [userValidity, setUserValidity] = useState(initialValidityState);

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(!userValidity.FullName || !userValidity.UserEmail) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "One or more fields in the form are not valid.",
                data: ""
            });
            return;
        }

        let userData = {
            name: user.FullName,
            email: user.UserEmail
        };
        let headers = {
            "Content-Type": "application/json"
        };

        try {
            let response = await Request("/user/register", "POST", userData, null, headers);
            if(response.status === "success") {
                setAlertModal({
                    isOpen: true,
                    type: "success",
                    message: `User has been registered and the access key generated is shown below. Please copy and store the access key safely as you wont be able to view it directly again. This access key will expire at ${response.data.Expiry}`,
                    data: response.data.Value
                });
                setUser(initialUserState);
                setUserValidity(initialValidityState);
            } else {
                setAlertModal({
                    isOpen: true,
                    type: "error",
                    message: `Error occurred during user registration:`,
                    data: `${response.data.message}`
                });
            }
        } catch (err) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: `Error during user registration:`,
                data: `${err}`
            });
        }
    };
    
    let modalContent = (
        <>
            {alertModal.type === "success" && <h1>&#9989; Success!</h1>}
            {alertModal.type === "error" && <h1>&#10060; Error!</h1>}
            <p>{alertModal.message}</p>
            {alertModal.data !== "" && <code>{alertModal.data}</code>}
        </>
    );

    return (
        <>
            <PageHeading Title="User Registration" ImagePath="/images/RegisterUser.png">
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an access key for authentication purposes.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleFormSubmit}>
                <Text Name="FullName" Label="Enter your full name" Value={user.FullName} Placeholder="User's full name" OnChange={(value) => handleChange("FullName", value)} Pattern="^[a-zA-Z][a-zA-Z\s]+$" UpdateValidity={(value) => updateValidity("FullName", value)} Required />
                <Email Name="UserEmail" Label="Enter your email address" Value={user.UserEmail} Placeholder="User's email address" OnChange={(value) => handleChange("UserEmail", value)} UpdateValidity={(value) => updateValidity("UserEmail", value)} Required />
                <Submit Disabled={!userValidity.FullName || !userValidity.UserEmail}>Register</Submit>
            </form>
            <Modal IsOpen={alertModal.isOpen} onClose={() => setAlertModal(initialAlertState)}>
                {modalContent}
            </Modal>
        </>
    );
}

export default RegisterUser;
