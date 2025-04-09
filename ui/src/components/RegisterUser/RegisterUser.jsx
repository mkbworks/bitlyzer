import { GetIconByKey } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";

import "./RegisterUser.css";

function RegisterUser() {
    const NewUserIcon = GetIconByKey("NewUser");
    return (
        <>
            <PageHeading Title="User Registration" Icon={NewUserIcon}>
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an API key for authentication purposes.
            </PageHeading>
            <hr />
            <form className="form">
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="FullName" >Enter your full name</label>
                    <input type="text" id="FullName" className="form-input" placeholder="User's full name" />
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserEmail" >Enter your email address</label>
                    <input type="text" id="UserEmail" className="form-input" placeholder="User's email address" />
                </div>
                <div className="form-control">
                    <button type="button" className="btn-submit">Register</button>
                </div>
            </form>
        </>
    );
}

export default RegisterUser;
