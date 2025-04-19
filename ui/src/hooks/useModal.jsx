import { useState } from "react";

const useModal = () => {
    const defaultAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };

    const [modalState, setModalState] = useState(defaultAlertState);

    const ShowErrorAlert = (message, data) => {
        setModalState({
            isOpen: true,
            type: "error",
            message: message,
            data: data
        });
    }

    const ShowSuccessAlert = (message, data) => {
        setModalState({
            isOpen: true,
            type: "success",
            message: message,
            data: data
        });
    };

    const HideAlert = () => {
        setModalState(defaultAlertState);
    };

    return { Alert: modalState, ShowErrorAlert, ShowSuccessAlert, HideAlert };
};

export default useModal;
