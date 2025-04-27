import { useState, useEffect } from "react";
import { StyledNumber, FormLabel, FormControl, FormControlError } from "./FormElements.styles.js";

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
            let isValid = isValidNumber(Value, Min, Max);
            OnChange(Value, isValid);
        }
    }, [resetForm]);

    let isValueValid = isValidNumber(Value, Min, Max);

    return (
        <FormControl>
            <FormLabel htmlFor={Name}>{Label}</FormLabel>
            <StyledNumber id={Name} name={Name} placeholder={Placeholder} value={Value} step={Step} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <FormControlError>Please enter a valid number!</FormControlError> }
        </FormControl>
    );
}

export default Decimal;
