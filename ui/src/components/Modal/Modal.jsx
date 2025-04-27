import { StyledModal, ModalBackdrop, ModalData, ModalHeader, ModalBody } from "./Modal.styles.js";
import { HzLine } from "../../styles/global.styles.js";
import CloseIcon from "../CloseIcon/CloseIcon.jsx";

function Modal({ IsOpen = false, onClose, Data, Type = "Custom", children }) {
    if(!IsOpen) {
        return null;
    }

    let modalContent = null;
    if(Type === "ErrorAlert") {
        modalContent = (
            <>
                <h1>&#10060; Error!</h1>
                <p>{Data.Message}</p>
                {Data.Code !== "" && <ModalData>{Data.Code}</ModalData>}
            </>
        );
    } else if(Type === "SuccessAlert") {
        modalContent = (
            <>
                <h1>&#9989; Success</h1>
                <p>{Data.Message}</p>
                {Data.Code !== "" && <ModalData>{Data.Code}</ModalData>}
            </>
        );
    } else {
        modalContent = children;
    }

    return (
        <ModalBackdrop onClick={onClose}>
            <StyledModal onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <CloseIcon Size={25} OnClick={onClose}>x</CloseIcon>
                </ModalHeader>
                <HzLine />
                <ModalBody>
                    {modalContent}
                </ModalBody>
            </StyledModal>
        </ModalBackdrop>
    );
}

export default Modal;
