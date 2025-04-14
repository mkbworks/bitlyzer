import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Password, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";

function LoginUser() {
    const initialAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };
    const initialUserState = {
        UserEmail: '',
        UserKey: ''
    };
    const initialValidityState = {
        UserEmail: false,
        UserKey: false
    };

    const [alertModal, setAlertModal] = useState(initialAlertState);
    const [user, setUser] = useState(initialUserState);
    const [userValidity, setUserValidity] = useState(initialValidityState);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!userValidity.UserEmail || !userValidity.UserKey) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "One or more fields in the form are not valid.",
                data: ""
            });
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
            <PageHeading Title="User Login" ImagePath="/images/LoginUser.png">
                 Use your registered email address along with your access key to authenticate your account. Once logged in, you will gain access to all available functionalities.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleSubmit}>
                <Email Name="UserEmail" Label="Enter your email" Value={user.UserEmail} Placeholder="User's email address" OnChange={(value) => handleChange("UserEmail", value)} UpdateValidity={(value) => updateValidity("UserEmail", value)} Required />
                <Password Name="UserKey" Label="Enter your access key" Placeholder="User's access key" Value={user.UserKey} OnChange={(value) => handleChange("UserKey", value)} UpdateValidity={(value) => updateValidity("UserKey", value)} />
                <Submit Disabled={!userValidity.UserEmail || !userValidity.UserKey}>Login</Submit>
            </form>
            <Modal IsOpen={alertModal.isOpen} onClose={() => setAlertModal(initialAlertState)}>
                {modalContent}
            </Modal>
        </>
    );
}

export default LoginUser;
