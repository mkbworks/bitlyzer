import { useState, useEffect} from "react";
import "./FormStyles.css";

const isValidPassword = (value, isRequired) => {
    value = value.trim();

    if(isRequired && value.length === 0) {
        return false;
    }

    return true;
};

function Password({ Name, Label, Value, Placeholder, OnChange, Required = false, resetForm = false}) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let isValid = isValidPassword(value, Required);
        OnChange(value, isValid);
        setIsTouched(false);
    };

    useEffect(() => {
        if(resetForm) {
            setIsTouched(false);
        }
    }, [resetForm]);

    useEffect(() => {
        let isValid = isValidPassword(Value, Required);
        OnChange(Value, isValid);
    }, []);

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
