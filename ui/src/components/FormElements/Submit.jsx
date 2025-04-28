import { SubmitButton, FormControl } from "./FormElements.styles.js";

function Submit({ children, Disabled = false }) {
    return (
        <FormControl>
            <SubmitButton type="submit" className="btn-submit" disabled={Disabled}>{children}</SubmitButton>
        </FormControl>
    );
}

export default Submit;
