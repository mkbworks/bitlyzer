import { useState, useEffect } from "react";
import "./FormStyles.css";

const isValidNumber = (value, min, max) => {
    return ((value >= min) && (value <= max));
};

function Decimal({ Name, Label, Value = 0, Placeholder, OnChange, Min = -Infinity, Max = Infinity, Step = 1, resetForm = false }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        let inputValue = Number(event.target.value);
        let isValid = isValidNumber(inputValue, Min, Max);
        OnChange(inputValue, isValid);
        setIsTouched(false);
    };

    useEffect(() => {
        if(resetForm) {
            setIsTouched(false);
        }
    }, [resetForm]);

    let isValueValid = isValidNumber(Value, Min, Max);

    return (
        <div className="form-control">
            <label className="form-label" htmlFor={Name}>{Label}</label>
            <input type="number" className="form-number" id={Name} name={Name} placeholder={Placeholder} value={Value} step={Step} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid number!</p> }
        </div>
    );
}

export default Decimal;
