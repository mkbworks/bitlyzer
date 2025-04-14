import { useState } from "react";
import styled from "styled-components";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Text, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { Request } from "../utilities.js";

const ModalContentHeading = styled.h1`
    width: 100%;
    height: fit-content;
    font-size: 1.6rem;
    letter-spacing: 1.5px;
    text-align: center;
`;

const ModalContentMessage = styled.p`
    width: 100%;
    height: fit-content;
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    text-align: center;
`;

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
            setAlertModal({
                isOpen: true,
                type: "success",
                message: ``,
                data: ""
            });
            setUser(initialUserState);
            setUserValidity(initialValidityState);
        } catch (error) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: `Error during user registration: ${err}`,
                data: ""
            });
        }
    };

    let modalContent = undefined;
    modalContent = (
        <>
            {alertModal.type === "success" && <ModalContentHeading>&#9989; Success!</ModalContentHeading>}
            {alertModal.type === "error" && <ModalContentHeading>&#10060; Error!</ModalContentHeading>}
            <ModalContentMessage>{alertModal.message}</ModalContentMessage>
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
