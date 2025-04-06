import { NewUserIcon } from "../../icons.jsx";

import "./RegisterUser.css";

function RegisterUser() {
    return (
        <div className="content-head">
            <div className="section">
                <div className="section-heading">
                    <NewUserIcon className="svg-icon" />&nbsp;
                    <span className="section-heading-title">User Registration</span>
                </div>
                <div className="section-description">
                    Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an API key for authentication purposes.
                </div>
            </div>
            <hr />
        </div>
    );
}

export default RegisterUser;
