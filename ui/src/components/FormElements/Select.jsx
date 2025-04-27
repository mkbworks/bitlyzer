import { useState, useEffect } from "react";
import { StyledSelect, FormLabel, FormControl, FormControlError } from "./FormElements.styles.js";

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
        <FormControl>
            <FormLabel htmlFor={Name}>{Label}</FormLabel>
            <StyledSelect id={Name} value={Value} onChange={handleChange} onBlur={handleBlur}>
                {
                    Options.map((Option, index) => (<option value={Option.key} key={index}>{Option.value}</option>))
                }
            </StyledSelect>
            { isTouched && !isValueValid && <FormControlError>Please choose a valid option!</FormControlError> }
        </FormControl>
    );
}

export default Select;
