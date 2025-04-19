import { useState, useEffect } from "react";
import "./FormStyles.css";

const isValidEmail = (email, isRequired) => {
    const emailPattern = /^[a-z][a-z0-9\-\._]+[a-z0-9]@[a-z][a-z0-9\.\-]+[a-z0-9]$/i;
    email = email.trim();

    if(isRequired && email.length === 0) {
        return false;
    }

    return emailPattern.test(email);
};

function Email({ Name, Label, Value, Placeholder, OnChange, Required = false, resetForm = false }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let isValid = isValidEmail(value, Required);
        OnChange(value, isValid);
        setIsTouched(false);
    };

    useEffect(() => {
        if(resetForm) {
            setIsTouched(false);
        }
    }, [resetForm]);

    useEffect(() => {
        let isValid = isValidEmail(Value, Required);
        OnChange(Value, isValid);
    }, []);

    let isValueValid = isValidEmail(Value, Required);

    return (
        <div className="form-control">
            <label className="form-label" htmlFor={Name}>{Label}</label>
            <input type="text" id={Name} name={Name} value={Value} className="form-input" placeholder={Placeholder} onBlur={handleBlur} onChange={handleChange} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid email address!</p> }
        </div>
    );
}

export default Email;
