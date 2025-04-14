import "./Modal.css";

function Modal({ IsOpen = false, onClose, children }) {
    if(!IsOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button type="button" className="btn-close" onClick={onClose}>x</button>
                </div>
                <hr />
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
