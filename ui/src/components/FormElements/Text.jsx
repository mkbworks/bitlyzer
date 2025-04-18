import { useState } from "react";
import "./FormStyles.css";

const isValidText = (value, pattern, isRequired) => {
    value = value.trim();
    pattern = pattern.trim();
    const regExp = new RegExp(pattern);

    if(isRequired && value.length === 0) {
        return false;
    }

    return regExp.test(value);
};

function Text({ Name, Label, Value, Placeholder, OnChange, Pattern = "", Required = false, UpdateValidity = undefined }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        OnChange(event.target.value);
        if(UpdateValidity) {
            UpdateValidity(isValidText(event.target.value, Pattern, Required));
        }
        setIsTouched(false);
    };

    let isValueValid = isValidText(Value, Pattern, Required);

    return (
        <div className="form-control">
            <label className="form-label form-label-resp" htmlFor={Name}>{Label}</label>
            <input type="text" id={Name} name={Name} className="form-input" placeholder={Placeholder} value={Value} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid value!</p> }
        </div>
    );
}

export default Text;
