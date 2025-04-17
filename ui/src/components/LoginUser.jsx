import { useState } from "react";
import { useNavigate } from "react-router";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Email, Password, Submit } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { useAuth } from "../store/AuthContext.jsx";

function LoginUser() {
    const navigate = useNavigate();
    const { Login } = useAuth();
    const initialAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };

    const defaultUserState = {
        UserEmail: {
            Value: "",
            Validity: false
        },
        UserKey: {
            Value: "",
            Validity: false
        }
    };

    const [alertModal, setAlertModal] = useState(initialAlertState);
    const [user, setUser] = useState(defaultUserState);
    const [resetForm, setResetForm] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user.UserEmail.Validity || !user.UserKey.Validity) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "One or more fields in the form are not valid.",
                data: ""
            });
            return;
        }

        Login(user.UserEmail.Value, user.UserKey.Value);
        setUser(defaultUserState);
        setResetForm(true);
        navigate("/shorten-url", { replace: true });
    };

    const handleChange = (name, value, validity) => {
        setUser(prev => ({
            ...prev,
            [name]: {
                Value: value,
                Validity: validity
            }
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
                <Email Name="UserEmail" Label="Enter your email" Value={user.UserEmail} Placeholder="User's email address" OnChange={(value, validity) => handleChange("UserEmail", value, validity)} resetForm={resetForm} Required />
                <Password Name="UserKey" Label="Enter your access key" Placeholder="User's access key" Value={user.UserKey} OnChange={(value, validity) => handleChange("UserKey", value, validity)} resetForm={resetForm} Required />
                <Submit Disabled={!user.UserEmail.Validity || !user.UserKey.Validity}>Login</Submit>
            </form>
            <Modal IsOpen={alertModal.isOpen} onClose={() => setAlertModal(initialAlertState)}>
                {modalContent}
            </Modal>
        </>
    );
}

export default LoginUser;
