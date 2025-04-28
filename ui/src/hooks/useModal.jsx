import { useState } from "react";

const useModal = () => {
    let defaultState = {
        isOpen: false,
        type: "",
        data: {}
    };

    const [modalState, setModalState] = useState(defaultState);

    const ShowModal = (type, data) => {
        setModalState({
            isOpen: true,
            type: type,
            data: data
        });
    }

    const HideModal = () => {
        setModalState(defaultState);
    };

    return { ModalState: modalState, ShowModal, HideModal };
};

export default useModal;
