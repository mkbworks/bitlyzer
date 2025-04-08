import "./Text.css";

function Text(props) {
    let { className = "", Value = "", Placeholder = "" } = props;
    let classList = className.trim().split(" ");
    classList = classList.filter(classItem => classItem.trim().length !== 0);
    classList.push("form-input");
    className = classList.join(" ");

    return (
        <input type="text" value={Value} placeholder={Placeholder} className={className} />
    );
}

export default Text;
