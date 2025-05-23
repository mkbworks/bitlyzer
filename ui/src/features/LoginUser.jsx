import { useEffect } from "react";
import { useNavigate } from "react-router";
import PageHeading from "../components/PageHeading/PageHeading.jsx";
import { Email, Password, Submit } from "../components/FormElements/index.js";
import Modal from "../components/Modal/Modal.jsx";
import { useAuth, useForm, useModal } from "../hooks";
import { PageContent } from "./features.styles.js";
import { HzLine } from "../styles/global.styles.js";

function LoginUser() {
    const navigate = useNavigate();
    const { Login, IsLoggedIn } = useAuth();
    const userStructure = {
        UserEmail: "string",
        UserKey: "string"
    };

    useEffect(() => {
        if(IsLoggedIn) {
            navigate("/shorten-url", { replace: true });
        }
    }, [IsLoggedIn]);

    const { ModalState, ShowModal, HideModal } = useModal();
    const user = useForm(userStructure);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user.getFormValidity()) {
            ShowModal("ErrorAlert", {
                Message: "One or more field(s) in the login form do not have valid values.",
                Code: ""
            });
            return;
        }

        Login(user.formState.UserEmail.Value, user.formState.UserKey.Value);
        user.handleFormReset();
    };

    return (
        <PageContent>
            <PageHeading Title="User Login" ImagePath="/images/LoginUser.png">
                 Use your registered email address along with your access key to authenticate your account. Once logged in, you will gain access to all available functionalities.
            </PageHeading>
            <HzLine />
            <form className="form" onSubmit={handleSubmit}>
                <Email Name="UserEmail" Label="Enter your email" Value={user.formState.UserEmail.Value} Placeholder="User's email address" OnChange={(value, validity) => user.handleFormChange("UserEmail", value, validity)} resetForm={user.formReset} Required />
                <Password Name="UserKey" Label="Enter your access key" Placeholder="User's access key" Value={user.formState.UserKey.Value} OnChange={(value, validity) => user.handleFormChange("UserKey", value, validity)} resetForm={user.formReset} Required />
                <Submit Disabled={!user.getFormValidity()}>Login</Submit>
            </form>
            <Modal IsOpen={ModalState.isOpen} onClose={HideModal} Data={ModalState.data} Type={ModalState.type}></Modal>
        </PageContent>
    );
}

export default LoginUser;
