import "./FormStyles.css";

function Submit({ children, Disabled = false }) {
    return (
        <div className="form-control">
            <button type="submit" className="btn-submit" disabled={Disabled}>{children}</button>
        </div>
    );
}

export default Submit;
