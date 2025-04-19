import { useState } from "react";

const useForm = (FormConfig) => {
    let defaultFormState = Object.create({});
    for (const [key, value] of Object.entries(FormConfig)) {
        defaultFormState[key] = (value === "string" ? { Value: "", Validity: false } : { Value: 0, Validity: false });
    }

    const [formState, setFormState] = useState(defaultFormState);
    const [formReset, setFormReset] = useState(false);

    const handleFormChange = (name, value, validity) => {
        setFormState(prev => ({
            ...prev,
            [name]: {
                Value: value,
                Validity: validity
            }
        }));
        setFormReset(false);
    };

    const handleFormReset = () => {
        setFormState(defaultFormState);
        setFormReset(true);
    };

    const getFormValidity = () => {
        let isValid = true;
        for(const [, value] of Object.entries(formState)) {
            isValid = isValid && value.Validity;
        }
        return isValid;
    };

    return { formState, formReset, handleFormChange, handleFormReset, getFormValidity };
};

export default useForm;
