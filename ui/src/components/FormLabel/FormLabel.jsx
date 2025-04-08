import "./FormLabel.css";

function FormLabel({ Title = "" }) {
    Title = Title.trim();
    return (
        <>
            <label className="form-label">{Title}</label>
        </>
    );
}

export default FormLabel;
