import "./Modal.css";

function Modal({ IsOpen = false, onClose, children }) {
    if(!IsOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
