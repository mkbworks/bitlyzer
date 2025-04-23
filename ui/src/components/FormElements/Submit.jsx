import "./FormStyles.css";
import { SubmitButton } from "./FormElements.styles.js";

function Submit({ children, Disabled = false }) {
    return (
        <div className="form-control">
            <SubmitButton type="submit" className="btn-submit" disabled={Disabled}>{children}</SubmitButton>
        </div>
    );
}

export default Submit;
