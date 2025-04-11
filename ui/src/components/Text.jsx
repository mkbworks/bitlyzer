import { useState } from "react";

function Text({ Name, Label, Placeholder, Value, Pattern, OnChange, UpdateValidity = undefined }) {
    const [isTouched, setIsTouched] = useState(false);
    const regExp = new RegExp(Pattern.trim());

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (event) => {
        OnChange(event.target.value);
        if(UpdateValidity) {
            UpdateValidity(regExp.test(event.target.value));
        }
        setIsTouched(false);
    };

    let isValueValid = regExp.test(Value.trim());

    return (
        <div className="form-control">
            <label className="form-label form-label-resp" htmlFor={Name}>{Label}</label>
            <input type="text" id={Name} name={Name} className="form-input" placeholder={Placeholder} value={Value} onChange={handleChange} onBlur={handleBlur} />
            { isTouched && !isValueValid && <p className="form-control-error">Please enter a valid value!</p> }
        </div>
    );
}

export default Text;
