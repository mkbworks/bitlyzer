import FormLabel from "../FormLabel/FormLabel.jsx";
import "./FormControl.css";

function FormControl(props) {
    return (
        <div className="form-control">
            <FormLabel Title={props.Title} />
        </div>
    );
}

export default FormControl;
