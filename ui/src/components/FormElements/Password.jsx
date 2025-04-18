import { useState } from "react";
import "./FormStyles.css";

const isValidPassword = (value, isRequired) => {
    value = value.trim();

    if(isRequired && value.length === 0) {
        return false;
    }

    return true;
};

function Password({ Name, Label, Value, Placeholder, OnChange, Required = true, UpdateValidity = undefined }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        OnChange(event.target.value);
        if(UpdateValidity) {
            UpdateValidity(isValidPassword(event.target.value, Required));
        }
        setIsTouched(false);
    };

    let isValueValid = isValidPassword(Value, Required);

    return (
        <div className="form-control">
            <label className="form-label form-label-resp" htmlFor={Name}>{Label}</label>
            <input type="password" id={Name} name={Name} className="form-input" placeholder={Placeholder} value={Value} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid password!</p> }
        </div>
    );
}

export default Password;
