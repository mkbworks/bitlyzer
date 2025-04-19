import { useEffect } from "react";
import { useNavigate } from "react-router";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Text, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { Request } from "../utilities.js";
import { useAuth, useForm, useModal } from "../hooks";

function RegisterUser() {
    const userStructure = {
        FullName: "string",
        UserEmail: "string"
    };

    const { Alert, ShowErrorAlert, ShowSuccessAlert, HideAlert } = useModal();
    const user = useForm(userStructure);
    const { IsLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(IsLoggedIn) {
            navigate("/shorten-url", { replace: true });
        }
    }, [IsLoggedIn]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(!user.getFormValidity()) {
            ShowErrorAlert("One or more fields in the form are not valid.", "")
            return;
        }

        let userData = {
            name: user.formState.FullName.Value,
            email: user.formState.UserEmail.Value
        };
        let headers = {
            "Content-Type": "application/json"
        };

        try {
            let response = await Request("/user/register", "POST", userData, null, headers);
            if(response.status === "success") {
                let { ApiKey } = response.data;
                ShowSuccessAlert(`User has been registered and the access key generated is shown below. Please copy and store the access key safely as you wont be able to view it directly again. This access key will expire at ${ApiKey.Expiry}`, ApiKey.Value);
                user.handleFormReset();
            } else {
                let { message } = response.data;
                ShowErrorAlert("Error occurred during user registration.", message);
            }
        } catch (err) {
            ShowErrorAlert("Error occurred during user registration.", `${err}`);
        }
    };

    let modalContent = (
        <>
            {Alert.type === "success" && <h1>&#9989; Success!</h1>}
            {Alert.type === "error" && <h1>&#10060; Error!</h1>}
            <p>{Alert.message}</p>
            {Alert.data !== "" && <code>{Alert.data}</code>}
        </>
    );

    return (
        <>
            <PageHeading Title="User Registration" ImagePath="/images/RegisterUser.png">
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an access key for authentication purposes.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleFormSubmit}>
                <Text Name="FullName" Label="Enter your full name" Value={user.formState.FullName.Value} Placeholder="User's full name" OnChange={(value, validity) => user.handleFormChange("FullName", value, validity)} Pattern="^[a-zA-Z][a-zA-Z\s]+$" resetForm={user.formReset} Required />
                <Email Name="UserEmail" Label="Enter your email address" Value={user.formState.UserEmail.Value} Placeholder="User's email address" OnChange={(value, validity) => user.handleFormChange("UserEmail", value, validity)} resetForm={user.formReset} Required />
                <Submit Disabled={!user.getFormValidity()}>Register</Submit>
            </form>
            <Modal IsOpen={Alert.isOpen} onClose={HideAlert}>
                {modalContent}
            </Modal>
        </>
    );
}

export default RegisterUser;
