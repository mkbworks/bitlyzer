import { useState } from "react";

const isValidEmail = (email) => {
    const emailPattern = /^[a-z][a-z0-9\-\._]+[a-z0-9]@[a-z][a-z0-9\.\-]+[a-z0-9]$/i;
    email = email.trim();
    return emailPattern.test(email);
};

function Email({ Name, Label, Value, Placeholder, OnChange, UpdateValidity = undefined }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        OnChange(event.target.value);
        if(UpdateValidity) {
            UpdateValidity(isValidEmail(event.target.value));
        }
        setIsTouched(false);
    };

    let isValueValid = isValidEmail(Value);

    return (
        <div className="form-control">
            <label className="form-label" htmlFor={Name}>{Label}</label>
            <input type="text" id={Name} name={Name} value={Value} className="form-input" placeholder={Placeholder} onBlur={handleBlur} onChange={handleChange} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid email address!</p> }
        </div>
    );
}

export default Email;
