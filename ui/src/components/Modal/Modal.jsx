import { StyledModal, ModalBackdrop, ModalClose, ModalData } from "./Modal.styles.js";
import "./Modal.css";

function Modal({ IsOpen = false, onClose, Data }) {
    if(!IsOpen) {
        return null;
    }

    return (
        <ModalBackdrop onClick={onClose}>
            <StyledModal onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <ModalClose onClick={onClose}>x</ModalClose>
                </div>
                <hr />
                <div className="modal-body">
                    { Data.Type === "success" && <h1>&#9989; Success</h1> }
                    { Data.Type === "error" && <h1>&#10060; Error!</h1> }
                    <p>{Data.Message}</p>
                    <ModalData>{Data.Code}</ModalData>
                </div>
            </StyledModal>
        </ModalBackdrop>
    );
}

export default Modal;
