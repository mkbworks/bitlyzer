import { useEffect, useState } from "react";
import { StyledText, FormLabel, FormControl, FormControlError } from "./FormElements.styles.js";

const isValidText = (value, pattern, isRequired) => {
    value = value.trim();
    pattern = pattern.trim();
    const regExp = new RegExp(pattern);

    if(isRequired && value.length === 0) {
        return false;
    }

    return regExp.test(value);
};

function Text({ Name, Label, Value, Placeholder, OnChange, Pattern = "", Required = false, resetForm = false }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let isValid = isValidText(value, Pattern, Required);
        OnChange(value, isValid);
        setIsTouched(false);
    };

    useEffect(() => {
        if(resetForm) {
            setIsTouched(false);
            let isValid = isValidText(Value, Pattern, Required);
            OnChange(Value, isValid);
        }
    }, [resetForm]);

    let isValueValid = isValidText(Value, Pattern, Required);

    return (
        <FormControl>
            <FormLabel htmlFor={Name}>{Label}</FormLabel>
            <StyledText id={Name} name={Name} placeholder={Placeholder} value={Value} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <FormControlError>Please enter a valid value!</FormControlError> }
        </FormControl>
    );
}

export default Text;
