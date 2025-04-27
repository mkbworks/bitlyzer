import { useState, useEffect } from "react";
import { StyledText, FormLabel, FormControl, FormControlError } from "./FormElements.styles.js";

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
            let isValid = isValidEmail(Value, Required);
            OnChange(Value, isValid);
        }
    }, [resetForm]);

    let isValueValid = isValidEmail(Value, Required);

    return (
        <FormControl>
            <FormLabel htmlFor={Name}>{Label}</FormLabel>
            <StyledText id={Name} name={Name} value={Value} placeholder={Placeholder} onBlur={handleBlur} onChange={handleChange} />
            { isTouched && !isValueValid && <FormControlError>Please enter a valid email address!</FormControlError> }
        </FormControl>
    );
}

export default Email;
