import { useState, useEffect } from "react";
import "./FormStyles.css";

const isValidOption = (value, isRequired) => {
    if(isRequired) {
        return value.trim() !== "";
    }

    return true;
};

function Select({ Name, Label, Value, Options, OnChange, Required = false, resetForm = false }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let isValid = isValidOption(value, Required);
        OnChange(value, isValid);
        setIsTouched(false);
    };

    useEffect(() => {
        if(resetForm) {
            setIsTouched(false);
            let isValid = isValidOption(Value, Required);
            OnChange(Value, isValid);
        }
    }, [resetForm]);

    let isValueValid = isValidOption(Value, Required);

    return (
        <div className="form-control">
            <label className="form-label" htmlFor={Name}>{Label}</label>
            <select className="form-select" id={Name} value={Value} onChange={handleChange} onBlur={handleBlur}>
                {
                    Options.map((Option, index) => (<option value={Option.key} key={index}>{Option.value}</option>))
                }
            </select>
            { isTouched && !isValueValid && <p className="form-control-error">Please choose a valid option!</p> }
        </div>
    );
}

export default Select;
